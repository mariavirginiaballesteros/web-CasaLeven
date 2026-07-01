'use server'

import { createServerClient } from '@/lib/supabase-server'
import { sendConfirmacion } from '@/lib/email/resend'
import { syncSignaCRM } from '@/lib/crm/signa'
import type { CreateBookingPayload } from '@/lib/types/turnero'

export async function createBooking(payload: CreateBookingPayload): Promise<{ id: string }> {
  const sb = createServerClient()

  // Resolver duración y space_id del servicio
  let durationMin = 60
  let spaceId: string | null = null
  let resolvedServiceId: string | null = null

  if (payload.serviceId) {
    const { data: svc } = await sb
      .from('servicios')
      .select('nombre, duracion_min, space_id')
      .eq('id', payload.serviceId)
      .single()
    if (svc) {
      durationMin = svc.duracion_min
      spaceId = svc.space_id

      // bookings.service_id FK targets services.id (English), not servicios.id (Spanish)
      const { data: svcEn } = await sb
        .from('services')
        .select('id')
        .ilike('name', svc.nombre)
        .single()
      resolvedServiceId = svcEn?.id ?? null
    }
  } else if (payload.circuitId) {
    const { data: cir } = await sb
      .from('circuits')
      .select('total_min')
      .eq('id', payload.circuitId)
      .single()
    if (cir) durationMin = cir.total_min
  } else if (payload.professionalId) {
    const { data: prof } = await sb
      .from('professionals')
      .select('space_id')
      .eq('id', payload.professionalId)
      .single()
    if (prof) spaceId = prof.space_id
    durationMin = 30
  }

  const [startH, startM] = payload.time.split(':').map(Number)
  const startDate = new Date(`${payload.date}T${payload.time}:00`)
  const endDate   = new Date(startDate.getTime() + durationMin * 60 * 1000)
  const endTime   = `${String(endDate.getHours()).padStart(2,'0')}:${String(endDate.getMinutes()).padStart(2,'0')}`

  // Crear booking
  const { data: booking, error } = await sb
    .from('bookings')
    .insert({
      booking_type:     payload.tipo,
      service_id:       resolvedServiceId,
      circuit_id:       payload.circuitId ?? null,
      date:             payload.date,
      start_time:       payload.time,
      end_time:         endTime,
      cliente_nombre:   payload.nombre,
      cliente_email:    payload.email,
      cliente_telefono: payload.telefono,
      notas:            payload.notas ?? null,
      status:           'pendiente',
    })
    .select('id')
    .single()

  if (error || !booking) throw new Error(error?.message ?? 'Error creando reserva')

  // Crear booking_slot para el espacio principal
  if (spaceId) {
    const startTimestamp = `${payload.date}T${payload.time}:00`
    const endTimestamp   = `${payload.date}T${endTime}:00`

    await sb.from('booking_slots').insert({
      booking_id:      booking.id,
      space_id:        spaceId,
      professional_id: payload.professionalId ?? null,
      start_time:      startTimestamp,
      end_time:        endTimestamp,
      step_order:      1,
    })
  }

  // Email de confirmación (no bloquea si falla)
  try {
    // Obtener nombre del servicio/circuito para el mail
    let servicioNombre = 'Tu reserva'
    if (payload.serviceId) {
      const { data } = await sb.from('servicios').select('nombre').eq('id', payload.serviceId).single()
      if (data) servicioNombre = data.nombre
    } else if (payload.circuitId) {
      const { data } = await sb.from('circuits').select('name').eq('id', payload.circuitId).single()
      if (data) servicioNombre = data.name
    } else if (payload.professionalId) {
      const { data } = await sb.from('professionals').select('name').eq('id', payload.professionalId).single()
      if (data) servicioNombre = `Consulta con ${data.name}`
    }

    await sendConfirmacion({
      bookingId:  booking.id,
      nombre:     payload.nombre,
      email:      payload.email,
      servicio:   servicioNombre,
      fecha:      payload.date,
      hora:       payload.time,
    })
  } catch (e) {
    console.error('[email] Error enviando confirmación:', e)
  }

  // Sync CRM (no bloquea)
  try {
    await syncSignaCRM({
      bookingId: booking.id,
      nombre:    payload.nombre,
      email:     payload.email,
      telefono:  payload.telefono,
      servicio:  payload.serviceId ?? payload.circuitId ?? '',
      fecha:     payload.date,
      hora:      payload.time,
    })
  } catch (e) {
    console.error('[crm] Error sincronizando:', e)
  }

  return { id: booking.id }
}

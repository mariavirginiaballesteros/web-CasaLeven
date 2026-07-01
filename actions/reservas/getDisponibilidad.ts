'use server'

import { createServerClient } from '@/lib/supabase-server'
import type { TimeSlot } from '@/lib/types/turnero'

const OPEN_HOUR  = 8   // 8:00
const CLOSE_HOUR = 20  // 20:00
const INTERVAL   = 30  // minutos

interface DisponibilidadParams {
  date: string        // YYYY-MM-DD
  spaceId: string
  durationMin: number
  professionalId?: string
}

export async function getDisponibilidad({
  date,
  spaceId,
  durationMin,
  professionalId,
}: DisponibilidadParams): Promise<TimeSlot[]> {
  const sb = createServerClient()
  const dayStart = `${date}T${String(OPEN_HOUR).padStart(2,'0')}:00:00`
  const dayEnd   = `${date}T${String(CLOSE_HOUR).padStart(2,'0')}:00:00`

  // Ocupación existente en ese espacio ese día
  const spaceQuery = sb
    .from('booking_slots')
    .select('start_time, end_time')
    .eq('space_id', spaceId)
    .gte('start_time', dayStart)
    .lt('start_time', dayEnd)

  const queries: Promise<{ data: { start_time: string; end_time: string }[] | null; error: unknown }>[] = [spaceQuery]

  if (professionalId) {
    queries.push(
      sb
        .from('booking_slots')
        .select('start_time, end_time')
        .eq('professional_id', professionalId)
        .gte('start_time', dayStart)
        .lt('start_time', dayEnd) as Promise<{ data: { start_time: string; end_time: string }[] | null; error: unknown }>
    )
  }

  // Conflictos de espacio
  const { data: conflicts } = await sb
    .from('space_conflicts')
    .select('space_b')
    .eq('space_a', spaceId)

  const conflictSpaceIds = (conflicts ?? []).map((c: { space_b: string }) => c.space_b)

  if (conflictSpaceIds.length > 0) {
    queries.push(
      sb
        .from('booking_slots')
        .select('start_time, end_time')
        .in('space_id', conflictSpaceIds)
        .gte('start_time', dayStart)
        .lt('start_time', dayEnd) as Promise<{ data: { start_time: string; end_time: string }[] | null; error: unknown }>
    )
  }

  const results = await Promise.all(queries)
  const occupied: Array<{ start: Date; end: Date }> = []

  for (const r of results) {
    for (const slot of r.data ?? []) {
      occupied.push({ start: new Date(slot.start_time), end: new Date(slot.end_time) })
    }
  }

  const slots: TimeSlot[] = []
  const totalMinutes = (CLOSE_HOUR - OPEN_HOUR) * 60

  for (let offset = 0; offset + durationMin <= totalMinutes; offset += INTERVAL) {
    const slotStart = new Date(`${date}T${String(OPEN_HOUR).padStart(2,'0')}:00:00`)
    slotStart.setMinutes(slotStart.getMinutes() + offset)
    const slotEnd = new Date(slotStart)
    slotEnd.setMinutes(slotEnd.getMinutes() + durationMin)

    const isOccupied = occupied.some(
      o => slotStart < o.end && slotEnd > o.start
    )

    const h = slotStart.getHours()
    const m = slotStart.getMinutes()
    const time = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`
    const label = `${h % 12 || 12}:${String(m).padStart(2,'0')} ${h < 12 ? 'AM' : 'PM'}`

    slots.push({ time, available: !isOccupied, label })
  }

  return slots
}

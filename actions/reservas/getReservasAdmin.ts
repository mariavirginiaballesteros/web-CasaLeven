'use server'

import { createServerClient } from '@/lib/supabase-server'
import type { Booking } from '@/lib/types/turnero'

export async function getReservasByDate(date: string): Promise<Booking[]> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('bookings')
    .select(`
      *,
      service:services(id, name, duration_min),
      circuit:circuits(id, name, total_min)
    `)
    .eq('date', date)
    .neq('status', 'cancelado')
    .order('start_time')

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getAllReservas(limit = 100): Promise<Booking[]> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('bookings')
    .select(`
      *,
      service:services(id, name, duration_min),
      circuit:circuits(id, name, total_min)
    `)
    .order('date', { ascending: false })
    .order('start_time', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'pendiente' | 'confirmado' | 'cancelado' | 'completado'
): Promise<void> {
  const sb = createServerClient()
  const { error } = await sb
    .from('bookings')
    .update({ status })
    .eq('id', bookingId)

  if (error) throw new Error(error.message)
}

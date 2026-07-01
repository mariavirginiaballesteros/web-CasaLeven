'use server'

import { createServerClient } from '@/lib/supabase-server'
import type { Professional, WeeklySchedule } from '@/lib/types/turnero'

export async function getAllProfesionales(): Promise<Professional[]> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('professionals')
    .select('*')
    .order('active', { ascending: false })
    .order('name')

  if (error) throw new Error(error.message)
  return data ?? []
}

export interface ProfesionalInput {
  name: string
  role: string
  space_id: string | null
  active: boolean
  weekly_schedule: WeeklySchedule
}

export async function createProfesional(input: ProfesionalInput): Promise<{ id: string }> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('professionals')
    .insert({
      name:            input.name,
      role:            input.role,
      space_id:        input.space_id,
      active:          input.active,
      weekly_schedule: input.weekly_schedule,
    })
    .select('id')
    .single()

  if (error || !data) throw new Error(error?.message ?? 'Error creando profesional')
  return { id: data.id }
}

export async function updateProfesional(id: string, input: ProfesionalInput): Promise<void> {
  const sb = createServerClient()
  const { error } = await sb
    .from('professionals')
    .update({
      name:            input.name,
      role:            input.role,
      space_id:        input.space_id,
      active:          input.active,
      weekly_schedule: input.weekly_schedule,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function setProfesionalActive(id: string, active: boolean): Promise<void> {
  const sb = createServerClient()
  const { error } = await sb
    .from('professionals')
    .update({ active })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

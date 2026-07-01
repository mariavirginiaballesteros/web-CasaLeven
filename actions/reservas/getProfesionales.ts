'use server'

import { createServerClient } from '@/lib/supabase-server'
import type { Professional } from '@/lib/types/turnero'

export async function getProfesionalesByRole(role: string): Promise<Professional[]> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('professionals')
    .select('*')
    .eq('role', role)
    .eq('active', true)
    .order('name')

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getProfesionalById(id: string): Promise<Professional | null> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('professionals')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

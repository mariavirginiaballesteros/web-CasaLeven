'use server'

import { createServerClient } from '@/lib/supabase-server'
import type { Circuit } from '@/lib/types/turnero'

export async function getCircuitos(): Promise<Circuit[]> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('circuits')
    .select(`
      *,
      steps:circuit_steps(
        *,
        service:services(*)
      )
    `)
    .eq('active', true)
    .order('category')
    .order('name')

  if (error) throw new Error(error.message)
  return (data ?? []).map(c => ({
    ...c,
    steps: (c.steps ?? []).sort((a: { step_order: number }, b: { step_order: number }) => a.step_order - b.step_order),
  }))
}

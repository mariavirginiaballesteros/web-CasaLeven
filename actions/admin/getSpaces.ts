'use server'

import { createServerClient } from '@/lib/supabase-server'
import type { Space } from '@/lib/types/turnero'

export async function getSpaces(): Promise<Space[]> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('spaces')
    .select('id, name, capacity, is_shared, active')
    .eq('active', true)
    .order('name')

  if (error) throw new Error(error.message)
  return data ?? []
}

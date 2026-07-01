'use server'

import { createServerClient } from '@/lib/supabase-server'
import type { Service } from '@/lib/types/turnero'

export async function getServicios(): Promise<Service[]> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('servicios')
    .select('id, nombre, category, space_id, duracion_min, requires_role, requires_couple, is_common, activo')
    .eq('company_id', 'casa_leven')
    .eq('activo', true)
    .order('category')
    .order('nombre')

  if (error) throw new Error(error.message)

  // Map servicios → Service shape expected by the booking UI
  return (data ?? []).map(s => ({
    id:               s.id,
    name:             s.nombre,
    category:         s.category ?? 'especial',
    duration_min:     s.duracion_min,
    space_id:         s.space_id ?? '',
    requires_role:    s.requires_role ?? null,
    requires_couple:  s.requires_couple ?? false,
    is_common:        s.is_common ?? false,
    active:           s.activo,
  }))
}

'use server'

import { createServerClient } from '@/lib/supabase-server'
import type { Service } from '@/lib/types/turnero'

export async function getAllServicios(): Promise<Service[]> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('servicios')
    .select('id, nombre, category, space_id, duracion_min, requires_role, requires_couple, is_common, activo')
    .eq('company_id', 'casa_leven')
    .order('activo', { ascending: false })
    .order('category')
    .order('nombre')

  if (error) throw new Error(error.message)

  return (data ?? []).map(s => ({
    id:              s.id,
    name:            s.nombre,
    category:        s.category ?? 'especial',
    duration_min:    s.duracion_min,
    space_id:        s.space_id ?? '',
    requires_role:   s.requires_role ?? null,
    requires_couple: s.requires_couple ?? false,
    is_common:       s.is_common ?? false,
    active:          s.activo,
  }))
}

export interface ServicioInput {
  name: string
  category: string | null
  duration_min: number
  space_id: string | null
  requires_role: string | null
  requires_couple: boolean
  is_common: boolean
  active: boolean
}

// services (English) has no space_id/category/etc — keep only what bookings.createBooking
// needs for its `ilike` name lookup in sync: id + name.
async function syncServiceName(nombre: string, previousNombre?: string) {
  const sb = createServerClient()

  if (previousNombre && previousNombre !== nombre) {
    const { data: existing } = await sb
      .from('services')
      .select('id')
      .ilike('name', previousNombre)
      .single()
    if (existing) {
      await sb.from('services').update({ name: nombre }).eq('id', existing.id)
      return
    }
  }

  const { data: existing } = await sb
    .from('services')
    .select('id')
    .ilike('name', nombre)
    .single()
  if (!existing) {
    await sb.from('services').insert({ id: nombre.toLowerCase().replace(/\s+/g, '-'), name: nombre })
  }
}

export async function createServicio(input: ServicioInput): Promise<{ id: string }> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('servicios')
    .insert({
      nombre:           input.name,
      category:         input.category,
      duracion_min:     input.duration_min,
      space_id:         input.space_id,
      requires_role:    input.requires_role,
      requires_couple:  input.requires_couple,
      is_common:        input.is_common,
      activo:           input.active,
      company_id:       'casa_leven',
    })
    .select('id')
    .single()

  if (error || !data) throw new Error(error?.message ?? 'Error creando servicio')
  await syncServiceName(input.name)
  return { id: data.id }
}

export async function updateServicio(id: string, input: ServicioInput): Promise<void> {
  const sb = createServerClient()

  const { data: current } = await sb.from('servicios').select('nombre').eq('id', id).single()

  const { error } = await sb
    .from('servicios')
    .update({
      nombre:           input.name,
      category:         input.category,
      duracion_min:     input.duration_min,
      space_id:         input.space_id,
      requires_role:    input.requires_role,
      requires_couple:  input.requires_couple,
      is_common:        input.is_common,
      activo:           input.active,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
  await syncServiceName(input.name, current?.nombre)
}

export async function setServicioActive(id: string, active: boolean): Promise<void> {
  const sb = createServerClient()
  const { error } = await sb
    .from('servicios')
    .update({ activo: active })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

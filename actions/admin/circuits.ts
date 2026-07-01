'use server'

import { createServerClient } from '@/lib/supabase-server'
import type { Circuit, CircuitStep, Service } from '@/lib/types/turnero'

export async function getAllCircuits(): Promise<Circuit[]> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('circuits')
    .select('id, name, category, total_min, target_audience, active, circuit_steps(id, circuit_id, step_order, service_id, duration_override)')
    .order('active', { ascending: false })
    .order('name')

  if (error) throw new Error(error.message)

  return (data ?? []).map((c: any) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    total_min: c.total_min,
    target_audience: c.target_audience,
    active: c.active,
    steps: (c.circuit_steps ?? []).sort((a: CircuitStep, b: CircuitStep) => a.step_order - b.step_order),
  }))
}

export async function getAllServices(): Promise<Service[]> {
  const sb = createServerClient()
  const { data, error } = await sb
    .from('services')
    .select('id, name, category, space_id, duration_min, requires_role, requires_couple, is_common, active')
    .order('active', { ascending: false })
    .order('name')

  if (error) throw new Error(error.message)

  return (data ?? []).map(s => ({
    id: s.id,
    name: s.name,
    category: s.category,
    duration_min: s.duration_min,
    space_id: s.space_id,
    requires_role: s.requires_role,
    requires_couple: s.requires_couple,
    is_common: s.is_common,
    active: s.active,
  }))
}

export interface CircuitInput {
  name: string
  category: string | null
  total_min: number | null
  target_audience: string | null
  active: boolean
}

export interface CircuitStepInput {
  service_id: string
  duration_override: number | null
}

function slugify(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, '-')
}

export async function createCircuit(input: CircuitInput, steps: CircuitStepInput[]): Promise<{ id: string }> {
  const sb = createServerClient()
  const id = slugify(input.name)

  const { error } = await sb
    .from('circuits')
    .insert({
      id,
      name: input.name,
      category: input.category,
      total_min: input.total_min,
      target_audience: input.target_audience,
      active: input.active,
    })

  if (error) throw new Error(error.message)

  if (steps.length > 0) {
    const { error: stepsError } = await sb
      .from('circuit_steps')
      .insert(steps.map((s, i) => ({
        circuit_id: id,
        step_order: i + 1,
        service_id: s.service_id,
        duration_override: s.duration_override,
      })))
    if (stepsError) throw new Error(stepsError.message)
  }

  return { id }
}

export async function updateCircuit(id: string, input: CircuitInput, steps: CircuitStepInput[]): Promise<void> {
  const sb = createServerClient()

  const { error } = await sb
    .from('circuits')
    .update({
      name: input.name,
      category: input.category,
      total_min: input.total_min,
      target_audience: input.target_audience,
      active: input.active,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  const { error: deleteError } = await sb.from('circuit_steps').delete().eq('circuit_id', id)
  if (deleteError) throw new Error(deleteError.message)

  if (steps.length > 0) {
    const { error: stepsError } = await sb
      .from('circuit_steps')
      .insert(steps.map((s, i) => ({
        circuit_id: id,
        step_order: i + 1,
        service_id: s.service_id,
        duration_override: s.duration_override,
      })))
    if (stepsError) throw new Error(stepsError.message)
  }
}

export async function setCircuitActive(id: string, active: boolean): Promise<void> {
  const sb = createServerClient()
  const { error } = await sb
    .from('circuits')
    .update({ active })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

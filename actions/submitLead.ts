'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type LeadData = {
  nombre:            string
  email:             string
  telefono:          string
  membresia_interes: string
  empresa?:          string
  cargo?:            string
  mensaje?:          string
  fuente:            string
  canal:             string
}

export async function submitLead(data: LeadData) {
  const { error } = await supabase.from('leads').insert({
    tenant_id:         'casa-leven',
    nombre:            data.nombre,
    email:             data.email,
    telefono:          data.telefono,
    membresia_interes: data.membresia_interes,
    empresa:           data.empresa || null,
    cargo:             data.cargo   || null,
    notas:             data.mensaje || null,
    fuente:            data.fuente,
    canal:             data.canal,
    etapa:             'Nuevo Lead',
    convertido:        false,
  })

  if (error) {
    console.error('Supabase error:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

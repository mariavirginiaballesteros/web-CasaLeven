'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

/* --- Validación de entrada ------------------------------------
 * La policy de Supabase permite INSERT anónimo en `leads` (necesario
 * para que el formulario funcione sin login). Eso significa que la
 * única barrera contra basura, spam y payloads gigantes es esta función.
 * ------------------------------------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

/** Recorta, saca caracteres de control y limita el largo. */
function limpiar(v: unknown, max: number): string {
  if (typeof v !== 'string') return ''
  return v.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max)
}

export async function submitLead(data: LeadData) {
  const nombre   = limpiar(data.nombre, 120)
  const email    = limpiar(data.email, 160).toLowerCase()
  const telefono = limpiar(data.telefono, 40)

  if (nombre.length < 2)     return { success: false, error: 'Nombre inválido.' }
  if (!EMAIL_RE.test(email)) return { success: false, error: 'Email inválido.' }
  if (telefono.length < 6)   return { success: false, error: 'Teléfono inválido.' }

  const { error } = await supabase.from('leads').insert({
    tenant_id:         'casa-leven',
    nombre,
    email,
    telefono,
    membresia_interes: limpiar(data.membresia_interes, 60) || null,
    empresa:           limpiar(data.empresa, 120)  || null,
    cargo:             limpiar(data.cargo, 120)    || null,
    notas:             limpiar(data.mensaje, 2000) || null,
    fuente:            limpiar(data.fuente, 80),
    canal:             limpiar(data.canal, 40),
    etapa:             'Nuevo Lead',
    convertido:        false,
  })

  if (error) {
    // No devolvemos el mensaje crudo de Postgres al navegador: puede
    // revelar nombres de tablas, columnas y constraints.
    console.error('[submitLead] Supabase error:', error)
    return { success: false, error: 'No pudimos guardar tus datos. Escribinos por WhatsApp.' }
  }

  return { success: true }
}

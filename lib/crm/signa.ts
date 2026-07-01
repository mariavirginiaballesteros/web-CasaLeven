import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey   = process.env.SUPABASE_SERVICE_ROLE_KEY!

export interface SignaLeadPayload {
  bookingId: string
  nombre:    string
  email:     string
  telefono:  string
  servicio:  string
  fecha:     string
  hora:      string
}

export async function syncSignaCRM(payload: SignaLeadPayload): Promise<string | null> {
  if (!supabaseUrl || !serviceKey) return null

  const admin = createClient(supabaseUrl, serviceKey)

  // Check if this email already exists as a lead to avoid duplicates
  const { data: existing } = await admin
    .from('leads')
    .select('id')
    .eq('tenant_id', 'casa-leven')
    .eq('email', payload.email)
    .maybeSingle()

  if (existing?.id) return existing.id

  const { data, error } = await admin
    .from('leads')
    .insert({
      tenant_id:         'casa-leven',
      nombre:            payload.nombre,
      email:             payload.email,
      telefono:          payload.telefono,
      fuente:            'Turnero Web',
      canal:             'web',
      etapa:             'new',
      notas:             `Reserva: ${payload.servicio} — ${payload.fecha} ${payload.hora}hs (ID: ${payload.bookingId})`,
      convertido:        false,
    })
    .select('id')
    .single()

  if (error) throw new Error(`CRM sync error: ${error.message}`)

  return data?.id ?? null
}

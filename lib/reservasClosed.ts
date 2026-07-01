import { createServerClient } from '@/lib/supabase-server'

export async function isReservasClosed(): Promise<boolean> {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('settings')
      .select('value')
      .eq('tenant_id', 'casa-leven')
      .eq('key', 'reservas_closed')
      .single()
    return data?.value === 'true'
  } catch {
    return false
  }
}

export async function toggleReservasClosed(): Promise<boolean> {
  const supabase = createServerClient()
  const current = await isReservasClosed()
  const next = !current
  await supabase
    .from('settings')
    .upsert(
      { tenant_id: 'casa-leven', key: 'reservas_closed', value: String(next), updated_at: new Date().toISOString() },
      { onConflict: 'tenant_id,key' }
    )
  return next
}

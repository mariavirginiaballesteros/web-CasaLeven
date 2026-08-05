/**
 * Rate limit simple en memoria para el login del admin.
 *
 * Sin esto, cualquiera puede probar contraseñas contra /api/admin/login a
 * miles por minuto hasta acertar. Con esto, 5 intentos fallidos por IP y
 * queda bloqueado 15 minutos.
 *
 * Limitación conocida: la memoria es por instancia serverless. Si el tráfico
 * crece o se escala a varias regiones, hay que moverlo a Upstash Redis o al
 * rate limiting de Vercel. Para el volumen actual alcanza.
 */

type Intento = { count: number; hasta: number }

const intentos = new Map<string, Intento>()

const MAX_INTENTOS = 5
const BLOQUEO_MS = 15 * 60 * 1000

export function ipDe(req: Request) {
  const h = req.headers
  return (
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    h.get('x-real-ip') ||
    'desconocida'
  )
}

export function estaBloqueado(ip: string) {
  const i = intentos.get(ip)
  if (!i) return false
  if (Date.now() > i.hasta) {
    intentos.delete(ip)
    return false
  }
  return i.count >= MAX_INTENTOS
}

export function registrarFallo(ip: string) {
  const ahora = Date.now()
  const i = intentos.get(ip)
  if (!i || ahora > i.hasta) {
    intentos.set(ip, { count: 1, hasta: ahora + BLOQUEO_MS })
    return
  }
  i.count += 1
  i.hasta = ahora + BLOQUEO_MS
}

export function limpiar(ip: string) {
  intentos.delete(ip)
}

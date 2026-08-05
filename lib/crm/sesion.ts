import { igualSeguro } from '@/lib/auth/session'
import type { Rol, Sesion, UnitId } from '@/modules/crm/domain/tipos'

/**
 * Sesión del CRM.
 *
 * Diferencia con `admin_session` (lib/auth/session.ts): ahí el payload firmado
 * es solo un vencimiento, así que la cookie no sabe QUIÉN entró. Por eso el
 * admin actual no puede expresar "usuarios separados que no ven el todo".
 * Acá el payload firmado lleva identidad, rol y unidad. Ese es todo el cambio
 * que habilita el aislamiento por unidad de negocio.
 *
 * Formato: base64url(JSON).firmaHMAC-SHA256   (Web Crypto, corre en Edge)
 */

const enc = new TextEncoder()
export const COOKIE_CRM = 'crm_session'
export const DURACION_SEG = 60 * 60 * 10 // un turno largo de recepción

function b64urlDeTexto(s: string) {
  return Buffer.from(s, 'utf8').toString('base64url')
}
function textoDeB64url(s: string) {
  return Buffer.from(s, 'base64url').toString('utf8')
}

async function clave(secret: string) {
  return crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  )
}

async function firmar(payload: string, secret: string) {
  const sig = await crypto.subtle.sign('HMAC', await clave(secret), enc.encode(payload))
  return Buffer.from(sig).toString('base64url')
}

/** Hash del PIN. Con pimienta del secreto del servidor: un dump de la tabla no alcanza. */
export async function hashPin(pin: string, secret: string) {
  return firmar(`pin:${pin}`, secret)
}

export async function crearTokenCrm(
  datos: { uid: string; nombre: string; rol: Rol; unit: UnitId | null },
  secret: string,
) {
  const payload: Sesion = { ...datos, exp: Date.now() + DURACION_SEG * 1000 }
  const cuerpo = b64urlDeTexto(JSON.stringify(payload))
  return `${cuerpo}.${await firmar(cuerpo, secret)}`
}

export async function leerSesion(
  token: string | undefined,
  secret: string | undefined,
): Promise<Sesion | null> {
  if (!token || !secret) return null
  const [cuerpo, sig] = token.split('.')
  if (!cuerpo || !sig) return null
  if (!igualSeguro(sig, await firmar(cuerpo, secret))) return null
  try {
    const s = JSON.parse(textoDeB64url(cuerpo)) as Sesion
    if (typeof s.exp !== 'number' || s.exp < Date.now()) return null
    if (!s.uid || !s.rol) return null
    return s
  } catch {
    return null
  }
}

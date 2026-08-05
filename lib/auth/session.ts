/**
 * Sesión del panel de administración.
 *
 * ANTES: la cookie `admin_session` guardaba literalmente el valor de
 * ADMIN_SECRET. Quien viera la cookie (una extensión del navegador, un log,
 * alguien mirando la pantalla en DevTools) se llevaba la contraseña maestra
 * del panel, no solo una sesión.
 *
 * AHORA: la cookie guarda un token firmado con HMAC-SHA256 que contiene solo
 * una fecha de expiración. El secreto nunca sale del servidor y el token
 * caduca solo. Si alguien lo roba, expira; y no sirve para adivinar la clave.
 *
 * Usa Web Crypto para poder correr también en el runtime Edge del middleware.
 */

const enc = new TextEncoder()

async function key(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
}

function b64url(buf: ArrayBuffer) {
  return Buffer.from(buf).toString('base64url')
}

async function firmar(payload: string, secret: string) {
  const sig = await crypto.subtle.sign('HMAC', await key(secret), enc.encode(payload))
  return b64url(sig)
}

/** Comparación en tiempo constante: no filtra información por cuánto tarda. */
export function igualSeguro(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export const DURACION_SESION_SEG = 60 * 60 * 8 // 8 horas

/** Genera el valor de la cookie: "<expiraEnMs>.<firma>" */
export async function crearToken(secret: string) {
  const exp = String(Date.now() + DURACION_SESION_SEG * 1000)
  return `${exp}.${await firmar(exp, secret)}`
}

/** Valida firma y vencimiento. */
export async function tokenValido(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return false
  const [exp, sig] = token.split('.')
  if (!exp || !sig) return false
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false
  return igualSeguro(sig, await firmar(exp, secret))
}

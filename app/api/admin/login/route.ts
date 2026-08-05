import { NextRequest, NextResponse } from 'next/server'
import { crearToken, igualSeguro, DURACION_SESION_SEG } from '@/lib/auth/session'
import { ipDe, estaBloqueado, registrarFallo, limpiar } from '@/lib/auth/rateLimit'

export async function POST(req: NextRequest) {
  const ip = ipDe(req)

  if (estaBloqueado(ip)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Probá de nuevo en 15 minutos.' },
      { status: 429 },
    )
  }

  const secret = process.env.ADMIN_SECRET
  if (!secret) {
    console.error('[admin/login] ADMIN_SECRET no está configurado')
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  let password = ''
  try {
    const body = await req.json()
    password = typeof body?.password === 'string' ? body.password : ''
  } catch {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  if (!igualSeguro(password, secret)) {
    registrarFallo(ip)
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  limpiar(ip)

  const res = NextResponse.json({ ok: true })
  // La cookie ya no contiene el secreto, sino un token firmado que caduca.
  res.cookies.set('admin_session', await crearToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: DURACION_SESION_SEG,
  })
  return res
}

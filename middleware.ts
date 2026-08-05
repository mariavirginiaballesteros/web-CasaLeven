import { NextRequest, NextResponse } from 'next/server'
import { tokenValido } from '@/lib/auth/session'
import { COOKIE_CRM, leerSesion } from '@/lib/crm/sesion'

/**
 * Dos productos, dos cookies. El admin del turnero sigue con `admin_session`
 * (firma solo un vencimiento). El CRM usa `crm_session`, que firma identidad,
 * rol y unidad: es lo que después permite el aislamiento por unidad.
 */

const ABIERTAS = ['/admin/login', '/api/admin/login', '/crm/login', '/api/crm/login', '/api/crm/logout']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (ABIERTAS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next()
  }

  const esCrm = pathname.startsWith('/crm') || pathname.startsWith('/api/crm')
  const secret = process.env.ADMIN_SECRET

  const ok = esCrm
    ? (await leerSesion(request.cookies.get(COOKIE_CRM)?.value, secret)) !== null
    : await tokenValido(request.cookies.get('admin_session')?.value, secret)

  if (!ok) {
    // Las rutas de API responden 401; las páginas redirigen al login.
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    const res = NextResponse.redirect(new URL(esCrm ? '/crm/login' : '/admin/login', request.url))
    res.cookies.delete(esCrm ? COOKIE_CRM : 'admin_session')
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/crm/:path*', '/api/crm/:path*'],
}

import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip login page and API route
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/login')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')
    const secret  = process.env.ADMIN_SECRET

    if (!secret || !session || session.value !== secret) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

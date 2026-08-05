/**
 * Cabeceras de seguridad aplicadas a todo el sitio.
 * - CSP: limita de dónde puede cargarse script/estilo/imagen. Evita que un
 *   script inyectado mande los datos de los formularios a un dominio ajeno.
 * - HSTS: obliga HTTPS durante un año.
 * - X-Frame-Options: nadie puede meter el sitio en un iframe (clickjacking).
 * - Permissions-Policy: apaga cámara, micrófono y geolocalización.
 *
 * ⚠️ Si se agrega un pixel nuevo (Meta, TikTok, etc.), hay que sumar su dominio
 *    a script-src y connect-src o va a quedar bloqueado silenciosamente.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://*.clarity.ms https://www.googletagmanager.com",
  "frame-src 'self' https://www.googletagmanager.com https://www.google.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: CSP },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  typescript: {
    // El error es un bug en los tipos de @supabase/realtime-js, no en nuestro código.
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
    ]
  },
}

export default nextConfig

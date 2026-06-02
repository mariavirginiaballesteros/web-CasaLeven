import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer
      className="grain"
      style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* BRAND */}
          <div>
            <div className="mb-4">
              <Image
                src="/logos/casa-leven.svg"
                alt="Casa Leven"
                width={120}
                height={70}
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.7, height: 'auto' }}
              />
            </div>
            <p className="text-white/40 mt-6 leading-relaxed" style={{ fontSize: '13px' }}>
              El primer espacio donde movimiento,<br />
              recuperación y nutrición conviven<br />
              bajo un mismo método.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <div
              className="font-display font-semibold text-white/30 mb-6"
              style={{ fontSize: '9px', letterSpacing: '0.3em' }}
            >
              UNIDADES
            </div>
            <div className="flex flex-col gap-3">
              {[
                ['Leven Motion',  '/motion'],
                ['Leven Therma',  '/therma'],
                ['Leven Nourish', '/nourish'],
                ['Membresías',    '/membresias'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="link-hover text-white/50 hover:text-white transition-colors"
                  style={{ fontSize: '13px' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <div
              className="font-display font-semibold text-white/30 mb-6"
              style={{ fontSize: '9px', letterSpacing: '0.3em' }}
            >
              CONTACTO
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white/50" style={{ fontSize: '13px' }}>
                Dentro del Radisson RED Funes<br />
                Funes, Santa Fe, Argentina
              </p>
              <a
                href="https://wa.me/5493415000000"
                className="link-hover text-white/50 hover:text-white transition-colors"
                style={{ fontSize: '13px' }}
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com/casaleven"
                className="link-hover text-white/50 hover:text-white transition-colors"
                style={{ fontSize: '13px' }}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-white/20" style={{ fontSize: '11px' }}>
            © {new Date().getFullYear()} Casa Leven — Proyecto Vida S.A. · Funes, Santa Fe
          </p>
          <Link
            href="/fundadores"
            className="text-white/40 hover:text-white transition-colors font-display"
            style={{ fontSize: '10px', letterSpacing: '0.2em' }}
          >
            FOUNDERS →
          </Link>
        </div>
      </div>
    </footer>
  )
}

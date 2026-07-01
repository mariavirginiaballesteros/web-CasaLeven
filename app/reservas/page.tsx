'use client'

import { useRouter } from 'next/navigation'

export default function ReservasVenuePage() {
  const router = useRouter()

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px' }}>
      <a
        href="/"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '9px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 48,
          cursor: 'pointer',
        }}
      >
        ← Casa Leven
      </a>

      <div style={{ marginTop: 48, marginBottom: 40 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 12 }}>
          ¿Dónde querés reservar?
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
          Elegí el espacio: gimnasio Motion o spa Therma.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.push('/reservas/motion')}
          className="text-left"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '28px 32px',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
          }}
        >
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 8 }}>
            GIMNASIO
          </span>
          <span style={{ fontSize: '18px', color: '#fff' }}>Motion</span>
          <span style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
            Reservá tu membresía
          </span>
        </button>

        <button
          onClick={() => router.push('/reservas/therma')}
          className="text-left"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '28px 32px',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
          }}
        >
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 8 }}>
            SPA
          </span>
          <span style={{ fontSize: '18px', color: '#fff' }}>Therma</span>
          <span style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
            Médicos, servicios individuales y circuitos
          </span>
        </button>
      </div>
    </main>
  )
}

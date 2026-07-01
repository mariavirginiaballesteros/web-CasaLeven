import { isReservasClosed } from '@/lib/reservasClosed'
import ReservasVenueSelector from '@/components/reservas/ReservasVenueSelector'

export default function ReservasPage() {
  const closed = isReservasClosed()

  if (closed) {
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
          }}
        >
          ← Casa Leven
        </a>

        <div style={{ marginTop: 80, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 24 }}>
            RESERVAS
          </p>
          <h1 style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
            Sin turnos por ahora
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
            Pronto tendrás la oportunidad de reservar.
          </p>
        </div>
      </main>
    )
  }

  return <ReservasVenueSelector />
}

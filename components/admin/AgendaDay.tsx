'use client'

import ReservaRow from './ReservaRow'
import type { Booking } from '@/lib/types/turnero'

interface Props {
  bookings: Booking[]
  date: string
}

export default function AgendaDay({ bookings, date }: Props) {
  if (bookings.length === 0) {
    return (
      <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>
        Sin reservas para esta fecha.
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '90px 1fr 120px 120px 110px',
        gap: 16,
        padding: '10px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {['Hora', 'Cliente / Servicio', 'Email', 'Teléfono', 'Estado'].map(h => (
          <span key={h} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
            {h}
          </span>
        ))}
      </div>

      {bookings.map(b => (
        <ReservaRow key={b.id} booking={b} />
      ))}
    </div>
  )
}

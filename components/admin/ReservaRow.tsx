'use client'

import { useState } from 'react'
import StatusBadge from './StatusBadge'
import { updateBookingStatus } from '@/actions/reservas/getReservasAdmin'
import type { Booking, BookingStatus } from '@/lib/types/turnero'

const STATUSES: BookingStatus[] = ['pendiente','confirmado','completado','cancelado']
const STATUS_LABELS: Record<BookingStatus, string> = {
  pendiente:  'Pendiente',
  confirmado: 'Confirmada',
  completado: 'Completada',
  cancelado:  'Cancelada',
}

interface Props {
  booking: Booking
  onUpdated?: (id: string, status: BookingStatus) => void
}

export default function ReservaRow({ booking, onUpdated }: Props) {
  const [status, setStatus]   = useState<BookingStatus>(booking.status)
  const [open,   setOpen]     = useState(false)
  const [saving, setSaving]   = useState(false)

  const handleStatus = async (next: BookingStatus) => {
    setSaving(true)
    setOpen(false)
    await updateBookingStatus(booking.id, next)
    setStatus(next)
    onUpdated?.(booking.id, next)
    setSaving(false)
  }

  const serviceName = (booking as any).services?.name ?? (booking as any).circuits?.name ?? '—'

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr 120px 120px 110px',
      alignItems: 'center',
      gap: 16,
      padding: '16px 24px',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      transition: 'background 0.15s',
    }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {/* Time */}
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', letterSpacing: '0.05em' }}>
        {booking.start_time}
      </span>

      {/* Client + service */}
      <div>
        <span style={{ fontSize: '15px', display: 'block' }}>{booking.cliente_nombre}</span>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', display: 'block', marginTop: 2 }}>{serviceName}</span>
      </div>

      {/* Contact */}
      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {booking.cliente_email}
      </span>

      {/* Phone */}
      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
        {booking.cliente_telefono}
      </span>

      {/* Status */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setOpen(o => !o)}
          disabled={saving}
          style={{ background: 'none', border: 'none', cursor: 'none', padding: 0 }}
        >
          <StatusBadge status={status} />
        </button>
        {open && (
          <div style={{
            position: 'absolute', right: 0, top: '100%', marginTop: 4,
            background: '#1c1519', border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 10, minWidth: 140,
          }}>
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => handleStatus(s)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '10px 16px', background: 'none', border: 'none', cursor: 'none',
                  fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: s === status ? '#fff' : 'rgba(255,255,255,0.45)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useReserva } from '@/context/ReservaContext'

const MONTHS = ['enero','febrero','marzo','abril','mayo','junio',
                'julio','agosto','septiembre','octubre','noviembre','diciembre']

function formatFecha(date: string): string {
  const [y, m, d] = date.split('-')
  return `${parseInt(d)} de ${MONTHS[parseInt(m) - 1]} de ${y}`
}

function ConfirmacionContent() {
  const router = useRouter()
  const params = useSearchParams()
  const bookingId = params.get('id')
  const { state, reset } = useReserva()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!bookingId) router.replace('/reservas')
  }, [bookingId, router])

  const whatsappText = encodeURIComponent(
    `Hola! Confirmé mi reserva en Casa Leven para el ${state.date ? formatFecha(state.date) : ''} a las ${state.time} hs. ID: ${bookingId}`
  )

  const calendarUrl = () => {
    if (!state.date || !state.time) return '#'
    const [h, m] = state.time.split(':').map(Number)
    const start  = `${state.date.replace(/-/g, '')}T${String(h).padStart(2,'0')}${String(m).padStart(2,'0')}00`
    const endH   = h + 1
    const end    = `${state.date.replace(/-/g, '')}T${String(endH).padStart(2,'0')}${String(m).padStart(2,'0')}00`
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Casa+Leven+Reserva&dates=${start}/${end}&details=ID+${bookingId}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId ?? '').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: '100px 24px 60px', textAlign: 'center' }}>
      {/* Check mark */}
      <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 40px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 style={{ fontSize: '32px', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 16 }}>
        Reserva confirmada
      </h1>
      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 40 }}>
        Te enviamos un email de confirmación a <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{state.email}</strong>.
        Te esperamos en Casa Leven.
      </p>

      {/* ID */}
      <div
        onClick={handleCopy}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px 24px', cursor: 'pointer', marginBottom: 48 }}
      >
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          ID
        </span>
        <span style={{ fontSize: '13px', color: '#fff', letterSpacing: '0.05em' }}>
          {bookingId?.slice(0, 8).toUpperCase()}
        </span>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
          {copied ? '✓' : '⎘'}
        </span>
      </div>

      {/* Details */}
      {state.date && state.time && (
        <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '24px', marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>FECHA</span>
            <span style={{ fontSize: '14px' }}>{formatFecha(state.date)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>HORARIO</span>
            <span style={{ fontSize: '14px' }}>{state.time} hs</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <a
          href={calendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-leven btn-leven-filled"
          style={{ fontSize: '11px', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}
        >
          Agregar al calendario
        </a>
        <a
          href={`https://wa.me/541140000000?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
        >
          Escribirnos por WhatsApp
        </a>
        <button
          onClick={() => { reset(); router.push('/') }}
          style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', background: 'none', border: 'none', cursor: 'pointer', marginTop: 8 }}
        >
          Volver al inicio
        </button>
      </div>
    </main>
  )
}

export default function Paso5Page() {
  return (
    <Suspense fallback={null}>
      <ConfirmacionContent />
    </Suspense>
  )
}

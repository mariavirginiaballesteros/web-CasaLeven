'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useReserva } from '@/context/ReservaContext'
import ProgressBar from '@/components/reservas/ProgressBar'
import ReservaSummary from '@/components/reservas/ReservaSummary'
import { createBooking } from '@/actions/reservas/createBooking'
import { getServicios } from '@/actions/reservas/getServicios'
import { getCircuitos } from '@/actions/reservas/getCircuitos'

export default function Paso4Page() {
  const router = useRouter()
  const { state, setDatosCliente, reset } = useReserva()
  const [nombre,   setNombre]   = useState(state.nombre   ?? '')
  const [email,    setEmail]    = useState(state.email     ?? '')
  const [telefono, setTelefono] = useState(state.telefono  ?? '')
  const [notas,    setNotas]    = useState(state.notas     ?? '')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [servicioNombre, setServicioNombre] = useState<string | undefined>()
  const [circuitoNombre, setCircuitoNombre] = useState<string | undefined>()

  useEffect(() => {
    if (!state.date || !state.time) { router.replace('/reservas/2'); return }
    const load = async () => {
      if (state.serviceId) {
        const svcs = await getServicios()
        setServicioNombre(svcs.find(s => s.id === state.serviceId)?.name)
      } else if (state.circuitId) {
        const cirs = await getCircuitos()
        setCircuitoNombre(cirs.find(c => c.id === state.circuitId)?.name)
      }
    }
    load()
  }, [state.serviceId, state.circuitId, state.date, state.time, router])

  const handleConfirm = async () => {
    if (!nombre || !email || !telefono) { setError('Completá todos los campos obligatorios.'); return }
    setError(null)
    setLoading(true)
    setDatosCliente(nombre, email, telefono, notas)
    try {
      const result = await createBooking({
        tipo: state.tipo!,
        serviceId:      state.serviceId,
        circuitId:      state.circuitId,
        date:           state.date!,
        time:           state.time!,
        professionalId: state.professionalId || undefined,
        nombre,
        email,
        telefono,
        notas,
      })
      router.push(`/reservas/5?id=${result.id}`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al crear la reserva. Intentá de nuevo.')
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '15px',
    padding: '16px 20px',
    outline: 'none',
    fontFamily: 'Cormorant Garamond, serif',
    letterSpacing: '0.01em',
    boxSizing: 'border-box' as const,
  }
  const labelStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '9px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.35)',
    display: 'block',
    marginBottom: 8,
  }

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px' }}>
      <button
        onClick={() => router.back()}
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 48 }}
      >
        ← Volver
      </button>

      <ProgressBar step={4} total={5} />

      <div style={{ marginTop: 48, marginBottom: 36 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.01em' }}>
          Tus datos
        </h1>
      </div>

      <ReservaSummary
        state={state}
        servicioNombre={servicioNombre}
        circuitoNombre={circuitoNombre}
      />

      <div className="flex flex-col gap-5" style={{ marginTop: 36 }}>
        <div>
          <label style={labelStyle}>Nombre completo *</label>
          <input
            className="input-leven"
            style={inputStyle}
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            className="input-leven"
            style={inputStyle}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label style={labelStyle}>Teléfono *</label>
          <input
            className="input-leven"
            style={inputStyle}
            type="tel"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            placeholder="+54 9 11..."
          />
        </div>
        <div>
          <label style={labelStyle}>Notas (opcional)</label>
          <textarea
            className="input-leven"
            style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }}
            value={notas}
            onChange={e => setNotas(e.target.value)}
            placeholder="Condiciones a tener en cuenta, preferencias..."
          />
        </div>
      </div>

      {/* Pago stub — ready for future integration */}
      <div style={{ marginTop: 36, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>
          PAGO
        </p>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
          El pago se realiza en el centro. Próximamente podrás abonar online.
        </p>
      </div>

      {error && (
        <p style={{ color: 'var(--terracotta)', fontSize: '13px', marginTop: 20 }}>{error}</p>
      )}

      <div style={{ marginTop: 36 }}>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="btn-leven btn-leven-filled"
          style={{ opacity: loading ? 0.5 : 1, fontSize: '11px', padding: '18px 44px' }}
        >
          {loading ? 'Confirmando...' : 'Confirmar reserva'}
        </button>
      </div>
    </main>
  )
}

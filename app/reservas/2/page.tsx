'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useReserva } from '@/context/ReservaContext'
import ProgressBar from '@/components/reservas/ProgressBar'
import CalendarPicker from '@/components/reservas/CalendarPicker'
import SlotGrid from '@/components/reservas/SlotGrid'
import { getDisponibilidad } from '@/actions/reservas/getDisponibilidad'
import { getServicios } from '@/actions/reservas/getServicios'
import { getCircuitos } from '@/actions/reservas/getCircuitos'
import { getProfesionalById } from '@/actions/reservas/getProfesionales'
import type { TimeSlot } from '@/lib/types/turnero'

export default function Paso2Page() {
  const router = useRouter()
  const { state, setFechaHora } = useReserva()
  const [slots,    setSlots]    = useState<TimeSlot[]>([])
  const [loading,  setLoading]  = useState(false)
  const [spaceId,  setSpaceId]  = useState<string | null>(null)
  const [duration, setDuration] = useState(60)

  // Resolve space + duration from chosen service/circuit/professional
  useEffect(() => {
    if (!state.serviceId && !state.circuitId && !state.professionalId) { router.replace('/reservas/1'); return }

    const resolve = async () => {
      if (state.serviceId) {
        const svcs = await getServicios()
        const svc  = svcs.find(s => s.id === state.serviceId)
        if (svc) { setSpaceId(svc.space_id); setDuration(svc.duration_min) }
      } else if (state.circuitId) {
        const cirs = await getCircuitos()
        const cir  = cirs.find(c => c.id === state.circuitId)
        if (cir) { setDuration(cir.total_min ?? 60) }
      } else if (state.professionalId) {
        const prof = await getProfesionalById(state.professionalId)
        if (prof) { setSpaceId(prof.space_id); setDuration(30) }
      }
    }
    resolve()
  }, [state.serviceId, state.circuitId, state.professionalId, router])

  const loadSlots = useCallback(async (date: string) => {
    if (!spaceId) return
    setLoading(true)
    try {
      const data = await getDisponibilidad({ date, spaceId, durationMin: duration, professionalId: state.professionalId ?? undefined })
      setSlots(data)
    } finally {
      setLoading(false)
    }
  }, [spaceId, duration, state.professionalId])

  useEffect(() => {
    if (state.date && spaceId) loadSlots(state.date)
  }, [state.date, spaceId, loadSlots])

  const handleDateChange = (date: string) => {
    setFechaHora(date, '')
    loadSlots(date)
  }

  const handleNext = () => {
    if (!state.date || !state.time) return
    router.push('/reservas/3')
  }

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px' }}>
      <button
        onClick={() => router.back()}
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 48 }}
      >
        ← Volver
      </button>

      <ProgressBar step={2} total={5} />

      <div style={{ marginTop: 48, marginBottom: 36 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.01em' }}>
          Elegí fecha y horario
        </h1>
      </div>

      <CalendarPicker
        value={state.date}
        onChange={handleDateChange}
      />

      {state.date && (
        <div style={{ marginTop: 32 }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            HORARIOS DISPONIBLES
          </p>
          {loading ? (
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>Cargando turnos...</p>
          ) : (
            <SlotGrid
              slots={slots}
              value={state.time}
              onChange={time => setFechaHora(state.date!, time)}
            />
          )}
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <button
          onClick={handleNext}
          disabled={!state.date || !state.time}
          className="btn-leven btn-leven-filled"
          style={{ opacity: (!state.date || !state.time) ? 0.4 : 1, fontSize: '11px', padding: '18px 44px' }}
        >
          Continuar →
        </button>
      </div>
    </main>
  )
}

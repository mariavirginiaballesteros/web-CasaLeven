'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useReserva } from '@/context/ReservaContext'
import ProgressBar from '@/components/reservas/ProgressBar'
import ServiceCard from '@/components/reservas/ServiceCard'
import { getServicios } from '@/actions/reservas/getServicios'
import { getCircuitos } from '@/actions/reservas/getCircuitos'
import { getProfesionalesByRole } from '@/actions/reservas/getProfesionales'
import type { Service, Circuit, Professional } from '@/lib/types/turnero'

const CATEGORY_ORDER = ['masaje', 'facial', 'especial', 'termal']
const CATEGORY_LABELS: Record<string, string> = {
  masaje: 'Masajes', facial: 'Facial', especial: 'Especial', termal: 'Termal',
}

export default function Paso1Page() {
  const router  = useRouter()
  const { state, setServicio, setCircuito, setProfesional } = useReserva()
  const [services,      setServices]      = useState<Service[]>([])
  const [circuits,      setCircuits]      = useState<Circuit[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading,        setLoading]      = useState(true)

  const isMedico = state.tipo === 'service' && state.categoria === 'medico'

  useEffect(() => {
    if (!state.tipo) { router.replace('/reservas/therma'); return }
    const load = async () => {
      if (isMedico) {
        const [medicos, fisios] = await Promise.all([
          getProfesionalesByRole('medico'),
          getProfesionalesByRole('fisioterapeuta'),
        ])
        setProfessionals([...medicos, ...fisios])
      } else if (state.tipo === 'service') {
        setServices(await getServicios())
      } else {
        setCircuits(await getCircuitos())
      }
      setLoading(false)
    }
    load()
  }, [state.tipo, state.categoria, isMedico, router])

  const handleNext = () => {
    if (isMedico && !state.professionalId) return
    if (state.tipo === 'service' && !isMedico && !state.serviceId) return
    if (state.tipo === 'circuit' && !state.circuitId) return
    router.push('/reservas/2')
  }

  const filteredServices = services.filter(s => s.category !== 'medico')

  const grouped = filteredServices.reduce<Record<string, Service[]>>((acc, s) => {
    const cat = s.category ?? 'otros'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {})

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px' }}>
      <button
        onClick={() => router.back()}
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 48, display: 'inline-flex', alignItems: 'center', gap: 8 }}
      >
        ← Volver
      </button>

      <ProgressBar step={1} total={5} />

      <div style={{ marginTop: 48, marginBottom: 32 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.01em' }}>
          {state.tipo === 'circuit'
            ? 'Elegí tu circuito'
            : state.categoria === 'medico'
              ? 'Elegí tu médico/a'
              : 'Elegí tu servicio'}
        </h1>
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>Cargando...</p>
      ) : isMedico ? (
        <div className="flex flex-col gap-2">
          {professionals.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
              No hay médicos/as disponibles por el momento.
            </p>
          )}
          {professionals.map(p => (
            <button
              key={p.id}
              onClick={() => setProfesional(p.id)}
              className="text-left w-full"
              style={{
                background:  state.professionalId === p.id ? 'rgba(178,58,58,0.08)' : 'rgba(255,255,255,0.02)',
                border:      `1px solid ${state.professionalId === p.id ? 'var(--terracotta)' : 'rgba(255,255,255,0.08)'}`,
                padding:     '20px 24px',
                cursor:      'pointer',
                transition:  'border-color 0.2s ease',
              }}
            >
              <span style={{ fontSize: '15px', color: '#fff', display: 'block' }}>{p.name}</span>
              {p.role && (
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: 4, display: 'block' }}>
                  {p.role}
                </span>
              )}
            </button>
          ))}
        </div>
      ) : state.tipo === 'service' ? (
        <div className="flex flex-col gap-6">
          {CATEGORY_ORDER.filter(c => grouped[c]).map(cat => (
            <div key={cat}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>
                {CATEGORY_LABELS[cat]}
              </p>
              <div className="flex flex-col gap-2">
                {grouped[cat].map(s => (
                  <ServiceCard
                    key={s.id}
                    service={s}
                    selected={state.serviceId === s.id}
                    onSelect={() => setServicio(s.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {circuits.map(c => (
            <button
              key={c.id}
              onClick={() => setCircuito(c.id)}
              className="text-left w-full"
              style={{
                background:  state.circuitId === c.id ? 'rgba(178,58,58,0.08)' : 'rgba(255,255,255,0.02)',
                border:      `1px solid ${state.circuitId === c.id ? 'var(--terracotta)' : 'rgba(255,255,255,0.08)'}`,
                padding:     '20px 24px',
                cursor:      'pointer',
                transition:  'border-color 0.2s ease',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 6 }}>
                    {c.category === 'hugo-termal' ? 'Hugo Termal' : c.category === 'gabriela-estetica' ? 'Gabriela Estética' : 'Circuito'}
                  </span>
                  <span style={{ fontSize: '15px', color: '#fff' }}>{c.name}</span>
                  {c.target_audience && (
                    <span style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                      {c.target_audience}
                    </span>
                  )}
                </div>
                {c.total_min && (
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: state.circuitId === c.id ? 'var(--terracotta)' : 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
                    {c.total_min} min
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <button
          onClick={handleNext}
          disabled={isMedico ? !state.professionalId : state.tipo === 'service' ? !state.serviceId : !state.circuitId}
          className="btn-leven btn-leven-filled"
          style={{ opacity: (isMedico ? !state.professionalId : state.tipo === 'service' ? !state.serviceId : !state.circuitId) ? 0.4 : 1, fontSize: '11px', padding: '18px 44px' }}
        >
          Continuar →
        </button>
      </div>
    </main>
  )
}

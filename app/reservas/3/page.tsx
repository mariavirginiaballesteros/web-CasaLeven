'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useReserva } from '@/context/ReservaContext'
import ProgressBar from '@/components/reservas/ProgressBar'
import ProfessionalCard from '@/components/reservas/ProfessionalCard'
import { getProfesionalesByRole } from '@/actions/reservas/getProfesionales'
import { getServicios } from '@/actions/reservas/getServicios'
import type { Professional } from '@/lib/types/turnero'

export default function Paso3Page() {
  const router = useRouter()
  const { state, setProfesional } = useReserva()
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [requiresRole, setRequiresRole] = useState<string | null>(null)

  useEffect(() => {
    if (!state.date || !state.time) { router.replace('/reservas/2'); return }

    const load = async () => {
      if (state.serviceId) {
        const svcs = await getServicios()
        const svc = svcs.find(s => s.id === state.serviceId)
        if (svc?.requires_role) {
          setRequiresRole(svc.requires_role)
          const profs = await getProfesionalesByRole(svc.requires_role)
          setProfessionals(profs)
        } else {
          // No professional required — skip this step
          router.replace('/reservas/4')
          return
        }
      }
      setLoading(false)
    }
    load()
  }, [state.serviceId, state.date, state.time, router])

  const handleNext = () => {
    router.push('/reservas/4')
  }

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px' }}>
      <button
        onClick={() => router.back()}
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 48 }}
      >
        ← Volver
      </button>

      <ProgressBar step={3} total={5} />

      <div style={{ marginTop: 48, marginBottom: 36 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.01em' }}>
          Elegí tu profesional
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
          Podés continuar sin elegir uno si no tenés preferencia.
        </p>
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>Cargando...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {professionals.map(p => (
            <ProfessionalCard
              key={p.id}
              professional={p}
              selected={state.professionalId === p.id}
              onSelect={() => setProfesional(p.id)}
            />
          ))}
        </div>
      )}

      <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <button
          onClick={handleNext}
          className="btn-leven btn-leven-filled"
          style={{ fontSize: '11px', padding: '18px 44px' }}
        >
          Continuar →
        </button>
        {state.professionalId && (
          <button
            onClick={() => { setProfesional(''); handleNext() }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Sin preferencia
          </button>
        )}
      </div>
    </main>
  )
}

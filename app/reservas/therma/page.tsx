'use client'

import { useRouter } from 'next/navigation'
import { useReserva } from '@/context/ReservaContext'

export default function ThermaPage() {
  const router = useRouter()
  const { setTipo } = useReserva()

  const handleSelect = (kind: 'medico' | 'servicio' | 'circuito') => {
    if (kind === 'medico') setTipo('service', 'medico')
    else if (kind === 'servicio') setTipo('service', null)
    else setTipo('circuit')
    router.push('/reservas/1')
  }

  const options: { key: 'medico' | 'servicio' | 'circuito'; label: string; tag: string; desc: string }[] = [
    { key: 'medico', label: 'Médico/as', tag: '01', desc: 'Consultas con profesionales médicos' },
    { key: 'servicio', label: 'Servicio Individual', tag: '02', desc: 'Masajes, faciales y tratamientos a medida' },
    { key: 'circuito', label: 'Circuito', tag: '03', desc: 'Experiencias termales completas' },
  ]

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px' }}>
      <button
        onClick={() => router.push('/reservas')}
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 48, display: 'inline-flex', alignItems: 'center', gap: 8 }}
      >
        ← Volver
      </button>

      <div style={{ marginTop: 48, marginBottom: 40 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 12 }}>
          Therma — Tipo de reserva
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
          Elegí qué querés reservar en el spa.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {options.map(opt => (
          <button
            key={opt.key}
            onClick={() => handleSelect(opt.key)}
            className="text-left"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '24px 28px',
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
              {opt.tag}
            </span>
            <span style={{ fontSize: '18px', color: '#fff' }}>{opt.label}</span>
            <span style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
              {opt.desc}
            </span>
          </button>
        ))}
      </div>
    </main>
  )
}

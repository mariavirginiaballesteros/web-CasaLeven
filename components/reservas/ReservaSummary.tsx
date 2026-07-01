'use client'

import type { ReservaWizardState } from '@/lib/types/turnero'

interface Props {
  state: ReservaWizardState
  servicioNombre?: string
  circuitoNombre?: string
  profesionalNombre?: string
}

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

function formatFecha(date: string): string {
  const [y, m, d] = date.split('-')
  return `${parseInt(d)} de ${MONTHS[parseInt(m) - 1]}, ${y}`
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      padding: '12px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      gap: 16,
    }}>
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', paddingTop: 1 }}>
        {label}
      </span>
      <span style={{ fontSize: '14px', color: '#fff', textAlign: 'right' }}>
        {value}
      </span>
    </div>
  )
}

export default function ReservaSummary({ state, servicioNombre, circuitoNombre, profesionalNombre }: Props) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '24px',
    }}>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
        RESUMEN
      </p>
      {(servicioNombre || circuitoNombre) && (
        <Row label="Servicio" value={servicioNombre ?? circuitoNombre ?? ''} />
      )}
      {state.date && <Row label="Fecha" value={formatFecha(state.date)} />}
      {state.time && <Row label="Horario" value={`${state.time} hs`} />}
      {profesionalNombre && <Row label="Profesional" value={profesionalNombre} />}
      {state.nombre && <Row label="Nombre" value={state.nombre} />}
    </div>
  )
}

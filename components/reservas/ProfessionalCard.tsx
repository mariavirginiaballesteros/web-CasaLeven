'use client'

import type { Professional } from '@/lib/types/turnero'

interface Props {
  professional: Professional
  selected: boolean
  onSelect: () => void
}

const ROLE_LABEL: Record<string, string> = {
  masajista:      'Masajista',
  esteticista:    'Esteticista',
  fisioterapeuta: 'Fisioterapeuta',
  medico:         'Médico/a',
  especialista:   'Especialista',
  tecnico:        'Técnico/a',
}

export default function ProfessionalCard({ professional, selected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className="text-left w-full"
      style={{
        background:  selected ? 'rgba(123,132,118,0.1)' : 'rgba(255,255,255,0.02)',
        border:      `1px solid ${selected ? 'var(--sage)' : 'rgba(255,255,255,0.08)'}`,
        padding:     '20px 24px',
        cursor:      'none',
        transition:  'border-color 0.2s ease, background 0.2s ease',
      }}
    >
      <div className="flex items-center gap-4">
        {/* Avatar placeholder */}
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
        }}>
          {professional.name.charAt(0)}
        </div>
        <div>
          <span style={{ fontSize: '14px', color: '#fff', display: 'block' }}>
            {professional.name}
          </span>
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '9px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: selected ? 'var(--sage)' : 'rgba(255,255,255,0.3)',
          }}>
            {ROLE_LABEL[professional.role] ?? professional.role}
          </span>
        </div>
      </div>
    </button>
  )
}

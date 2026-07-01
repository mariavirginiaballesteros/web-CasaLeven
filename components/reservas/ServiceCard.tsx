'use client'

import type { Service } from '@/lib/types/turnero'

interface Props {
  service: Service
  selected: boolean
  onSelect: () => void
}

const CATEGORY_LABELS: Record<string, string> = {
  masaje:   'Masajes',
  facial:   'Facial',
  medico:   'Médico',
  especial: 'Especial',
  termal:   'Termal',
}

export default function ServiceCard({ service, selected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className="text-left w-full"
      style={{
        background:   selected ? 'rgba(178,58,58,0.08)' : 'rgba(255,255,255,0.02)',
        border:       `1px solid ${selected ? 'var(--terracotta)' : 'rgba(255,255,255,0.08)'}`,
        padding:      '20px 24px',
        cursor:       'pointer',
        transition:   'border-color 0.2s ease, background 0.2s ease',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {service.category && (
            <span
              style={{
                fontFamily:     'Montserrat, sans-serif',
                fontSize:       '8px',
                letterSpacing:  '0.3em',
                textTransform:  'uppercase',
                color:          'rgba(255,255,255,0.3)',
                display:        'block',
                marginBottom:   '6px',
              }}
            >
              {CATEGORY_LABELS[service.category] ?? service.category}
            </span>
          )}
          <span style={{ fontSize: '15px', color: '#fff', display: 'block' }}>
            {service.name}
          </span>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span
            style={{
              fontFamily:    'Montserrat, sans-serif',
              fontSize:      '11px',
              letterSpacing: '0.1em',
              color:         selected ? 'var(--terracotta)' : 'rgba(255,255,255,0.3)',
            }}
          >
            {service.duration_min} min
          </span>
        </div>
      </div>
    </button>
  )
}

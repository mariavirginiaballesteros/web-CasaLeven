'use client'

import type { TimeSlot } from '@/lib/types/turnero'

interface Props {
  slots: TimeSlot[]
  value: string | null
  onChange: (time: string) => void
}

export default function SlotGrid({ slots, value, onChange }: Props) {
  if (slots.length === 0) {
    return (
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', padding: '24px 0' }}>
        No hay turnos disponibles para este día.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
      {slots.map(slot => {
        const selected = slot.time === value
        return (
          <button
            key={slot.time}
            disabled={!slot.available}
            onClick={() => slot.available && onChange(slot.time)}
            style={{
              background:   selected ? 'var(--terracotta)' : slot.available ? 'rgba(255,255,255,0.04)' : 'transparent',
              border:       `1px solid ${selected ? 'var(--terracotta)' : slot.available ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
              borderRadius: '2px',
              color:        !slot.available ? 'rgba(255,255,255,0.15)' : selected ? '#fff' : 'rgba(255,255,255,0.7)',
              fontSize:     '12px',
              padding:      '10px 4px',
              cursor:       !slot.available ? 'not-allowed' : 'none',
              fontFamily:   'Montserrat, sans-serif',
              letterSpacing:'0.05em',
              transition:   'background 0.2s ease, border-color 0.2s ease',
              textDecoration: !slot.available ? 'line-through' : 'none',
            }}
          >
            {slot.time}
          </button>
        )
      })}
    </div>
  )
}

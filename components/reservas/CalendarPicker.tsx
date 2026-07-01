'use client'

import { useState } from 'react'

interface Props {
  value: string | null   // YYYY-MM-DD
  onChange: (date: string) => void
  minDate?: string
}

const DAYS    = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
const MONTHS  = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

function toYMD(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

export default function CalendarPicker({ value, onChange, minDate }: Props) {
  const today   = new Date()
  const [view, setView] = useState(() => ({
    year:  today.getFullYear(),
    month: today.getMonth(),
  }))

  const firstDay = new Date(view.year, view.month, 1)
  // Monday-based offset
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const min = minDate ?? toYMD(today)

  const prevMonth = () => {
    setView(v => {
      const d = new Date(v.year, v.month - 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }
  const nextMonth = () => {
    setView(v => {
      const d = new Date(v.year, v.month + 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  return (
    <div style={{ userSelect: 'none' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'none', fontSize: '18px' }}
        >
          ←
        </button>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
          {MONTHS[view.month]} {view.year}
        </span>
        <button
          onClick={nextMonth}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'none', fontSize: '18px' }}
        >
          →
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', paddingBottom: '8px' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const dateStr  = `${view.year}-${String(view.month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
          const disabled  = dateStr < min
          const selected  = dateStr === value
          const isToday   = dateStr === toYMD(today)

          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onChange(dateStr)}
              style={{
                background:  selected ? 'var(--terracotta)' : 'transparent',
                border:      isToday && !selected ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                borderRadius: '2px',
                color:       disabled ? 'rgba(255,255,255,0.15)' : selected ? '#fff' : 'rgba(255,255,255,0.75)',
                fontSize:    '13px',
                padding:     '8px 0',
                cursor:      disabled ? 'not-allowed' : 'none',
                transition:  'background 0.2s ease',
                textAlign:   'center',
              }}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

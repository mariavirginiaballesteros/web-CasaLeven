'use client'

import { useRouter } from 'next/navigation'

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DAYS   = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

function formatDisplay(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return `${DAYS[dt.getDay()]} ${d} de ${MONTHS[m - 1]}`
}

function offsetDate(date: string, days: number): string {
  const [y, m, d] = date.split('-').map(Number)
  const dt = new Date(y, m - 1, d + days)
  return dt.toISOString().slice(0, 10)
}

export default function AdminDateNav({ date }: { date: string }) {
  const router = useRouter()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <button
        onClick={() => router.push(`/admin?date=${offsetDate(date, -1)}`)}
        style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', padding: '8px 14px', cursor: 'pointer', fontSize: '13px' }}
      >
        ‹
      </button>
      <input
        type="date"
        value={date}
        onChange={e => router.push(`/admin?date=${e.target.value}`)}
        style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '17px', fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.01em', outline: 'none', cursor: 'pointer' }}
      />
      <button
        onClick={() => router.push(`/admin?date=${offsetDate(date, 1)}`)}
        style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', padding: '8px 14px', cursor: 'pointer', fontSize: '13px' }}
      >
        ›
      </button>
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginLeft: 8 }}>
        {formatDisplay(date)}
      </span>
    </div>
  )
}

import type { BookingStatus } from '@/lib/types/turnero'

const CONFIG: Record<BookingStatus, { label: string; color: string; bg: string }> = {
  pendiente:  { label: 'Pendiente',  color: '#d4a853', bg: 'rgba(212,168,83,0.08)'  },
  confirmado: { label: 'Confirmada', color: '#7b8476', bg: 'rgba(123,132,118,0.08)' },
  cancelado:  { label: 'Cancelada',  color: '#b23a3a', bg: 'rgba(178,58,58,0.08)'   },
  completado: { label: 'Completada', color: 'rgba(255,255,255,0.35)', bg: 'rgba(255,255,255,0.04)' },
}

export default function StatusBadge({ status }: { status: BookingStatus }) {
  const c = CONFIG[status] ?? CONFIG.pendiente
  return (
    <span style={{
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '8px',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: c.color,
      background: c.bg,
      border: `1px solid ${c.color}33`,
      padding: '4px 10px',
      whiteSpace: 'nowrap',
    }}>
      {c.label}
    </span>
  )
}

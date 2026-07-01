import { ReservaProvider } from '@/context/ReservaContext'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Reservar turno — Casa Leven',
}

export default function ReservasLayout({ children }: { children: ReactNode }) {
  return (
    <ReservaProvider>
      <div style={{ minHeight: '100vh', background: 'var(--dark)' }}>
        {children}
      </div>
    </ReservaProvider>
  )
}

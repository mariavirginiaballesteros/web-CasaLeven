import type { ReactNode } from 'react'

export const metadata = { title: 'Admin — Casa Leven' }

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', color: '#fff' }}>
      {children}
    </div>
  )
}

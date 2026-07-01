import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAllReservas } from '@/actions/reservas/getReservasAdmin'
import ReservaRow from '@/components/admin/ReservaRow'

interface Props {
  searchParams: { page?: string }
}

export default async function AdminReservasPage({ searchParams }: Props) {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  if (!session || session.value !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  const limit    = 50
  const bookings = await getAllReservas(limit)

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
        <div>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 6 }}>
            CASA LEVEN
          </p>
          <h1 style={{ fontSize: '24px', fontWeight: 300 }}>Todas las reservas</h1>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/admin" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
            ← Agenda del día
          </a>
          <a href="/admin/profesionales" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
            Profesionales
          </a>
          <a href="/admin/servicios" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
            Servicios
          </a>
          <a href="/admin/circuitos" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
            Circuitos
          </a>
        </div>
      </div>

      <div style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '90px 1fr 120px 120px 110px',
          gap: 16,
          padding: '10px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {['Hora', 'Cliente / Servicio', 'Email', 'Teléfono', 'Estado'].map(h => (
            <span key={h} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
              {h}
            </span>
          ))}
        </div>

        {bookings.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>
            Sin reservas.
          </div>
        ) : (
          bookings.map(b => <ReservaRow key={b.id} booking={b} />)
        )}
      </div>

      <p style={{ marginTop: 16, textAlign: 'right', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
        {bookings.length} reserva{bookings.length !== 1 ? 's' : ''}
      </p>
    </main>
  )
}

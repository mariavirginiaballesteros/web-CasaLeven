import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getReservasByDate } from '@/actions/reservas/getReservasAdmin'
import AgendaDay from '@/components/admin/AgendaDay'
import AdminDateNav from '@/components/admin/AdminDateNav'
import { isReservasClosed } from '@/lib/reservasClosed'

function todayArg(): string {
  // Argentina time (UTC-3)
  const now = new Date()
  const arg = new Date(now.getTime() - 3 * 60 * 60 * 1000)
  return arg.toISOString().slice(0, 10)
}

interface Props {
  searchParams: { date?: string }
}

export default async function AdminPage({ searchParams }: Props) {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  if (!session || session.value !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  const date     = searchParams.date ?? todayArg()
  const bookings = await getReservasByDate(date)
  const closed   = isReservasClosed()

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
        <div>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 6 }}>
            CASA LEVEN
          </p>
          <h1 style={{ fontSize: '24px', fontWeight: 300 }}>Agenda del día</h1>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/admin/reservas" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
            Todas las reservas
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
          <form action="/api/admin/logout" method="POST">
            <button type="submit" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Salir
            </button>
          </form>
        </div>
      </div>

      {/* Reservas toggle */}
      <div style={{ marginBottom: 32, padding: '16px 20px', border: `1px solid ${closed ? 'rgba(178,58,58,0.4)' : 'rgba(255,255,255,0.06)'}`, background: closed ? 'rgba(178,58,58,0.06)' : 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: closed ? 'rgba(178,58,58,0.8)' : 'rgba(255,255,255,0.3)', marginBottom: 4 }}>
            RESERVAS
          </p>
          <p style={{ fontSize: '13px', color: closed ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.5)' }}>
            {closed ? 'Temporalmente cerradas — los usuarios ven un mensaje de espera' : 'Abiertas — los usuarios pueden reservar normalmente'}
          </p>
        </div>
        <form action="/api/admin/toggle-reservas" method="POST">
          <button
            type="submit"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              padding: '10px 20px',
              border: `1px solid ${closed ? 'rgba(255,255,255,0.2)' : 'rgba(178,58,58,0.5)'}`,
              background: 'none',
              color: closed ? 'rgba(255,255,255,0.5)' : 'rgba(178,58,58,0.8)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {closed ? 'Abrir reservas' : 'Cerrar reservas'}
          </button>
        </form>
      </div>

      <AdminDateNav date={date} />

      <div style={{ marginTop: 32, border: '1px solid rgba(255,255,255,0.06)' }}>
        <AgendaDay bookings={bookings} date={date} />
      </div>

      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
          {bookings.length} reserva{bookings.length !== 1 ? 's' : ''}
        </span>
      </div>
    </main>
  )
}

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllServicios } from '@/actions/admin/servicios'
import { getSpaces } from '@/actions/admin/getSpaces'
import ServiciosManager from '@/components/admin/ServiciosManager'

export default async function AdminServiciosPage() {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  if (!session || session.value !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  const [servicios, spaces] = await Promise.all([
    getAllServicios(),
    getSpaces(),
  ])

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
        <div>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 12 }}>
            CASA LEVEN
          </p>
          <h1 style={{ fontSize: '24px', fontWeight: 300 }}>Servicios individuales</h1>
        </div>

        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link href="/admin" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Agenda
          </Link>
          <Link href="/admin/reservas" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Reservas
          </Link>
          <Link href="/admin/profesionales" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Profesionales
          </Link>
          <Link href="/admin/servicios" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff' }}>
            Servicios
          </Link>
          <Link href="/admin/circuitos" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Circuitos
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Salir
            </button>
          </form>
        </nav>
      </div>

      <ServiciosManager initialServicios={servicios} spaces={spaces} />
    </main>
  )
}

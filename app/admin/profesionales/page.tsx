import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllProfesionales } from '@/actions/admin/professionals'
import { getSpaces } from '@/actions/admin/getSpaces'
import ProfesionalesManager from '@/components/admin/ProfesionalesManager'

export default async function AdminProfesionalesPage() {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  if (!session || session.value !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  const [profesionales, spaces] = await Promise.all([
    getAllProfesionales(),
    getSpaces(),
  ])

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
        <div>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 12 }}>
            CASA LEVEN
          </p>
          <h1 style={{ fontSize: '24px', fontWeight: 300 }}>Profesionales</h1>
        </div>

        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link href="/admin" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Agenda
          </Link>
          <Link href="/admin/reservas" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Reservas
          </Link>
          <Link href="/admin/profesionales" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff' }}>
            Profesionales
          </Link>
          <Link href="/admin/servicios" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
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

      <ProfesionalesManager initialProfesionales={profesionales} spaces={spaces} />
    </main>
  )
}

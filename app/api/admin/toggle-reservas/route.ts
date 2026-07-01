import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { toggleReservasClosed } from '@/lib/reservasClosed'

export async function POST() {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  if (!session || session.value !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  await toggleReservasClosed()
  redirect('/admin')
}

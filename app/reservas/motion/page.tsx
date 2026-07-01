'use client'

import { useRouter } from 'next/navigation'

export default function MotionPage() {
  const router = useRouter()

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px 60px' }}>
      <button
        onClick={() => router.push('/reservas')}
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 48, display: 'inline-flex', alignItems: 'center', gap: 8 }}
      >
        ← Volver
      </button>

      <div style={{ marginTop: 48, marginBottom: 32 }}>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 12 }}>
          GIMNASIO
        </span>
        <h1 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 16 }}>
          Motion
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
          El acceso a Motion funciona por membresía, no por turnos individuales.
          Contactanos para conocer los planes disponibles y activar la tuya.
        </p>
      </div>

      <div className="flex flex-col gap-4" style={{ marginTop: 16 }}>
        {/* membresías — temporalmente oculto */}
        <a
          href="https://wa.me/5493415000000?text=Hola, quiero reservar mi membresía en Motion"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-leven"
          style={{ borderColor: 'rgba(255,255,255,0.3)', fontSize: '11px', padding: '18px 44px', textAlign: 'center', textDecoration: 'none' }}
        >
          Consultar por WhatsApp
        </a>
      </div>
    </main>
  )
}

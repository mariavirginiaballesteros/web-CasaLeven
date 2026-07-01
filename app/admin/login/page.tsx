'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState(false)
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 360, padding: '0 24px' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 40, textAlign: 'center' }}>
          CASA LEVEN · ADMIN
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoFocus
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${error ? 'var(--terracotta)' : 'rgba(255,255,255,0.1)'}`,
              color: '#fff',
              fontSize: '15px',
              padding: '16px 20px',
              outline: 'none',
              fontFamily: 'Cormorant Garamond, serif',
              boxSizing: 'border-box',
            }}
          />
          {error && (
            <p style={{ color: 'var(--terracotta)', fontSize: '13px', textAlign: 'center' }}>
              Contraseña incorrecta.
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="btn-leven btn-leven-filled"
            style={{ opacity: (loading || !password) ? 0.4 : 1, fontSize: '11px', padding: '18px' }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </main>
  )
}

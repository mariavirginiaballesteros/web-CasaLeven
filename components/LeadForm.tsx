'use client'

import { useState, useTransition } from 'react'
import { submitLead } from '@/actions/submitLead'

interface Props {
  fuente?: string
  canal?:  string
  showEmpresa?: boolean
}

export default function LeadForm({
  fuente     = 'Landing Page Founder',
  canal      = 'Sitio Web',
  showEmpresa = false,
}: Props) {
  const [isPending, startTransition] = useTransition()
  const [success,   setSuccess]      = useState(false)
  const [error,     setError]        = useState('')

  const [form, setForm] = useState({
    nombre:            '',
    email:             '',
    telefono:          '',
    membresia_interes: '',
    empresa:           '',
    cargo:             '',
    mensaje:           '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.telefono) {
      setError('Completá nombre, email y teléfono.')
      return
    }

    startTransition(async () => {
      const result = await submitLead({ ...form, fuente, canal })
      if (result.success) {
        setSuccess(true)
      } else {
        setError('Hubo un problema. Contactanos por WhatsApp.')
      }
    })
  }

  if (success) {
    return (
      <div className="py-12 text-center">
        <div
          className="font-display font-bold text-white mb-4"
          style={{ fontSize: '32px', letterSpacing: '-0.01em' }}
        >
          ¡Listo.
        </div>
        <p className="font-sans text-white/60 leading-relaxed" style={{ fontSize: '15px' }}>
          Recibimos tu registro. Te contactamos en menos de 24 horas
          para confirmar tu lugar como Founder.
        </p>
        <div className="mt-8">
          <a
            href="https://wa.me/5493415000000?text=Hola, acabo de registrarme como Founder de Casa Leven"
            className="btn-leven inline-flex"
          >
            WhatsApp directo →
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block font-display text-white/30 mb-3" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
            NOMBRE COMPLETO *
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="input-leven"
            required
          />
        </div>
        <div>
          <label className="block font-display text-white/30 mb-3" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
            EMAIL *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="input-leven"
            required
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block font-display text-white/30 mb-3" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
            TELÉFONO (WHATSAPP) *
          </label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+54 9 341 000 0000"
            className="input-leven"
            required
          />
        </div>
        <div>
          <label className="block font-display text-white/30 mb-3" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
            MEMBRESÍA DE INTERÉS
          </label>
          <select
            name="membresia_interes"
            value={form.membresia_interes}
            onChange={handleChange}
            className="input-leven"
          >
            <option value="" disabled>Seleccioná un plan</option>
            <option value="STARTER">STARTER — USD 89/mes</option>
            <option value="FLOW">FLOW — USD 149/mes</option>
            <option value="SPORT">SPORT — USD 179/mes</option>
            <option value="POWER SPORT">POWER SPORT — USD 229/mes</option>
            <option value="No sé todavía">No sé todavía</option>
          </select>
        </div>
      </div>

      {/* Empresa (solo B2B) */}
      {showEmpresa && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block font-display text-white/30 mb-3" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
              EMPRESA
            </label>
            <input
              type="text"
              name="empresa"
              value={form.empresa}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
              className="input-leven"
            />
          </div>
          <div>
            <label className="block font-display text-white/30 mb-3" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
              CARGO
            </label>
            <input
              type="text"
              name="cargo"
              value={form.cargo}
              onChange={handleChange}
              placeholder="Tu cargo"
              className="input-leven"
            />
          </div>
        </div>
      )}

      {/* Mensaje */}
      <div>
        <label className="block font-display text-white/30 mb-3" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
          MENSAJE (OPCIONAL)
        </label>
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Algo que quieras contarnos"
          rows={3}
          className="input-leven resize-none"
          style={{ lineHeight: '1.6' }}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="font-sans" style={{ fontSize: '13px', color: 'var(--terracotta)' }}>
          {error}
        </p>
      )}

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <button
          type="submit"
          disabled={isPending}
          className="btn-leven btn-leven-filled"
          style={{ opacity: isPending ? 0.6 : 1, fontSize: '11px', padding: '18px 44px' }}
        >
          {isPending ? 'Enviando...' : 'Quiero ser Founder →'}
        </button>
        <p className="font-sans text-white/25" style={{ fontSize: '12px' }}>
          Sin compromiso de pago.
          Te contactamos para confirmar tu lugar.
        </p>
      </div>
    </form>
  )
}

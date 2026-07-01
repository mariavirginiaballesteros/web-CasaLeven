'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createServicio, updateServicio, setServicioActive, type ServicioInput } from '@/actions/admin/servicios'
import type { Service, Space } from '@/lib/types/turnero'

const CATEGORIES = ['facial', 'corporal', 'masaje', 'especial']

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  fontSize: '14px',
  padding: '12px 16px',
  outline: 'none',
  fontFamily: 'Cormorant Garamond, serif',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.3em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8, display: 'block',
}

function emptyForm(): ServicioInput {
  return {
    name: '', category: 'facial', duration_min: 60, space_id: null,
    requires_role: null, requires_couple: false, is_common: false, active: true,
  }
}

export default function ServiciosManager({ initialServicios, spaces }: { initialServicios: Service[]; spaces: Space[] }) {
  const router = useRouter()
  const [servicios, setServicios] = useState(initialServicios)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ServicioInput>(emptyForm())
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const startNew = () => {
    setEditingId(null)
    setForm(emptyForm())
    setShowForm(true)
  }

  const startEdit = (s: Service) => {
    setEditingId(s.id)
    setForm({
      name: s.name,
      category: s.category,
      duration_min: s.duration_min,
      space_id: s.space_id || null,
      requires_role: s.requires_role,
      requires_couple: s.requires_couple,
      is_common: s.is_common,
      active: s.active,
    })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    try {
      if (editingId) {
        await updateServicio(editingId, form)
      } else {
        await createServicio(form)
      }
      setShowForm(false)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (s: Service) => {
    await setServicioActive(s.id, !s.active)
    setServicios(prev => prev.map(x => x.id === s.id ? { ...x, active: !x.active } : x))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
        <button onClick={startNew} className="btn-leven btn-leven-filled" style={{ fontSize: '11px', padding: '12px 28px' }}>
          + Nuevo servicio
        </button>
      </div>

      {showForm && (
        <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: 28, marginBottom: 32, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ fontSize: '17px', marginBottom: 20 }}>{editingId ? 'Editar servicio' : 'Nuevo servicio'}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Facial hidratante" />
            </div>
            <div>
              <label style={labelStyle}>Categoría</label>
              <select style={inputStyle} value={form.category ?? ''} onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Duración (min)</label>
              <input type="number" style={inputStyle} value={form.duration_min} onChange={e => setForm({ ...form, duration_min: Number(e.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>Espacio</label>
              <select style={inputStyle} value={form.space_id ?? ''} onChange={e => setForm({ ...form, space_id: e.target.value || null })}>
                <option value="">— Sin asignar —</option>
                {spaces.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: '14px' }}>
              <input type="checkbox" checked={form.requires_couple} onChange={e => setForm({ ...form, requires_couple: e.target.checked })} />
              Requiere pareja
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: '14px' }}>
              <input type="checkbox" checked={form.is_common} onChange={e => setForm({ ...form, is_common: e.target.checked })} />
              Espacio común
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: '14px' }}>
              <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
              Activo
            </label>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleSave} disabled={saving || !form.name.trim()} className="btn-leven btn-leven-filled"
              style={{ fontSize: '11px', padding: '14px 32px', opacity: (saving || !form.name.trim()) ? 0.4 : 1 }}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', padding: '14px 32px', fontSize: '11px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        {servicios.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>
            Sin servicios cargados.
          </div>
        ) : (
          servicios.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', opacity: s.active ? 1 : 0.4 }}>
              <div>
                <span style={{ fontSize: '15px', color: '#fff', display: 'block' }}>{s.name}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                  {s.category} · {s.duration_min} min · {spaces.find(sp => sp.id === s.space_id)?.name ?? 'sin espacio'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={() => startEdit(s)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Editar
                </button>
                <button onClick={() => toggleActive(s)} style={{ background: 'none', border: 'none', color: s.active ? 'var(--terracotta)' : 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  {s.active ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProfesional, updateProfesional, setProfesionalActive, type ProfesionalInput } from '@/actions/admin/professionals'
import type { Professional, Space, WeeklySchedule, WeeklyScheduleBlock } from '@/lib/types/turnero'

const DAYS: { key: keyof WeeklySchedule; label: string }[] = [
  { key: 'mon', label: 'Lun' },
  { key: 'tue', label: 'Mar' },
  { key: 'wed', label: 'Mié' },
  { key: 'thu', label: 'Jue' },
  { key: 'fri', label: 'Vie' },
  { key: 'sat', label: 'Sáb' },
  { key: 'sun', label: 'Dom' },
]

const ROLES = ['medico', 'fisioterapeuta']

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

function emptyForm(): ProfesionalInput {
  return { name: '', role: 'medico', space_id: null, active: true, weekly_schedule: {} }
}

export default function ProfesionalesManager({ initialProfesionales, spaces }: { initialProfesionales: Professional[]; spaces: Space[] }) {
  const router = useRouter()
  const [profesionales, setProfesionales] = useState(initialProfesionales)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProfesionalInput>(emptyForm())
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const startNew = () => {
    setEditingId(null)
    setForm(emptyForm())
    setShowForm(true)
  }

  const startEdit = (p: Professional) => {
    setEditingId(p.id)
    setForm({ name: p.name, role: p.role, space_id: p.space_id, active: p.active, weekly_schedule: p.weekly_schedule ?? {} })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    try {
      if (editingId) {
        await updateProfesional(editingId, form)
      } else {
        await createProfesional(form)
      }
      setShowForm(false)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (p: Professional) => {
    await setProfesionalActive(p.id, !p.active)
    setProfesionales(prev => prev.map(x => x.id === p.id ? { ...x, active: !x.active } : x))
  }

  const toggleDay = (day: keyof WeeklySchedule) => {
    setForm(prev => {
      const next = { ...prev.weekly_schedule }
      if (next[day]) {
        delete next[day]
      } else {
        next[day] = [{ start: '08:00', end: '17:00' }]
      }
      return { ...prev, weekly_schedule: next }
    })
  }

  const updateBlock = (day: keyof WeeklySchedule, field: keyof WeeklyScheduleBlock, value: string) => {
    setForm(prev => {
      const blocks = prev.weekly_schedule[day] ?? [{ start: '08:00', end: '17:00' }]
      const updated: WeeklyScheduleBlock[] = [{ ...blocks[0], [field]: value }]
      return { ...prev, weekly_schedule: { ...prev.weekly_schedule, [day]: updated } }
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
        <button onClick={startNew} className="btn-leven btn-leven-filled" style={{ fontSize: '11px', padding: '12px 28px' }}>
          + Nuevo profesional
        </button>
      </div>

      {showForm && (
        <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: 28, marginBottom: 32, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ fontSize: '17px', marginBottom: 20 }}>{editingId ? 'Editar profesional' : 'Nuevo profesional'}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dr. Juan Pérez" />
            </div>
            <div>
              <label style={labelStyle}>Rol</label>
              <select style={inputStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>Espacio / Consultorio</label>
              <select style={inputStyle} value={form.space_id ?? ''} onChange={e => setForm({ ...form, space_id: e.target.value || null })}>
                <option value="">— Sin asignar —</option>
                {spaces.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Estado</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0', color: '#fff', fontSize: '14px' }}>
                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                Activo
              </label>
            </div>
          </div>

          <label style={labelStyle}>Horario semanal</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {DAYS.map(d => {
              const block = form.weekly_schedule[d.key]?.[0]
              return (
                <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, width: 70, fontSize: '13px', color: '#fff' }}>
                    <input type="checkbox" checked={!!block} onChange={() => toggleDay(d.key)} />
                    {d.label}
                  </label>
                  {block && (
                    <>
                      <input type="time" value={block.start} onChange={e => updateBlock(d.key, 'start', e.target.value)}
                        style={{ ...inputStyle, width: 130, padding: '8px 12px' }} />
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>
                      <input type="time" value={block.end} onChange={e => updateBlock(d.key, 'end', e.target.value)}
                        style={{ ...inputStyle, width: 130, padding: '8px 12px' }} />
                    </>
                  )}
                </div>
              )
            })}
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
        {profesionales.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>
            Sin profesionales cargados.
          </div>
        ) : (
          profesionales.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', opacity: p.active ? 1 : 0.4 }}>
              <div>
                <span style={{ fontSize: '15px', color: '#fff', display: 'block' }}>{p.name}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                  {p.role} · {spaces.find(s => s.id === p.space_id)?.name ?? 'sin espacio'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={() => startEdit(p)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Editar
                </button>
                <button onClick={() => toggleActive(p)} style={{ background: 'none', border: 'none', color: p.active ? 'var(--terracotta)' : 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  {p.active ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

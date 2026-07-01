'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  createCircuit, updateCircuit, setCircuitActive,
  type CircuitInput, type CircuitStepInput,
} from '@/actions/admin/circuits'
import type { Circuit, Service } from '@/lib/types/turnero'

const CATEGORIES = ['relax', 'detox', 'energizante', 'especial']

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

function emptyForm(): CircuitInput {
  return { name: '', category: 'relax', total_min: 60, target_audience: null, active: true }
}

export default function CircuitosManager({ initialCircuits, services }: { initialCircuits: Circuit[]; services: Service[] }) {
  const router = useRouter()
  const [circuits, setCircuits] = useState(initialCircuits)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<CircuitInput>(emptyForm())
  const [steps, setSteps] = useState<CircuitStepInput[]>([])
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const startNew = () => {
    setEditingId(null)
    setForm(emptyForm())
    setSteps([])
    setShowForm(true)
  }

  const startEdit = (c: Circuit) => {
    setEditingId(c.id)
    setForm({
      name: c.name,
      category: c.category,
      total_min: c.total_min,
      target_audience: c.target_audience,
      active: c.active,
    })
    setSteps((c.steps ?? []).map(s => ({ service_id: s.service_id, duration_override: s.duration_override })))
    setShowForm(true)
  }

  const addStep = () => {
    if (services.length === 0) return
    setSteps(prev => [...prev, { service_id: services[0].id, duration_override: null }])
  }

  const updateStep = (index: number, patch: Partial<CircuitStepInput>) => {
    setSteps(prev => prev.map((s, i) => i === index ? { ...s, ...patch } : s))
  }

  const removeStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index))
  }

  const moveStep = (index: number, dir: -1 | 1) => {
    setSteps(prev => {
      const target = index + dir
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  const handleSave = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    try {
      if (editingId) {
        await updateCircuit(editingId, form, steps)
      } else {
        await createCircuit(form, steps)
      }
      setShowForm(false)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (c: Circuit) => {
    await setCircuitActive(c.id, !c.active)
    setCircuits(prev => prev.map(x => x.id === c.id ? { ...x, active: !x.active } : x))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
        <button onClick={startNew} className="btn-leven btn-leven-filled" style={{ fontSize: '11px', padding: '12px 28px' }}>
          + Nuevo circuito
        </button>
      </div>

      {showForm && (
        <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: 28, marginBottom: 32, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ fontSize: '17px', marginBottom: 20 }}>{editingId ? 'Editar circuito' : 'Nuevo circuito'}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Circuito relax" />
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
              <label style={labelStyle}>Duración total (min)</label>
              <input type="number" style={inputStyle} value={form.total_min ?? ''} onChange={e => setForm({ ...form, total_min: e.target.value ? Number(e.target.value) : null })} />
            </div>
            <div>
              <label style={labelStyle}>Público objetivo</label>
              <input style={inputStyle} value={form.target_audience ?? ''} onChange={e => setForm({ ...form, target_audience: e.target.value || null })} placeholder="Opcional" />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: '14px' }}>
              <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
              Activo
            </label>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Pasos del circuito</label>
              <button onClick={addStep} style={{ background: 'none', border: 'none', color: 'var(--terracotta)', fontSize: '11px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                + Agregar paso
              </button>
            </div>

            {steps.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Sin pasos.</p>
            ) : (
              steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', width: 18 }}>{i + 1}.</span>
                  <select style={{ ...inputStyle, flex: 2 }} value={s.service_id} onChange={e => updateStep(i, { service_id: e.target.value })}>
                    {services.map(sv => <option key={sv.id} value={sv.id}>{sv.name}</option>)}
                  </select>
                  <input
                    type="number"
                    style={{ ...inputStyle, flex: 1 }}
                    placeholder="Duración (min, opcional)"
                    value={s.duration_override ?? ''}
                    onChange={e => updateStep(i, { duration_override: e.target.value ? Number(e.target.value) : null })}
                  />
                  <button onClick={() => moveStep(i, -1)} disabled={i === 0} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', opacity: i === 0 ? 0.3 : 1 }}>↑</button>
                  <button onClick={() => moveStep(i, 1)} disabled={i === steps.length - 1} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', opacity: i === steps.length - 1 ? 0.3 : 1 }}>↓</button>
                  <button onClick={() => removeStep(i)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>✕</button>
                </div>
              ))
            )}
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
        {circuits.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>
            Sin circuitos cargados.
          </div>
        ) : (
          circuits.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', opacity: c.active ? 1 : 0.4 }}>
              <div>
                <span style={{ fontSize: '15px', color: '#fff', display: 'block' }}>{c.name}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                  {c.category} · {c.total_min ?? '?'} min · {(c.steps ?? []).length} paso{(c.steps ?? []).length !== 1 ? 's' : ''}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={() => startEdit(c)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Editar
                </button>
                <button onClick={() => toggleActive(c)} style={{ background: 'none', border: 'none', color: c.active ? 'var(--terracotta)' : 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  {c.active ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

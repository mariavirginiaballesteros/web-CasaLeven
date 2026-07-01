'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { ReservaWizardState, BookingType } from '@/lib/types/turnero'

const INITIAL: ReservaWizardState = {
  tipo: null,
  categoria: null,
  serviceId: null,
  circuitId: null,
  date: null,
  time: null,
  professionalId: null,
  nombre: '',
  email: '',
  telefono: '',
  notas: '',
}

interface ReservaContextValue {
  state: ReservaWizardState
  setTipo: (t: BookingType, categoria?: 'medico' | null) => void
  setServicio: (id: string) => void
  setCircuito: (id: string) => void
  setFechaHora: (date: string, time: string) => void
  setProfesional: (id: string | null) => void
  setDatosCliente: (nombre: string, email: string, telefono: string, notas?: string) => void
  reset: () => void
}

const ReservaContext = createContext<ReservaContextValue | null>(null)

export function ReservaProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ReservaWizardState>(INITIAL)

  const setTipo = (tipo: BookingType, categoria: 'medico' | null = null) =>
    setState(s => ({ ...s, tipo, categoria, serviceId: null, circuitId: null }))

  const setServicio = (serviceId: string) =>
    setState(s => ({ ...s, serviceId, circuitId: null }))

  const setCircuito = (circuitId: string) =>
    setState(s => ({ ...s, circuitId, serviceId: null }))

  const setFechaHora = (date: string, time: string) =>
    setState(s => ({ ...s, date, time }))

  const setProfesional = (professionalId: string | null) =>
    setState(s => ({ ...s, professionalId }))

  const setDatosCliente = (nombre: string, email: string, telefono: string, notas = '') =>
    setState(s => ({ ...s, nombre, email, telefono, notas }))

  const reset = () => setState(INITIAL)

  return (
    <ReservaContext.Provider value={{
      state, setTipo, setServicio, setCircuito,
      setFechaHora, setProfesional, setDatosCliente, reset,
    }}>
      {children}
    </ReservaContext.Provider>
  )
}

export function useReserva() {
  const ctx = useContext(ReservaContext)
  if (!ctx) throw new Error('useReserva must be used within ReservaProvider')
  return ctx
}

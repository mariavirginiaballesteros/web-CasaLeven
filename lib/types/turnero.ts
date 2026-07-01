export type BookingType = 'service' | 'circuit' | 'gym'
export type BookingStatus = 'pendiente' | 'confirmado' | 'cancelado' | 'completado'
export type PagoEstado = 'pendiente' | 'pagado' | 'reembolsado'

export interface Space {
  id: string
  name: string
  capacity: number
  is_shared: boolean
  active: boolean
}

export interface WeeklyScheduleBlock {
  start: string // "HH:MM"
  end: string   // "HH:MM"
}

export type WeeklySchedule = Partial<Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', WeeklyScheduleBlock[]>>

export interface Professional {
  id: string
  name: string
  role: string
  active: boolean
  space_id: string | null
  weekly_schedule: WeeklySchedule
}

export interface Service {
  id: string
  name: string
  category: string | null
  duration_min: number
  space_id: string | null
  requires_role: string | null
  requires_couple: boolean
  is_common: boolean
  active: boolean
}

export interface Circuit {
  id: string
  name: string
  category: string | null
  total_min: number | null
  target_audience: string | null
  active: boolean
  steps?: CircuitStep[]
}

export interface CircuitStep {
  id: string
  circuit_id: string
  step_order: number
  service_id: string
  duration_override: number | null
  service?: Service
}

export interface Booking {
  id: string
  tenant_id: string
  member_id: string | null
  booking_type: BookingType
  service_id: string | null
  circuit_id: string | null
  date: string
  start_time: string
  end_time: string
  status: BookingStatus
  pago_estado: PagoEstado
  pago_referencia: string | null
  cliente_nombre: string
  cliente_email: string
  cliente_telefono: string
  notas: string | null
  crm_id: string | null
  crm_sync_at: string | null
  created_at: string
  updated_at: string
  service?: Service
  circuit?: Circuit
  professional?: Professional
}

export interface BookingSlot {
  id: string
  booking_id: string
  space_id: string
  professional_id: string | null
  start_time: string
  end_time: string
  step_order: number | null
}

export interface TimeSlot {
  time: string       // "09:00"
  available: boolean
  label: string      // "9:00 AM"
}

// Wizard state
export interface ReservaWizardState {
  tipo: BookingType | null
  categoria: 'medico' | null
  serviceId: string | null
  circuitId: string | null
  date: string | null       // "YYYY-MM-DD"
  time: string | null       // "HH:MM"
  professionalId: string | null
  // datos cliente
  nombre: string
  email: string
  telefono: string
  notas: string
}

export interface CreateBookingPayload {
  tipo: BookingType
  serviceId?: string
  circuitId?: string
  date: string
  time: string
  professionalId?: string
  nombre: string
  email: string
  telefono: string
  notas?: string
}

// Vocabulario del CRM. Un solo lugar donde viven los literales.

export type UnitId = 'motion' | 'therma' | 'nourish'
export type Rol = 'owner' | 'gerente' | 'recepcion'
export type TipoCredencial = 'manual' | 'qr' | 'nfc'

export type EtapaPipeline =
  | 'nuevo' | 'contactado' | 'visita' | 'prueba' | 'propuesta' | 'ganado' | 'perdido'

export const ETAPAS: { id: EtapaPipeline; label: string }[] = [
  { id: 'nuevo',     label: 'Nuevo' },
  { id: 'contactado',label: 'Contactado' },
  { id: 'visita',    label: 'Visita agendada' },
  { id: 'prueba',    label: 'Clase de prueba' },
  { id: 'propuesta', label: 'Propuesta' },
  { id: 'ganado',    label: 'Ganado' },
  { id: 'perdido',   label: 'Perdido' },
]

export const UNIDADES: { id: UnitId; nombre: string; color: string }[] = [
  { id: 'motion',  nombre: 'Motion',  color: 'terracotta' },
  { id: 'therma',  nombre: 'Therma',  color: 'blue' },
  { id: 'nourish', nombre: 'Nourish', color: 'sage' },
]

export interface Sesion {
  uid: string
  nombre: string
  rol: Rol
  /** null = alcance global (solo owner). */
  unit: UnitId | null
  exp: number
}

export interface Habilitacion {
  ok: boolean
  motivo: string
  membresia_id?: string
  consume_cupo?: boolean
  restantes?: number | null
}

export interface FilaPresencia {
  id: string
  persona_id: string
  nombre: string
  unit_id: UnitId
  actividad_id: string
  actividad: string
  aforo: number | null
  ingreso_at: string
  credencial: TipoCredencial
  minutos_dentro: number
}

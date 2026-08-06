/**
 * FUENTE ÚNICA DE VERDAD — Casa Leven
 * ------------------------------------------------------------------
 * Todo lo que sea precio, plan, circuito o campaña se edita ACÁ.
 * Las páginas leen de este archivo: no hay precios hardcodeados en JSX.
 *
 * Precios de Motion actualizados: 04/08/2026 (Sheet Leven_Motion_Membresías).
 * Precios de Therma: PENDIENTES de definición.
 */

/* ─── SITIO ──────────────────────────────────────────────────────── */

export const SITE = {
  url: 'https://casaleven.com',
  name: 'Casa Leven',
  legal: 'Proyecto Vida S.A.',
  tagline: 'Método integral de bienestar',
  telefono: '+54 9 341 500-0000',
  whatsapp: '5493415000000',
  instagram: 'https://instagram.com/casaleven',
  direccion: {
    calle: 'Radisson RED Funes',
    ciudad: 'Funes',
    provincia: 'Santa Fe',
    cp: 'S2132',
    pais: 'AR',
    lat: -32.9167,
    lng: -60.8167,
  },
  horarios: 'Lu a Vi 07:00–22:00 · Sá 09:00–19:00 · Do 09:00–15:00',
} as const

/* ─── HELPERS ────────────────────────────────────────────────────── */

export const ars = (n: number) =>
  '$' + Math.round(n).toLocaleString('es-AR', { maximumFractionDigits: 0 })

/** Convierte un total (trimestral o anual) a su equivalente mensual. */
export const porMes = (total: number, meses: number) => total / meses

/* ─── CAMPAÑA FUNDADORES ─────────────────────────────────────────
 * ⚠️  PARA DAR DE BAJA LA CAMPAÑA: poner activa = false.
 *     Eso saca el link del nav, del footer, el bloque de /motion, la fila
 *     de precio Fundador de /membresias, la entrada del sitemap, y hace
 *     que /fundadores redirija al home. No hay que tocar nada más.
 *     Cuando ya no se use nunca más, se puede borrar app/fundadores/.
 * ──────────────────────────────────────────────────────────────── */

export const CAMPANA_FUNDADORES = {
  activa: true,
  cupo: 100,
  permanenciaMinimaMeses: 3,
  /** La condición de Fundador se accede a través del plan anual. */
  soloAnual: true,
  /**
   * Descuento comunicado sobre el precio de lista anual.
   * Los valores Fundador se fijaron con el MENSUAL redondo (145.000, 190.000,
   * 260.000, 275.000, 325.000) y el anual se deriva multiplicando por 12.
   * Eso da entre 12% y 16% según el plan, por eso se comunica "hasta 15%"
   * y no un porcentaje exacto por plan.
   *
   * ⚠️ Lo vitalicio es EL DESCUENTO, no el precio. El valor de lista puede
   * actualizarse; el Fundador conserva siempre su porcentaje de beneficio
   * sobre el precio vigente. No decir "precio congelado".
   */
  descuento: 'hasta 15%',
  beneficios: [
    {
      titulo: 'Tu descuento Fundador, de por vida',
      body: 'El beneficio de Fundador te acompaña año tras año, mientras tu membresía siga activa. Entrás una vez y lo conservás siempre.',
    },
    {
      titulo: 'Eventos VIP',
      body: 'Acceso prioritario a las activaciones y encuentros que hacemos para la comunidad de la casa.',
    },
    {
      titulo: 'Beneficios en toda la casa',
      body: 'Condiciones preferenciales en Leven Therma y Leven Nourish, además de tu membresía.',
    },
  ],
} as const

/* ─── MEMBRESÍAS LEVEN MOTION ────────────────────────────────────
 * Precios en pesos argentinos.
 *   · mensual    → valor de UN mes
 *   · trimestral → TOTAL de los 3 meses
 *   · anual      → TOTAL de los 12 meses
 * El "valor mensual equivalente" se calcula con porMes(), no se carga a mano.
 * ──────────────────────────────────────────────────────────────── */

export type Servicio = { label: string; ok: boolean }

export type Precios = {
  mensual: number
  trimestral: number
  anual: number
}

export type Plan = {
  id: string
  name: string
  tagline: string
  featured?: boolean
  resumen: string // para JSON-LD y para motores de IA
  precios: Precios
  /**
   * Precio Fundador. Es SOLO anual: la condición de Socio Fundador se accede
   * a través del plan de 12 meses.
   * Se carga como TOTAL de los 12 meses, pero el número que manda es el
   * equivalente mensual redondo: este total es siempre ese mensual × 12.
   */
  fundadorAnual: number
  services: Servicio[]
}

const s = (label: string, ok: boolean): Servicio => ({ label, ok })

/** Servicios comunes a todos los planes. */
const BASE: Servicio[] = [
  s('Acceso al gym ilimitado', true),
  s('Vestuarios + duchas', true),
  s('Apto médico', true),
  s('Comunidad Leven', true),
]

/**
 * Orden de las filas de servicios. Es el mismo en los 5 planes para que la
 * tabla comparativa de /membresias pueda alinearlas por índice.
 */
const extras = (
  circuito: boolean,
  nutricion: boolean,
  posta: boolean,
): Servicio[] => [
  s('Circuito hídrico: sauna seco, ducha escocesa, baño de vapor y jacuzzi (4/mes)', circuito),
  s('Consulta nutricional (1/mes)', nutricion),
  s('Plan de alimentación personalizado', nutricion),
  s('Posta deportiva personalizada de 1 hora (4/mes)', posta),
]

export const PLANES: Plan[] = [
  {
    id: 'starter',
    name: 'STARTER',
    tagline: 'El primer paso.',
    resumen:
      'Acceso ilimitado al gimnasio Leven Motion, vestuarios, apto médico y comunidad Leven.',
    precios: { mensual: 200_000, trimestral: 555_556, anual: 2_000_000 },
    fundadorAnual: 1_740_000, // 145.000/mes × 12
    services: [...BASE, ...extras(false, false, false)],
  },
  {
    id: 'performance',
    name: 'PERFORMANCE',
    tagline: 'Movimiento + recuperación.',
    resumen:
      'Gimnasio ilimitado más el circuito hídrico de Leven Therma: sauna seco, ducha escocesa, baño de vapor y jacuzzi, 4 accesos por mes.',
    precios: { mensual: 260_000, trimestral: 722_222, anual: 2_600_000 },
    fundadorAnual: 2_280_000, // 190.000/mes × 12
    services: [...BASE, ...extras(true, false, false)],
  },
  {
    id: 'flow',
    name: 'FLOW',
    tagline: 'Movimiento + recuperación + nutrición.',
    featured: true,
    resumen:
      'El sistema completo de bienestar: gimnasio ilimitado, circuito hídrico 4 veces por mes, consulta nutricional mensual y plan de alimentación personalizado.',
    precios: { mensual: 370_000, trimestral: 1_027_778, anual: 3_700_000 },
    fundadorAnual: 3_120_000, // 260.000/mes × 12
    services: [...BASE, ...extras(true, true, false)],
  },
  {
    id: 'sport',
    name: 'SPORT',
    tagline: 'Rendimiento deportivo.',
    resumen:
      'Para quien entrena con objetivo deportivo: gimnasio ilimitado, circuito hídrico 4 veces por mes y posta deportiva personalizada 4 veces por mes.',
    precios: { mensual: 380_000, trimestral: 1_055_556, anual: 3_800_000 },
    fundadorAnual: 3_300_000, // 275.000/mes × 12
    services: [...BASE, ...extras(true, false, true)],
  },
  {
    id: 'power-sport',
    name: 'POWER SPORT',
    tagline: 'Todo, sin recortes.',
    resumen:
      'El plan completo: gimnasio ilimitado, circuito hídrico completo, consulta nutricional, plan de alimentación personalizado y posta deportiva personalizada.',
    precios: { mensual: 450_000, trimestral: 1_250_000, anual: 4_500_000 },
    fundadorAnual: 3_900_000, // 325.000/mes × 12
    services: [...BASE, ...extras(true, true, true)],
  },
]

export const LETRA_CHICA_MOTION =
  'Precios en pesos argentinos, vigentes al 04/08/2026. Los valores trimestral y anual se muestran como equivalente mensual; se abonan por adelantado. Los 4 accesos mensuales al circuito hídrico no son acumulables ni transferibles. Permanencia mínima: 3 meses.'

/* ─── CIRCUITOS LEVEN THERMA (day pass) ──────────────────────────
 * ⚠️ PRECIOS PENDIENTES DE DEFINICIÓN (04/08/2026).
 *
 * Los valores de `precioUSD` vienen del resumen de reunión, pero falta
 * confirmar moneda y cifras finales. Hasta entonces la web muestra
 * "A confirmar" y los datos estructurados no declaran ningún precio.
 *
 * PARA PUBLICARLOS: revisar números y moneda acá abajo y poner
 * THERMA_PRECIOS_PUBLICADOS = true. Se actualizan de una sola vez la
 * página de Therma, /membresias, el schema.org, las FAQ y /llms.txt.
 * ──────────────────────────────────────────────────────────────── */

export const THERMA_PRECIOS_PUBLICADOS = false
export const THERMA_MONEDA: 'ARS' | 'USD' = 'USD' // ← confirmar

export type Circuito = {
  id: string
  name: string
  tagline: string
  duracion: string
  minutos: number
  precioUSD: number
  proximamente?: boolean
  nota?: string
  includes: string[]
}

export const CIRCUITOS: Circuito[] = [
  {
    id: 'reset',
    name: 'RESET',
    tagline: 'Entrada al equilibrio',
    duracion: '60 min',
    minutos: 60,
    precioUSD: 100,
    includes: [
      'Circuito hídrico: sauna seco, ducha escocesa y baño de vapor',
      'Sala de relax',
      'Pileta climatizada',
      'Colación',
    ],
  },
  {
    id: 'restore',
    name: 'RESTORE',
    tagline: 'Cuerpo y profundidad',
    duracion: '90 min',
    minutos: 90,
    precioUSD: 180,
    includes: [
      'Circuito hídrico completo',
      'Exfoliación corporal',
      'Nutrición corporal',
      'Sala de relax',
      'Pileta climatizada',
    ],
  },
  {
    id: 'deep',
    name: 'DEEP',
    tagline: 'La experiencia completa',
    duracion: '150 min',
    minutos: 150,
    precioUSD: 280,
    includes: [
      'Circuito hídrico completo',
      'Exfoliación corporal',
      'Masaje 30 min',
      'Nutrición corporal',
      'Sala de relax',
      'Pileta climatizada',
      'Merienda',
    ],
  },
  {
    id: 'leven-ritual',
    name: 'LEVEN RITUAL',
    tagline: 'El día completo',
    duracion: '290 min',
    minutos: 290,
    precioUSD: 300,
    proximamente: true,
    nota: 'Disponible desde septiembre',
    includes: [
      'Gym 60 min',
      'Sauna + ducha escocesa',
      'Almuerzo saludable',
      'Piscina Kneipp',
      'Masajes completos',
      'Limpieza facial',
    ],
  },
]

export const LETRA_CHICA_THERMA = THERMA_PRECIOS_PUBLICADOS
  ? 'Los circuitos se reservan con turno previo. Consultá disponibilidad por WhatsApp o desde la sección de reservas.'
  : 'Los valores de los circuitos se confirman al momento de la reserva. Los circuitos se reservan con turno previo.'

/** Texto que se muestra donde iría el precio de un circuito. */
export const precioCircuito = (c: Circuito) =>
  THERMA_PRECIOS_PUBLICADOS
    ? THERMA_MONEDA === 'USD'
      ? `USD ${c.precioUSD}`
      : ars(c.precioUSD)
    : 'A confirmar'

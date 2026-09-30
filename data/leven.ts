/**
 * FUENTE ÚNICA DE VERDAD — Casa Leven
 * ------------------------------------------------------------------
 * Todo lo que sea precio, plan, circuito o campaña se edita ACÁ.
 * Las páginas leen de este archivo: no hay precios hardcodeados en JSX.
 *
 * Precios de Motion actualizados: 10/08/2026 (Opción 2).
 * Precios de Therma: PENDIENTES de definición.
 */

/* ─── SITIO ──────────────────────────────────────────────────────── */

export const SITE = {
  url: 'https://casaleven.com',
  name: 'Casa Leven',
  legal: 'Proyecto Vida S.A.',
  tagline: 'Método integral de bienestar',
  telefono: '+54 341 662-0055',
  whatsapp: '543416620055',
  instagram: 'https://instagram.com/casaleven',
  /**
   * Dirección real del Radisson RED Funes (fuente: Google Maps + nota de
   * inauguración del hotel). `calle` es lo que se imprime en la web;
   * `edificio` es la referencia que todos reconocen; `referencias` son las
   * distancias que se muestran en "Cómo llegar".
   * ⚠️ Validar el texto exacto con recepción del hotel antes de publicar.
   */
  direccion: {
    calle: 'Colectora 2 de Abril 3501',
    edificio: 'Radisson RED Funes',
    ruta: 'Autopista Rosario–Córdoba, km 307,5',
    ciudad: 'Funes',
    provincia: 'Santa Fe',
    cp: 'S2132',
    pais: 'AR',
    lat: -32.9366,
    lng: -60.8308,
    mapsUrl: 'https://maps.app.goo.gl/jye7PA8gcgD8PJZRA',
    /** Embed de Google Maps por búsqueda de nombre: no necesita API key. */
    mapsEmbed: 'https://www.google.com/maps?q=Radisson+RED+Funes&output=embed&z=14',
    referencias: [
      { desde: 'Centro de Rosario', como: 'Autopista Rosario–Córdoba, salida Funes', tiempo: '20 min' },
      { desde: 'Aeropuerto de Fisherton', como: 'Por autopista', tiempo: '10 min' },
    ],
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
   * ⚠️ El descuento Fundador se comunica SIN porcentaje ni cifra: la web
   * habla de "un descuento de por vida", nunca de "X% de descuento".
   * Los precios tachados ya muestran el beneficio.
   * Los valores Fundador se fijan con el MENSUAL redondo (125.000, 150.000,
   * 230.000, 235.000, 265.000) y el anual se deriva multiplicando por 12.
   *
   * ⚠️ Lo vitalicio es EL DESCUENTO, no el precio. El valor de lista puede
   * actualizarse; el Fundador conserva siempre su condición preferencial
   * sobre el precio vigente. No decir "precio congelado".
   */
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

/* ─── CAMPAÑA ACTIVÁ EL VERANO ───────────────────────────────────
 * Campaña de octubre 2026. Es PRIVADA: el precio ($120.000 / $132.000)
 * viaja solo por WhatsApp a quienes ya consultaron. La web NUNCA lo
 * publica: muestra la campaña y la clase de cortesía, nada más.
 *
 * ⚠️  PARA DAR DE BAJA: poner activa = false. Eso saca la slide del hero
 *     del home, la banda bajo el marquee y el bloque de /motion. No hay
 *     que tocar nada más. Las fechas de abajo son solo el texto que se
 *     muestra: el único interruptor es `activa`, igual que en Fundadores.
 * ──────────────────────────────────────────────────────────────── */

export const CAMPANA_VERANO = {
  activa: true,
  nombre: 'Activá el Verano',
  /** Textos cerrados: son los de las piezas gráficas, no se reescriben. */
  hook: '¿Ya empezaste a moverte para el verano?',
  titular: 'Empezá antes de que arranque el verano.',
  titularMotion: 'El verano no espera a diciembre.',
  bajada: 'Empezá a moverte ahora, con un método que se adapta a tu cuerpo.',
  cta: 'Agendá tu clase de cortesía',
  whatsappTexto: 'Hola! Vi Activá el Verano y quiero agendar mi clase de cortesía',
  /** Reemplaza a la fecha en todas las piezas de la web. */
  condicion: 'Consultá por esta promoción especial, por única vez',
  img: {
    hero: '/images/campanas/verano/verano-hero-gym-v2.jpg',
    motion: '/images/campanas/verano/verano-motion.jpg',
    banda: '/images/campanas/verano/verano-banda.jpg',
    sello: '/images/campanas/verano/verano-sello.jpg',
  },
} as const

/* ─── CLASE DE CORTESÍA ──────────────────────────────────────────
 * La clase de prueba del gimnasio ahora se reserva sola: el turnero vive en
 * el CRM (SignaCRM) y la reserva cae directo en el pipeline de prospectos,
 * con mail automático de confirmación que incluye día, hora y dirección.
 * Antes el único camino era WhatsApp, donde alguien tenía que contestar a mano.
 *
 * Es de 2 horas, con un arranque por hora de 8 a 22, todos los días. Una sola
 * por documento: el CRM rechaza el segundo intento con el mismo DNI y también
 * a quien ya es socio.
 *
 * ⚠️  NO depende de ninguna campaña: vive por su cuenta con `activa`, para que
 *     al dar de baja "Activá el Verano" no desaparezca el único camino de
 *     entrada al gimnasio.
 * ──────────────────────────────────────────────────────────────── */

export const CLASE_CORTESIA = {
  activa: true,
  /** Turnero del CRM con el servicio ya elegido: entra directo a la fecha. */
  url: 'https://signacrm.com.ar/casa_leven/turnos?servicio=clase-cortesia',
  cta: 'Reservá tu clase de cortesía',
  titular: 'Probá el gimnasio antes de decidir.',
  bajada:
    'Una clase de cortesía de dos horas, sin cargo y sin compromiso. Elegís el día y el horario, y te llega la confirmación por mail.',
  /** Lo que se aclara al lado del botón, para que nadie llegue con dudas. */
  letraChica: 'De 8 a 22, todos los días. Una por persona.',
} as const

/* ─── LÍNEA ESTÉTICA (Leven Therma) ──────────────────────────────
 * Dos ángulos con públicos distintos y UN solo camino de entrada: la
 * consulta sin cargo con un profesional. Sin precios: los tratamientos se
 * arman a medida en la consulta.
 *
 * Textos cerrados por el Brief de Diseño Estética (Jengibre Co., 09/2026).
 * Reglas de Meta que también valen acá: nada de antes/después, nada de
 * "eliminá" ni promesas de resultado, no hablarle al cuerpo del lector.
 * ──────────────────────────────────────────────────────────────── */

export type AnguloEstetica = {
  id: string
  overline: string
  titular: string
  sub: string
  pasos: { titulo: string; body: string }[]
  whatsappTexto: string
  img: string
  imgAlt: string
}

export const LINEA_ESTETICA: AnguloEstetica[] = [
  {
    id: 'estetica-corporal',
    overline: 'ESTÉTICA CORPORAL',
    titular: 'Estética corporal con aparatología, a 20 minutos de Rosario.',
    sub: 'Radiofrecuencia con vacum · Presoterapia · Termoterapia y ozono',
    pasos: [
      { titulo: 'Circuito de aguas', body: 'Hidroterapia, sauna y calor para activar la circulación.' },
      { titulo: 'Aparatología', body: 'Radiofrecuencia con vacum · Presoterapia · Termoterapia y ozono.' },
      { titulo: 'Cierre nutritivo', body: 'Una merienda pensada para acompañar el tratamiento.' },
    ],
    whatsappTexto: 'Hola! Quiero agendar una consulta sin cargo por los tratamientos estéticos',
    img: '/images/estetica/estetica-corporal.jpg',
    imgAlt: 'Línea estética de Casa Leven: mujer en camilla de spa, en calma',
  },
  {
    id: 'recuperacion-deportiva',
    overline: 'RECUPERACIÓN DEPORTIVA',
    titular: 'Entrenás fuerte. Recuperate mejor.',
    sub: 'Circuito de recuperación deportiva · 4 horas',
    pasos: [
      { titulo: 'Calor', body: 'Sauna para preparar la musculatura.' },
      { titulo: 'Contraste', body: 'Ducha escocesa: frío y calor alternados.' },
      { titulo: 'Agua y tecnología', body: 'Hidroterapia + pulsos magnéticos de alta potencia.' },
    ],
    whatsappTexto: 'Hola! Quiero agendar una consulta sin cargo por el circuito de recuperación deportiva',
    img: '/images/estetica/recuperacion-deportiva.jpg',
    imgAlt: 'Recuperación deportiva en Casa Leven: persona en sauna, en actitud de recuperación',
  },
]

export const ESTETICA_CTA = 'Consulta sin cargo'
export const ESTETICA_NOTA =
  'Los tratamientos se arman a medida, por eso el primer paso es la consulta: es sin cargo y no te compromete a nada. Te recibe un profesional, evalúa qué buscás y arma un plan para vos.'

/** Faciales nuevos de la línea estética. Se suman a los tres faciales clásicos de Therma. */
export const FACIALES_ESTETICA = [
  {
    name: 'Microneedling con Dermapen',
    desc: 'Higiene, punta de diamante o peeling químico, dos pasadas con activo específico y protector solar',
    duration: 'Con turno previo',
  },
  {
    name: 'Limpieza facial profunda',
    desc: 'Higiene, punta de diamante o espátula ultrasónica, extracción, máscara descongestiva y correctiva',
    duration: '80 min',
  },
]

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
    precios: { mensual: 170_000, trimestral: 473_333, anual: 1_704_000 },
    fundadorAnual: 1_500_000, // 125.000/mes × 12
    services: [...BASE, ...extras(false, false, false)],
  },
  {
    id: 'performance',
    name: 'PERFORMANCE',
    tagline: 'Movimiento + recuperación.',
    resumen:
      'Gimnasio ilimitado más el circuito hídrico de Leven Therma: sauna seco, ducha escocesa, baño de vapor y jacuzzi, 4 accesos por mes.',
    precios: { mensual: 205_000, trimestral: 570_000, anual: 2_052_000 },
    fundadorAnual: 1_800_000, // 150.000/mes × 12
    services: [...BASE, ...extras(true, false, false)],
  },
  {
    id: 'flow',
    name: 'FLOW',
    tagline: 'Movimiento + recuperación + nutrición.',
    featured: true,
    resumen:
      'El sistema completo de bienestar: gimnasio ilimitado, circuito hídrico 4 veces por mes, consulta nutricional mensual y plan de alimentación personalizado.',
    precios: { mensual: 310_000, trimestral: 860_000, anual: 3_096_000 },
    fundadorAnual: 2_760_000, // 230.000/mes × 12
    services: [...BASE, ...extras(true, true, false)],
  },
  {
    id: 'sport',
    name: 'SPORT',
    tagline: 'Rendimiento deportivo.',
    resumen:
      'Para quien entrena con objetivo deportivo: gimnasio ilimitado, circuito hídrico 4 veces por mes y posta deportiva personalizada 4 veces por mes.',
    precios: { mensual: 320_000, trimestral: 890_000, anual: 3_204_000 },
    fundadorAnual: 2_820_000, // 235.000/mes × 12
    services: [...BASE, ...extras(true, false, true)],
  },
  {
    id: 'power-sport',
    name: 'POWER SPORT',
    tagline: 'Todo, sin recortes.',
    resumen:
      'El plan completo: gimnasio ilimitado, circuito hídrico completo, consulta nutricional, plan de alimentación personalizado y posta deportiva personalizada.',
    precios: { mensual: 360_000, trimestral: 1_000_000, anual: 3_600_000 },
    fundadorAnual: 3_180_000, // 265.000/mes × 12
    services: [...BASE, ...extras(true, true, true)],
  },
]

export const LETRA_CHICA_MOTION =
  'Precios en pesos argentinos, vigentes al 10/08/2026. Los valores trimestral y anual se muestran como equivalente mensual; se abonan por adelantado. Los 4 accesos mensuales al circuito hídrico no son acumulables ni transferibles. Permanencia mínima: 3 meses.'

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

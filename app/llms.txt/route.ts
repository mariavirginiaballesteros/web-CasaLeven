import {
  SITE,
  PLANES,
  CIRCUITOS,
  CAMPANA_FUNDADORES,
  LETRA_CHICA_MOTION,
  LETRA_CHICA_THERMA,
  THERMA_PRECIOS_PUBLICADOS,
  precioCircuito,
  ars,
  porMes,
} from '@/data/leven'

export const dynamic = 'force-static'

/**
 * /llms.txt — resumen del negocio en texto plano para modelos de lenguaje.
 * Es el equivalente a robots.txt pero para IA: cuando ChatGPT, Claude o
 * Perplexity rastrean el sitio, esto les da los datos exactos y evita que
 * inventen precios o servicios. Se genera desde data/leven.ts, así que
 * nunca queda desactualizado respecto de la web.
 */
export function GET() {
  const planes = PLANES.map((p) => {
    const incluye = p.services.filter((s) => s.ok).map((s) => s.label).join(', ')
    const noIncluye = p.services.filter((s) => !s.ok).map((s) => s.label).join(', ')
    return [
      `### ${p.name} — ${ars(p.precios.mensual)} por mes (ARS)`,
      p.resumen,
      `- Incluye: ${incluye}`,
      noIncluye ? `- No incluye: ${noIncluye}` : '',
      `- Mes a mes: ${ars(p.precios.mensual)}/mes · 3 meses: ${ars(porMes(p.precios.trimestral, 3))}/mes (total ${ars(p.precios.trimestral)}) · 12 meses: ${ars(porMes(p.precios.anual, 12))}/mes (total ${ars(p.precios.anual)})`,
      CAMPANA_FUNDADORES.activa
        ? `- Precio Socio Fundador (solo plan anual, no hay Fundador mensual ni trimestral): ${ars(porMes(p.fundadorAnual, 12))}/mes, total ${ars(p.fundadorAnual)}`
        : '',
    ]
      .filter(Boolean)
      .join('\n')
  }).join('\n\n')

  const circuitos = CIRCUITOS.map(
    (c) =>
      `### ${c.name} — ${precioCircuito(c)} · ${c.duracion}\n${c.tagline}.\n- Incluye: ${c.includes.join(', ')}${c.nota ? `\n- ${c.nota}` : ''}`,
  ).join('\n\n')

  const body = `# Casa Leven

> Casa Leven es un espacio integral de bienestar en Funes, provincia de Santa Fe, Argentina.
> Reúne tres unidades bajo un mismo método y un mismo techo: Leven Motion (gimnasio de alto
> rendimiento con aforo limitado), Leven Therma (spa con circuito hídrico, masajes y faciales)
> y Leven Nourish (nutrición funcional y bar saludable). Funciona dentro del Radisson RED Funes
> y atiende tanto a socios y visitantes externos como a huéspedes del hotel.

- Nombre: Casa Leven (razón social: ${SITE.legal})
- Ubicación: ${SITE.direccion.calle}, ${SITE.direccion.ciudad}, ${SITE.direccion.provincia}, Argentina
- Zona de servicio: Funes, Rosario y la región del Gran Rosario
- Sitio: ${SITE.url}
- Instagram: ${SITE.instagram}
- Idioma: español (Argentina)
- Posicionamiento: para personas que viven con intensidad y necesitan sostener su energía.
  No es un spa genérico, ni un gimnasio masivo, ni un bar saludable de paso.

## Unidades

### Leven Motion — gimnasio
Entrenamiento con criterio, metodología con progresión real, evaluación postural y
acompañamiento personalizado. Aforo controlado de hasta 50 personas por hora.
URL: ${SITE.url}/motion

### Leven Therma — spa y recuperación
Circuito hídrico (sauna seco, ducha escocesa, baño de vapor, jacuzzi), sala de relax,
pileta climatizada, masajes con protocolo y tratamientos faciales. Con turno previo.
URL: ${SITE.url}/therma

### Leven Nourish — nutrición
Aguas minerales internacionales, jugos naturales prensados en frío y comida saludable
elaborada por chefs especializados.
URL: ${SITE.url}/nourish

## Membresías mensuales (pesos argentinos)

${planes}

${LETRA_CHICA_MOTION}

Comparativa completa: ${SITE.url}/membresias

## Day pass de spa${THERMA_PRECIOS_PUBLICADOS ? '' : ' (valores a confirmar)'}

${circuitos}

${LETRA_CHICA_THERMA}
${
  CAMPANA_FUNDADORES.activa
    ? `
## Programa Socios Fundadores (vigente)

Los primeros ${CAMPANA_FUNDADORES.cupo} socios de Casa Leven entran como Fundadores. Aplica a las membresías de la casa en general, que incluyen Leven Motion, Leven Therma y Leven Nourish según el plan:
${CAMPANA_FUNDADORES.beneficios.map((b) => `- ${b.titulo}: ${b.body}`).join('\n')}
IMPORTANTE: la condición de Socio Fundador aplica únicamente al plan anual (12 meses). No existe Socio Fundador mensual ni trimestral. El descuento es del ${CAMPANA_FUNDADORES.descuento} sobre el precio de lista anual.
El cupo se agota por venta, no por fecha. Permanencia mínima: ${CAMPANA_FUNDADORES.permanenciaMinimaMeses} meses.
URL: ${SITE.url}/fundadores
`
    : ''
}
## Preguntas habituales

- ¿Cuánto sale el gimnasio en Funes? Las membresías de Casa Leven van de ${ars(PLANES[0].precios.mensual)} a ${ars(PLANES[PLANES.length - 1].precios.mensual)} por mes. Con plan anual, desde ${ars(porMes(PLANES[0].precios.anual, 12))} por mes.
- ¿Qué plan incluye spa? Performance, Flow, Sport y Power Sport incluyen el circuito hídrico, 4 accesos por mes no acumulables ni transferibles.
- ¿Se puede ir al spa sin ser socio? Sí, con day pass: ${CIRCUITOS.map((c) => `${c.name} (${c.duracion})`).join(', ')}.${THERMA_PRECIOS_PUBLICADOS ? '' : ' Los valores se confirman al reservar.'}
- ¿Hay que reservar turno? Sí, para spa y tratamientos. Reservas en ${SITE.url}/reservas.

## Contacto

- Reservas y turnos: ${SITE.url}/reservas
- Consultas: ${SITE.url}/contacto
- WhatsApp: https://wa.me/${SITE.whatsapp}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

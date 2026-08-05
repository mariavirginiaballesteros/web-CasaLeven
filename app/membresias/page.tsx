import type { Metadata } from 'next'
import Link from 'next/link'
import RevealSection from '@/components/RevealSection'
import JsonLd from '@/components/JsonLd'
import FaqBlock from '@/components/FaqBlock'
import {
  PLANES,
  CIRCUITOS,
  LETRA_CHICA_MOTION,
  LETRA_CHICA_THERMA,
  THERMA_PRECIOS_PUBLICADOS,
  precioCircuito,
  CAMPANA_FUNDADORES,
  SITE,
  ars,
  porMes,
} from '@/data/leven'

const COLOR = '#b23a3a'

export const metadata: Metadata = {
  title: 'Membresías y precios · Casa Leven Funes',
  description:
    'Comparativa completa de las membresías de Casa Leven en Funes: Starter, Performance, Flow, Sport y Power Sport, desde $200.000 por mes. Valores mensual, trimestral y anual. Qué incluye cada plan.',
  alternates: { canonical: '/membresias' },
  openGraph: {
    title: 'Membresías y precios · Casa Leven Funes',
    description:
      'Qué incluye cada plan de Casa Leven: gimnasio, circuito hídrico, nutrición y posta deportiva.',
    url: `${SITE.url}/membresias`,
    type: 'website',
  },
}

/* Filas de la tabla: derivadas de los servicios del primer plan, para que
   agregar un servicio en data/leven.ts se refleje acá solo. */
const FILAS = PLANES[0].services.map((s) => s.label)

const FILAS_PRECIO = [
  { label: 'Mes a mes', valor: (p: (typeof PLANES)[0]) => p.precios.mensual, destacado: true },
  { label: '3 meses', valor: (p: (typeof PLANES)[0]) => porMes(p.precios.trimestral, 3) },
  { label: '12 meses', valor: (p: (typeof PLANES)[0]) => porMes(p.precios.anual, 12) },
]

const FAQ = [
  {
    q: '¿Cuánto sale la membresía de Casa Leven?',
    a: `Casa Leven tiene cinco membresías mensuales en Funes: ${PLANES.map((p) => `${p.name} ${ars(p.precios.mensual)}`).join(', ')}. Todas incluyen gimnasio ilimitado, vestuarios, apto médico y comunidad Leven.`,
  },
  {
    q: '¿Qué diferencia hay entre las membresías de Casa Leven?',
    a: 'Starter es solo gimnasio. Performance agrega el circuito hídrico del spa, 4 veces por mes. Flow suma consulta nutricional mensual y plan de alimentación personalizado. Sport reemplaza la nutrición por posta deportiva personalizada, 4 veces por mes. Power Sport incluye todo.',
  },
  {
    q: '¿Cuánto se ahorra pagando por año?',
    a: `El valor mensual baja según el compromiso. En Power Sport, el mes suelto sale ${ars(PLANES[4].precios.mensual)}, el trimestre equivale a ${ars(porMes(PLANES[4].precios.trimestral, 3))} por mes y el año a ${ars(porMes(PLANES[4].precios.anual, 12))} por mes. Los planes trimestral y anual se abonan por adelantado.`,
  },
  {
    q: '¿Se puede usar el spa sin membresía?',
    a: `Sí. Leven Therma vende day pass por separado: ${CIRCUITOS[0].name} de ${CIRCUITOS[0].duracion}, ${CIRCUITOS[1].name} de ${CIRCUITOS[1].duracion} y ${CIRCUITOS[2].name} de ${CIRCUITOS[2].duracion}. Los valores se confirman al reservar el turno.`,
  },
  {
    q: '¿Cuál es la permanencia mínima?',
    a: 'Tres meses. Los 4 accesos mensuales al circuito hídrico incluidos en las membresías no son acumulables ni transferibles de un mes al siguiente.',
  },
  {
    q: '¿Casa Leven atiende a personas que no se alojan en el hotel?',
    a: 'Sí. Casa Leven funciona dentro del Radisson RED Funes y atiende tanto a huéspedes como a socios y visitantes externos de Funes, Rosario y la región.',
  },
]

export default function MembresiasPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────── */}
      <section className="grain pt-40 pb-20 md:pt-52 md:pb-28" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection>
            <p className="font-display font-medium text-white/30 mb-5" style={{ fontSize: '9px', letterSpacing: '0.4em' }}>
              MEMBRESÍAS Y PRECIOS
            </p>
            <h1
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(32px, 5.5vw, 68px)', letterSpacing: '-0.03em', lineHeight: 1.03, maxWidth: '16ch' }}
            >
              Un método. Cinco formas de entrar.
            </h1>
            <p className="font-sans text-white/50 leading-relaxed" style={{ fontSize: '17px', maxWidth: '580px' }}>
              Movimiento, recuperación y nutrición conviven en la misma casa. La membresía define
              cuánto de cada pilar entra en tu semana.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── TABLA COMPARATIVA ─────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: 'var(--offwhite)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '860px' }}>
                <caption className="sr-only">
                  Comparativa de membresías de Casa Leven en Funes: qué incluye cada plan y su precio mensual, trimestral y anual.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="text-left py-5 pr-4" style={{ borderBottom: '1px solid rgba(46,39,53,0.15)' }}>
                      <span className="font-display font-medium text-leven-purple/40" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
                        PLAN
                      </span>
                    </th>
                    {PLANES.map((p) => (
                      <th
                        key={p.id}
                        scope="col"
                        className="py-5 px-3 text-center align-bottom"
                        style={{
                          borderBottom: p.featured ? `2px solid ${COLOR}` : '1px solid rgba(46,39,53,0.15)',
                          background: p.featured ? `${COLOR}07` : 'transparent',
                        }}
                      >
                        <div className="font-display font-bold text-leven-purple mb-1" style={{ fontSize: '11px', letterSpacing: '0.18em' }}>
                          {p.name}
                        </div>
                        <div className="font-sans text-leven-purple/35" style={{ fontSize: '10px' }}>{p.tagline}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Precios por duración */}
                  {FILAS_PRECIO.map((fila) => (
                    <tr key={fila.label}>
                      <th
                        scope="row"
                        className="text-left font-sans font-normal py-3 pr-4"
                        style={{
                          borderBottom: '1px solid rgba(46,39,53,0.07)',
                          fontSize: '13px',
                          color: fila.destacado ? 'rgba(46,39,53,0.85)' : 'rgba(46,39,53,0.55)',
                        }}
                      >
                        {fila.label}
                        <span className="font-sans" style={{ fontSize: '11px', color: 'rgba(46,39,53,0.35)' }}> · por mes</span>
                      </th>
                      {PLANES.map((p) => (
                        <td
                          key={p.id}
                          className="text-center py-3 px-3"
                          style={{
                            borderBottom: '1px solid rgba(46,39,53,0.07)',
                            background: p.featured ? `${COLOR}07` : 'transparent',
                          }}
                        >
                          <span
                            className="font-display font-bold text-leven-purple"
                            style={{
                              fontSize: fila.destacado ? '17px' : '13px',
                              letterSpacing: '-0.01em',
                              opacity: fila.destacado ? 1 : 0.55,
                            }}
                          >
                            {ars(fila.valor(p))}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}

                  {CAMPANA_FUNDADORES.activa && (
                    <tr>
                      <th
                        scope="row"
                        className="text-left font-sans font-normal py-3 pr-4"
                        style={{ borderBottom: '1px solid rgba(46,39,53,0.07)', fontSize: '13px', color: COLOR }}
                      >
                        Precio Fundador · 12 meses
                        <span className="font-sans" style={{ fontSize: '11px', opacity: 0.7 }}> · por mes</span>
                      </th>
                      {PLANES.map((p) => (
                        <td
                          key={p.id}
                          className="text-center py-3 px-3"
                          style={{
                            borderBottom: '1px solid rgba(46,39,53,0.07)',
                            background: p.featured ? `${COLOR}07` : 'transparent',
                          }}
                        >
                          <span className="font-display font-bold" style={{ fontSize: '15px', color: COLOR }}>
                            {ars(porMes(p.fundadorAnual, 12))}
                          </span>
                        </td>
                      ))}
                    </tr>
                  )}

                  {/* Separador */}
                  <tr>
                    <td colSpan={PLANES.length + 1} className="pt-8 pb-2">
                      <span className="font-display font-medium text-leven-purple/40" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
                        QUÉ INCLUYE
                      </span>
                    </td>
                  </tr>

                  {/* Servicios */}
                  {FILAS.map((label, i) => (
                    <tr key={label}>
                      <th
                        scope="row"
                        className="text-left font-sans font-normal text-leven-purple/70 py-3 pr-4"
                        style={{ borderBottom: '1px solid rgba(46,39,53,0.07)', fontSize: '13px' }}
                      >
                        {label}
                      </th>
                      {PLANES.map((p) => {
                        const ok = p.services[i]?.ok
                        return (
                          <td
                            key={p.id}
                            className="text-center py-3 px-3"
                            style={{
                              borderBottom: '1px solid rgba(46,39,53,0.07)',
                              background: p.featured ? `${COLOR}07` : 'transparent',
                            }}
                          >
                            <span style={{ fontSize: '13px', color: ok ? COLOR : 'rgba(46,39,53,0.18)' }}>
                              {ok ? '✓' : '—'}
                            </span>
                            <span className="sr-only">{ok ? 'incluido' : 'no incluido'}</span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}

                  <tr>
                    <td />
                    {PLANES.map((p) => (
                      <td key={p.id} className="text-center py-6 px-3" style={{ background: p.featured ? `${COLOR}07` : 'transparent' }}>
                        <Link href="/contacto" className="btn-leven" style={{ borderColor: COLOR, color: COLOR, fontSize: '10px' }}>
                          Consultá →
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </RevealSection>

          <RevealSection>
            <p className="font-sans text-leven-purple/35 mt-8 mx-auto text-center" style={{ fontSize: '11px', maxWidth: '700px', lineHeight: 1.6 }}>
              {LETRA_CHICA_MOTION} Totales: {PLANES.map((p) => `${p.name} ${ars(p.precios.trimestral)} por 3 meses o ${ars(p.precios.anual)} por 12`).join(' · ')}.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── DAY PASS THERMA ───────────────────────────── */}
      <section className="grain py-20 md:py-28" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-10">
            <span className="font-display font-medium text-white/30 block mb-4" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>
              SIN MEMBRESÍA · DAY PASS
            </span>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', letterSpacing: '-0.02em' }}>
              También podés venir por un día.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CIRCUITOS.map((c, i) => (
              <RevealSection key={c.id} delay={i * 70} className="h-full">
                <div className="p-6 h-full flex flex-col" style={{ border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="font-display font-bold text-white mb-1" style={{ fontSize: '11px', letterSpacing: '0.2em' }}>{c.name}</div>
                  <p className="font-sans text-white/30 mb-4" style={{ fontSize: '11px' }}>{c.tagline} · {c.duracion}</p>
                  <div
                    className="font-display font-bold text-white mb-4"
                    style={{
                      fontSize: THERMA_PRECIOS_PUBLICADOS ? '22px' : '13px',
                      letterSpacing: THERMA_PRECIOS_PUBLICADOS ? '-0.02em' : '0.15em',
                      opacity: THERMA_PRECIOS_PUBLICADOS ? 1 : 0.45,
                    }}
                  >
                    {precioCircuito(c)}
                  </div>
                  <ul className="flex flex-col gap-1 flex-1">
                    {c.includes.map((s, j) => (
                      <li key={j} className="font-sans text-white/50" style={{ fontSize: '12px' }}>· {s}</li>
                    ))}
                  </ul>
                  {c.nota && (
                    <p className="font-display font-medium mt-4" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#5d6d7e' }}>
                      {c.nota.toUpperCase()}
                    </p>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>

          <p className="font-sans text-white/25 text-center mx-auto mt-8" style={{ fontSize: '11px', maxWidth: '620px', lineHeight: 1.6 }}>
            {LETRA_CHICA_THERMA}
          </p>
        </div>
      </section>

      <FaqBlock items={FAQ} color={COLOR} title="Todo lo que solemos responder." />

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="py-20" style={{ background: COLOR }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.01em' }}>
            ¿No sabés cuál te sirve? Te ayudamos a elegir.
          </h2>
          <div className="flex gap-4">
            <Link href="/contacto" className="btn-leven btn-leven-filled" style={{ background: '#fff', borderColor: '#fff', color: COLOR, whiteSpace: 'nowrap' }}>
              Quiero que me contacten
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=Hola, quiero información sobre las membresías de Casa Leven`}
              className="btn-leven"
              style={{ borderColor: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
    </>
  )
}

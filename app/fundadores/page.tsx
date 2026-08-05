/**
 * LANDING CAMPAÑA SOCIOS FUNDADORES — Casa Leven
 * ------------------------------------------------------------------
 * La campaña es de las membresías de Casa Leven en general
 * (Motion + Therma + Nourish), no de una unidad sola.
 *
 * ⚠️  CAMPAÑA TEMPORAL Y AUTOCONTENIDA.
 *
 * Para darla de baja: en `data/leven.ts` poner CAMPANA_FUNDADORES.activa = false.
 * Con eso se cae el link del nav, el del footer, el bloque de /motion,
 * la fila de precio Fundador de /membresias, la entrada del sitemap,
 * y esta página redirige al home. No hay que tocar ningún otro archivo.
 *
 * Para borrarla definitivamente: eliminar esta carpeta (app/fundadores/)
 * y el bloque CAMPANA_FUNDADORES de data/leven.ts.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import RevealSection from '@/components/RevealSection'
import LeadForm from '@/components/LeadForm'
import JsonLd from '@/components/JsonLd'
import FaqBlock from '@/components/FaqBlock'
import {
  PLANES,
  CAMPANA_FUNDADORES,
  LETRA_CHICA_MOTION,
  SITE,
  ars,
  porMes,
} from '@/data/leven'

const COLOR = '#b23a3a'

export const metadata: Metadata = {
  title: 'Socios Fundadores · Casa Leven Funes',
  description: `Los primeros ${CAMPANA_FUNDADORES.cupo} socios de Casa Leven entran como Fundadores: precio de membresía congelado de por vida, eventos VIP y beneficios en Motion, Therma y Nourish. Funes, Santa Fe.`,
  alternates: { canonical: '/fundadores' },
  openGraph: {
    title: 'Sé parte de esta casa antes de que abra sus puertas.',
    description: `Los primeros ${CAMPANA_FUNDADORES.cupo} socios de Casa Leven entran como Fundadores.`,
    url: `${SITE.url}/fundadores`,
    type: 'website',
  },
}

const FAQ_FUNDADORES = [
  {
    q: '¿Qué es ser Socio Fundador de Casa Leven?',
    a: `Los primeros ${CAMPANA_FUNDADORES.cupo} socios de Casa Leven, en Funes, Santa Fe, entran antes de la apertura con condiciones que no se repiten: precio de membresía congelado de por vida, acceso prioritario a eventos VIP y condiciones preferenciales en las tres unidades de la casa —Leven Motion (movimiento), Leven Therma (recuperación) y Leven Nourish (nutrición)—.`,
  },
  {
    q: '¿Qué incluye la membresía de Casa Leven?',
    a: 'Todas las membresías incluyen acceso ilimitado a Leven Motion, vestuarios y duchas, apto médico y comunidad Leven. Según el plan se suman el circuito hídrico de Leven Therma (sauna seco, ducha escocesa, baño de vapor y jacuzzi, 4 accesos por mes), la consulta nutricional mensual y el plan de alimentación de Leven Nourish, y la posta deportiva personalizada de una hora, 4 veces por mes.',
  },
  {
    q: '¿Cuánto cuesta la membresía siendo Fundador?',
    a:
      PLANES.map(
        (p) =>
          `${p.name}: ${ars(porMes(p.fundadorAnual, 12))} por mes en lugar de ${ars(porMes(p.precios.anual, 12))} (total ${ars(p.fundadorAnual)})`,
      ).join('; ') +
      `. La condición de Fundador aplica únicamente al plan anual: no hay Fundador mes a mes ni trimestral. Los precios son en pesos argentinos y el plan se abona por adelantado.`,
  },
  {
    q: '¿Hasta cuándo dura el beneficio de Fundador?',
    a: 'El precio Fundador se mantiene mientras la membresía esté activa sin interrupción. No es una promoción de lanzamiento con fecha de vencimiento: es la condición de fundador.',
  },
  {
    q: '¿Cuándo cierra el cupo de Fundadores?',
    a: `No hay fecha de cierre. El cupo se agota cuando se completan los ${CAMPANA_FUNDADORES.cupo} lugares.`,
  },
]

export default function FundadoresPage() {
  // Interruptor único de la campaña.
  if (!CAMPANA_FUNDADORES.activa) redirect('/')

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────── */}
      <section
        className="grain relative flex items-end"
        style={{
          minHeight: '92vh',
          background: `linear-gradient(180deg, rgba(28,21,25,0.55) 0%, rgba(28,21,25,0.92) 100%), url('/images/gimnasio/leven-gimnasio-person-18.jpg') center/cover no-repeat`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28 w-full">
          <RevealSection>
            <p className="font-display font-medium text-white/40 mb-6" style={{ fontSize: '9px', letterSpacing: '0.4em' }}>
              CASA LEVEN · SOCIOS FUNDADORES
            </p>
            <h1
              className="font-display font-bold text-white mb-8"
              style={{ fontSize: 'clamp(34px, 6vw, 78px)', letterSpacing: '-0.03em', lineHeight: 1.02, maxWidth: '14ch' }}
            >
              Sé parte de esta casa antes de que abra sus puertas.
            </h1>
            <p className="font-sans text-white/65 leading-relaxed mb-4" style={{ fontSize: '17px', maxWidth: '620px' }}>
              Casa Leven todavía no abrió. Pero el movimiento con criterio, la recuperación real y
              la nutrición que sostiene ya están tomando forma en Funes. Los primeros{' '}
              {CAMPANA_FUNDADORES.cupo} socios entran ahora, como Fundadores.
            </p>
            <p className="font-sans text-white/35 italic leading-relaxed mb-10" style={{ fontSize: '14px', maxWidth: '560px' }}>
              Cuidarte no debería ser una tarea más de tu semana. Casa Leven reúne movimiento,
              recuperación y nutrición en un mismo lugar, pensados con el mismo criterio con el que
              gestionás todo lo demás.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#planes" className="btn-leven btn-leven-filled" style={{ background: COLOR, borderColor: COLOR }}>
                Conocé los planes ↓
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=Hola, quiero ser Socio Fundador de Casa Leven`}
                className="btn-leven"
                style={{ borderColor: 'rgba(255,255,255,0.28)' }}
              >
                Hablar por WhatsApp
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── POR QUÉ EXISTE ────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: 'var(--offwhite)' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <RevealSection>
            <p className="font-sans text-leven-purple/70 leading-relaxed mb-6" style={{ fontSize: '19px' }}>
              Hay personas que viven con intensidad. Deciden mucho. Sostienen equipos. Lideran.
              Y cuidarse termina siendo una responsabilidad más: el gimnasio por un lado, la
              recuperación cuando hay tiempo, la alimentación cuando se puede.
            </p>
            <p className="font-sans text-leven-purple/55 leading-relaxed" style={{ fontSize: '17px' }}>
              Casa Leven se pensó al revés: un método integral donde el movimiento, la recuperación
              y la nutrición conversan entre sí. Leven Motion para entrenar con criterio, Leven
              Therma para que el cuerpo se recupere de verdad y Leven Nourish para que la
              alimentación acompañe. Todo en un mismo lugar, sin que cuidarte te reste energía.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── SER FUNDADOR ──────────────────────────────── */}
      <section className="grain py-24 md:py-32" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-14">
            <span className="font-display font-medium text-white/30 block mb-4" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>
              SER FUNDADOR
            </span>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(26px, 4vw, 50px)', letterSpacing: '-0.02em', maxWidth: '18ch' }}>
              No es una promoción. Es ser parte desde antes de que exista.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {CAMPANA_FUNDADORES.beneficios.map((b, i) => (
              <RevealSection key={i} delay={i * 90} className="h-full">
                <div className="p-8 h-full flex flex-col gap-3" style={{ border: `1px solid ${COLOR}30`, background: `${COLOR}08` }}>
                  <span style={{ color: COLOR, fontSize: '18px' }}>◇</span>
                  <h3 className="font-display font-bold text-white" style={{ fontSize: '16px' }}>{b.titulo}</h3>
                  <p className="font-sans text-white/50 leading-relaxed" style={{ fontSize: '13px' }}>{b.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <p className="font-sans text-white/40 italic text-center mx-auto" style={{ fontSize: '15px', maxWidth: '560px' }}>
              Incluso quienes sostienen el mundo necesitan un lugar donde sostenerse.
              Los primeros {CAMPANA_FUNDADORES.cupo} lo construyen con nosotros.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── PLANES ────────────────────────────────────── */}
      <section id="planes" className="py-24 md:py-32" style={{ background: 'var(--offwhite)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-4">
            <span className="font-display font-medium block mb-4" style={{ fontSize: '9px', letterSpacing: '0.35em', color: COLOR }}>
              PLANES FUNDADOR
            </span>
            <h2 className="font-display font-bold text-leven-purple" style={{ fontSize: 'clamp(26px, 4vw, 50px)', letterSpacing: '-0.02em' }}>
              Elegí cómo entrás.
            </h2>
          </RevealSection>
          <RevealSection className="mb-12">
            <p className="font-sans text-leven-purple/50" style={{ fontSize: '14px', maxWidth: '560px' }}>
              La condición de Fundador aplica sobre el plan anual: es la única forma de fundar.
              Los valores de abajo son el equivalente mensual de ese plan, con {CAMPANA_FUNDADORES.descuento}{' '}
              sobre el precio de lista, congelado mientras tu membresía siga activa.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PLANES.map((plan, i) => (
              <RevealSection key={plan.id} delay={i * 70} className="h-full">
                <div
                  className="p-7 h-full flex flex-col relative"
                  style={{
                    border: plan.featured ? `1.5px solid ${COLOR}` : '1px solid rgba(46,39,53,0.12)',
                    background: plan.featured ? `${COLOR}08` : 'transparent',
                  }}
                >
                  {plan.featured && (
                    <div
                      className="absolute top-0 right-0 font-display font-bold text-white"
                      style={{ fontSize: '8px', letterSpacing: '0.2em', padding: '5px 10px', background: COLOR }}
                    >
                      MÁS ELEGIDO
                    </div>
                  )}
                  <div className="font-display font-bold text-leven-purple mb-1" style={{ fontSize: '10px', letterSpacing: '0.25em' }}>
                    {plan.name}
                  </div>
                  <p className="font-sans text-leven-purple/40 mb-5" style={{ fontSize: '11px' }}>{plan.tagline}</p>

                  <div className="mb-6">
                    <p className="font-sans text-leven-purple/30 line-through" style={{ fontSize: '12px' }}>
                      {ars(porMes(plan.precios.anual, 12))}/mes
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-bold" style={{ fontSize: '24px', letterSpacing: '-0.02em', color: COLOR }}>
                        {ars(porMes(plan.fundadorAnual, 12))}
                      </span>
                      <span className="font-sans text-leven-purple/40" style={{ fontSize: '11px' }}>/mes</span>
                    </div>
                    <p className="font-display font-medium mt-1" style={{ fontSize: '9px', letterSpacing: '0.2em', color: COLOR }}>
                      FUNDADOR · PLAN ANUAL
                    </p>
                    <div className="mt-3 pt-3 flex items-baseline justify-between gap-2" style={{ borderTop: '1px solid rgba(46,39,53,0.08)' }}>
                      <span className="font-sans text-leven-purple/40" style={{ fontSize: '11px' }}>Total 12 meses</span>
                      <span className="font-sans text-leven-purple/55" style={{ fontSize: '11px' }}>{ars(plan.fundadorAnual)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 mb-6">
                    {plan.services.map((s, j) => (
                      <div key={j} className="flex items-start gap-2 py-[6px]" style={{ borderBottom: '1px solid rgba(46,39,53,0.07)' }}>
                        <span style={{ fontSize: '11px', flexShrink: 0, marginTop: '1px', color: s.ok ? COLOR : 'rgba(46,39,53,0.18)' }}>
                          {s.ok ? '✓' : '—'}
                        </span>
                        <span className="font-sans" style={{ fontSize: '12px', color: s.ok ? 'rgba(46,39,53,0.75)' : 'rgba(46,39,53,0.25)' }}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a href="#sumarme" className="btn-leven w-full justify-center" style={{ borderColor: COLOR, color: COLOR, fontSize: '10px' }}>
                    Ser Fundador →
                  </a>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <p className="font-sans text-leven-purple/35 text-center mx-auto mt-10" style={{ fontSize: '11px', maxWidth: '700px', lineHeight: 1.6 }}>
              {LETRA_CHICA_MOTION} El precio Fundador se mantiene mientras la membresía esté activa
              sin interrupción.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── FORM ──────────────────────────────────────── */}
      <section id="sumarme" className="grain py-24 md:py-32" style={{ background: 'var(--dark)' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-12 text-center">
            <span className="font-display font-medium text-white/30 block mb-4" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>
              {CAMPANA_FUNDADORES.cupo} LUGARES
            </span>
            <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(26px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
              Dejanos tus datos y te contamos cómo entrar.
            </h2>
            <p className="font-sans text-white/45 mx-auto" style={{ fontSize: '15px', maxWidth: '460px' }}>
              Te escribimos para coordinar la visita, resolver dudas y reservar tu lugar de Fundador.
            </p>
          </RevealSection>

          <RevealSection delay={120}>
            <LeadForm fuente="Landing Fundadores Casa Leven" canal="Sitio Web" />
          </RevealSection>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────── */}
      <FaqBlock items={FAQ_FUNDADORES} color={COLOR} title="Sobre ser Fundador." />

      {/* ─── CIERRE ────────────────────────────────────── */}
      <section className="py-20" style={{ background: COLOR }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.01em' }}>
            Los primeros {CAMPANA_FUNDADORES.cupo} lo construyen con nosotros.
          </h2>
          <div className="flex gap-4">
            <a href="#sumarme" className="btn-leven btn-leven-filled" style={{ background: '#fff', borderColor: '#fff', color: COLOR, whiteSpace: 'nowrap' }}>
              Quiero mi lugar
            </a>
            <Link href="/membresias" className="btn-leven" style={{ borderColor: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>
              Ver todas las membresías
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_FUNDADORES.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'OfferCatalog',
          name: 'Membresías Socio Fundador · Casa Leven',
          url: `${SITE.url}/fundadores`,
          itemListElement: PLANES.map((p) => ({
            '@type': 'Offer',
            name: `${p.name} — Socio Fundador`,
            description: p.resumen,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: p.fundadorAnual,
              priceCurrency: 'ARS',
              billingDuration: 12,
              billingIncrement: 1,
              unitCode: 'ANN',
              referenceQuantity: {
                '@type': 'QuantitativeValue',
                value: 1,
                unitCode: 'ANN',
              },
            },
            price: p.fundadorAnual,
            priceCurrency: 'ARS',
            availability: 'https://schema.org/LimitedAvailability',
            eligibleQuantity: {
              '@type': 'QuantitativeValue',
              value: CAMPANA_FUNDADORES.cupo,
              unitText: 'socios fundadores',
            },
            url: `${SITE.url}/fundadores#planes`,
          })),
        }}
      />
    </>
  )
}

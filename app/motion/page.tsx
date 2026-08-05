import type { Metadata } from 'next'
import Link from 'next/link'
import RevealSection from '@/components/RevealSection'
import LandingHero from '@/components/LandingHero'
import BrandImages from '@/components/BrandImages'
import JsonLd from '@/components/JsonLd'
import FaqBlock from '@/components/FaqBlock'
import PrecioPlan from '@/components/PrecioPlan'
import {
  PLANES,
  LETRA_CHICA_MOTION,
  CAMPANA_FUNDADORES,
  SITE,
  ars,
  porMes,
} from '@/data/leven'

export const metadata: Metadata = {
  title: 'Leven Motion · Gimnasio de alto rendimiento en Funes',
  description:
    'Gimnasio con aforo limitado y entrenamiento con criterio en Funes, Santa Fe. Membresías Starter, Performance, Flow, Sport y Power Sport desde $200.000 por mes, con acceso al circuito hídrico de Leven Therma.',
  alternates: { canonical: '/motion' },
  openGraph: {
    title: 'Leven Motion · Gimnasio de alto rendimiento en Funes',
    description:
      'Entrenamiento con criterio, evaluación postural y recuperación real. Membresías desde $200.000 por mes.',
    url: `${SITE.url}/motion`,
    type: 'website',
  },
}

const COLOR = '#b23a3a'

const FAQ_MOTION = [
  {
    q: '¿Cuánto cuesta la membresía del gimnasio de Casa Leven en Funes?',
    a: `Leven Motion tiene cinco membresías: ${PLANES.map((p) => `${p.name} ${ars(p.precios.mensual)}`).join(', ')} por mes. Todas incluyen acceso ilimitado al gimnasio, vestuarios, apto médico y comunidad Leven. Contratando 3 o 12 meses el valor mensual baja: por ejemplo, Starter pasa de ${ars(PLANES[0].precios.mensual)} a ${ars(porMes(PLANES[0].precios.anual, 12))} por mes en el plan anual.`,
  },
  {
    q: '¿Qué membresía de Casa Leven incluye spa?',
    a: 'Las membresías Performance, Flow, Sport y Power Sport incluyen el circuito hídrico de Leven Therma —sauna seco, ducha escocesa, baño de vapor y jacuzzi— con 4 accesos por mes, no acumulables ni transferibles. La membresía Starter no incluye spa.',
  },
  {
    q: '¿Cuál es la diferencia entre Flow, Sport y Power Sport?',
    a: 'Flow suma nutrición: consulta nutricional mensual y plan de alimentación personalizado. Sport suma rendimiento deportivo: posta deportiva personalizada de 1 hora, 4 veces por mes. Power Sport incluye las dos cosas. Las tres tienen gimnasio ilimitado y circuito hídrico.',
  },
  {
    q: '¿Conviene pagar por mes, por trimestre o por año?',
    a: `Cuanto más largo el compromiso, más baja el valor mensual. En Flow, por ejemplo, el mes suelto sale ${ars(PLANES[2].precios.mensual)}, el trimestre equivale a ${ars(porMes(PLANES[2].precios.trimestral, 3))} por mes y el año a ${ars(porMes(PLANES[2].precios.anual, 12))} por mes.`,
  },
  {
    q: '¿Dónde queda Leven Motion?',
    a: `Leven Motion funciona dentro de Casa Leven, en el ${SITE.direccion.calle}, ${SITE.direccion.ciudad}, provincia de ${SITE.direccion.provincia}, Argentina. Atiende a socios y a huéspedes del hotel.`,
  },
  {
    q: '¿El gimnasio tiene cupo limitado?',
    a: 'Sí. Leven Motion trabaja con aforo controlado de hasta 50 personas por hora para sostener el acompañamiento personalizado y la calidad del entrenamiento.',
  },
]

export default function MotionPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────── */}
      <LandingHero
        name="LEVEN MOTION"
        unit="Gym"
        line1="El cuerpo"
        line2="como herramienta"
        line3="de rendimiento."
        sub="Metodología de alto rendimiento para quienes lideran en el mundo real. Resultados medibles, sin tiempo perdido."
        color={COLOR}
        logo="/logos/leven-motion.svg"
        img="/images/gimnasio/leven-gimnasio-person-18.jpg"
      />

      {/* ─── PROPUESTA ─────────────────────────────────── */}
      <section className="py-24 md:py-36" style={{ background: 'var(--offwhite)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <RevealSection className="md:col-span-4">
              <div className="sticky top-32">
                <h2 className="font-display font-bold leading-tight mb-6" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-0.01em', color: COLOR }}>
                  El gimnasio diseñado para el mundo real.
                </h2>
                <p className="font-sans text-leven-purple/60 leading-relaxed" style={{ fontSize: '15px' }}>
                  No para atletas de tiempo completo. Para quienes lideran, deciden y necesitan que el cuerpo esté a la altura.
                </p>
              </div>
            </RevealSection>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px items-stretch">
              {[
                { title: 'Fuerza y vitalidad', body: 'Entrenamiento que sostiene la energía a lo largo del tiempo. Para rendir hoy y los próximos 20 años.' },
                { title: 'Rendimiento medible', body: 'Metodología con progresión real. Sin rutinas genéricas, sin tiempo perdido.' },
                { title: 'Evaluación postural', body: 'Diagnóstico inicial y seguimiento para que el progreso sea concreto.' },
                { title: 'Sesiones técnicas', body: 'Guía especializada para quienes quieren entender cómo y por qué se mueven.' },
              ].map((item, i) => (
                <RevealSection key={i} delay={i * 80} className="h-full">
                  <div className="p-8 md:p-10 h-full" style={{ background: 'var(--offwhite)', border: '1px solid rgba(46,39,53,0.08)' }}>
                    <h3 className="font-display font-bold text-leven-purple mb-3" style={{ fontSize: '15px', letterSpacing: '0.02em' }}>
                      {item.title}
                    </h3>
                    <p className="font-sans text-leven-purple/55 leading-relaxed" style={{ fontSize: '13px' }}>
                      {item.body}
                    </p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMAGE BLOCK ───────────────────────────────── */}
      <BrandImages
        color={COLOR}
        quote="El cuerpo que se entrena con criterio rinde sin límite"
        images={[
          { src: '/images/gimnasio/leven-gimnasio-person-18.jpg', alt: 'Leven Motion' },
          { src: '/images/gimnasio/leven-gimnasio-person-06.jpg', alt: 'Entrenamiento' },
          { src: '/images/gimnasio/leven-gimnasio-close-02.jpg', alt: 'Fuerza' },
          { src: '/images/gimnasio/leven-gimnasio-close-04.jpg', alt: 'Rendimiento' },
        ]}
      />

      {/* ─── MEMBRESÍAS ────────────────────────────────── */}
      <section className="grain py-24 md:py-36" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-14">
            <div className="flex items-center gap-5 mb-4">
              <span className="font-display font-medium text-white/30" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>MEMBRESÍAS</span>
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.01em' }}>
              Elegí tu plan.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {PLANES.map((plan, i) => (
              <RevealSection key={plan.id} delay={i * 70} className="h-full">
                <div
                  id={plan.id}
                  className="membership-card flex flex-col h-full"
                  style={{
                    background: plan.featured ? `${COLOR}10` : 'rgba(255,255,255,0.03)',
                    borderColor: plan.featured ? COLOR : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {plan.featured && (
                    <div className="absolute top-0 right-0 font-display font-bold text-white" style={{ fontSize: '8px', letterSpacing: '0.2em', padding: '5px 10px', background: COLOR }}>
                      MÁS ELEGIDO
                    </div>
                  )}
                  <div className="font-display font-bold text-white mb-2" style={{ fontSize: '10px', letterSpacing: '0.25em' }}>{plan.name}</div>
                  <p className="font-sans text-white/35 mb-5" style={{ fontSize: '11px' }}>{plan.tagline}</p>

                  <div className="mb-7">
                    <PrecioPlan precios={plan.precios} color={COLOR} tema="oscuro" />
                    {CAMPANA_FUNDADORES.activa && (
                      <p className="font-sans mt-3 pt-3" style={{ fontSize: '11px', color: COLOR, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                        Fundador (plan anual): {ars(porMes(plan.fundadorAnual, 12))}/mes
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 mb-6 gap-0">
                    {plan.services.map((s, j) => (
                      <div key={j} className="flex items-start gap-2 py-[7px]" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ fontSize: '11px', flexShrink: 0, marginTop: '1px', color: s.ok ? COLOR : 'rgba(255,255,255,0.12)' }}>
                          {s.ok ? '✓' : '—'}
                        </span>
                        <span className="font-sans" style={{ fontSize: '12px', color: s.ok ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.18)' }}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contacto" className="btn-leven w-full justify-center" style={{ borderColor: `${COLOR}50`, fontSize: '10px' }}>
                    Consultá →
                  </Link>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <p className="font-sans text-white/25 text-center mx-auto" style={{ fontSize: '11px', maxWidth: '680px', lineHeight: 1.6 }}>
              {LETRA_CHICA_MOTION}
            </p>
          </RevealSection>

          {CAMPANA_FUNDADORES.activa && (
            <RevealSection className="mt-12">
              <div
                className="flex flex-col md:flex-row items-center justify-between gap-6 p-8"
                style={{ border: `1px solid ${COLOR}45`, background: `${COLOR}0d` }}
              >
                <div>
                  <p className="font-display font-bold text-white/35 mb-2" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>
                    SOCIOS FUNDADORES
                  </p>
                  <p className="font-display font-bold text-white" style={{ fontSize: 'clamp(18px, 2.4vw, 26px)', letterSpacing: '-0.01em' }}>
                    Los primeros {CAMPANA_FUNDADORES.cupo} socios entran con precio congelado de por vida.
                  </p>
                </div>
                <Link href="/fundadores" className="btn-leven" style={{ borderColor: COLOR, color: '#fff', whiteSpace: 'nowrap' }}>
                  Ser Fundador →
                </Link>
              </div>
            </RevealSection>
          )}
        </div>
      </section>

      {/* ─── FAQ (SEO + respuestas para motores de IA) ──── */}
      <FaqBlock items={FAQ_MOTION} color={COLOR} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HealthAndBeautyBusiness',
          '@id': `${SITE.url}/motion#gym`,
          additionalType: 'https://schema.org/ExerciseGym',
          name: 'Leven Motion',
          description:
            'Gimnasio de alto rendimiento con aforo limitado dentro de Casa Leven, Funes, Santa Fe, Argentina.',
          url: `${SITE.url}/motion`,
          parentOrganization: { '@id': `${SITE.url}#casaleven` },
          address: {
            '@type': 'PostalAddress',
            streetAddress: SITE.direccion.calle,
            addressLocality: SITE.direccion.ciudad,
            addressRegion: SITE.direccion.provincia,
            postalCode: SITE.direccion.cp,
            addressCountry: SITE.direccion.pais,
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Membresías Leven Motion',
            itemListElement: PLANES.map((p) => ({
              '@type': 'Offer',
              name: p.name,
              description: p.resumen,
              price: p.precios.mensual,
              priceCurrency: 'ARS',
              availability: 'https://schema.org/InStock',
              url: `${SITE.url}/motion#${p.id}`,
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: p.precios.mensual,
                priceCurrency: 'ARS',
                billingDuration: 1,
                billingIncrement: 1,
                unitCode: 'MON',
              },
            })),
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_MOTION.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
    </>
  )
}

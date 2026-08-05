import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RevealSection from '@/components/RevealSection'
import LandingHero from '@/components/LandingHero'
import BrandImages from '@/components/BrandImages'
import JsonLd from '@/components/JsonLd'
import FaqBlock from '@/components/FaqBlock'
import {
  CIRCUITOS,
  LETRA_CHICA_THERMA,
  THERMA_PRECIOS_PUBLICADOS,
  THERMA_MONEDA,
  precioCircuito,
  SITE,
} from '@/data/leven'

export const metadata: Metadata = {
  title: 'Leven Therma · Spa y circuito hídrico en Funes',
  description:
    'Spa con circuito hídrico —sauna seco, ducha escocesa, baño de vapor y jacuzzi—, masajes con protocolo y tratamientos faciales en Funes, Santa Fe. Day pass RESET, RESTORE y DEEP con turno previo.',
  alternates: { canonical: '/therma' },
  openGraph: {
    title: 'Leven Therma · Spa y circuito hídrico en Funes',
    description:
      'Circuitos termales RESET, RESTORE y DEEP. Recuperación profunda con turno previo. Funes, Santa Fe.',
    url: `${SITE.url}/therma`,
    type: 'website',
  },
}

const COLOR = '#5d6d7e'

const FAQ_THERMA = [
  {
    q: '¿Qué incluye el circuito hídrico de Casa Leven?',
    a: 'El circuito hídrico de Leven Therma incluye sauna seco, ducha escocesa, baño de vapor y jacuzzi, más sala de relax y pileta climatizada. Se puede acceder con day pass o incluido en las membresías Performance, Flow, Sport y Power Sport, con 4 accesos por mes.',
  },
  {
    q: '¿Qué day pass de spa ofrece Casa Leven?',
    a: 'Leven Therma tiene tres packs de day pass: RESET de 60 minutos, RESTORE de 90 minutos y DEEP de 150 minutos. Desde septiembre se suma LEVEN RITUAL, la experiencia de día completo de 290 minutos. Los valores se confirman al reservar el turno.',
  },
  {
    q: '¿Hace falta reservar turno para el spa?',
    a: 'Sí. Los circuitos y los tratamientos de Leven Therma se reservan con turno previo desde la sección de reservas del sitio o por WhatsApp, porque el aforo es limitado para sostener el silencio y la calidad de la experiencia.',
  },
  {
    q: '¿Se puede ir al spa sin ser socio de Casa Leven?',
    a: 'Sí. Leven Therma atiende tanto a socios como a personas externas y a huéspedes del hotel, a través de los packs de day pass o de tratamientos individuales.',
  },
  {
    q: '¿Qué masajes y tratamientos ofrece Leven Therma?',
    a: 'Masaje relajante, descontracturante, cérvico craneal, circulatorio, drenaje linfático, piedras calientes, esferas sonoras, reflexología y reiki. En faciales: Premium, Renovador y Revitalizante.',
  },
]

const individual = [
  { name: 'Masaje Relajante', duration: '50 min' },
  { name: 'Masaje Descontracturante', duration: '50 min' },
  { name: 'Masaje Cérvico craneal', duration: '40 min' },
  { name: 'Masaje Circulatorio', duration: '75 min' },
  { name: 'Drenaje linfático', duration: '50 min' },
  { name: 'Masaje con Piedras Calientes', duration: '50 min' },
  { name: 'Masaje con Esferas Sonoras', duration: '50 min' },
  { name: 'Reflexología', duration: '40 min' },
  { name: 'Reiki', duration: '40 min' },
]

const faciales = [
  { name: 'Facial Premium', desc: 'Máscaras, higiene facial, masaje relajante', duration: '60 min' },
  { name: 'Facial Renovador', desc: 'Peeling mecánico, limpieza profunda, máscara', duration: '75 min' },
  { name: 'Facial Revitalizante', desc: 'Máscara de fango, masaje revitalizante', duration: '60 min' },
]

export default function ThermaPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────── */}
      <LandingHero
        name="LEVEN THERMA"
        unit="Recuperación"
        line1="Volver al equilibrio"
        line2="es parte del"
        line3="rendimiento."
        sub="Circuitos termales, masajes con protocolo y tratamientos diseñados para quienes entienden que recuperarse bien es rendir mejor."
        color={COLOR}
        logo="/logos/leven-therma.svg"
        img="/images/spa/leven-spa-close-10.jpg"
      />

      {/* ─── CIRCUITOS ─────────────────────────────────── */}
      <section className="py-24 md:py-36" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-14">
            <div className="flex items-center gap-5 mb-4">
              <span className="font-display font-medium text-white/30" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>CIRCUITOS TERMALES</span>
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.01em' }}>
              Diseñados para volver al equilibrio.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CIRCUITOS.map((c, i) => (
              <RevealSection key={c.name} delay={i * 80}>
                <div
                  className="membership-card flex flex-col h-full"
                  id={c.id}
                  style={{ background: c.proximamente ? `${COLOR}12` : 'rgba(255,255,255,0.03)', border: c.proximamente ? `1px solid ${COLOR}50` : '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="font-display font-bold text-white mb-1" style={{ fontSize: '11px', letterSpacing: '0.2em' }}>{c.name}</div>
                  <p className="font-sans text-white/30 mb-3" style={{ fontSize: '11px' }}>{c.tagline}</p>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span
                      className="font-display font-bold text-white"
                      style={{
                        fontSize: THERMA_PRECIOS_PUBLICADOS ? '22px' : '13px',
                        letterSpacing: THERMA_PRECIOS_PUBLICADOS ? '-0.02em' : '0.15em',
                        opacity: THERMA_PRECIOS_PUBLICADOS ? 1 : 0.45,
                      }}
                    >
                      {precioCircuito(c)}
                    </span>
                    <span className="text-white/30 font-sans" style={{ fontSize: '11px' }}>{c.duracion}</span>
                  </div>
                  <p className="font-sans mb-5" style={{ fontSize: '10px', letterSpacing: '0.15em', color: c.nota ? COLOR : 'transparent', minHeight: '14px' }}>
                    {c.nota ? c.nota.toUpperCase() : '·'}
                  </p>
                  <div className="flex flex-col gap-2 flex-1 mb-6">
                    {c.includes.map((s, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span style={{ color: COLOR, fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>→</span>
                        <span className="font-sans text-white/60" style={{ fontSize: '12px' }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/reservas" className="btn-leven btn-leven-therma w-full justify-center" style={{ borderColor: `${COLOR}50`, fontSize: '10px' }}>
                    Reservar →
                  </Link>
                </div>
              </RevealSection>
            ))}
          </div>

          <p className="font-sans text-white/25 text-center mx-auto mt-10" style={{ fontSize: '11px', maxWidth: '620px', lineHeight: 1.6 }}>
            {LETRA_CHICA_THERMA}
          </p>
        </div>
      </section>

      {/* ─── TRATAMIENTOS ──────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: 'var(--offwhite)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Individual massages */}
            <RevealSection>
              <h3 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.01em', color: COLOR }}>
                Masajes individuales.
              </h3>
              <div className="flex flex-col gap-0">
                {individual.map((m, i) => (
                  <div key={i} className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid rgba(46,39,53,0.08)' }}>
                    <span className="font-sans text-leven-purple/70" style={{ fontSize: '14px' }}>{m.name}</span>
                    <span className="font-display font-medium text-leven-purple/40" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>{m.duration}</span>
                  </div>
                ))}
              </div>
              <p className="font-sans text-leven-purple/35 mt-4" style={{ fontSize: '12px' }}>
                Precios a consultar · Incluidos en membresías según plan
              </p>
            </RevealSection>

            {/* Facial treatments */}
            <RevealSection delay={150}>
              <h3 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.01em', color: COLOR }}>
                Tratamientos faciales.
              </h3>
              <div className="flex flex-col gap-4">
                {faciales.map((f, i) => (
                  <div key={i} className="p-5" style={{ border: '1px solid rgba(46,39,53,0.1)', background: 'rgba(46,39,53,0.02)' }}>
                    <div className="mb-2">
                      <span className="font-display font-bold text-leven-purple" style={{ fontSize: '13px', letterSpacing: '0.05em' }}>{f.name}</span>
                    </div>
                    <p className="font-sans text-leven-purple/50" style={{ fontSize: '12px' }}>{f.desc} · {f.duration}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>

          <RevealSection className="mt-14 text-center">
            <Link href="/contacto" className="btn-leven btn-leven-therma" style={{ borderColor: `${COLOR}80`, color: COLOR }}>
              Reservar tratamiento →
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ─── IMAGE BLOCK ───────────────────────────────── */}
      <BrandImages
        color={COLOR}
        quote="Recuperarse bien es parte del rendimiento, no una pausa de él"
        images={[
          { src: '/images/spa/leven-spa-close-10.jpg', alt: 'Leven Therma' },
          { src: '/images/spa/leven-spa-person-06.jpg', alt: 'Spa' },
          { src: '/images/spa/leven-spa-person-01.jpg', alt: 'Circuito termal' },
          { src: '/images/spa/leven-spa-person-13.jpg', alt: 'Recuperación' },
        ]}
      />

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="py-20" style={{ background: COLOR }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <RevealSection>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.01em' }}>
              Reservá tu experiencia en Therma.
            </h2>
          </RevealSection>
          <RevealSection delay={150}>
            <div className="flex gap-4">
              <Link href="/reservas" className="btn-leven btn-leven-filled" style={{ background: '#ffffff', borderColor: '#ffffff', color: COLOR, whiteSpace: 'nowrap' }}>
                Reservar turno
              </Link>
              <a href={`https://wa.me/${SITE.whatsapp}?text=Hola, quiero reservar en Leven Therma`} className="btn-leven" style={{ borderColor: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>
                WhatsApp
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── FAQ (SEO + respuestas para motores de IA) ──── */}
      <FaqBlock items={FAQ_THERMA} color={COLOR} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'DaySpa',
          '@id': `${SITE.url}/therma#spa`,
          name: 'Leven Therma',
          description:
            'Spa con circuito hídrico, masajes con protocolo y tratamientos faciales dentro de Casa Leven, Funes, Santa Fe, Argentina.',
          url: `${SITE.url}/therma`,
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
            name: 'Circuitos y day pass Leven Therma',
            itemListElement: CIRCUITOS.map((c) => ({
              '@type': 'Offer',
              name: c.name,
              description: `${c.tagline} · ${c.duracion} · ${c.includes.join(', ')}`,
              // Los precios se publican cuando THERMA_PRECIOS_PUBLICADOS = true.
              // Declarar un precio incorrecto en schema.org es peor que no declararlo.
              ...(THERMA_PRECIOS_PUBLICADOS
                ? { price: c.precioUSD, priceCurrency: THERMA_MONEDA }
                : {}),
              availability: c.proximamente
                ? 'https://schema.org/PreOrder'
                : 'https://schema.org/InStock',
              url: `${SITE.url}/therma#${c.id}`,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_THERMA.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
    </>
  )
}

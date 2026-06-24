import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RevealSection from '@/components/RevealSection'
import LandingHero from '@/components/LandingHero'
import BrandImages from '@/components/BrandImages'

export const metadata: Metadata = {
  title: 'Leven Nourish · Nutrición Funcional · Casa Leven Funes',
  description: 'Nutrición funcional. Aguas internacionales, jugos naturales y alimentos Esenio. El tercer pilar del sistema Casa Leven. Funes, Argentina.',
}

const COLOR = '#7b8476'

export default function NourishPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────── */}
      <LandingHero
        name="LEVEN NOURISH"
        unit="Nutrición"
        line1="El combustible"
        line2="que elegís define"
        line3="la energía que tenés."
        sub="Nutrición funcional con propósito. Lo que ponés en el cuerpo importa tanto como lo que hacés con él."
        color={COLOR}
        logo="/logos/leven-nourish.svg"
        img="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1920&q=80"
      />

      {/* ─── QUÉ ES ─────────────────────────────────────── */}
      <section className="py-24 md:py-36" style={{ background: 'var(--offwhite)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <RevealSection className="md:col-span-4">
              <div className="w-8 h-px mb-6" style={{ background: COLOR }} />
              <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-0.01em', color: COLOR }}>
                No es sólo un bar más.
              </h2>
            </RevealSection>
            <RevealSection className="md:col-span-8" delay={150}>
              <p className="font-sans text-leven-purple/60 leading-relaxed mb-8" style={{ fontSize: '17px', maxWidth: '580px' }}>
                Leven Nourish es el tercer pilar del sistema Casa Leven.
                Existe porque el cuerpo que se mueve y se recupera también necesita combustible de calidad.
                No genérico. No de moda. Con propósito.
              </p>
              <p className="font-sans text-leven-purple/40 leading-relaxed" style={{ fontSize: '15px', maxWidth: '580px' }}>
                Ingredientes reales, combinaciones con criterio, sabores que no piden perdón.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─── LA PROPUESTA ──────────────────────────────── */}
      <section className="grain py-24 md:py-32" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-14">
            <div className="flex items-center gap-5 mb-4">
              <div className="w-8 h-px" style={{ background: COLOR }} />
              <span className="font-display font-medium text-white/30" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>QUÉ ENCONTRÁS</span>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {[
              {
                title: 'Aguas internacionales',
                body: 'Una selección curada de aguas minerales del mundo. Para quienes saben que lo que toman también importa.',
                icon: '◇',
              },
              {
                title: 'Jugos naturales',
                body: 'Sin ultraprocesados, sin azúcares añadidos. Prensados en frío, con ingredientes que reconocés.',
                icon: '◇',
              },
              {
                title: 'Alimentos Esenio',
                body: 'Línea de alimentos empaquetados de la marca Esenio — funcionales, limpios, diseñados para el cuerpo que rinde.',
                icon: '◇',
              },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 100} className="h-full">
                <div className="p-8 flex flex-col gap-4 h-full" style={{ border: `1px solid ${COLOR}25`, background: `${COLOR}08` }}>
                  <span style={{ color: COLOR, fontSize: '20px' }}>{item.icon}</span>
                  <h3 className="font-display font-bold text-white" style={{ fontSize: '16px', letterSpacing: '0.03em' }}>{item.title}</h3>
                  <p className="font-sans text-white/50 leading-relaxed" style={{ fontSize: '13px' }}>{item.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IMAGE BLOCK ───────────────────────────────── */}
      <BrandImages
        color={COLOR}
        quote="Lo que ponés en el cuerpo importa tanto como lo que hacés con él"
        images={[
          { src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80', alt: 'Leven Nourish' },
          { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', alt: 'Nutrición' },
          { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', alt: 'Ingredientes' },
          { src: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80', alt: 'Bebidas' },
        ]}
      />

      {/* ─── PRÓXIMAMENTE ──────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: COLOR }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <RevealSection>
            <p className="font-display font-light text-white/50 mb-4" style={{ fontSize: '10px', letterSpacing: '0.4em' }}>PRÓXIMAMENTE</p>
            <h2 className="font-display font-bold text-white mb-6" style={{ fontSize: 'clamp(26px, 4vw, 48px)', letterSpacing: '-0.01em', lineHeight: '1.05' }}>
              La carta completa se revela con la apertura.
            </h2>
            <p className="font-sans text-white/60 mx-auto mb-10" style={{ fontSize: '15px', maxWidth: '400px', lineHeight: '1.4' }}>
              Dejá tu email y te avisamos cuando Leven Nourish abra sus puertas.
            </p>
            <a
              href="https://wa.me/5493415000000?text=Hola, me interesa Leven Nourish"
              className="btn-leven inline-flex"
              style={{ borderColor: 'rgba(255,255,255,0.4)' }}
            >
              Quiero que me avisen →
            </a>
          </RevealSection>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RevealSection from '@/components/RevealSection'
import LandingHero from '@/components/LandingHero'
import BrandImages from '@/components/BrandImages'

export const metadata: Metadata = {
  title: 'Leven Therma · Spa y Recuperación Profunda · Casa Leven Funes',
  description: 'Circuitos termales, masajes con protocolo y tratamientos de recuperación. La habilidad más sofisticada de los que más rinden. Funes, Argentina.',
}

const COLOR = '#5d6d7e'

const circuits = [
  {
    name: 'RESET',
    tagline: 'Entrada al equilibrio',
    duration: '60 min',
    price: 'USD 100',
    includes: ['Sauna', 'Sala de relax + colación', 'Ducha escocesa', 'Baño de vapor'],
  },
  {
    name: 'RESTORE',
    tagline: 'Cuerpo y profundidad',
    duration: '90 min',
    price: 'USD 180',
    includes: ['Sauna', 'Sala de relax + colación', 'Exfoliación corporal', 'Nutrición corporal', 'Ducha escocesa', 'Baño de vapor'],
  },
  {
    name: 'DEEP',
    tagline: 'La experiencia completa',
    duration: '150 min',
    price: 'USD 280',
    includes: ['Sauna', 'Sala de relax + colación', 'Exfoliación corporal', 'Hidromasaje', 'Pediluvios', 'Ducha escocesa', 'Baño de vapor'],
  },
  {
    name: 'LEVEN RITUAL',
    tagline: 'El día completo',
    duration: '290 min',
    price: 'USD 300',
    highlight: true,
    includes: ['Gym (60 min)', 'Sauna + ducha escocesa', 'Almuerzo saludable', 'Piscina Kneipp', 'Masajes completos', 'Limpieza facial'],
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
        img="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1920&q=80"
      />

      {/* ─── CIRCUITOS ─────────────────────────────────── */}
      <section className="py-24 md:py-36" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-14">
            <div className="flex items-center gap-5 mb-4">
              <div className="w-8 h-px" style={{ background: COLOR }} />
              <span className="font-display font-medium text-white/30" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>CIRCUITOS TERMALES</span>
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.01em' }}>
              Diseñados para volver al equilibrio.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {circuits.map((c, i) => (
              <RevealSection key={c.name} delay={i * 80}>
                <div
                  className="membership-card flex flex-col h-full"
                  style={{ background: c.highlight ? `${COLOR}12` : 'rgba(255,255,255,0.03)', border: c.highlight ? `1px solid ${COLOR}50` : '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="font-display font-bold text-white mb-1" style={{ fontSize: '11px', letterSpacing: '0.2em' }}>{c.name}</div>
                  <p className="font-sans text-white/30 mb-3" style={{ fontSize: '11px' }}>{c.tagline}</p>
                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="font-display font-bold text-white" style={{ fontSize: '22px' }}>{c.price}</span>
                    <span className="text-white/30 font-sans" style={{ fontSize: '11px' }}>{c.duration}</span>
                  </div>
                  <div className="flex flex-col gap-2 flex-1 mb-6">
                    {c.includes.map((s, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span style={{ color: COLOR, fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>→</span>
                        <span className="font-sans text-white/60" style={{ fontSize: '12px' }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/fundadores" className="btn-leven btn-leven-therma w-full justify-center" style={{ borderColor: `${COLOR}50`, fontSize: '10px' }}>
                    Reservar →
                  </Link>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRATAMIENTOS ──────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: 'var(--offwhite)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Individual massages */}
            <RevealSection>
              <div className="w-8 h-px mb-6" style={{ background: COLOR }} />
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
              <div className="w-8 h-px mb-6" style={{ background: COLOR }} />
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
            <Link href="/fundadores" className="btn-leven btn-leven-therma" style={{ borderColor: `${COLOR}80`, color: COLOR }}>
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
          { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80', alt: 'Leven Therma' },
          { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', alt: 'Spa' },
          { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80', alt: 'Circuito termal' },
          { src: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?auto=format&fit=crop&w=800&q=80', alt: 'Recuperación' },
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
              <a href="https://wa.me/5493415000000?text=Hola, quiero reservar en Leven Therma" className="btn-leven" style={{ borderColor: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>
                WhatsApp
              </a>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  )
}

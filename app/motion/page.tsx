import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RevealSection from '@/components/RevealSection'
import LandingHero from '@/components/LandingHero'
import BrandImages from '@/components/BrandImages'

export const metadata: Metadata = {
  title: 'Leven Motion · Gym de Alto Rendimiento · Casa Leven Funes',
  description: 'Entrenamiento diseñado para quienes no tienen tiempo que perder. Metodología, fuerza y longevidad. Parte de Casa Leven, Funes.',
}

const COLOR = '#b23a3a'

const plans = [
  {
    name: 'STARTER',
    tagline: 'El primer paso.',
    price: 'USD 89',
    after: 'USD 120',
    services: [
      { label: 'Gym ilimitado', ok: true },
      { label: 'Vestuarios + duchas', ok: true },
      { label: 'Apto médico', ok: true },
      { label: 'Comunidad Leven', ok: true },
      { label: 'Sauna seco', ok: false },
      { label: 'Circuito hídrico', ok: false },
      { label: 'Consulta nutricional', ok: false },
      { label: 'Sesión técnica deportiva', ok: false },
    ],
  },
  {
    name: 'FLOW',
    tagline: 'Movimiento + recuperación + nutrición.',
    price: 'USD 149',
    after: 'USD 199',
    featured: true,
    services: [
      { label: 'Gym ilimitado', ok: true },
      { label: 'Vestuarios + duchas', ok: true },
      { label: 'Apto médico', ok: true },
      { label: 'Comunidad Leven', ok: true },
      { label: 'Sauna seco (4/mes)', ok: true },
      { label: 'Circuito hídrico', ok: false },
      { label: 'Consulta nutricional (1/mes)', ok: true },
      { label: 'Sesión técnica deportiva', ok: false },
    ],
  },
  {
    name: 'SPORT',
    tagline: 'Rendimiento + recuperación física.',
    price: 'USD 179',
    after: 'USD 239',
    services: [
      { label: 'Gym ilimitado', ok: true },
      { label: 'Vestuarios + duchas', ok: true },
      { label: 'Apto médico', ok: true },
      { label: 'Comunidad Leven', ok: true },
      { label: 'Sauna seco (4/mes)', ok: true },
      { label: 'Circuito hídrico completo (4/mes)', ok: true },
      { label: 'Consulta nutricional', ok: false },
      { label: 'Sesión técnica deportiva (4/mes)', ok: true },
    ],
  },
  {
    name: 'POWER SPORT',
    tagline: 'El sistema completo.',
    price: 'USD 229',
    after: 'USD 299',
    services: [
      { label: 'Gym ilimitado', ok: true },
      { label: 'Vestuarios + duchas', ok: true },
      { label: 'Apto médico', ok: true },
      { label: 'Comunidad Leven', ok: true },
      { label: 'Sauna seco (4/mes)', ok: true },
      { label: 'Circuito hídrico completo (4/mes)', ok: true },
      { label: 'Consulta nutricional (1/mes)', ok: true },
      { label: 'Sesión técnica deportiva (4/mes)', ok: true },
    ],
  },
]

export default function MotionPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────── */}
      <LandingHero
        name="LEVEN MOTION"
        unit="Movimiento"
        line1="El cuerpo"
        line2="como herramienta"
        line3="de rendimiento."
        sub="Metodología de alto rendimiento para quienes lideran en el mundo real. Resultados medibles, sin tiempo perdido."
        color={COLOR}
        logo="/logos/leven-motion.svg"
        img="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80"
      />

      {/* ─── PROPUESTA ─────────────────────────────────── */}
      <section className="py-24 md:py-36" style={{ background: 'var(--offwhite)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <RevealSection className="md:col-span-4">
              <div className="sticky top-32">
                <div className="w-8 h-px mb-6" style={{ background: COLOR }} />
                <h2 className="font-display font-bold leading-tight mb-6" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-0.01em', color: COLOR }}>
                  Diseñado para el mundo real.
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
                { title: 'Evaluación postural', body: 'Diagnóstico inicial y seguimiento trimestral para que el progreso sea concreto.' },
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
          { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', alt: 'Leven Motion' },
          { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80', alt: 'Entrenamiento' },
          { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80', alt: 'Fuerza' },
          { src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80', alt: 'Rendimiento' },
        ]}
      />

      {/* ─── MEMBRESÍAS ────────────────────────────────── */}
      <section className="grain py-24 md:py-36" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-14">
            <div className="flex items-center gap-5 mb-4">
              <div className="w-8 h-px" style={{ background: COLOR }} />
              <span className="font-display font-medium text-white/30" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>MEMBRESÍAS</span>
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.01em' }}>
              Elegí tu plan.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {plans.map((plan, i) => (
              <RevealSection key={plan.name} delay={i * 80}>
                <div className="membership-card flex flex-col h-full" style={{ background: plan.featured ? `${COLOR}10` : 'rgba(255,255,255,0.03)', borderColor: plan.featured ? COLOR : 'rgba(255,255,255,0.08)' }}>
                  {plan.featured && (
                    <div className="absolute top-0 right-0 font-display font-bold text-white" style={{ fontSize: '8px', letterSpacing: '0.2em', padding: '5px 10px', background: COLOR }}>
                      MÁS ELEGIDO
                    </div>
                  )}
                  <div className="font-display font-bold text-white mb-2" style={{ fontSize: '10px', letterSpacing: '0.25em' }}>{plan.name}</div>
                  <p className="font-sans text-white/35 mb-5" style={{ fontSize: '11px' }}>{plan.tagline}</p>

                  <div className="mb-2">
                    <span className="font-display font-bold text-white" style={{ fontSize: '34px' }}>{plan.price}</span>
                    <span className="text-white/30 font-sans" style={{ fontSize: '12px' }}>/mes</span>
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-white/20 font-sans line-through" style={{ fontSize: '11px' }}>{plan.after}</span>
                    <span className="font-display font-semibold" style={{ fontSize: '8px', letterSpacing: '0.15em', color: COLOR }}>FUNDADOR</span>
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

                  <Link href="/fundadores" className="btn-leven w-full justify-center" style={{ borderColor: `${COLOR}50`, fontSize: '10px' }}>
                    Elegir →
                  </Link>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <p className="font-sans text-white/20 text-center" style={{ fontSize: '11px' }}>
              Precios en USD. Equivalente en pesos al TC Banco Nación. Mínimo 3 meses.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="py-20" style={{ background: COLOR }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <RevealSection>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.01em' }}>
              ¿Querés ser Founder de Motion?
            </h2>
          </RevealSection>
          <RevealSection delay={150}>
            <Link href="/fundadores" className="btn-leven" style={{ borderColor: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
              Registrarme →
            </Link>
          </RevealSection>
        </div>
      </section>
    </>
  )
}

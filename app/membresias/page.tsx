import type { Metadata } from 'next'
import Link from 'next/link'
import RevealSection from '@/components/RevealSection'

export const metadata: Metadata = {
  title: 'Membresías · Casa Leven · Planes de Bienestar Integral',
  description: 'Elegí tu membresía en Casa Leven. STARTER, FLOW, SPORT y POWER SPORT. Acceso a gym, spa, nutrición y más. Funes, Argentina.',
}

const plans = [
  {
    name:     'STARTER',
    tagline:  'El primer paso.',
    price:    'USD 89',
    after:    'USD 120',
    color:    'rgba(255,255,255,0.05)',
    accentColor: 'rgba(255,255,255,0.3)',
    services: [
      { label: 'Acceso Gym (Leven Motion)', included: true },
      { label: 'Vestuarios + duchas ilimitados', included: true },
      { label: 'Apto médico', included: true },
      { label: 'Comunidad Leven', included: true },
      { label: 'Sauna seco', included: false },
      { label: 'Circuito hídrico', included: false },
      { label: 'Consulta nutricional', included: false },
      { label: 'Plan alimentación', included: false },
      { label: 'Sesión técnica deportiva', included: false },
      { label: 'Evaluación postural', included: false },
    ],
  },
  {
    name:     'FLOW',
    tagline:  'Movimiento + recuperación + nutrición.',
    price:    'USD 149',
    after:    'USD 199',
    color:    'rgba(123,132,118,0.08)',
    accentColor: '#7b8476',
    featured: true,
    services: [
      { label: 'Acceso Gym (Leven Motion)', included: true },
      { label: 'Vestuarios + duchas ilimitados', included: true },
      { label: 'Apto médico', included: true },
      { label: 'Comunidad Leven', included: true },
      { label: 'Sauna seco (4/mes)', included: true },
      { label: 'Circuito hídrico', included: false },
      { label: 'Consulta nutricional (1/mes)', included: true },
      { label: 'Plan alimentación personalizado', included: true },
      { label: 'Sesión técnica deportiva', included: false },
      { label: 'Evaluación postural', included: false },
    ],
  },
  {
    name:     'SPORT',
    tagline:  'Rendimiento + recuperación física.',
    price:    'USD 179',
    after:    'USD 239',
    color:    'rgba(93,109,126,0.08)',
    accentColor: '#5d6d7e',
    services: [
      { label: 'Acceso Gym (Leven Motion)', included: true },
      { label: 'Vestuarios + duchas ilimitados', included: true },
      { label: 'Apto médico', included: true },
      { label: 'Comunidad Leven', included: true },
      { label: 'Sauna seco (4/mes)', included: true },
      { label: 'Circuito hídrico completo (4/mes)', included: true },
      { label: 'Consulta nutricional', included: false },
      { label: 'Plan alimentación', included: false },
      { label: 'Sesión técnica deportiva (4/mes)', included: true },
      { label: 'Evaluación postural trimestral', included: true },
    ],
  },
  {
    name:     'POWER SPORT',
    tagline:  'El sistema completo. Sin restricciones.',
    price:    'USD 229',
    after:    'USD 299',
    color:    'rgba(178,58,58,0.06)',
    accentColor: '#b23a3a',
    services: [
      { label: 'Acceso Gym (Leven Motion)', included: true },
      { label: 'Vestuarios + duchas ilimitados', included: true },
      { label: 'Apto médico', included: true },
      { label: 'Comunidad Leven', included: true },
      { label: 'Sauna seco (4/mes)', included: true },
      { label: 'Circuito hídrico completo (4/mes)', included: true },
      { label: 'Consulta nutricional (1/mes)', included: true },
      { label: 'Plan alimentación personalizado', included: true },
      { label: 'Sesión técnica deportiva (4/mes)', included: true },
      { label: 'Evaluación postural trimestral', included: true },
    ],
  },
]

const durations = [
  { label: '1 mes',    discount: '',    note: 'Máxima flexibilidad' },
  { label: '3 meses',  discount: '-5%', note: 'Ahorrás un poco' },
  { label: '12 meses', discount: '-15%',note: 'Mejor precio' },
]

export default function MembresiasPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────── */}
      <section
        className="grain pt-40 pb-24"
        style={{ background: 'var(--dark)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection>
            <div className="divider mb-8" />
            <h1
              className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(40px, 7vw, 88px)', letterSpacing: '-0.02em' }}
            >
              Membresías.
            </h1>
            <p className="font-sans text-white/50 max-w-lg leading-relaxed" style={{ fontSize: '16px' }}>
              Cuatro formas de pertenecer a Casa Leven.
              Desde el primer paso hasta el sistema completo.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── DURACIÓN ──────────────────────────────────── */}
      <section
        style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        className="py-8"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
            <span
              className="font-display font-medium text-white/30"
              style={{ fontSize: '9px', letterSpacing: '0.35em', whiteSpace: 'nowrap' }}
            >
              DURACIÓN:
            </span>
            <div className="flex items-center gap-8">
              {durations.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="font-display font-medium text-white" style={{ fontSize: '13px' }}>
                    {d.label}
                  </span>
                  {d.discount && (
                    <span
                      className="font-display font-bold"
                      style={{ fontSize: '10px', color: 'var(--sage)', letterSpacing: '0.1em' }}
                    >
                      {d.discount}
                    </span>
                  )}
                  <span className="text-white/25" style={{ fontSize: '11px' }}>
                    {d.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLANES ────────────────────────────────────── */}
      <section
        className="grain py-16 md:py-24"
        style={{ background: 'var(--dark)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan, i) => (
              <RevealSection key={plan.name} delay={i * 80}>
                <div
                  className={`membership-card flex flex-col h-full ${plan.featured ? 'featured' : ''}`}
                  style={{ background: plan.color, minHeight: '600px' }}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <div
                      className="font-display font-bold text-white mb-2"
                      style={{ fontSize: '10px', letterSpacing: '0.25em' }}
                    >
                      {plan.name}
                    </div>
                    <p className="font-sans text-white/40 leading-relaxed" style={{ fontSize: '12px' }}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className="font-display font-bold text-white"
                        style={{ fontSize: '36px' }}
                      >
                        {plan.price}
                      </span>
                      <span className="font-sans text-white/30" style={{ fontSize: '13px' }}>/mes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/25 font-sans line-through" style={{ fontSize: '11px' }}>
                        {plan.after} post-apertura
                      </span>
                    </div>
                    <div className="mt-2">
                      <span
                        className="font-display font-semibold"
                        style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--terracotta)' }}
                      >
                        PRECIO FUNDADOR
                      </span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex flex-col flex-1 mb-8">
                    {plan.services.map((s, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-3 py-2"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      >
                        <span
                          style={{
                            fontSize: '12px',
                            flexShrink: 0,
                            marginTop: '1px',
                            color: s.included ? plan.accentColor : 'rgba(255,255,255,0.12)',
                          }}
                        >
                          {s.included ? '✓' : '—'}
                        </span>
                        <span
                          className="font-sans leading-snug"
                          style={{
                            fontSize: '12px',
                            color: s.included ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.2)',
                          }}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/fundadores" className="btn-leven w-full justify-center" style={{ borderColor: plan.accentColor + '60' }}>
                    Elegir {plan.name}
                  </Link>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOTA ──────────────────────────────────────── */}
      <section
        className="py-12"
        style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection>
            <p className="font-sans text-white/25 text-center leading-relaxed" style={{ fontSize: '12px' }}>
              Precios en USD. Equivalente en pesos al TC Banco Nación del día de facturación.<br />
              Mínimo 3 meses de permanencia. El primer congelamiento de membresía es gratuito para Founders.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── ¿DUDÁS? ───────────────────────────────────── */}
      <section
        className="grain py-20"
        style={{ background: 'var(--purple)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <RevealSection>
            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '-0.01em' }}
            >
              ¿No sabés por cuál empezar?
            </h2>
            <p className="font-sans text-white/50 mb-8 mx-auto" style={{ fontSize: '15px', maxWidth: '400px' }}>
              Contactanos y en 15 minutos te decimos cuál membresía se adapta mejor a tu estilo de vida.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/5493415000000?text=Hola, quiero saber qué membresía de Casa Leven es mejor para mí"
                className="btn-leven btn-leven-filled"
              >
                Consultar por WhatsApp →
              </a>
              <Link href="/fundadores" className="btn-leven">
                Registrarse como Founder
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  )
}

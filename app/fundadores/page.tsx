import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'
import RevealSection from '@/components/RevealSection'

export const metadata: Metadata = {
  title: 'Founders · Casa Leven · Precio Exclusivo Pre-Apertura',
  description: 'Sé uno de los primeros socios de Casa Leven. Precio exclusivo antes de la apertura. Beneficios únicos. Cupos limitados. Funes, Rosario.',
}

const benefits = [
  'Precio de preventa — el más bajo que va a existir en Casa Leven',
  'Acceso prioritario para reservar turnos en los horarios más demandados',
  'Invitación al evento VIP de pre-apertura (no abierto al público)',
  'Tu nombre en el muro de Founders',
  'Congelamiento de membresía gratuito el primer año',
  'Descuento permanente en servicios adicionales',
  'Acceso a visita privada guiada antes de la apertura',
]

const faqs = [
  {
    q: '¿Cuándo abre Casa Leven?',
    a: 'Junio 2026. Los Founders son notificados primero y tienen acceso prioritario.',
  },
  {
    q: '¿Hay compromiso de permanencia?',
    a: 'Mínimo 3 meses. Después, mes a mes.',
  },
  {
    q: '¿Se puede congelar la membresía?',
    a: 'Sí. Los Founders tienen una congelación gratuita el primer año.',
  },
  {
    q: '¿El pago es en pesos o en dólares?',
    a: 'En dólares o su equivalente en pesos al TC Banco Nación del día de facturación.',
  },
  {
    q: '¿Puedo visitar antes de decidir?',
    a: 'Sí. Los Founders tienen acceso a una visita privada guiada antes de la apertura.',
  },
]

export default function FoundersPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────── */}
      <section
        className="relative flex flex-col justify-between overflow-hidden"
        style={{ height: '100svh', minHeight: '600px', background: '#0a0809' }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1920&q=80"
            alt="Casa Leven Founders"
            fill priority
            className="object-cover"
            style={{ opacity: 0.22 }}
          />
        </div>
        <div className="absolute inset-0 z-[1]" style={{
          background: 'linear-gradient(to bottom, rgba(10,8,9,0.55) 0%, rgba(10,8,9,0.3) 30%, rgba(10,8,9,0.9) 85%, rgba(10,8,9,0.98) 100%)'
        }} />

        {/* Top bar */}
        <div className="relative z-[2] flex items-center justify-between px-6 md:px-14 pt-9">
          <span className="font-display font-semibold text-white/25" style={{ fontSize: '9px', letterSpacing: '0.4em' }}>
            PROGRAMA EXCLUSIVO
          </span>
          <span className="font-display font-light text-white/20" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
            CASA LEVEN · 2026
          </span>
        </div>

        {/* Main content — bottom */}
        <div className="relative z-[2] px-6 md:px-14 pb-14 md:pb-16">

          {/* Editorial grid: big number + headline */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end mb-10">

            {/* Large decorative ordinal */}
            <div className="hidden md:block md:col-span-2">
              <span
                className="font-display font-bold"
                style={{ fontSize: '120px', lineHeight: 1, color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.05em', userSelect: 'none' }}
              >
                01
              </span>
            </div>

            {/* Headline */}
            <div className="md:col-span-7">
              <h1 className="font-display font-bold text-white leading-[0.95]"
                style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', letterSpacing: '-0.03em' }}>
                El privilegio<br />
                de pertenecer<br />
                <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--sage)', fontSize: '0.82em', letterSpacing: '-0.01em' }}>
                  desde el origen.
                </span>
              </h1>
            </div>

            {/* Right: description + CTA */}
            <div className="md:col-span-3 flex flex-col gap-5 md:pb-2">
              <p className="font-sans text-white/40 leading-relaxed" style={{ fontSize: '13px' }}>
                Acceso irrepetible, precio que no vuelve, y el privilegio de elegir Casa Leven antes que todos.
              </p>
              <Link
                href="#registro"
                className="btn-leven btn-leven-filled self-start"
                style={{ fontSize: '10px', padding: '12px 24px' }}
              >
                Quiero pertenecer →
              </Link>
            </div>
          </div>

          {/* Bottom line: urgency */}
          <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--sage)', flexShrink: 0 }} />
            <p className="font-display font-light text-white/30" style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
              Los cupos son limitados. Cuando se cierren, no se reabren.
            </p>
          </div>
        </div>
      </section>

      {/* ─── BENEFICIOS ────────────────────────────────── */}
      <section
        className="grain py-24 md:py-32"
        style={{ background: 'var(--purple)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <RevealSection>
              <div className="divider mb-6" />
              <h2
                className="font-display font-bold text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.01em' }}
              >
                No es llegar primero.<br />
                Es pertenecer de otra forma.
              </h2>
              <p className="font-sans text-white/50 leading-relaxed" style={{ fontSize: '15px' }}>
                Casa Leven tiene capacidad para un número acotado de socios.
                Los Founders acceden a los beneficios más exclusivos del sistema
                — aquellos que no estarán disponibles una vez que las puertas abran.
              </p>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="flex flex-col gap-0">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-4"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <span style={{ color: 'var(--sage)', fontSize: '14px', marginTop: '1px', flexShrink: 0 }}>✓</span>
                    <p className="font-sans text-white/70 leading-relaxed" style={{ fontSize: '14px' }}>
                      {b}
                    </p>
                  </div>
                ))}
                <div className="mt-6 p-4" style={{ background: 'rgba(175,47,61,0.08)', border: '1px solid rgba(175,47,61,0.2)' }}>
                  <p className="font-sans" style={{ fontSize: '13px', color: '#af2f3d' }}>
                    Los cupos son limitados y no se reabren una vez cerrados.
                  </p>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─── PLANES ────────────────────────────────────── */}
      <section
        className="py-24 md:py-32"
        style={{ background: 'var(--dark)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-12">
            <div className="flex items-center gap-6 mb-4">
              <div className="divider" />
              <span className="font-display font-medium text-white/30" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>
                PLANES FOUNDERS
              </span>
            </div>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.01em' }}
            >
              Elegí tu membresía fundadora.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                name:       'STARTER',
                price:      'USD 89',
                after:      'USD 120',
                color:      'rgba(255,255,255,0.1)',
                services:   ['Gym ilimitado', 'Vestuarios + duchas', 'Apto médico', 'Comunidad Leven'],
              },
              {
                name:       'FLOW',
                price:      'USD 149',
                after:      'USD 199',
                color:      'rgba(123,132,118,0.15)',
                featured:   true,
                services:   ['Todo STARTER', 'Sauna seco (4/mes)', 'Consulta nutricional', 'Plan alimentación'],
              },
              {
                name:       'SPORT',
                price:      'USD 179',
                after:      'USD 239',
                color:      'rgba(93,109,126,0.15)',
                services:   ['Todo STARTER', 'Circuito hídrico completo (4/mes)', 'Sesiones técnicas (4/mes)', 'Evaluación postural'],
              },
              {
                name:       'POWER SPORT',
                price:      'USD 229',
                after:      'USD 299',
                color:      'rgba(178,58,58,0.1)',
                services:   ['El sistema completo', 'Gym + Therma + Nourish', 'Todas las sesiones incluidas', 'Sin restricciones'],
              },
            ].map((plan, i) => (
              <RevealSection key={plan.name} delay={i * 80}>
                <div
                  className={`membership-card flex flex-col h-full ${plan.featured ? 'featured' : ''}`}
                  style={{ background: plan.color }}
                >
                  <div
                    className="font-display font-bold text-white mb-4"
                    style={{ fontSize: '10px', letterSpacing: '0.25em' }}
                  >
                    {plan.name}
                  </div>

                  <div className="mb-1">
                    <span
                      className="font-display font-bold text-white"
                      style={{ fontSize: 'clamp(28px, 3vw, 36px)' }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-white/30 font-sans" style={{ fontSize: '12px' }}>/mes</span>
                  </div>
                  <div className="mb-6 flex items-center gap-2">
                    <span className="text-white/30 font-sans line-through" style={{ fontSize: '11px' }}>{plan.after}</span>
                    <span
                      className="font-display font-semibold"
                      style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'var(--terracotta)' }}
                    >
                      PRECIO FUNDADOR
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 flex-1 mb-6">
                    {plan.services.map((s, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span style={{ color: 'var(--sage)', fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                        <span className="font-sans text-white/60" style={{ fontSize: '13px' }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <p className="font-sans text-white/25 text-center" style={{ fontSize: '12px' }}>
              Precios en USD. Equivalente en pesos al TC Banco Nación del día de facturación. Mínimo 3 meses de permanencia.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ─── FORMULARIO ────────────────────────────────── */}
      <section
        id="registro"
        className="grain py-24 md:py-36"
        style={{ background: 'var(--purple)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <RevealSection className="md:col-span-4">
              <div className="sticky top-32">
                <div className="divider mb-6" />
                <h2
                  className="font-display font-bold text-white leading-tight mb-6"
                  style={{ fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.01em' }}
                >
                  Reservá tu lugar ahora.
                </h2>
                <p className="font-sans text-white/50 leading-relaxed" style={{ fontSize: '14px' }}>
                  Completá el formulario y nos ponemos en contacto
                  para confirmar tu membresía.
                  Sin compromiso de pago.
                </p>
                <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="font-display font-light text-white/30" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
                    TAMBIÉN POR WHATSAPP
                  </p>
                  <a
                    href="https://wa.me/5493415000000?text=Hola, quiero información sobre los Founders de Casa Leven"
                    className="mt-3 font-sans text-white/60 hover:text-white transition-colors block link-hover"
                    style={{ fontSize: '14px' }}
                  >
                    Contactar directo →
                  </a>
                </div>
              </div>
            </RevealSection>

            <RevealSection className="md:col-span-8" delay={200}>
              <LeadForm
                fuente="Landing Page Founder"
                canal="Sitio Web"
              />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────── */}
      <section
        className="py-24 md:py-32"
        style={{ background: 'var(--dark)' }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <RevealSection className="mb-12">
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '-0.01em' }}
            >
              Preguntas frecuentes.
            </h2>
          </RevealSection>

          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <RevealSection
                key={i}
                delay={i * 60}
                className="py-6"
                // @ts-expect-error inline style
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p
                    className="font-display font-medium text-white"
                    style={{ fontSize: '15px' }}
                  >
                    {faq.q}
                  </p>
                  <p className="font-sans text-white/50 leading-relaxed" style={{ fontSize: '14px' }}>
                    {faq.a}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

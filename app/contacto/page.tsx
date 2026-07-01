import type { Metadata } from 'next'
import RevealSection from '@/components/RevealSection'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Contacto · Casa Leven · Funes, Argentina',
  description: 'Escribinos. Te contamos todo sobre Casa Leven, membresías y próxima apertura.',
}

export default function ContactoPage() {
  return (
    <>
      <section
        className="grain py-32 md:py-44"
        style={{ background: 'var(--purple)', minHeight: '100svh' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

            <RevealSection className="md:col-span-4">
              <div className="sticky top-32">
                <p className="font-display font-medium text-white/30 mb-6" style={{ fontSize: '9px', letterSpacing: '0.4em' }}>
                  CONTACTO
                </p>
                <h1
                  className="font-display font-bold text-white leading-tight mb-6"
                  style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}
                >
                  Escribinos.<br />Te respondemos.
                </h1>
                <p className="font-sans text-white/50 leading-relaxed mb-10" style={{ fontSize: '14px' }}>
                  Completá el formulario y nos ponemos en contacto a la brevedad.
                  Sin compromiso.
                </p>

                <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="font-display font-light text-white/30 mb-3" style={{ fontSize: '9px', letterSpacing: '0.3em' }}>
                    TAMBIÉN POR WHATSAPP
                  </p>
                  <a
                    href="https://wa.me/5493415000000?text=Hola, quiero información sobre Casa Leven"
                    className="font-sans text-white/60 hover:text-white transition-colors block link-hover"
                    style={{ fontSize: '14px' }}
                  >
                    Contactar directo →
                  </a>
                </div>
              </div>
            </RevealSection>

            <RevealSection className="md:col-span-8" delay={200}>
              <LeadForm
                fuente="Página de Contacto"
                canal="Sitio Web"
              />
            </RevealSection>

          </div>
        </div>
      </section>
    </>
  )
}

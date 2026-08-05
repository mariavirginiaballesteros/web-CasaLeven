import RevealSection from '@/components/RevealSection'

export type FaqItem = { q: string; a: string }

/**
 * Bloque de preguntas frecuentes en texto plano y visible.
 * Es la pieza clave de GEO: los motores de IA citan respuestas
 * cortas, literales y en lenguaje natural. Nada de acordeones
 * que escondan el texto detrás de JavaScript.
 */
export default function FaqBlock({
  items,
  color,
  title = 'Preguntas frecuentes',
  background = 'var(--offwhite)',
}: {
  items: FaqItem[]
  color: string
  title?: string
  background?: string
}) {
  return (
    <section className="py-20 md:py-28" style={{ background }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <RevealSection className="mb-10">
          <span
            className="font-display font-medium block mb-3"
            style={{ fontSize: '9px', letterSpacing: '0.35em', color: `${color}` }}
          >
            PREGUNTAS FRECUENTES
          </span>
          <h2
            className="font-display font-bold text-leven-purple"
            style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', letterSpacing: '-0.01em' }}
          >
            {title}
          </h2>
        </RevealSection>

        <div className="flex flex-col">
          {items.map((f, i) => (
            <RevealSection key={i} delay={i * 60}>
              <div
                className="py-6"
                style={{ borderBottom: '1px solid rgba(46,39,53,0.1)' }}
              >
                <h3
                  className="font-display font-bold text-leven-purple mb-2"
                  style={{ fontSize: '15px', letterSpacing: '0.01em' }}
                >
                  {f.q}
                </h3>
                <p
                  className="font-sans text-leven-purple/60 leading-relaxed"
                  style={{ fontSize: '14px' }}
                >
                  {f.a}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

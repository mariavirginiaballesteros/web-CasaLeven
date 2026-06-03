import Image from 'next/image'
import Link from 'next/link'
import HeroHome from '@/components/HeroHome'
import RevealSection from '@/components/RevealSection'
import DoorAnimation from '@/components/DoorAnimation'

const units = [
  {
    id:    'motion',
    name:  'LEVEN MOTION',
    label: 'Movimiento',
    line1: 'El cuerpo que se mueve bien',
    line2: 'decide mejor.',
    copy:  'Entrenamiento con criterio para quienes exigen resultados reales. Metodología, progresión y la guía de quien entiende el cuerpo como herramienta de rendimiento.',
    color: '#af2f3d',
    href:  '/motion',
    logo:  '/logos/leven-motion.svg',
    img:   'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id:    'therma',
    name:  'LEVEN THERMA',
    label: 'Recuperación',
    line1: 'Los que más rinden',
    line2: 'saben cuándo parar.',
    copy:  'Recuperación profunda. Circuitos termales, masajes con protocolo y tratamientos pensados para devolver el equilibrio con precisión.',
    color: '#526478',
    href:  '/therma',
    logo:  '/logos/leven-therma.svg',
    img:   'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id:    'nourish',
    name:  'LEVEN NOURISH',
    label: 'Nutrición',
    line1: 'El combustible que elegís',
    line2: 'determina la energía que tenés.',
    copy:  'Nutrición funcional con propósito. Aguas internacionales, jugos naturales y alimentos Esenio. Ingredientes que el cuerpo reconoce.',
    color: '#6a7a6b',
    href:  '/nourish',
    logo:  '/logos/leven-nourish.svg',
    img:   'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
  },
]

const marqueeItems = [
  'MOVIMIENTO', '·', 'RECUPERACIÓN', '·', 'NUTRICIÓN', '·',
  'FUERZA', '·', 'EQUILIBRIO', '·', 'MÉTODO', '·',
  'MOVIMIENTO', '·', 'RECUPERACIÓN', '·', 'NUTRICIÓN', '·',
  'FUERZA', '·', 'EQUILIBRIO', '·', 'MÉTODO', '·',
]

export default function HomePage() {
  return (
    <>
      {/* ─── HERO (client component) ───────────────────── */}
      <HeroHome />

      {/* ─── MARQUEE ───────────────────────────────────── */}
      <div className="overflow-hidden py-[14px]" style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="marquee-inner whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-display font-light inline-block mx-5" style={{ fontSize: '10px', letterSpacing: '0.35em', color: item === '·' ? '#af2f3d' : 'rgba(255,255,255,0.18)' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── NARRATIVA ─────────────────────────────────── */}
      <section className="py-28 md:py-44" style={{ background: 'var(--offwhite)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <RevealSection className="md:col-span-3 md:pt-2">
              <div className="divider mb-5" style={{ background: '#2e2735' }} />
              <span className="font-display font-medium text-leven-purple/35" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>
                POR QUÉ EXISTIMOS
              </span>
              <DoorAnimation />
            </RevealSection>

            <div className="md:col-span-9">
              {[
                { text: 'Decidís mucho.', w: 700, d: 0 },
                { text: 'Sostenés equipos.', w: 700, d: 100 },
                { text: 'Construís cosas que importan.', w: 700, d: 200 },
                { text: 'Y el cuerpo lo siente.', w: 300, d: 340, muted: true },
              ].map(({ text, w, d, muted }) => (
                <RevealSection key={text} delay={d}>
                  <p className="font-display leading-[1.0] mb-2 text-leven-purple" style={{ fontSize: 'clamp(28px, 4.2vw, 58px)', fontWeight: w, color: muted ? 'rgba(46,39,53,0.28)' : '#2e2735' }}>
                    {text}
                  </p>
                </RevealSection>
              ))}
              <RevealSection delay={500} className="mt-10">
                <div className="w-8 h-px mb-6" style={{ background: '#af2f3d' }} />
                <p className="font-sans text-leven-purple/55 leading-relaxed max-w-lg" style={{ fontSize: '16px' }}>
                  Casa Leven fue diseñada para ese momento. El lugar donde la energía se gestiona, la recuperación es la meta.<br /><br />
                  Un refugio que conoce tu ritmo.<br />
                  Una casa donde sentirte cuidado.
                </p>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RADISSON RED CREDENCIAL ───────────────────── */}
      <div style={{ background: '#2e2735' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-display font-bold text-white" style={{ fontSize: 'clamp(16px, 2vw, 22px)', letterSpacing: '-0.01em' }}>
                Dentro del Radisson RED Funes.
              </p>
              <p className="font-sans text-white/45 leading-relaxed" style={{ fontSize: '13px', maxWidth: '480px' }}>
                Casa Leven opera dentro de uno de los hoteles de mayor estándar internacional de la región.
                Arquitectura premium, seguridad y servicio de clase mundial — como contexto de tu bienestar.
              </p>
            </div>
            <a
              href="https://www.instagram.com/radissonredfunes/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-leven shrink-0"
              style={{ fontSize: '10px', borderColor: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}
            >
              Ver el hotel →
            </a>
          </div>
        </div>
      </div>

      {/* ─── SISTEMA ───────────────────────────────────── */}
      <section id="sistema" className="grain py-24 md:py-36" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <RevealSection className="mb-16">
            <div className="flex items-center gap-5 mb-4">
              <div className="divider" />
              <span className="font-display font-medium text-white/25" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>EL SISTEMA</span>
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
              Tres espacios. Un método.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
            {units.map((unit, i) => (
              <RevealSection key={unit.id} delay={i * 120} className="group">
                <Link href={unit.href} className="block">
                  <div className="img-hover relative mb-6 overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <Image src={unit.img} alt={unit.name} fill className="object-cover opacity-45 group-hover:opacity-70 transition-opacity duration-700" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${unit.color}55 0%, transparent 55%)` }} />
                    <div className="absolute top-5 left-5">
                      <span className="font-display font-semibold" style={{ fontSize: '9px', letterSpacing: '0.3em', color: unit.color, padding: '4px 9px', background: `${unit.color}15`, border: `1px solid ${unit.color}35` }}>
                        {unit.label.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(17px, 2vw, 22px)' }}>
                        {unit.line1}<br />{unit.line2}
                      </p>
                    </div>
                  </div>

                  <div style={{ borderTop: `1px solid ${unit.color}28`, paddingTop: '18px' }}>
                    <div className="mb-3">
                      <Image src={unit.logo} alt={unit.name} width={150} height={58} style={{ filter: 'brightness(0) invert(1)', opacity: 0.75, height: 'auto' }} />
                    </div>
                    <p className="font-sans text-white/40 leading-relaxed mb-4" style={{ fontSize: '13px' }}>{unit.copy}</p>
                    <span className="link-hover font-display font-medium" style={{ fontSize: '10px', letterSpacing: '0.22em', color: unit.color }}>EXPLORAR →</span>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EL REFUGIO ────────────────────────────────── */}
      <section className="grain py-28 md:py-48" style={{ background: '#09080a' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-14 text-center">
          <RevealSection>
            <p className="font-display font-light text-white/15 mb-12" style={{ fontSize: '10px', letterSpacing: '0.5em' }}>CASA LEVEN</p>
            <blockquote className="font-display font-light text-white leading-[1.05]" style={{ fontSize: 'clamp(26px, 4.5vw, 58px)', letterSpacing: '-0.01em' }}>
              "Porque incluso quienes<br />
              sostienen el mundo<br />
              necesitan un lugar<br />
              <em style={{ color: 'var(--sage)', fontStyle: 'italic' }}>donde sostenerse."</em>
            </blockquote>
          </RevealSection>
        </div>
      </section>

      {/* ─── FOUNDERS ─────────────────────────── */}
      <section className="grain relative overflow-hidden py-28 md:py-44" style={{ background: 'var(--purple)' }}>
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1574271143515-5cddf8da19be?auto=format&fit=crop&w=1920&q=80" alt="" fill className="object-cover" style={{ opacity: 0.08 }} />
        </div>
        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(135deg, rgba(46,39,53,0.92) 0%, rgba(13,11,14,0.96) 100%)' }} />

        <div className="relative z-[2] max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <RevealSection>
              <div className="divider mb-8" />
              <p className="font-display font-light text-white/30 mb-3" style={{ fontSize: '10px', letterSpacing: '0.4em' }}>PROGRAMA EXCLUSIVO</p>
              <h2 className="font-display font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-0.02em' }}>
                Antes de que el mundo<br />descubra Casa Leven,<br />
                <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--sage)' }}>algunos ya viven aquí.</em>
              </h2>
              <p className="font-sans text-white/45 leading-relaxed mb-10" style={{ fontSize: '15px', maxWidth: '400px' }}>
                Los Founders son quienes eligen Casa Leven
                en su forma más exclusiva: con acceso irrepetible,
                precio que no vuelve, y el privilegio de pertenecer desde el origen.
              </p>
              <Link href="/fundadores" className="btn-leven btn-leven-filled" style={{ fontSize: '11px', padding: '18px 44px' }}>
                Quiero pertenecer →
              </Link>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="flex flex-col">
                {[
                  'El precio más bajo que existirá en Casa Leven',
                  'Prioridad absoluta en agenda y horarios',
                  'Evento privado de pre-apertura — solo por invitación',
                  'Tu nombre en el muro de los que estuvieron desde el inicio',
                  'Congelamiento gratuito el primer año',
                  'Descuentos permanentes en servicios adicionales',
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-4 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ color: 'var(--sage)', fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>✓</span>
                    <p className="font-sans text-white/55" style={{ fontSize: '14px' }}>{b}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>
    </>
  )
}

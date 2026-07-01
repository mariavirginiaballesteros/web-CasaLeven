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
    color: '#b23a3a',
    href:  '/motion',
    logo:  '/logos/leven-motion.svg',
    img:   '/images/gimnasio/leven-gimnasio-person-18.jpg',
  },
  {
    id:    'therma',
    name:  'LEVEN THERMA',
    label: 'Recuperación',
    line1: 'Los que más rinden',
    line2: 'saben cuándo parar.',
    copy:  'Recuperación profunda. Circuitos termales, masajes con protocolo y tratamientos pensados para devolver el equilibrio con precisión.',
    color: '#5d6d7e',
    href:  '/therma',
    logo:  '/logos/leven-therma.svg',
    img:   '/images/spa/leven-spa-close-10.jpg',
  },
  {
    id:    'nourish',
    name:  'LEVEN NOURISH',
    label: 'Nutrición',
    line1: 'El combustible que elegís',
    line2: 'determina la energía que tenés.',
    copy:  'Nutrición funcional con propósito. Aguas internacionales, jugos naturales y alimentos Esenio. Ingredientes que el cuerpo reconoce.',
    color: '#7b8476',
    href:  '/nourish',
    logo:  '/logos/leven-nourish.svg',
    img:   '/images/bar/leven-bar-person-12.jpg',
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
            <span key={i} className="font-display font-light inline-block mx-5" style={{ fontSize: '10px', letterSpacing: '0.35em', color: item === '·' ? '#b23a3a' : 'rgba(255,255,255,0.18)' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── NARRATIVA ─────────────────────────────────── */}
      <section className="py-28 md:py-44" style={{ background: 'var(--offwhite)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <RevealSection className="md:col-span-4 md:pt-2 flex flex-col items-center md:items-start text-center md:text-left">

              <span className="font-display font-medium text-leven-purple/35" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>
                POR QUÉ EXISTIMOS
              </span>
              <DoorAnimation />
            </RevealSection>

            <div className="md:col-span-8">
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
              <div className="flex items-center gap-0 mb-2">
                <span className="font-display font-bold" style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#fff', background: '#1a1a1a', padding: '4px 9px' }}>RADISSON</span>
                <span className="font-display font-bold" style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#fff', background: '#e31837', padding: '4px 9px' }}>RED</span>
              </div>
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
                    <Image src={unit.img} alt={unit.name} fill className="object-cover transition-opacity duration-700" />
                    <div className="absolute inset-0 flex items-end pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)' }}>
                      <div className="px-7 pb-8 w-full">
                        <p className="font-display font-bold text-white leading-none" style={{ fontSize: 'clamp(52px, 7vw, 80px)', letterSpacing: '-0.03em', opacity: 0.18 }}>
                          {unit.id === 'motion' ? 'GYM' : unit.id === 'therma' ? 'SPA' : 'BAR'}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-center px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: unit.color }}>
                      <p className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(19px, 2.5vw, 26px)' }}>
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

      {/* ─── LO QUE ENCONTRÁS ─────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: 'var(--offwhite)', borderTop: '1px solid rgba(46,39,53,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <RevealSection className="mb-12">
            <div className="flex items-center gap-5">
              <span className="font-display font-medium text-leven-purple/30" style={{ fontSize: '9px', letterSpacing: '0.35em' }}>LO QUE ENCONTRÁS</span>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: '1px solid rgba(46,39,53,0.08)', background: 'rgba(46,39,53,0.08)' }}>
            {[
              { label: 'Gym con metodología',                                   sub: 'Entrenamiento con criterio y progresión real',                                icon: '◈', color: '#b23a3a' },
              { label: 'Sauna finlandés',                                       sub: 'Calor seco de alto rendimiento para la recuperación',                         icon: '◈', color: '#b23a3a' },
              { label: 'Circuito hídrico frío-calor',                          sub: 'Contraste térmico, reducción de inflamación y stress',                        icon: '◈', color: '#5d6d7e' },
              { label: 'Masajes con protocolo',                                 sub: 'Deportivo, relajación profunda y descontracturante',                          icon: '◈', color: '#5d6d7e' },

              { label: 'Tratamientos faciales',                                 sub: 'Skincare de resultado en entorno de wellness premium',                        icon: '◈', color: '#7b8476' },
              { label: 'Tratamientos cognitivos de técnica en el deporte',      sub: 'Psicología deportiva y entrenamiento mental para el rendimiento',             icon: '◈', color: '#b23a3a' },
              { label: 'Acompañamiento nutricional y médico',                   sub: 'Seguimiento integral de salud con equipo profesional',                        icon: '◈', color: '#7b8476' },
              { label: 'Tratamientos hídricos termales y camino Kneipp',        sub: 'Hidroterapia y contraste térmico para la recuperación profunda',              icon: '◈', color: '#5d6d7e' },
              { label: 'Reprogramación de hábitos alimentarios por hipnosis',   sub: 'Técnica mente-cuerpo para transformar la relación con la alimentación',      icon: '◈', color: '#7b8476' },
            ].map((item, i) => (
              <RevealSection key={item.label} delay={i * 70}>
                <div className="flex flex-col gap-3 p-7 md:p-8 h-full" style={{ background: 'var(--offwhite)' }}>
                  <span style={{ fontSize: '10px', color: item.color, letterSpacing: '0.1em' }}>{item.icon}</span>
                  <p className="font-display font-semibold text-leven-purple leading-tight" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                    {item.label}
                  </p>
                  <p className="font-sans text-leven-purple/45 leading-relaxed" style={{ fontSize: '13px' }}>
                    {item.sub}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={200} className="mt-8 flex justify-center">
            <Link href="/therma" className="font-display font-medium text-leven-purple/30 hover:text-leven-purple/60 transition-colors" style={{ fontSize: '10px', letterSpacing: '0.25em' }}>
              VER TODOS LOS SERVICIOS →
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ─── EL REFUGIO ────────────────────────────────── */}
      <section className="grain py-28 md:py-48" style={{ background: '#09080a' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-14 text-center">
          <RevealSection>
            <p className="font-display text-white/15 mb-12" style={{ fontSize: '10px', letterSpacing: '0.5em' }}>CASA LEVEN</p>
            <blockquote className="font-display font-light text-white leading-[1.05]" style={{ fontSize: 'clamp(26px, 4.5vw, 58px)', letterSpacing: '-0.01em' }}>
              "Porque incluso quienes<br />
              sostienen el mundo<br />
              necesitan un lugar<br />
              <em style={{ color: '#ffffff', fontWeight: 700 }}>donde sostenerse".</em>
            </blockquote>
          </RevealSection>
          <RevealSection delay={300}>
            <div className="mt-14">
              <Link href="/contacto" className="btn-leven btn-leven-filled" style={{ fontSize: '11px', padding: '16px 40px', background: '#ffffff', borderColor: '#ffffff', color: '#1c1519' }}>
                Quiero pertenecer →
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── CÓMO LLEGAR ──────────────────────── */}
      <section id="como-llegar" className="py-24 md:py-32" style={{ background: 'var(--dark)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <RevealSection className="mb-12">
            <div className="flex items-center gap-6 mb-4">
              <span className="font-display font-medium text-white/30" style={{ fontSize: '9px', letterSpacing: '0.38em' }}>UBICACIÓN</span>
            </div>
            <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.02em' }}>
              Cómo llegar.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

            {/* Info column */}
            <RevealSection className="flex flex-col justify-between gap-8">
              <div>
                <p className="font-sans text-white/45 leading-relaxed mb-8" style={{ fontSize: '15px', maxWidth: '380px' }}>
                  Casa Leven está dentro del Radisson RED Funes. A minutos del centro de Rosario, en un entorno diseñado para desconectarse del ruido.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <span style={{ color: 'var(--terracotta)', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>◈</span>
                    <div>
                      <p className="font-display font-medium text-white/80 mb-0.5" style={{ fontSize: '13px', letterSpacing: '0.05em' }}>RADISSON RED FUNES</p>
                      <p className="hidden md:block font-sans text-white/35" style={{ fontSize: '13px' }}>Funes, Santa Fe, Argentina</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span style={{ color: 'var(--sage)', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>◈</span>
                    <div>
                      <p className="font-display font-medium text-white/80 mb-0.5" style={{ fontSize: '13px', letterSpacing: '0.05em' }}>ACCESO VEHICULAR</p>
                      <p className="font-sans text-white/35" style={{ fontSize: '13px' }}>Estacionamiento propio disponible</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/jye7PA8gcgD8PJZRA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-leven btn-leven-filled self-start flex items-center gap-3"
                style={{ fontSize: '11px', padding: '16px 32px', background: '#ffffff', borderColor: '#ffffff', color: '#1c1519' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                Ver en Google Maps →
              </a>
            </RevealSection>

            {/* Map card */}
            <RevealSection delay={150}>
              <a
                href="https://maps.app.goo.gl/jye7PA8gcgD8PJZRA"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden"
                style={{
                  minHeight: '280px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transition: 'border-color 0.3s ease',
                }}
              >
                {/* Decorative map-like background */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(46,39,53,0.6) 0%, rgba(13,11,14,0.8) 100%)',
                }}/>
                {/* Grid lines suggesting a map */}
                <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} preserveAspectRatio="none">
                  <defs>
                    <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapgrid)"/>
                  {/* Stylised road lines */}
                  <line x1="0" y1="55%" x2="100%" y2="55%" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5"/>
                  <line x1="38%" y1="0" x2="38%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                  <line x1="65%" y1="0" x2="65%" y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
                  <line x1="0" y1="30%" x2="100%" y2="30%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
                  {/* Pin marker */}
                  <circle cx="50%" cy="50%" r="22" fill="rgba(178,58,58,0.15)" stroke="rgba(178,58,58,0.3)" strokeWidth="1"/>
                  <circle cx="50%" cy="50%" r="8" fill="#b23a3a" opacity="0.9"/>
                  <circle cx="50%" cy="50%" r="3" fill="white" opacity="0.9"/>
                </svg>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(10,8,9,0.55)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  <span className="font-display font-medium text-white/80" style={{ fontSize: '11px', letterSpacing: '0.25em' }}>ABRIR MAPA</span>
                </div>
                {/* Bottom label — hidden on mobile (already shown in info column above) */}
                <div className="hidden md:block absolute bottom-0 left-0 right-0 px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,8,9,0.7)' }}>
                  <p className="font-display font-medium text-white/60" style={{ fontSize: '11px', letterSpacing: '0.12em' }}>RADISSON RED FUNES · FUNES, ARGENTINA</p>
                </div>
              </a>
            </RevealSection>

          </div>
        </div>
      </section>

    </>
  )
}

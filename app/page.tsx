import Image from 'next/image'
import Link from 'next/link'
import HeroHome from '@/components/HeroHome'
import RevealSection from '@/components/RevealSection'
import DoorAnimation from '@/components/DoorAnimation'
import FaqBlock from '@/components/FaqBlock'
import JsonLd from '@/components/JsonLd'
import { PLANES, CIRCUITOS, CAMPANA_VERANO, SITE, ars, porMes } from '@/data/leven'

const FAQ_HOME = [
  {
    q: '¿Qué es Casa Leven?',
    a: 'Casa Leven es un espacio integral de bienestar en Funes, Santa Fe, que reúne tres unidades bajo un mismo método: Leven Motion (gimnasio de alto rendimiento con aforo limitado), Leven Therma (spa con circuito hídrico, masajes y faciales) y Leven Nourish (nutrición funcional). No es un spa, ni un gimnasio, ni un bar saludable por separado: los tres pilares están conectados.',
  },
  {
    q: '¿Dónde queda Casa Leven?',
    a: `Casa Leven funciona dentro del ${SITE.direccion.edificio}, en ${SITE.direccion.calle}, ${SITE.direccion.ciudad}, provincia de ${SITE.direccion.provincia}, Argentina (${SITE.direccion.ruta}). Queda a 20 minutos del centro de Rosario por autopista y a 10 minutos del aeropuerto de Fisherton. Atiende a socios, visitantes externos y huéspedes del hotel.`,
  },
  {
    q: '¿Casa Leven tiene tratamientos estéticos?',
    a: 'Sí. La línea estética de Leven Therma combina el circuito de aguas del spa con aparatología: radiofrecuencia con vacum, presoterapia, termoterapia y ozono. También hay un circuito de recuperación deportiva de 4 horas para personas que entrenan. En ambos casos el primer paso es una consulta sin cargo con un profesional, que arma el tratamiento a medida.',
  },
  {
    q: '¿Cuánto cuesta ser socio de Casa Leven?',
    a: `Las membresías mensuales van de ${ars(PLANES[0].precios.mensual)} a ${ars(PLANES[PLANES.length - 1].precios.mensual)} según el plan. Contratando 12 meses el valor mensual baja: el plan más accesible queda en ${ars(porMes(PLANES[0].precios.anual, 12))} por mes. Todas incluyen gimnasio ilimitado.`,
  },
  {
    q: '¿Puedo ir sin ser socio?',
    a: `Sí. Leven Therma tiene day pass de spa: ${CIRCUITOS[0].name}, un circuito de ${CIRCUITOS[0].duracion}, y opciones más largas. También se pueden reservar masajes y tratamientos faciales individuales.`,
  },
  {
    q: '¿Cómo reservo un turno?',
    a: 'Los turnos de spa, masajes y tratamientos se reservan desde la sección de reservas del sitio o por WhatsApp. El aforo es limitado, así que conviene reservar con anticipación.',
  },
]

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
    copy:  'Nutrición funcional con propósito. Aguas internacionales, jugos naturales y comida saludable elaborada por chefs especializados. Ingredientes que el cuerpo reconoce.',
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
      <HeroHome verano={CAMPANA_VERANO.activa} />

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

      {/* ─── BANDA ACTIVÁ EL VERANO (campaña temporal) ──
          Se cae sola con CAMPANA_VERANO.activa = false. */}
      {CAMPANA_VERANO.activa && (
        <a
          href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(CAMPANA_VERANO.whatsappTexto)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative overflow-hidden"
          style={{ background: '#0a0809' }}
        >
          <Image src={CAMPANA_VERANO.img.banda} alt="" fill sizes="100vw" className="object-cover" style={{ opacity: 0.22, objectPosition: '50% 35%' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(10,8,9,0.85) 0%, rgba(10,8,9,0.35) 60%, rgba(178,58,58,0.35) 100%)' }} />
          <div className="relative max-w-7xl mx-auto px-6 md:px-14 py-5 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image src={CAMPANA_VERANO.img.sello} alt="" width={44} height={44} style={{ borderRadius: '50%', width: '40px', height: '40px', flexShrink: 0 }} />
              <div>
                <p className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(15px, 1.8vw, 20px)', letterSpacing: '-0.01em' }}>
                  {CAMPANA_VERANO.hook}
                </p>
                <p className="font-display" style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
                  {CAMPANA_VERANO.nombre.toUpperCase()} · {CAMPANA_VERANO.vigencia.toUpperCase()} · CLASE DE CORTESÍA SIN CARGO
                </p>
              </div>
            </div>
            <span className="btn-leven btn-leven-filled self-start md:self-auto" style={{ fontSize: '10px', padding: '12px 24px', background: '#ffffff', borderColor: '#ffffff', color: '#1c1519', whiteSpace: 'nowrap' }}>
              {CAMPANA_VERANO.cta} →
            </span>
          </div>
        </a>
      )}

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
              { label: 'Estética corporal con aparatología',                   sub: 'Radiofrecuencia con vacum, presoterapia, termoterapia y ozono. Consulta sin cargo', icon: '◈', color: '#5d6d7e', href: '/therma#estetica' },
              { label: 'Acompañamiento nutricional y médico',                   sub: 'Seguimiento integral de salud con equipo profesional',                        icon: '◈', color: '#7b8476' },
              { label: 'Tratamientos hídricos termales y camino Kneipp',        sub: 'Hidroterapia y contraste térmico para la recuperación profunda',              icon: '◈', color: '#5d6d7e' },
              { label: 'Recuperación deportiva · circuito de 4 horas',          sub: 'Sauna, ducha escocesa, hidroterapia y pulsos magnéticos para cuerpos que entrenan', icon: '◈', color: '#5d6d7e', href: '/therma#estetica' },
            ].map((item, i) => (
              <RevealSection key={item.label} delay={i * 70}>
                {(() => {
                  const inner = (
                    <div className="flex flex-col gap-3 p-7 md:p-8 h-full" style={{ background: 'var(--offwhite)' }}>
                      <span style={{ fontSize: '10px', color: item.color, letterSpacing: '0.1em' }}>{item.icon}</span>
                      <p className="font-display font-semibold text-leven-purple leading-tight" style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}>
                        {item.label}
                      </p>
                      <p className="font-sans text-leven-purple/45 leading-relaxed" style={{ fontSize: '13px' }}>
                        {item.sub}
                      </p>
                      {'href' in item && item.href && (
                        <span className="font-display font-medium mt-auto" style={{ fontSize: '9px', letterSpacing: '0.22em', color: item.color }}>NUEVO · VER →</span>
                      )}
                    </div>
                  )
                  return 'href' in item && item.href ? <Link href={item.href} className="block h-full">{inner}</Link> : inner
                })()}
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
                <p className="font-sans text-white/45 leading-relaxed mb-8" style={{ fontSize: '15px', maxWidth: '400px' }}>
                  Casa Leven está dentro del {SITE.direccion.edificio}, sobre la autopista Rosario–Córdoba.
                  Veinte minutos desde el centro de Rosario, diez desde el aeropuerto.
                </p>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <span style={{ color: 'var(--terracotta)', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>◈</span>
                    <div>
                      <p className="font-display font-medium text-white/85 mb-0.5" style={{ fontSize: '13px', letterSpacing: '0.05em' }}>{SITE.direccion.calle.toUpperCase()}</p>
                      <p className="font-sans text-white/35" style={{ fontSize: '13px' }}>{SITE.direccion.ciudad}, {SITE.direccion.provincia} · {SITE.direccion.edificio}</p>
                      <p className="font-sans text-white/35" style={{ fontSize: '13px' }}>{SITE.direccion.ruta}</p>
                    </div>
                  </div>
                  {SITE.direccion.referencias.map((r) => (
                    <div key={r.desde} className="flex items-start gap-4">
                      <span style={{ color: 'var(--sage)', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>◈</span>
                      <div>
                        <p className="font-display font-medium text-white/85 mb-0.5" style={{ fontSize: '13px', letterSpacing: '0.05em' }}>DESDE {r.desde.toUpperCase()} · {r.tiempo.toUpperCase()}</p>
                        <p className="font-sans text-white/35" style={{ fontSize: '13px' }}>{r.como}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4">
                    <span style={{ color: 'var(--blue)', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>◈</span>
                    <div>
                      <p className="font-display font-medium text-white/85 mb-0.5" style={{ fontSize: '13px', letterSpacing: '0.05em' }}>ESTACIONAMIENTO</p>
                      <p className="font-sans text-white/35" style={{ fontSize: '13px' }}>Propio, dentro del hotel</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={SITE.direccion.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-leven btn-leven-filled self-start flex items-center gap-3"
                style={{ fontSize: '11px', padding: '16px 32px', background: '#ffffff', borderColor: '#ffffff', color: '#1c1519' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                Cómo llegar en Google Maps →
              </a>
            </RevealSection>

            {/* Mapa real (Google Maps embebido; frame-src de google.com ya está permitido en la CSP) */}
            <RevealSection delay={150}>
              <div
                className="relative overflow-hidden"
                style={{ minHeight: '320px', height: '100%', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
              >
                <iframe
                  title={`Mapa: ${SITE.direccion.edificio}, ${SITE.direccion.calle}, ${SITE.direccion.ciudad}`}
                  src={SITE.direccion.mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, filter: 'grayscale(0.35) contrast(1.05)' }}
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 px-5 py-3" style={{ background: 'rgba(10,8,9,0.78)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="font-display font-medium text-white/70" style={{ fontSize: '11px', letterSpacing: '0.12em' }}>
                    {SITE.direccion.edificio.toUpperCase()} · {SITE.direccion.calle.toUpperCase()} · {SITE.direccion.ciudad.toUpperCase()}
                  </p>
                </div>
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* ─── FAQ (SEO local + respuestas para motores de IA) ─── */}
      <FaqBlock items={FAQ_HOME} color="#b23a3a" title="Lo que más nos preguntan." />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_HOME.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
    </>
  )
}

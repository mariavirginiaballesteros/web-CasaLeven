'use client'

import Image from 'next/image'

interface Props {
  name:  string
  unit:  string
  line1: string
  line2: string
  line3: string
  sub:   string
  color: string
  logo:  string
  img:   string
}

export default function LandingHero({ name, unit, line1, line2, line3, sub, color, logo, img }: Props) {
  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ height: '100svh', minHeight: '600px', background: '#0a0809' }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src={img} alt={name} fill priority className="object-cover" style={{ opacity: 0.28 }} />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        background: 'linear-gradient(to bottom, rgba(10,8,9,0.45) 0%, rgba(10,8,9,0.25) 40%, rgba(10,8,9,0.94) 100%)'
      }} />

      {/* Color accent line top */}
      <div className="absolute top-0 left-0 right-0 z-[2]" style={{ height: '2px', background: color }} />

      {/* WAVE A — large, slow */}
      <svg className="wave-svg-a absolute pointer-events-none z-[2]"
        style={{ top: 0, left: 0, width: '200%', height: '100%' }}
        viewBox="0 0 2880 900" preserveAspectRatio="none">
        <path d="M 0 280 C 480 175, 960 385, 1440 280 C 1920 175, 2400 385, 2880 280"
          stroke={color} strokeWidth="1.2" fill="none" opacity="0.45" />
      </svg>

      {/* WAVE B — medium */}
      <svg className="wave-svg-b absolute pointer-events-none z-[2]"
        style={{ top: 0, left: 0, width: '200%', height: '100%' }}
        viewBox="0 0 2880 900" preserveAspectRatio="none">
        <path d="M 0 155 C 320 85, 640 225, 960 155 C 1280 85, 1600 225, 1920 155 C 2240 85, 2560 225, 2880 155"
          stroke={color} strokeWidth="0.7" fill="none" opacity="0.25" />
      </svg>

      {/* WAVE C — small fast */}
      <svg className="wave-svg-c absolute pointer-events-none z-[2]"
        style={{ top: 0, left: 0, width: '200%', height: '100%' }}
        viewBox="0 0 2880 900" preserveAspectRatio="none">
        <path d="M 0 430 C 240 390, 480 470, 720 430 C 960 390, 1200 470, 1440 430 C 1680 390, 1920 470, 2160 430 C 2400 390, 2640 470, 2880 430"
          stroke={color} strokeWidth="0.55" fill="none" opacity="0.20" />
      </svg>


      {/* LOGO — right side, integrated, no border/box */}
      <div
        className="absolute z-[4] hidden md:flex items-center justify-center"
        style={{
          right: '60px',
          bottom: '60px',
          width: '200px',
        }}
      >
        <Image
          src={logo}
          alt={name}
          width={200}
          height={78}
          style={{ height: 'auto', opacity: 1 }}
        />
      </div>

      {/* Content — bottom left */}
      <div className="relative z-[4] px-12 md:px-14 pb-14 md:pb-16 md:pr-64">
        {/* Unit badge */}
        <div className="mb-7">
          <span
            className="font-display font-semibold"
            style={{ fontSize: '9px', letterSpacing: '0.32em', color, padding: '4px 10px', background: `${color}14`, border: `1px solid ${color}35` }}
          >
            {unit.toUpperCase()}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-white leading-[1.0] mb-6" style={{ fontSize: 'clamp(40px, 6vw, 86px)', letterSpacing: '-0.025em' }}>
          {line1}<br />
          {line2}<br />
          <span style={{ fontWeight: 300, color, fontSize: '0.88em' }}>{line3}</span>
        </h1>

        <p className="font-sans text-white/40 max-w-md leading-relaxed" style={{ fontSize: '14px' }}>{sub}</p>
      </div>
    </section>
  )
}

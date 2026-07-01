'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Premium architectural / wellness images matching Radisson RED Funes aesthetic
// Using w=1200 for an adequate full-bleed quality without the 1920 overhead
const slides = [
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=75', // massage premium warm red tones close-up
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=75', // spa warm dark
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=75', // luxury gym dark moody
]

export default function HeroHome() {
  const [active,      setActive]      = useState(0)
  const [prev,        setPrev]        = useState<number | null>(null)
  const [contentReady, setContentReady] = useState(false) // waits for logo intro
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = (next: number) => { setPrev(active); setActive(next) }

  useEffect(() => {
    // Reveal content only AFTER the logo intro has flown to corner
    const onIntroDone = () => setContentReady(true)
    window.addEventListener('logo-intro-done', onIntroDone)
    // Fallback in case LogoIntro doesn't fire (e.g., subpages)
    const fallback = setTimeout(() => setContentReady(true), 2500)
    return () => {
      window.removeEventListener('logo-intro-done', onIntroDone)
      clearTimeout(fallback)
    }
  }, [])

  useEffect(() => {
    timer.current = setTimeout(() => advance((active + 1) % slides.length), 7000)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [active]) // eslint-disable-line

  return (
    <section
      className="relative flex flex-col justify-end"
      style={{ height: '100svh', minHeight: '600px', background: '#0a0809', overflow: 'hidden' }}
    >
      {/* ── ROTATING IMAGES ── */}
      {slides.map((src, i) => (
        <div key={src} className="absolute inset-0 z-0" style={{
          opacity: active === i ? 1 : 0,
          zIndex: active === i ? 2 : prev === i ? 1 : 0,
          transition: 'opacity 2000ms ease-in-out',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            transform: active === i ? 'scale(1.05)' : 'scale(1)',
            transition: active === i ? 'transform 9000ms ease-out' : 'none',
            transformOrigin: '55% 45%',
          }}>
            <Image src={src} alt="" fill priority={i === 0} loading={i === 0 ? 'eager' : 'lazy'} sizes="100vw" className="object-cover" style={{ opacity: 0.28 }} />
          </div>
        </div>
      ))}

      {/* ── VIGNETTE ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 3,
        background: 'radial-gradient(ellipse 140% 120% at 50% 50%, transparent 30%, rgba(10,8,9,0.65) 100%)',
      }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        zIndex: 3, height: '50%',
        background: 'linear-gradient(to top, rgba(10,8,9,0.95) 0%, rgba(10,8,9,0.5) 55%, transparent 100%)',
      }} />

      {/* ── WAVE A ── */}
      <svg className="wave-svg-a absolute pointer-events-none"
        style={{ top: 0, left: 0, width: '200%', height: '100%', zIndex: 4 }}
        viewBox="0 0 2880 900" preserveAspectRatio="none">
        <path d="M 0 280 C 480 175, 960 385, 1440 280 C 1920 175, 2400 385, 2880 280"
          stroke="rgba(123,132,118,0.18)" strokeWidth="0.7" fill="none" />
      </svg>

      {/* ── WAVE B ── */}
      <svg className="wave-svg-b absolute pointer-events-none"
        style={{ top: 0, left: 0, width: '200%', height: '100%', zIndex: 4 }}
        viewBox="0 0 2880 900" preserveAspectRatio="none">
        <path d="M 0 155 C 320 85, 640 225, 960 155 C 1280 85, 1600 225, 1920 155 C 2240 85, 2560 225, 2880 155"
          stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" fill="none" />
      </svg>

      {/* ── WAVE C ── */}
      <svg className="wave-svg-c absolute pointer-events-none"
        style={{ top: 0, left: 0, width: '200%', height: '100%', zIndex: 4 }}
        viewBox="0 0 2880 900" preserveAspectRatio="none">
        <path d="M 0 430 C 240 390, 480 470, 720 430 C 960 390, 1200 470, 1440 430 C 1680 390, 1920 470, 2160 430 C 2400 390, 2640 470, 2880 430"
          stroke="rgba(123,132,118,0.12)" strokeWidth="0.5" fill="none" />
      </svg>

      {/* ── UI — appears AFTER logo intro ── */}
      <div className="relative flex flex-col justify-between min-h-full px-6 md:px-14 py-9 md:py-11" style={{ zIndex: 6 }}>

        {/* TOP dots */}
        <div className="flex justify-end" style={{
          opacity: contentReady ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => advance(i)} aria-label={`Slide ${i + 1}`} style={{
                height: '1px',
                width: i === active ? '32px' : '10px',
                background: i === active ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.15)',
                border: 'none', cursor: 'none', padding: 0,
                transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1), background 0.4s ease',
              }} />
            ))}
          </div>
        </div>

        {/* BOTTOM — title + CTAs + location */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

          {/* Headline — NEW COPY, more powerful */}
          <div style={{
            opacity: contentReady ? 1 : 0,
            transform: contentReady ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 1.1s ease 0.2s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}>
            <h1 className="font-display font-bold text-white mb-7 leading-[0.95]"
              style={{ fontSize: 'clamp(40px, 6.5vw, 88px)', letterSpacing: '-0.03em' }}>
              Hay quienes<br />
              sostienen el mundo.<br />
              <span style={{ fontWeight: 300, color: 'var(--sage)', fontSize: '0.78em', letterSpacing: '-0.01em' }}>
                Esta es su casa.
              </span>
            </h1>
            <div className="flex items-center gap-5 mb-5">
              <a href="#como-llegar" className="font-display text-white/30 hover:text-white/60 transition-colors" style={{ fontSize: '10px', letterSpacing: '0.25em' }}>
                COMO LLEGAR ↓
              </a>
            </div>
            <p className="font-display" style={{ fontSize: '10px', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.60)' }}>
              CENTRO DE BIENESTAR Y RECUPERACIÓN INTEGRAL · FUNES, ARGENTINA
            </p>
          </div>

          {/* Location — Radisson RED Funes (correct name) */}
          <div className="flex flex-col items-start md:items-end gap-1 md:text-right" style={{
            opacity: contentReady ? 1 : 0,
            transition: 'opacity 0.9s ease 0.5s',
          }}>
            <span className="font-display font-light" style={{ fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)' }}>
              DENTRO DEL
            </span>
            <a href="https://www.instagram.com/radissonredfunes/" target="_blank" rel="noopener noreferrer"
              className="font-display font-medium text-white/40 hover:text-white/70 transition-colors"
              style={{ fontSize: '10px', letterSpacing: '0.12em' }}>
              RADISSON RED FUNES
            </a>
            <span className="font-sans" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.18)' }}>
              Funes, Santa Fe, Argentina
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

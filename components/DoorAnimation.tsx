'use client'

import { useEffect, useRef, useState } from 'react'
import React from 'react'

const ACCENT = '#af2f3d'
const FRAME  = 'rgba(46,39,53,0.52)'
const PANEL  = 'rgba(46,39,53,0.88)'

const ornaments: { char: string; style: React.CSSProperties; delay: string }[] = [
  { char: '✦', style: { left: '-22px', top: '15%' }, delay: '0.9s'  },
  { char: '·',  style: { left: '-14px', top: '42%' }, delay: '1.1s'  },
  { char: '✧', style: { left: '-20px', top: '68%' }, delay: '1.35s' },
  { char: '✦', style: { right: '-20px', top: '15%' }, delay: '1.0s'  },
  { char: '·',  style: { right: '-13px', top: '42%' }, delay: '1.2s'  },
  { char: '✧', style: { right: '-20px', top: '70%' }, delay: '1.45s' },
  { char: '—', style: { left: '-16px',  top: '88%' }, delay: '1.55s' },
  { char: '—', style: { right: '-14px', top: '88%' }, delay: '1.6s'  },
]

export default function DoorAnimation() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setOpen(true), 450) },
      { threshold: 0.35 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '88px',
        height: '122px',
        margin: '28px 0 14px',
        perspective: '360px',
      }}
    >
      {/* ── Warm inner glow visible when doors open ── */}
      <div style={{
        position: 'absolute',
        left: '10px', right: '10px',
        top: '13px',  bottom: '2px',
        borderRadius: '24px 24px 0 0',
        background: open
          ? 'radial-gradient(ellipse 88% 55% at 50% 18%, rgba(175,100,42,0.28) 0%, rgba(175,47,61,0.12) 52%, transparent 82%)'
          : 'transparent',
        transition: 'background 2s ease 0.55s',
        zIndex: 0,
      }} />

      {/* ── LEFT door panel ── */}
      <div style={{
        position: 'absolute',
        left: '10px', top: '13px',
        width: '33px', bottom: '2px',
        transformOrigin: '0% 50%',
        transform: open ? 'rotateY(-76deg)' : 'rotateY(0deg)',
        transition: 'transform 1.9s cubic-bezier(0.32, 1.12, 0.64, 1) 0.08s',
        background: PANEL,
        zIndex: 2,
      }}>
        <svg width="33" height="100%" viewBox="0 0 33 108" fill="none" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Upper panel inset */}
          <rect x="4" y="7" width="25" height="41" rx="0.5"
            stroke={`${ACCENT}28`} strokeWidth="0.7" fill={`${ACCENT}04`} />
          {/* Lower panel inset */}
          <rect x="4" y="54" width="25" height="50" rx="0.5"
            stroke={`${ACCENT}28`} strokeWidth="0.7" fill={`${ACCENT}04`} />
          {/* Upper panel cross detail */}
          <line x1="16" y1="7" x2="16" y2="48" stroke={`${ACCENT}14`} strokeWidth="0.4"/>
          {/* Door knob */}
          <circle cx="27" cy="54" r="2.2" fill={`${ACCENT}55`} />
        </svg>
      </div>

      {/* ── RIGHT door panel ── */}
      <div style={{
        position: 'absolute',
        right: '10px', top: '13px',
        width: '33px', bottom: '2px',
        transformOrigin: '100% 50%',
        transform: open ? 'rotateY(76deg)' : 'rotateY(0deg)',
        transition: 'transform 1.9s cubic-bezier(0.32, 1.12, 0.64, 1) 0.08s',
        background: PANEL,
        zIndex: 2,
      }}>
        <svg width="33" height="100%" viewBox="0 0 33 108" fill="none" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect x="4" y="7" width="25" height="41" rx="0.5"
            stroke={`${ACCENT}28`} strokeWidth="0.7" fill={`${ACCENT}04`} />
          <rect x="4" y="54" width="25" height="50" rx="0.5"
            stroke={`${ACCENT}28`} strokeWidth="0.7" fill={`${ACCENT}04`} />
          <line x1="16" y1="7" x2="16" y2="48" stroke={`${ACCENT}14`} strokeWidth="0.4"/>
          <circle cx="6" cy="54" r="2.2" fill={`${ACCENT}55`} />
        </svg>
      </div>

      {/* ── Arch frame (SVG overlay, always on top) ── */}
      <svg width="88" height="122" viewBox="0 0 88 122" fill="none"
        style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
        {/* Main arch */}
        <path d="M 4 122 L 4 31 Q 4 2 44 2 Q 84 2 84 31 L 84 122"
          stroke={FRAME} strokeWidth="1.2" fill="none" />
        {/* Inner arch accent */}
        <path d="M 10 122 L 10 34 Q 10 9 44 9 Q 78 9 78 34 L 78 122"
          stroke={`${ACCENT}1c`} strokeWidth="0.55" fill="none" />
        {/* Center divider line */}
        <line x1="44" y1="9" x2="44" y2="122"
          stroke={FRAME} strokeWidth="0.6" />
        {/* Threshold */}
        <line x1="4" y1="122" x2="84" y2="122"
          stroke={FRAME} strokeWidth="1.8" />
        {/* Keystone diamond */}
        <polygon points="44,0 48,4 44,8 40,4"
          fill={`${ACCENT}50`} />
        {/* Side pilaster caps */}
        <rect x="1" y="28" width="6" height="2" fill={FRAME} rx="0.5"/>
        <rect x="81" y="28" width="6" height="2" fill={FRAME} rx="0.5"/>
      </svg>

      {/* ── Floating ornaments that appear as door opens ── */}
      {ornaments.map((o, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...o.style,
          fontSize: o.char === '—' ? '9px' : '7px',
          color: `${ACCENT}66`,
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.3)',
          transition: `opacity 0.65s ease ${o.delay}, transform 0.65s ease ${o.delay}`,
          zIndex: 5,
          pointerEvents: 'none',
          lineHeight: 1,
        }}>
          {o.char}
        </div>
      ))}
    </div>
  )
}

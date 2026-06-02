'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * Logo starts large and centered over the hero.
 * On first mousemove (or after 3s): it flies to the nav corner using FLIP technique.
 */
export default function LogoIntro() {
  const logoRef   = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'show' | 'fly' | 'gone'>('show')

  // Capture initial rect so we can transition FROM it
  const initialRect = useRef<DOMRect | null>(null)

  useLayoutEffect(() => {
    if (logoRef.current) {
      initialRect.current = logoRef.current.getBoundingClientRect()
    }
  }, [])

  useEffect(() => {
    const trigger = () => {
      if (phase !== 'show') return
      setPhase('fly')
      setTimeout(() => {
        setPhase('gone')
        window.dispatchEvent(new CustomEvent('logo-intro-done'))
      }, 950)
    }
    window.addEventListener('mousemove', trigger, { once: true })
    const t = setTimeout(trigger, 1200)
    return () => {
      window.removeEventListener('mousemove', trigger)
      clearTimeout(t)
    }
  }, [phase])

  if (phase === 'gone') return null

  // Nav logo target: top-left corner at roughly (52px, 28px), width ~130px
  // We use CSS calc with vw/vh to go from center → corner regardless of screen size
  const flyTransform = [
    'translate(',
    'calc(-50% - 50vw + 52px + 65px),',   // x: -half_logo - half_vw + nav_left + half_nav_logo
    'calc(-50% - 50vh + 28px + 37px)',     // y: -half_logo - half_vh + nav_top + half_nav_logo
    ') scale(0.46)',
  ].join('')

  return (
    <>
      {/* Subtle backdrop — only visible briefly, fades fast */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 148,
          background: 'rgba(10,8,9,0.5)',
          opacity: phase === 'fly' ? 0 : 0.55,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Logo element */}
      <div
        ref={logoRef}
        aria-hidden
        style={{
          position: 'fixed',
          zIndex: 149,
          top: '50%',
          left: '50%',
          transformOrigin: 'center center',
          transform: phase === 'show'
            ? 'translate(-50%, -50%) scale(1)'
            : flyTransform,
          opacity: phase === 'fly' ? 0 : 1,
          transition: phase === 'fly'
            ? 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease 0.15s'
            : 'none',
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      >
        <Image
          src="/logos/casa-leven.svg"
          alt=""
          width={300}
          height={174}
          priority
          style={{ filter: 'brightness(0) invert(1)', height: 'auto', display: 'block' }}
        />
      </div>
    </>
  )
}

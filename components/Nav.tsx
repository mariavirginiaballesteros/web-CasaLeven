'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false)
  const [hidden,      setHidden]      = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    // Logo hidden until intro finishes
    const onDone = () => setLogoVisible(true)
    window.addEventListener('logo-intro-done', onDone)
    // Fallback: show after 4s regardless
    const t = setTimeout(() => setLogoVisible(true), 4200)

    const onScroll = () => {
      const current = window.scrollY
      setScrolled(current > 60)
      setHidden(current > lastScroll.current && current > 200)
      lastScroll.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('logo-intro-done', onDone)
      clearTimeout(t)
    }
  }, [])

  const navClass = [
    'nav-root',
    scrolled  ? 'scrolled' : '',
    hidden    ? 'hidden'   : '',
  ].filter(Boolean).join(' ')

  return (
    <nav className={navClass}>
      {/* LOGO — hidden until intro done, then fades in */}
      <Link href="/" className="flex items-center" style={{
        opacity: logoVisible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}>
        <Image
          src="/logos/casa-leven.svg"
          alt="Casa Leven"
          width={130}
          height={75}
          style={{ filter: 'brightness(0) invert(1)', height: 'auto' }}
          priority
        />
      </Link>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex items-center gap-10">
        {[
          ['Membresías', '/membresias'],
          ['Motion',     '/motion'],
          ['Therma',     '/therma'],
          ['Nourish',    '/nourish'],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="link-hover font-display text-white/70 hover:text-white transition-colors"
            style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 500 }}
          >
            {(label as string).toUpperCase()}
          </Link>
        ))}
        <Link href="/fundadores" className="btn-leven btn-leven-filled" style={{ padding: '10px 24px', fontSize: '10px', background: '#ffffff', borderColor: '#ffffff', color: '#1c1519' }}>
          Founders
        </Link>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden flex flex-col gap-[6px] p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menú"
        style={{ cursor: 'none' }}
      >
        <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
        <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-6'}`} />
        <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
      </button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-center items-center gap-10"
          style={{ background: 'rgba(28, 21, 25, 0.98)', backdropFilter: 'blur(20px)' }}
        >
          <button
            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: '28px', lineHeight: 1, cursor: 'auto' }}
          >
            ×
          </button>
          <Image
            src="/logos/casa-leven.svg"
            alt="Casa Leven"
            width={120}
            height={70}
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.4, height: 'auto', marginBottom: '20px' }}
          />
          {[
            ['Membresías',        '/membresias'],
            ['Leven Motion',      '/motion'],
            ['Leven Therma',      '/therma'],
            ['Leven Nourish',     '/nourish'],
            ['Founders', '/fundadores'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-display font-light text-white hover:text-white/50 transition-colors"
              style={{ fontSize: '26px', letterSpacing: '0.03em' }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

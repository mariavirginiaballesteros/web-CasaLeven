'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`
      el.style.top  = `${e.clientY}px`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <svg
      ref={ref}
      className="cursor-key"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38 18"
      width="38"
      height="18"
    >
      {/* Ring (bow) */}
      <circle cx="9" cy="9" r="7" fill="none" stroke="white" strokeWidth="1.5" />
      {/* Hole in ring */}
      <circle cx="9" cy="9" r="2.5" fill="white" />
      {/* Shaft */}
      <rect x="16" y="8" width="22" height="2" fill="white" />
      {/* Teeth */}
      <rect x="24" y="10" width="2.5" height="5" fill="white" />
      <rect x="30" y="10" width="2.5" height="3.5" fill="white" />
    </svg>
  )
}

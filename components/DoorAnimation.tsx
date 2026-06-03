'use client'

import { useEffect, useRef, useState } from 'react'

const W      = 96
const H      = 144
const FW     = 10          // frame width
const AY     = 46          // arch spring-line y (where arch meets vertical)
const AT     = 8           // arch apex y (keystone)
const MID    = W / 2       // 48
const BRASS  = '#c4a860'
const BRASSD = '#8a6830'

// Wood grain — door leaf (warm mahogany)
const DOOR_BG = [
  'repeating-linear-gradient(89.2deg,transparent 0,transparent 1.8px,rgba(0,0,0,0.055) 1.8px,rgba(0,0,0,0.055) 2.2px,transparent 2.2px,transparent 6px,rgba(255,255,255,0.018) 6px,rgba(255,255,255,0.018) 6.5px)',
  'repeating-linear-gradient(90.8deg,transparent 0,transparent 10px,rgba(0,0,0,0.04) 10px,rgba(0,0,0,0.04) 12.5px)',
  'linear-gradient(176deg,#7e4e30 0%,#5a3020 18%,#6a3e28 40%,#4e2c1c 62%,#623c28 80%,#4a2a1a 100%)',
].join(',')

export default function DoorAnimation() {
  const [open, setOpen] = useState(false)
  const ref  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setOpen(true), 380)
        } else {
          // Snap closed off-screen so it can re-animate on next visit
          setOpen(false)
        }
      },
      { threshold: 0.3 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // Arch path helpers
  const archInner  = `M ${FW} ${AY} Q ${FW} ${AT + 4} ${MID} ${AT} Q ${W - FW} ${AT + 4} ${W - FW} ${AY}`
  const archHeader = `M 0 0 L ${W} 0 L ${W} ${AY} L ${W - FW} ${AY} Q ${W - FW} ${AT + 4} ${MID} ${AT} Q ${FW} ${AT + 4} ${FW} ${AY} L 0 ${AY} Z`

  return (
    <div
      ref={ref}
      style={{
        position:   'relative',
        width:      `${W}px`,
        height:     `${H}px`,
        margin:     '28px 0 14px',
        perspective:'400px',
      }}
    >
      {/* ── Borravino/wine glow visible when doors open ── */}
      <div style={{
        position:   'absolute',
        left: FW, right: FW, top: AT, bottom: 0,
        background: open
          ? 'radial-gradient(ellipse 80% 55% at 50% 20%,rgba(108,18,38,0.58) 0%,rgba(80,10,28,0.28) 52%,rgba(55,5,18,0.08) 75%,transparent 92%)'
          : 'transparent',
        transition: 'background 2.2s ease 0.65s',
        zIndex: 0,
      }} />

      {/* ── LEFT door leaf ── */}
      <div style={{
        position:       'absolute',
        left:           FW,
        top:            AT,
        width:          37,
        bottom:         1,
        transformOrigin:'0% 50%',
        transform:      open ? 'rotateY(-70deg)' : 'rotateY(0deg)',
        transition:     'transform 1.85s cubic-bezier(0.22,1.1,0.45,1) 0.08s',
        background:     DOOR_BG,
        zIndex:         2,
        boxShadow:      open ? 'none' : 'inset -5px 0 10px rgba(0,0,0,0.55)',
      }}>
        <svg width="37" height="100%" viewBox="0 0 37 136" fill="none" preserveAspectRatio="none"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
          {/* Upper raised panel */}
          <rect x="5"   y="8"   width="27" height="46" rx="1"   fill="rgba(200,155,90,0.05)" stroke="rgba(30,15,5,0.65)"  strokeWidth="1"/>
          <rect x="6.5" y="9.5" width="24" height="43" rx="0.5" fill="none"                  stroke="rgba(240,200,130,0.09)" strokeWidth="0.5"/>
          {/* Vertical and horizontal centre lines of upper panel */}
          <line x1="18.5" y1="8"  x2="18.5" y2="54" stroke="rgba(0,0,0,0.11)" strokeWidth="0.5"/>
          <line x1="5"    y1="31" x2="32"   y2="31" stroke="rgba(0,0,0,0.09)" strokeWidth="0.5"/>
          {/* Middle rail */}
          <rect x="0" y="57" width="37" height="5" fill="rgba(0,0,0,0.20)"/>
          <line x1="0" y1="57.5" x2="37" y2="57.5" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>
          {/* Lower panel */}
          <rect x="5"   y="64"  width="27" height="64" rx="1"   fill="rgba(200,155,90,0.05)" stroke="rgba(30,15,5,0.65)"    strokeWidth="1"/>
          <rect x="6.5" y="65.5" width="24" height="61" rx="0.5" fill="none"                  stroke="rgba(240,200,130,0.09)" strokeWidth="0.5"/>
          <line x1="18.5" y1="64" x2="18.5" y2="128" stroke="rgba(0,0,0,0.11)" strokeWidth="0.5"/>
          {/* Knob — right side = door centre */}
          <circle cx="31.5" cy="72" r="3.4" fill={BRASSD}/>
          <circle cx="31.5" cy="72" r="2.5" fill={BRASS}/>
          <circle cx="30.7" cy="71.2" r="0.9" fill="rgba(255,255,255,0.28)"/>
          {/* Hinges — outer (left) edge */}
          <rect x="0.5" y="22"  width="3.5" height="9" rx="0.3" fill={BRASSD} opacity="0.8"/>
          <circle cx="2.5" cy="26.5" r="1" fill={BRASS} opacity="0.5"/>
          <rect x="0.5" y="100" width="3.5" height="9" rx="0.3" fill={BRASSD} opacity="0.8"/>
          <circle cx="2.5" cy="104.5" r="1" fill={BRASS} opacity="0.5"/>
        </svg>
      </div>

      {/* ── RIGHT door leaf ── */}
      <div style={{
        position:       'absolute',
        right:          FW,
        top:            AT,
        width:          37,
        bottom:         1,
        transformOrigin:'100% 50%',
        transform:      open ? 'rotateY(70deg)' : 'rotateY(0deg)',
        transition:     'transform 1.85s cubic-bezier(0.22,1.1,0.45,1) 0.08s',
        background:     DOOR_BG,
        zIndex:         2,
        boxShadow:      open ? 'none' : 'inset 5px 0 10px rgba(0,0,0,0.55)',
      }}>
        <svg width="37" height="100%" viewBox="0 0 37 136" fill="none" preserveAspectRatio="none"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
          {/* Upper panel */}
          <rect x="5"   y="8"   width="27" height="46" rx="1"   fill="rgba(200,155,90,0.05)" stroke="rgba(30,15,5,0.65)"    strokeWidth="1"/>
          <rect x="6.5" y="9.5" width="24" height="43" rx="0.5" fill="none"                  stroke="rgba(240,200,130,0.09)" strokeWidth="0.5"/>
          <line x1="18.5" y1="8"  x2="18.5" y2="54" stroke="rgba(0,0,0,0.11)" strokeWidth="0.5"/>
          <line x1="5"    y1="31" x2="32"   y2="31" stroke="rgba(0,0,0,0.09)" strokeWidth="0.5"/>
          <rect x="0" y="57" width="37" height="5" fill="rgba(0,0,0,0.20)"/>
          <line x1="0" y1="57.5" x2="37" y2="57.5" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>
          {/* Lower panel */}
          <rect x="5"   y="64"  width="27" height="64" rx="1"   fill="rgba(200,155,90,0.05)" stroke="rgba(30,15,5,0.65)"    strokeWidth="1"/>
          <rect x="6.5" y="65.5" width="24" height="61" rx="0.5" fill="none"                  stroke="rgba(240,200,130,0.09)" strokeWidth="0.5"/>
          <line x1="18.5" y1="64" x2="18.5" y2="128" stroke="rgba(0,0,0,0.11)" strokeWidth="0.5"/>
          {/* Knob — left side = door centre */}
          <circle cx="5.5" cy="72" r="3.4" fill={BRASSD}/>
          <circle cx="5.5" cy="72" r="2.5" fill={BRASS}/>
          <circle cx="4.7" cy="71.2" r="0.9" fill="rgba(255,255,255,0.28)"/>
          {/* Hinges — outer (right) edge */}
          <rect x="33" y="22"  width="3.5" height="9" rx="0.3" fill={BRASSD} opacity="0.8"/>
          <circle cx="34.5" cy="26.5" r="1" fill={BRASS} opacity="0.5"/>
          <rect x="33" y="100" width="3.5" height="9" rx="0.3" fill={BRASSD} opacity="0.8"/>
          <circle cx="34.5" cy="104.5" r="1" fill={BRASS} opacity="0.5"/>
        </svg>
      </div>

      {/* ── Arch frame SVG (always on top) ── */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none"
        style={{ position:'absolute', inset:0, zIndex:4, pointerEvents:'none' }}>
        <defs>
          <pattern id="dg" x="0" y="0" width="5" height="1" patternUnits="userSpaceOnUse" patternTransform="rotate(89.5)">
            <rect width="5" height="1" fill="transparent"/>
            <rect x="2.2" y="0" width="0.35" height="1" fill="rgba(0,0,0,0.08)"/>
            <rect x="4.5" y="0" width="0.2"  height="1" fill="rgba(255,255,255,0.014)"/>
          </pattern>
          <linearGradient id="flg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#3e2818"/>
            <stop offset="55%"  stopColor="#2c1a0e"/>
            <stop offset="100%" stopColor="#1a0e06"/>
          </linearGradient>
          <linearGradient id="frg" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%"   stopColor="#3e2818"/>
            <stop offset="55%"  stopColor="#2c1a0e"/>
            <stop offset="100%" stopColor="#1a0e06"/>
          </linearGradient>
          <linearGradient id="fbg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3e2818"/>
            <stop offset="45%"  stopColor="#2a1810"/>
            <stop offset="75%"  stopColor="#201008"/>
            <stop offset="100%" stopColor="#3a2416"/>
          </linearGradient>
        </defs>

        {/* Arch header band (top of frame) */}
        <path d={archHeader} fill="url(#fbg)"/>
        <path d={archHeader} fill="url(#dg)" opacity="0.55"/>

        {/* Left pilaster */}
        <rect x="0"       y={AY} width={FW}   height={H - AY} fill="url(#flg)"/>
        <rect x="0"       y={AY} width={FW}   height={H - AY} fill="url(#dg)" opacity="0.55"/>
        {/* Right pilaster */}
        <rect x={W - FW}  y={AY} width={FW}   height={H - AY} fill="url(#frg)"/>
        <rect x={W - FW}  y={AY} width={FW}   height={H - AY} fill="url(#dg)" opacity="0.55"/>

        {/* Inner arch edge — highlight then shadow */}
        <path d={archInner} stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" fill="none"/>
        <path d={`M ${FW} ${AY} Q ${FW} ${AT + 6} ${MID} ${AT + 2} Q ${W - FW} ${AT + 6} ${W - FW} ${AY}`}
          stroke="rgba(0,0,0,0.38)" strokeWidth="1" fill="none"/>

        {/* Pilaster inner edge lines */}
        <line x1={FW}       y1={AY} x2={FW}       y2={H} stroke="rgba(255,255,255,0.06)" strokeWidth="0.7"/>
        <line x1={W - FW}   y1={AY} x2={W - FW}   y2={H} stroke="rgba(0,0,0,0.38)"       strokeWidth="0.7"/>

        {/* Threshold */}
        <rect x="0" y={H - 2} width={W} height="2" fill="#1c0e06"/>
        <line x1="0" y1={H - 2} x2={W} y2={H - 2} stroke="rgba(255,255,255,0.05)" strokeWidth="0.4"/>

        {/* ── Ornamentos ── */}

        {/* Keystone diamond */}
        <polygon points={`${MID},${AT - 1} ${MID + 4},${AT + 4.5} ${MID},${AT + 10} ${MID - 4},${AT + 4.5}`}
          fill={BRASSD} opacity="0.75"/>
        <polygon points={`${MID},${AT + 1.5} ${MID + 2.4},${AT + 4.5} ${MID},${AT + 7.5} ${MID - 2.4},${AT + 4.5}`}
          fill={BRASS} opacity="0.55"/>
        {/* Centre mark on keystone */}
        <circle cx={MID} cy={AT + 4.5} r="0.9" fill="rgba(255,255,255,0.18)"/>

        {/* Pilaster caps */}
        <rect x="1"       y={AY - 5} width={FW - 2} height="3.5" rx="0.4" fill={BRASSD} opacity="0.55"/>
        <circle cx={FW / 2}   cy={AY - 3.2} r="0.9" fill={BRASS} opacity="0.65"/>
        <rect x={W - FW + 1} y={AY - 5} width={FW - 2} height="3.5" rx="0.4" fill={BRASSD} opacity="0.55"/>
        <circle cx={W - FW / 2} cy={AY - 3.2} r="0.9" fill={BRASS} opacity="0.65"/>

        {/* Carved rosettes on pilasters — upper */}
        {[FW / 2, W - FW / 2].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy={AY + 28} r="2.8" stroke={BRASSD} strokeWidth="0.5" fill="none" opacity="0.38"/>
            <circle cx={cx} cy={AY + 28} r="1.3" fill={BRASSD} opacity="0.22"/>
            <line x1={cx}       y1={AY + 24.8} x2={cx}       y2={AY + 26.5} stroke={BRASSD} strokeWidth="0.4" opacity="0.42"/>
            <line x1={cx}       y1={AY + 29.5} x2={cx}       y2={AY + 31.2} stroke={BRASSD} strokeWidth="0.4" opacity="0.42"/>
            <line x1={cx - 2.2} y1={AY + 28}   x2={cx - 0.8} y2={AY + 28}   stroke={BRASSD} strokeWidth="0.4" opacity="0.42"/>
            <line x1={cx + 0.8} y1={AY + 28}   x2={cx + 2.2} y2={AY + 28}   stroke={BRASSD} strokeWidth="0.4" opacity="0.42"/>
          </g>
        ))}

        {/* Carved rosettes — lower */}
        {[FW / 2, W - FW / 2].map((cx, i) => (
          <circle key={i} cx={cx} cy={AY + 68} r="1.8" stroke={BRASSD} strokeWidth="0.4" fill="none" opacity="0.24"/>
        ))}

        {/* Thin decorative line inside arch band */}
        <path d={`M ${FW + 2} ${AY - 1} Q ${FW + 2} ${AT + 9} ${MID} ${AT + 5} Q ${W - FW - 2} ${AT + 9} ${W - FW - 2} ${AY - 1}`}
          stroke="rgba(180,140,75,0.13)" strokeWidth="0.5" fill="none"/>
      </svg>
    </div>
  )
}

import Image from 'next/image'

interface Props {
  images: { src: string; alt: string }[]
  color: string
  quote?: string
}

export default function BrandImages({ images, color, quote }: Props) {
  return (
    <section style={{ background: '#0a0809' }}>
      {/*
        Layout desktop (4 cols):
        [  img A — 2 cols, tall  ] [ img B ] [ color panel ]
                                   [ img C ] [ img D       ]
        Layout mobile: 2x2 + 1 full
      */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: '280px 240px',
        }}
      >
        {/* Cell A — large, spans 2 cols + 2 rows */}
        <div
          className="relative overflow-hidden group"
          style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
            style={{ filter: 'grayscale(85%) contrast(1.08)' }}
          />
          {/* Color tint */}
          <div style={{
            position: 'absolute', inset: 0,
            background: color,
            opacity: 0.22,
            mixBlendMode: 'color',
            transition: 'opacity 0.6s ease',
          }} />
          <div className="group-hover:opacity-0 transition-opacity duration-500" style={{
            position: 'absolute', inset: 0,
            background: 'rgba(10,8,9,0.18)',
          }} />
        </div>

        {/* Cell B — top right */}
        <div
          className="relative overflow-hidden group"
          style={{ gridColumn: '3 / 4', gridRow: '1 / 2', borderLeft: '1px solid rgba(10,8,9,0.8)', borderBottom: '1px solid rgba(10,8,9,0.8)' }}
        >
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
            style={{ filter: 'grayscale(80%) contrast(1.1)' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: color,
            opacity: 0.18,
            mixBlendMode: 'color',
          }} />
        </div>

        {/* Cell C — color panel con quote */}
        <div
          className="relative flex flex-col justify-end p-6 md:p-8"
          style={{
            gridColumn: '4 / 5', gridRow: '1 / 2',
            background: color,
            borderLeft: '1px solid rgba(10,8,9,0.8)',
            borderBottom: '1px solid rgba(10,8,9,0.8)',
          }}
        >
          <div className="w-5 h-px mb-4" style={{ background: 'rgba(255,255,255,0.35)' }} />
          {quote && (
            <p className="font-display font-light text-white leading-snug"
              style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', opacity: 0.9 }}>
              "{quote}"
            </p>
          )}
        </div>

        {/* Cell D — bottom mid-right */}
        <div
          className="relative overflow-hidden group"
          style={{ gridColumn: '3 / 4', gridRow: '2 / 3', borderLeft: '1px solid rgba(10,8,9,0.8)', borderTop: '1px solid rgba(10,8,9,0.8)' }}
        >
          <Image
            src={images[2]?.src ?? images[0].src}
            alt={images[2]?.alt ?? ''}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
            style={{ filter: 'grayscale(75%) contrast(1.08)' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: color,
            opacity: 0.20,
            mixBlendMode: 'color',
          }} />
        </div>

        {/* Cell E — bottom far right */}
        <div
          className="relative overflow-hidden group"
          style={{ gridColumn: '4 / 5', gridRow: '2 / 3', borderLeft: '1px solid rgba(10,8,9,0.8)', borderTop: '1px solid rgba(10,8,9,0.8)' }}
        >
          <Image
            src={images[3]?.src ?? images[1].src}
            alt={images[3]?.alt ?? ''}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
            style={{ filter: 'grayscale(80%) contrast(1.05)' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: color,
            opacity: 0.15,
            mixBlendMode: 'color',
          }} />
          {/* Brand color accent line */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: color }} />
        </div>
      </div>

      {/* Mobile fallback: hidden on desktop grid cells above show on md+ */}
      <style>{`
        @media (max-width: 767px) {
          .brand-image-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 200px 200px;
          }
        }
      `}</style>
    </section>
  )
}

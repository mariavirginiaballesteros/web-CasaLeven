'use client'

interface Props {
  step: number   // 0–5
  total?: number
}

const LABELS = ['Tipo', 'Servicio', 'Fecha', 'Profesional', 'Datos', 'Listo']

export default function ProgressBar({ step, total = 5 }: Props) {
  return (
    <div className="w-full">
      {/* Steps dots */}
      <div className="flex items-center gap-0">
        {LABELS.slice(0, total + 1).map((label, i) => {
          const done    = i < step
          const current = i === step
          return (
            <div key={i} className="flex items-center" style={{ flex: i < total ? 1 : 'none' }}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: done || current
                      ? (done ? 'var(--sage)' : 'var(--terracotta)')
                      : 'rgba(255,255,255,0.15)',
                    transition: 'background 0.3s ease',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '8px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: current ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </span>
              </div>
              {i < total && (
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    marginBottom: 18,
                    background: done ? 'var(--sage)' : 'rgba(255,255,255,0.1)',
                    transition: 'background 0.3s ease',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

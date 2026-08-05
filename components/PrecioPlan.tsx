import { ars, porMes, type Precios } from '@/data/leven'

/**
 * Bloque de precio de una membresía.
 * Muestra el valor mensual grande y, debajo, el equivalente mensual de
 * comprometerse a 3 o 12 meses. Así se ve el ahorro sin llenar la tarjeta
 * de números: el total se aclara en la letra chica de la página.
 */
export default function PrecioPlan({
  precios,
  color,
  tema = 'oscuro',
  etiqueta,
}: {
  precios: Precios
  color: string
  tema?: 'oscuro' | 'claro'
  etiqueta?: string
}) {
  const principal = tema === 'oscuro' ? '#fff' : 'var(--leven-purple, #2e2735)'
  const tenue = tema === 'oscuro' ? 'rgba(255,255,255,0.35)' : 'rgba(46,39,53,0.42)'

  const filas = [
    { label: '3 meses', valor: porMes(precios.trimestral, 3) },
    { label: '12 meses', valor: porMes(precios.anual, 12) },
  ]

  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span
          className="font-display font-bold"
          style={{ fontSize: '25px', letterSpacing: '-0.02em', color: etiqueta ? color : principal }}
        >
          {ars(precios.mensual)}
        </span>
        <span className="font-sans" style={{ fontSize: '11px', color: tenue }}>/mes</span>
      </div>

      {etiqueta && (
        <p className="font-display font-medium mt-1" style={{ fontSize: '9px', letterSpacing: '0.2em', color }}>
          {etiqueta}
        </p>
      )}

      <div className="mt-3 flex flex-col gap-[3px]">
        {filas.map((f) => (
          <div key={f.label} className="flex items-baseline justify-between gap-2">
            <span className="font-sans" style={{ fontSize: '11px', color: tenue }}>
              {f.label}
            </span>
            <span className="font-sans" style={{ fontSize: '11px', color: tenue }}>
              {ars(f.valor)}/mes
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

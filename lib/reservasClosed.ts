import fs from 'fs'
import path from 'path'

const FILE = path.join(process.cwd(), 'data', 'reservas-closed.json')

export function isReservasClosed(): boolean {
  try {
    const raw = fs.readFileSync(FILE, 'utf-8')
    return JSON.parse(raw).closed === true
  } catch {
    return false
  }
}

export function toggleReservasClosed(): boolean {
  const current = isReservasClosed()
  const next = !current
  fs.writeFileSync(FILE, JSON.stringify({ closed: next }), 'utf-8')
  return next
}

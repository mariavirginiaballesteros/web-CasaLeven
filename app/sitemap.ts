import type { MetadataRoute } from 'next'
import { SITE, CAMPANA_FUNDADORES } from '@/data/leven'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const paginas: { path: string; priority: number; freq: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
    { path: '',             priority: 1.0,  freq: 'weekly'  },
    { path: '/motion',      priority: 0.9,  freq: 'weekly'  },
    { path: '/therma',      priority: 0.9,  freq: 'weekly'  },
    { path: '/nourish',     priority: 0.8,  freq: 'monthly' },
    { path: '/membresias',  priority: 0.9,  freq: 'weekly'  },
    { path: '/reservas',    priority: 0.7,  freq: 'weekly'  },
    { path: '/contacto',    priority: 0.6,  freq: 'monthly' },
  ]

  // Campaña temporal: entra y sale del sitemap con el flag.
  if (CAMPANA_FUNDADORES.activa) {
    paginas.push({ path: '/fundadores', priority: 0.9, freq: 'weekly' })
  }

  return paginas.map((p) => ({
    url: `${SITE.url}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }))
}

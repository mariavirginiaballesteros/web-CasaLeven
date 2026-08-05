import type { MetadataRoute } from 'next'
import { SITE } from '@/data/leven'

/**
 * Dejamos pasar explícitamente a los rastreadores de IA (GPTBot, ClaudeBot,
 * PerplexityBot, Google-Extended). Es la condición mínima para que Casa Leven
 * aparezca cuando alguien le pregunta a un asistente "gimnasio con spa en Funes".
 * El panel /admin y las APIs quedan fuera para todos.
 */
export default function robots(): MetadataRoute.Robots {
  const bloqueado = ['/admin', '/admin/', '/api/']

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: bloqueado },
      { userAgent: 'GPTBot', allow: '/', disallow: bloqueado },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: bloqueado },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: bloqueado },
      { userAgent: 'ClaudeBot', allow: '/', disallow: bloqueado },
      { userAgent: 'Claude-User', allow: '/', disallow: bloqueado },
      { userAgent: 'PerplexityBot', allow: '/', disallow: bloqueado },
      { userAgent: 'Google-Extended', allow: '/', disallow: bloqueado },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: bloqueado },
      { userAgent: 'Bingbot', allow: '/', disallow: bloqueado },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}

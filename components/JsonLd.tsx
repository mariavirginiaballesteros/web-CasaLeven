/**
 * Inyecta datos estructurados schema.org.
 * Sirve para Google (rich results) y, sobre todo, para que ChatGPT,
 * Perplexity, Gemini y Claude entiendan qué es Casa Leven, dónde está
 * y cuánto cuesta cada membresía cuando alguien les pregunta.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es estático y generado por nosotros, no viene del usuario.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

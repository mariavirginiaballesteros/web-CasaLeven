import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import LogoIntro from '@/components/LogoIntro'
import JsonLd from '@/components/JsonLd'
import { SITE } from '@/data/leven'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Casa Leven · Gimnasio, spa y nutrición en Funes, Santa Fe',
    template: '%s',
  },
  description:
    'Casa Leven es un gimnasio, spa y espacio de nutrición funcional en Funes, Santa Fe. Movimiento, recuperación y nutrición bajo un mismo método, con membresías desde $200.000 por mes y day pass de spa.',
  applicationName: 'Casa Leven',
  category: 'Health & Wellness',
  keywords: [
    'gimnasio en Funes',
    'spa en Funes',
    'circuito hídrico Funes',
    'sauna Funes',
    'membresía gimnasio Funes',
    'wellness Rosario',
    'spa cerca de Rosario',
    'Casa Leven',
    'Leven Motion',
    'Leven Therma',
    'Leven Nourish',
    'day pass spa Santa Fe',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Casa Leven · Un método. Un refugio.',
    description:
      'Gimnasio, spa y nutrición funcional en Funes, Santa Fe. Para quienes sostienen el mundo y necesitan un lugar donde sostenerse.',
    url: SITE.url,
    siteName: 'Casa Leven',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casa Leven · Un método. Un refugio.',
    description: 'Gimnasio, spa y nutrición funcional en Funes, Santa Fe.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-246795991');`}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "vy8nhxcvmo");`}
        </Script>
<LogoIntro />
        <Nav />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-246795991" height="0" width="0" style={{ display:'none', visibility:'hidden' }} /></noscript>
        <main>{children}</main>
        <Footer />

        {/* Identidad de negocio para Google y para motores de IA.
            Es lo que hace que ChatGPT/Perplexity sepan qué es Casa Leven,
            dónde está y qué servicios ofrece. */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'HealthAndBeautyBusiness',
            '@id': `${SITE.url}#casaleven`,
            name: 'Casa Leven',
            legalName: SITE.legal,
            description:
              'Casa Leven es un método integral de bienestar en Funes, Santa Fe, Argentina: gimnasio de alto rendimiento (Leven Motion), spa con circuito hídrico y masajes (Leven Therma) y nutrición funcional (Leven Nourish), bajo un mismo techo dentro del Radisson RED Funes.',
            slogan: 'Un método. Un refugio.',
            url: SITE.url,
            telephone: SITE.telefono,
            priceRange: '$$$',
            currenciesAccepted: 'ARS',
            image: `${SITE.url}/logos/casa-leven-h.png`,
            logo: `${SITE.url}/logos/casa-leven-h.png`,
            sameAs: [SITE.instagram],
            address: {
              '@type': 'PostalAddress',
              streetAddress: SITE.direccion.calle,
              addressLocality: SITE.direccion.ciudad,
              addressRegion: SITE.direccion.provincia,
              postalCode: SITE.direccion.cp,
              addressCountry: SITE.direccion.pais,
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: SITE.direccion.lat,
              longitude: SITE.direccion.lng,
            },
            areaServed: [
              { '@type': 'City', name: 'Funes' },
              { '@type': 'City', name: 'Rosario' },
              { '@type': 'State', name: 'Santa Fe' },
            ],
            knowsLanguage: ['es-AR', 'en'],
            department: [
              { '@type': 'ExerciseGym', name: 'Leven Motion', url: `${SITE.url}/motion` },
              { '@type': 'DaySpa', name: 'Leven Therma', url: `${SITE.url}/therma` },
              { '@type': 'Restaurant', name: 'Leven Nourish', url: `${SITE.url}/nourish` },
            ],
            makesOffer: [
              { '@type': 'Offer', name: 'Membresías Leven Motion', url: `${SITE.url}/membresias` },
              { '@type': 'Offer', name: 'Day pass de spa Leven Therma', url: `${SITE.url}/therma` },
            ],
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${SITE.url}#website`,
            name: 'Casa Leven',
            url: SITE.url,
            inLanguage: 'es-AR',
            publisher: { '@id': `${SITE.url}#casaleven` },
          }}
        />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import LogoIntro from '@/components/LogoIntro'

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
  title: 'Casa Leven · Método Integral de Bienestar · Funes, Argentina',
  description: 'El primer espacio donde movimiento, recuperación y nutrición conviven bajo un mismo método. Para quienes viven con intensidad. Funes, Argentina.',
  keywords: 'gym funes, spa funes, wellness funes, membresía bienestar funes, centro bienestar argentina',
  openGraph: {
    title: 'Casa Leven · Un método. Un refugio.',
    description: 'Para quienes sostienen el mundo y necesitan un lugar donde sostenerse.',
    url: 'https://casaleven.com',
    siteName: 'Casa Leven',
    locale: 'es_AR',
    type: 'website',
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
        <Cursor />
        <LogoIntro />
        <Nav />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-246795991" height="0" width="0" style={{ display:'none', visibility:'hidden' }} /></noscript>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

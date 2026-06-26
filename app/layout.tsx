// app/layout.tsx
import type { Metadata } from 'next'
import { Urbanist, Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import EcoBot from '@/components/EcoBot'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400','500','600','700','800','900'],
  variable: '--font-head',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['300','400','500','600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'OC Electronic Recycling — Orange County E-Waste & ITAD',
    template: '%s | OC Electronic Recycling',
  },
  description: "Orange County's premier e-waste recycling and ITAD company. Certified data destruction, business pickup. Call (949) 345-0285.",
  metadataBase: new URL('https://ocelectronicrecycling.com'),
  verification: {
    google: 'PaLUjMBZuaXCfW_w65dE4BmaLsFlHbXC3kiIXNt3CtI',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${inter.variable}`}>
  <body>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "@id": "https://www.ocelectronicrecycling.com/#business",
              "name": "OC Electronic Recycling",
              "description": "Orange County's certified e-waste recycling, IT Asset Disposition (ITAD), and data destruction provider. NIST 800-88 compliant. Serving all 34 cities in Orange County, California.",
              "url": "https://www.ocelectronicrecycling.com",
              "telephone": "+19493450285",
              "email": "info@ocelectronicrecycling.com",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "CA",
                "addressCountry": "US",
                "addressLocality": "Orange County"
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 33.7175,
                  "longitude": -117.8311
                },
                "geoRadius": "50000"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "E-Waste & ITAD Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "E-Waste Recycling",
                      "description": "California DTSC compliant e-waste recycling for businesses and residents across Orange County.",
                      "url": "https://www.ocelectronicrecycling.com/services/recycling"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Certified Data Destruction",
                      "description": "NIST 800-88 compliant hard drive wiping and physical shredding with certificate of destruction.",
                      "url": "https://www.ocelectronicrecycling.com/services/data-destruction"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "IT Asset Disposition (ITAD)",
                      "description": "Full ITAD lifecycle management including inventory, data sanitization, resale, and responsible disposal.",
                      "url": "https://www.ocelectronicrecycling.com/services/itad"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Business Electronics Pickup",
                      "description": "Free scheduled pickup for businesses throughout Orange County.",
                      "url": "https://www.ocelectronicrecycling.com/contact"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://www.facebook.com/ocelectronicrecycling",
                "https://www.linkedin.com/company/ocelectronicrecycling"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://www.ocelectronicrecycling.com/#website",
              "url": "https://www.ocelectronicrecycling.com",
              "name": "OC Electronic Recycling",
              "description": "Orange County certified e-waste recycling and ITAD services.",
              "publisher": {
                "@id": "https://www.ocelectronicrecycling.com/#business"
              }
            }
          ]
        })
      }}
    />
    <Cursor />
    <Header />
    <main>{children}</main>
    <Footer />
    <EcoBot />
  </body>
  <GoogleAnalytics gaId="G-GZHT9EPCHT" />
</html>
  )
}

// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Urbanist, Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConsentBanner from '@/components/ConsentBanner'
import AnalyticsScripts from '@/components/AnalyticsScripts'
import AnalyticsEvents from '@/components/AnalyticsEvents'
import JsonLd from '@/components/JsonLd'
import { AREA_SERVED } from '@/lib/schema'
import { BUSINESS_ID, DEFAULT_OG_IMAGE, EMAIL, FOUNDING_YEAR, PICKUP_MINIMUM, SERVICE_AREA, SITE_NAME, SITE_URL, WEBSITE_ID } from '@/lib/site'
import './globals.css'
import './styles/ct-core.css'
import './styles/ct-pickup.css'

// Both families are variable fonts: one file each covers every weight in use.
const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-head', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

const DESCRIPTION = `Business electronics pickup, e-waste recycling, IT asset disposition and data destruction across ${SERVICE_AREA}. Call (949) 287-3056.`

export const metadata: Metadata = {
  title: {
    default: 'OC Electronic Recycling — Orange County E-Waste & ITAD',
    template: '%s | OC Electronic Recycling',
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  verification: {
    google: 'PaLUjMBZuaXCfW_w65dE4BmaLsFlHbXC3kiIXNt3CtI',
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_OG_IMAGE],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a1220',
  width: 'device-width',
  initialScale: 1,
}

// Sitewide entity graph. Service area is expressed with `areaServed` only —
// there is no street address because none has been verified for publication.
const SITE_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      name: SITE_NAME,
      description: `Electronics recycling, IT asset disposition (ITAD) and data destruction for businesses across ${SERVICE_AREA}.`,
      url: SITE_URL,
      telephone: '+19492873056',
      email: EMAIL,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      address: { '@type': 'PostalAddress', addressRegion: 'CA', addressCountry: 'US' },
      areaServed: AREA_SERVED,
      foundingDate: FOUNDING_YEAR,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Electronics recycling and ITAD services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Business Electronics Pickup',
              description: `Pickup of business electronics for requests with at least ${PICKUP_MINIMUM} qualifying major items. Eligibility, fees and timing are confirmed before scheduling.`,
              url: `${SITE_URL}/business-pickup`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'IT Asset Disposition (ITAD)',
              description: 'Inventory, data sanitization, value recovery and responsible recycling for retired business IT equipment.',
              url: `${SITE_URL}/services/itad`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Secure Data Destruction',
              description: 'Drive sanitization with reference to NIST SP 800-88 guidelines, or physical destruction, with a Certificate of Data Destruction for the media processed.',
              url: `${SITE_URL}/services/data-destruction`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'E-Waste Recycling',
              description: 'Electronics recycling handled in line with California e-waste regulations and routed to downstream processors.',
              url: `${SITE_URL}/services/recycling`,
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: `E-waste recycling and ITAD services for ${SERVICE_AREA}.`,
      publisher: { '@id': BUSINESS_ID },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={SITE_GRAPH} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          src="https://niro-ai-platform.vercel.app/widget.js"
          data-key="pk_test_ocer_a3f8ed238897ff10"
          async
        ></script>
        <AnalyticsEvents />
        <AnalyticsScripts />
        <ConsentBanner />
      </body>
    </html>
  )
}

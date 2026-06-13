// app/layout.tsx
import type { Metadata } from 'next'
import { Urbanist, Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import EcoBot from '@/components/EcoBot'
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${inter.variable}`}>
      <body>
        <Cursor />
        <Header />
        <main>{children}</main>
        <Footer />
        <EcoBot />
      </body>
    </html>
  )
}

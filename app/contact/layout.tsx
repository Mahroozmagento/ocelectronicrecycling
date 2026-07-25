import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Schedule a pickup or get a quote for e-waste recycling, ITAD, or data destruction in Orange County. Call (949) 287-3056.',
  alternates: { canonical: 'https://www.ocelectronicrecycling.com/contact' },
  openGraph: {
    title: 'Contact Us',
    description: 'Schedule a pickup or get a quote for e-waste recycling, ITAD, or data destruction in Orange County.',
    url: 'https://www.ocelectronicrecycling.com/contact',
    images: [{ url: '/image/contact-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us',
    description: 'Schedule a pickup or get a quote for e-waste recycling, ITAD, or data destruction in Orange County.',
    images: ['/image/contact-oc-electronic-recycling.webp'],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

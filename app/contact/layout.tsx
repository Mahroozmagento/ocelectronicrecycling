import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Schedule a pickup or get a quote for e-waste recycling, ITAD, or data destruction in Orange County. Call (949) 287-3056.',
  alternates: { canonical: 'https://www.ocelectronicrecycling.com/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

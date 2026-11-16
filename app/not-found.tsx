// app/not-found.tsx — real 404 for unknown URLs and notFound() calls.
import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

const LINKS = [
  { href: '/business-pickup', label: 'Request a business pickup' },
  { href: '/services', label: 'Services' },
  { href: '/service-areas', label: 'Service areas' },
  { href: '/resources', label: 'Resource center' },
]

export default function NotFound() {
  return (
    <section className="ct-hero ct-gridlines ct-notfound">
      <div className="ct-wrap ct-wrap--narrow ct-hero__copy">
        <span className="ct-eyebrow">Error 404</span>
        <h1 className="ct-h1">We couldn&apos;t find that page</h1>
        <p className="ct-lede">The link may be out of date, or the page may have moved. These are good places to continue:</p>
        <ul className="ct-chips">
          {LINKS.map((l) => (
            <li key={l.href}><Link className="ct-chip" href={l.href}>{l.label} <Icon name="arrow" size={14} /></Link></li>
          ))}
        </ul>
        <p className="ct-hero__phone">
          <Icon name="phone" size={18} />
          <span>Or call <a href={PHONE_HREF} data-cta-location="not_found">{PHONE_DISPLAY}</a></span>
        </p>
      </div>
    </section>
  )
}

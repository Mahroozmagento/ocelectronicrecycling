// app/service-areas/page.tsx — hub for every service-area page.
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import { REGIONS, cities, citiesByRegion } from '@/lib/cities'
import { breadcrumbNode, graph, type Crumb } from '@/lib/schema'
import {
  DEFAULT_OG_IMAGE, ELIGIBILITY_FACTS, HOURS, PHONE_DISPLAY, PHONE_HREF, POLICY, SERVICE_AREA, SITE_URL,
} from '@/lib/site'

const PATH = '/service-areas'
const TITLE = 'E-Waste Recycling Service Areas'
const DESCRIPTION = `Service areas for business electronics pickup, recycling and data destruction across ${SERVICE_AREA}. Find your city and check pickup eligibility.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: `${TITLE} | OC Electronic Recycling`,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | OC Electronic Recycling`,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
}

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Service Areas', path: PATH },
]

const REGION_NOTES: Record<string, string> = {
  'North County': 'From the Los Angeles County line through Fullerton, Anaheim and Brea.',
  'Central County': 'The county seat, Irvine, and the South Coast Metro office district.',
  'South County': 'Master-planned cities, business parks and foothill communities.',
  Coast: 'Coastal cities from Huntington Beach to San Clemente.',
}

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbNode(PATH, CRUMBS))} />

      <section className="ct-hero ct-hero--page ct-gridlines">
        <div className="ct-wrap">
          <Breadcrumbs crumbs={CRUMBS} />
          <div className="ct-hero__copy ct-rise" style={{ marginTop: 22, maxWidth: 820 }}>
            <span className="ct-eyebrow">Service coverage</span>
            <h1 className="ct-h1">Service areas across Orange County and South Los Angeles</h1>
            <p className="ct-lede">
              We travel to businesses throughout {SERVICE_AREA}. The pages below describe {cities.length} Orange County
              service areas — they are not branch locations. Coverage for your address is confirmed when we review your request.
            </p>
            <div className="ct-hero__actions">
              <Link href="/business-pickup" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="areas_hero">
                Request a Business Pickup
              </Link>
              <a href={PHONE_HREF} className="ct-btn ct-btn--ghost ct-btn--lg" data-cta-location="areas_hero">
                <Icon name="phone" size={18} /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <ul className="ct-facts ct-hero__facts" aria-label="Pickup eligibility summary">
            {ELIGIBILITY_FACTS.map((f) => (
              <li key={f.label}>
                <span className="ct-facts__value">{f.value}<small>{f.label}</small></span>
                <span className="ct-facts__detail">{f.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ct-section" aria-labelledby="areas-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow">Orange County</span>
            <h2 className="ct-h2" id="areas-title">Find your service area</h2>
            <p className="ct-lede">Each page covers local business context, pickup eligibility and nearby coverage.</p>
          </div>
          <div className="ct-citygroups" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {REGIONS.map((region) => (
              <nav key={region} className="ct-citygroup" aria-label={`${region} service areas`}>
                <h3>{region}</h3>
                <p className="ct-small" style={{ padding: '10px 0 6px' }}>{REGION_NOTES[region]}</p>
                <ul>
                  {citiesByRegion(region).map((c) => (
                    <li key={c.slug}>
                      <Link href={`/e-waste-recycling/${c.slug}`}>{c.name} <Icon name="chevron" size={16} /></Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </section>

      <section className="ct-section ct-section--mineral" aria-labelledby="la-title">
        <div className="ct-wrap ct-split">
          <div className="ct-stack">
            <span className="ct-eyebrow ct-eyebrow--warm">South Los Angeles</span>
            <h2 className="ct-h2" id="la-title">Outside Orange County?</h2>
            <p className="ct-body">
              Our service area also includes South Los Angeles. We do not publish a city-by-city list for that area,
              so send your address with your request — or call — and we will confirm whether we can serve your location.
            </p>
            <p className="ct-body">{POLICY.confirm}</p>
          </div>
          <div className="ct-panel">
            <h3 className="ct-h3">Don&apos;t see your city?</h3>
            <p className="ct-small" style={{ margin: '10px 0 18px' }}>
              The list above is not exhaustive. Enter your ZIP code in the pickup request form for guidance, or talk to us directly.
            </p>
            <div className="ct-stack" style={{ gap: 12, justifyItems: 'stretch' }}>
              <Link href="/business-pickup#request" className="ct-btn ct-btn--ink" data-cta-location="areas_panel">Start a pickup request</Link>
              <a href={PHONE_HREF} className="ct-btn ct-btn--ghost" data-cta-location="areas_panel">
                <Icon name="phone" size={18} /> {PHONE_DISPLAY} · {HOURS}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

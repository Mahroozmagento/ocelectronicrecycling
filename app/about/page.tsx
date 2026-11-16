// app/about/page.tsx
// Only verifiable statements: what the business does, how it works and where.
// No founding year, headcount, customer counts or certifications are stated
// until the owner supplies evidence (see docs/seo/OWNER-VERIFICATION-REQUIRED.md).
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import { breadcrumbNode, graph, type Crumb } from '@/lib/schema'
import { EMAIL, HOURS, PHONE_DISPLAY, PHONE_HREF, POLICY, SERVICE_AREA, SITE_URL } from '@/lib/site'

const PATH = '/about'
const TITLE = 'About Us'
const DESCRIPTION = `About OC Electronic Recycling: business pickup, data destruction and ITAD across ${SERVICE_AREA}, with policies stated up front.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: `${TITLE} | OC Electronic Recycling`,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    images: [{ url: '/image/about-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | OC Electronic Recycling`,
    description: DESCRIPTION,
    images: ['/image/about-oc-electronic-recycling.webp'],
  },
}

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: PATH },
]

const PRINCIPLES = [
  { icon: 'info', title: 'Policies up front', body: `${POLICY.minimum} ${POLICY.fees}` },
  { icon: 'lock', title: 'Data handling you choose', body: `${POLICY.data} You decide whether drives are sanitized or physically destroyed.` },
  { icon: 'doc', title: 'Documentation by scope', body: `${POLICY.documents} We tell you plainly which documents apply.` },
  { icon: 'pin', title: 'Local service area', body: POLICY.area },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbNode(PATH, CRUMBS))} />

      <section className="ct-hero ct-hero--page ct-gridlines">
        <div className="ct-wrap">
          <Breadcrumbs crumbs={CRUMBS} />
          <div className="ct-hero__copy ct-rise" style={{ marginTop: 22, maxWidth: 860 }}>
            <span className="ct-eyebrow">About</span>
            <h1 className="ct-h1">A straightforward partner for retiring business technology</h1>
            <p className="ct-lede">
              OC Electronic Recycling helps organizations across {SERVICE_AREA} retire computers, servers, networking
              gear and office electronics — with clear eligibility rules, data handling you select, and documentation matched to the job.
            </p>
          </div>
        </div>
      </section>

      <section className="ct-section" aria-labelledby="approach-title">
        <div className="ct-wrap ct-split ct-split--wide-left">
          <div className="ct-stack">
            <span className="ct-eyebrow">Our approach</span>
            <h2 className="ct-h2" id="approach-title">Clear answers before anything is scheduled</h2>
            <p className="ct-body">
              Disposing of business electronics raises the same questions every time: what qualifies, what it costs,
              what happens to the data, and what proof you will have afterward. We answer those before pickup, in writing
              where it matters, and we only schedule once you have agreed to the confirmed scope.
            </p>
            <p className="ct-body">
              After pickup, selected data services are performed, equipment is evaluated for reuse, and remaining material
              is routed to downstream processors in line with California e-waste regulations.
            </p>
            <div className="ct-hero__actions">
              <Link href="/how-it-works" className="ct-btn ct-btn--ink">See how it works</Link>
              <Link href="/services" className="ct-btn ct-btn--ghost">Our services</Link>
            </div>
          </div>
          <div className="ct-panel">
            <h3 className="ct-h3">Contact</h3>
            <ul className="ct-checks" style={{ marginTop: 14, color: 'var(--ct-text-2)' }}>
              <li><a className="ct-inline-link" href={PHONE_HREF} data-cta-location="about_panel">{PHONE_DISPLAY}</a></li>
              <li><a className="ct-inline-link" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li>{HOURS}</li>
              <li>Service area: {SERVICE_AREA}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ct-section ct-section--mineral" aria-labelledby="principles-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow">How we operate</span>
            <h2 className="ct-h2" id="principles-title">Four commitments we can actually keep</h2>
          </div>
          <ul className="ct-projects">
            {PRINCIPLES.map((p) => (
              <li key={p.title}>
                <span className="ct-projects__icon"><Icon name={p.icon} size={20} /></span>
                <div>
                  <h3 className="ct-h3">{p.title}</h3>
                  <p>{p.body}</p>
                </div>
                <span />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ct-cta" aria-labelledby="cta-title">
        <div className="ct-wrap ct-cta__grid">
          <div className="ct-cta__copy">
            <span className="ct-eyebrow">Talk to us</span>
            <h2 className="ct-h2" id="cta-title">Questions about a project?</h2>
            <p className="ct-lede">Call, or send your equipment list online and we&apos;ll follow up.</p>
          </div>
          <div className="ct-cta__actions">
            <Link href="/business-pickup" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="about_final">Request a Business Pickup</Link>
            <div className="ct-cta__phone">
              <Icon name="phone" size={22} />
              <div><a href={PHONE_HREF} data-cta-location="about_final">{PHONE_DISPLAY}</a><small>{HOURS}</small></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

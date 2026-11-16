// app/services/page.tsx — services overview hub.
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import Photo from '@/components/Photo'
import { breadcrumbNode, graph, type Crumb } from '@/lib/schema'
import { ELIGIBILITY_FACTS, HOURS, PHONE_DISPLAY, PHONE_HREF, PICKUP_MINIMUM, POLICY, SERVICE_AREA, SITE_URL, TV_FEE } from '@/lib/site'

const PATH = '/services'
const TITLE = 'Electronics Recycling, ITAD & Data Destruction Services'
const DESCRIPTION = `Compare business pickup, ITAD, data destruction and electronics recycling services across ${SERVICE_AREA}.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: `${TITLE} | OC Electronic Recycling`,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    images: [{ url: '/image/services-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | OC Electronic Recycling`,
    description: DESCRIPTION,
    images: ['/image/services-oc-electronic-recycling.webp'],
  },
}

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: PATH },
]

const PRIMARY = [
  {
    href: '/business-pickup', tone: '', icon: 'truck', title: 'Business pickup',
    body: `Collection from your site for requests with at least ${PICKUP_MINIMUM} qualifying major items, once eligibility, fees and timing are confirmed.`,
    points: ['Eligibility estimator and online request', `Televisions $${TV_FEE} each`, 'A request is not a booking until confirmed'],
    go: 'Check eligibility',
  },
  {
    href: '/services/data-destruction', tone: ' ct-path--secure', icon: 'lock', title: 'Data destruction',
    body: 'Drive sanitization with reference to NIST SP 800-88 guidelines, or physical destruction — a service you select.',
    points: ['Wipe for reuse or destroy', 'HDDs, SSDs, phones and network gear', 'Certificate for media processed'],
    go: 'Compare methods',
  },
  {
    href: '/services/itad', tone: ' ct-path--ink', icon: 'layers', title: 'IT asset disposition',
    body: 'A planned exit for retired IT: inventory, data handling, value recovery and documented disposition.',
    points: ['Refreshes, relocations, decommissions', 'Serialized reporting when in scope', 'Resale assessed, never guaranteed'],
    go: 'How ITAD works',
  },
]

const PROJECTS = [
  { icon: 'server', title: 'Server room and data center decommissions', body: 'Racks, servers, storage and networking, with data handling and site access planned in advance.', href: '/services/itad' },
  { icon: 'building', title: 'Office relocations and cleanouts', body: 'Mixed loads of computers, monitors, printers and accessories, scheduled around your move once confirmed.', href: '/business-pickup' },
  { icon: 'mobile', title: 'Phones, tablets and laptops', body: 'Mobile devices and laptops, with sanitization or destruction when you select a data service.', href: '/services/data-destruction' },
  { icon: 'recycle', title: 'General electronics recycling', body: 'How equipment is sorted, dismantled and routed to downstream processors.', href: '/services/recycling' },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbNode(PATH, CRUMBS))} />

      <section className="ct-hero ct-hero--page ct-gridlines">
        <div className="ct-wrap">
          <Breadcrumbs crumbs={CRUMBS} />
          <div className="ct-hero__grid ct-hero__grid--page" style={{ marginTop: 22 }}>
          <div className="ct-hero__copy ct-rise">
            <span className="ct-eyebrow">Services · {SERVICE_AREA}</span>
            <h1 className="ct-h1">Services for retiring business technology</h1>
            <p className="ct-lede">
              Pickup, data destruction, IT asset disposition and recycling — usually combined into one project.
              Start with the question you need answered first; we confirm scope before anything is scheduled.
            </p>
            <div className="ct-hero__actions">
              <Link href="/business-pickup" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="services_hero">Request a Business Pickup</Link>
              <a href={PHONE_HREF} className="ct-btn ct-btn--ghost ct-btn--lg" data-cta-location="services_hero"><Icon name="phone" size={18} /> {PHONE_DISPLAY}</a>
            </div>
          </div>
          <Photo name="workbench" className="ct-in" sizes="(max-width: 980px) calc(100vw - 32px), (max-width: 1240px) 46vw, 576px" ratio="3 / 2" position="100% 50%" eager />
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

      <section className="ct-section" aria-labelledby="core-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow">Core services</span>
            <h2 className="ct-h2" id="core-title">Three services, one documented process</h2>
          </div>
          <div className="ct-paths">
            {PRIMARY.map((p) => (
              <div key={p.href} className={`ct-path${p.tone}`}>
                <span className="ct-path__icon"><Icon name={p.icon} size={22} /></span>
                <h3 className="ct-h3"><Link href={p.href}>{p.title}</Link></h3>
                <p>{p.body}</p>
                <ul className="ct-checks">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <span className="ct-path__go" aria-hidden="true">{p.go} <Icon name="arrow" size={18} /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ct-section ct-section--mineral" aria-labelledby="projects-title">
        <div className="ct-wrap">
          <div className="ct-head ct-head--split">
            <div>
              <span className="ct-eyebrow">Common projects</span>
              <h2 className="ct-h2" id="projects-title">Where most requests start</h2>
            </div>
            <p className="ct-lede">{POLICY.unusual} {POLICY.data}</p>
          </div>
          <ul className="ct-projects">
            {PROJECTS.map((p) => (
              <li key={p.title}>
                <span className="ct-projects__icon"><Icon name={p.icon} size={20} /></span>
                <div>
                  <h3 className="ct-h3"><Link href={p.href}>{p.title}</Link></h3>
                  <p>{p.body}</p>
                </div>
                <Icon name="arrow" size={18} className="ct-projects__go" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ct-cta" aria-labelledby="cta-title">
        <div className="ct-wrap ct-cta__grid">
          <div className="ct-cta__copy">
            <span className="ct-eyebrow">Not sure where to start?</span>
            <h2 className="ct-h2" id="cta-title">Tell us what you have. We&apos;ll recommend the approach.</h2>
            <p className="ct-lede">{POLICY.confirm}</p>
          </div>
          <div className="ct-cta__actions">
            <Link href="/business-pickup" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="services_final">Request a Business Pickup</Link>
            <div className="ct-cta__phone">
              <Icon name="phone" size={22} />
              <div><a href={PHONE_HREF} data-cta-location="services_final">{PHONE_DISPLAY}</a><small>{HOURS}</small></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

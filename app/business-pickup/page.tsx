// app/business-pickup/page.tsx
// Primary conversion page. Server-rendered copy, links, metadata and schema;
// only the estimator and the request form are client components.
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CustodyManifest } from '@/components/CustodyVisuals'
import FaqList from '@/components/Faq'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import EligibilityEstimator from '@/components/pickup/EligibilityEstimator'
import { PickupProvider } from '@/components/pickup/PickupContext'
import PickupForm from '@/components/pickup/PickupForm'
import { getCityBySlug } from '@/lib/cities'
import { breadcrumbNode, faqNode, graph, serviceNode, type Crumb, type Faq } from '@/lib/schema'
import {
  CONFIRM_ITEMS, COURTESY_ITEMS, DOCUMENT_TYPES, ELIGIBILITY_FACTS, EMAIL, FEATURED_CITY_SLUGS, HOURS,
  PHONE_DISPLAY, PHONE_HREF, PICKUP_MINIMUM, POLICY, PROCESS_STEPS, QUALIFYING_ITEMS, SERVICE_AREA,
  SITE_URL, TV_FEE,
} from '@/lib/site'

const PATH = '/business-pickup'
const TITLE = 'Business E-Waste Pickup in Orange County'
const DESCRIPTION = `Request business electronics pickup across ${SERVICE_AREA}. ${PICKUP_MINIMUM}+ qualifying items, $${TV_FEE} per television, and eligibility confirmed before scheduling.`

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
  { name: 'Business Pickup', path: PATH },
]

// Visible FAQ and FAQPage schema are generated from this one array.
const FAQS: Faq[] = [
  {
    q: 'What counts toward the five-item minimum?',
    a: 'Qualifying major equipment counts: desktop computers, laptops, servers, networking equipment, monitors, tablets and smartphones, printers and office equipment, and televisions. Small accessories such as keyboards, mice and cables can be included with a pickup, but they do not count toward the minimum. Loose drives and unusual equipment are reviewed individually.',
  },
  {
    q: 'Is business pickup free?',
    a: `Most accepted qualifying electronics can be recycled without a recycling fee when a request meets the five-item minimum. Televisions carry a $${TV_FEE} recycling fee per unit, and optional services such as data destruction are confirmed separately. Requests below the minimum may require a pickup fee or additional qualifying equipment. Any charges are confirmed before scheduling.`,
  },
  {
    q: 'Are televisions free to recycle?',
    a: `No. Televisions carry a $${TV_FEE} recycling fee per unit. Tell us how many you have and their approximate sizes, and we will confirm the total before anything is scheduled.`,
  },
  {
    q: 'Which items require confirmation?',
    a: 'Oversized, specialized, hazardous or unusual equipment is confirmed individually. That includes loose drives and backup tapes, UPS units and batteries, CRT displays, large copiers and plotters, server racks, medical or laboratory equipment, and appliances. Describe these in your request and we will tell you what we can accept.',
  },
  {
    q: 'Can we add accessories to a pickup?',
    a: 'Yes. Keyboards, mice, cables, power adapters, docking stations and similar small accessories can be included with a qualifying pickup. They are courtesy items and do not count toward the five-item minimum.',
  },
  {
    q: 'Is data destruction included?',
    a: 'No. Data destruction is a selected service and is not automatically included with recycling. If your devices hold business data, choose sanitization or physical destruction in the request form and we will confirm the scope before pickup.',
  },
  {
    q: 'Which certificates and documents are available?',
    a: 'Depending on the service you select and the equipment processed, documentation can include a pickup manifest, a serialized asset inventory, a Certificate of Recycling, a Certificate of Data Destruction and chain-of-custody documentation. Tell us what your records require and we will confirm what applies.',
  },
  {
    q: 'How quickly can a pickup be scheduled?',
    a: 'Timing depends on your location, the size of the request and current availability. We do not promise same-day or same-week pickup. After reviewing your request, we confirm an available pickup window with you.',
  },
  {
    q: 'Is submitting the form a confirmed booking?',
    a: 'No. Submitting the form sends us a request. A pickup is scheduled only after we have confirmed eligibility, any applicable charges and timing with you.',
  },
  {
    q: 'Do you serve our ZIP code?',
    a: `We serve businesses across ${SERVICE_AREA}. Enter your ZIP code in the request form for guidance, and we will confirm coverage for your address when we review the request.`,
  },
  {
    q: 'Can you handle office cleanouts or server rooms?',
    a: 'Yes, larger projects such as office cleanouts, relocations and server-room decommissions can be requested. Share approximate quantities, access details and any data destruction or documentation needs so we can confirm scope and plan the pickup.',
  },
]

const SERVICE_LINKS = [
  { href: '/services/data-destruction', icon: 'lock', title: 'Data destruction', body: 'Sanitization or physical destruction for drives and other data-bearing media.' },
  { href: '/services/itad', icon: 'layers', title: 'IT asset disposition', body: 'Inventory, value recovery and documented disposition for retired IT.' },
  { href: '/services/recycling', icon: 'recycle', title: 'Electronics recycling', body: 'How equipment is sorted, dismantled and routed downstream.' },
]

export default function BusinessPickupPage() {
  const cities = FEATURED_CITY_SLUGS.map(getCityBySlug).filter((c) => c !== undefined)

  return (
    <PickupProvider>
      <JsonLd
        data={graph(
          serviceNode({
            path: PATH,
            name: 'Business Electronics Pickup',
            serviceType: 'Business e-waste and IT equipment pickup',
            description: DESCRIPTION,
          }),
          breadcrumbNode(PATH, CRUMBS),
          faqNode(PATH, FAQS),
        )}
      />

      {/* Page wrapper: gives this page's plain sections a soft off-white (see ct-pickup.css). */}
      <div className="ct-page--pickup">
      {/* 1 ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="ct-hero ct-hero--light ct-gridlines ct-gridlines--light">
        <div className="ct-wrap">
          <Breadcrumbs crumbs={CRUMBS} tone="light" />
          <div className="ct-hero__grid" style={{ marginTop: 22 }}>
            <div className="ct-hero__copy ct-rise">
              <span className="ct-eyebrow">Business pickup · {SERVICE_AREA}</span>
              <h1 className="ct-h1">
                Business e-waste pickup, <em>confirmed before it&apos;s scheduled</em>
              </h1>
              <p className="ct-lede">
                Retiring computers, servers or office electronics? Tell us what you have. We confirm what we can
                accept, any fees and available timing — then collect it from your site with the data handling and
                documentation you selected.
              </p>
              <div className="ct-hero__actions">
                <a href="#request" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="pickup_hero">
                  Request a Business Pickup
                </a>
                <a href="#what-counts" className="ct-btn ct-btn--ghost ct-btn--lg">See What We Accept</a>
              </div>
              <p className="ct-hero__phone">
                <Icon name="phone" size={18} />
                <span>Prefer to talk? <a href={PHONE_HREF} data-cta-location="pickup_hero">{PHONE_DISPLAY}</a> · {HOURS}</span>
              </p>
            </div>
            <div className="ct-hero__art ct-in">
              <CustodyManifest />
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

      {/* 2 ── Estimator ────────────────────────────────────────────────────── */}
      <section className="ct-section" id="estimator" aria-labelledby="estimator-title">
        <div className="ct-wrap">
          <div className="ct-head ct-head--split">
            <div>
              <span className="ct-eyebrow">Eligibility estimator</span>
              <h2 className="ct-h2" id="estimator-title">See how your list compares with the pickup minimum</h2>
            </div>
            <p className="ct-lede">
              Add approximate quantities. The estimate updates as you go and carries into the request form.
              It is guidance only — it does not confirm service or pricing.
            </p>
          </div>
          <EligibilityEstimator />
          <noscript>
            <p className="ct-note" style={{ marginTop: 16 }}>
              The estimator and request form need JavaScript. You can also call {PHONE_DISPLAY} or email {EMAIL} with your equipment list.
            </p>
          </noscript>
        </div>
      </section>

      {/* 3 ── What counts ──────────────────────────────────────────────────── */}
      <section className="ct-section ct-section--mineral" id="what-counts" aria-labelledby="counts-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow">What counts toward pickup</span>
            <h2 className="ct-h2" id="counts-title">Three groups: what qualifies, what tags along, and what we check first</h2>
            <p className="ct-lede">{POLICY.minimum} {POLICY.fees}</p>
          </div>

          <div className="ct-triage">
            <div className="ct-triage__col ct-triage__col--major">
              <div className="ct-triage__head">
                <span className="ct-triage__tag"><Icon name="check" size={14} /> Counts toward the {PICKUP_MINIMUM}-item minimum</span>
                <h3 className="ct-h3">Qualifying major equipment</h3>
              </div>
              <div className="ct-triage__body">
                <ul className="ct-checks">
                  {QUALIFYING_ITEMS.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            </div>
            <div className="ct-triage__col ct-triage__col--courtesy">
              <div className="ct-triage__head">
                <span className="ct-triage__tag"><Icon name="plus" size={14} /> Welcome, but does not count</span>
                <h3 className="ct-h3">Courtesy add-on items</h3>
              </div>
              <div className="ct-triage__body">
                <ul className="ct-checks ct-checks--plus">
                  {COURTESY_ITEMS.map((i) => <li key={i}>{i}</li>)}
                </ul>
                <p className="ct-small">{POLICY.courtesy}</p>
              </div>
            </div>
            <div className="ct-triage__col ct-triage__col--confirm">
              <div className="ct-triage__head">
                <span className="ct-triage__tag"><Icon name="alert" size={14} /> Ask first — confirmed individually</span>
                <h3 className="ct-h3">Restricted or unusual items</h3>
              </div>
              <div className="ct-triage__body">
                <ul className="ct-checks ct-checks--ask">
                  {CONFIRM_ITEMS.map((i) => <li key={i}>{i}</li>)}
                </ul>
                <p className="ct-small">Some of these cannot be accepted. Describe them in your request, or{' '}
                  <a className="ct-inline-link" href={PHONE_HREF} data-cta-location="pickup_what_counts">call {PHONE_DISPLAY}</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 ── Request form ─────────────────────────────────────────────────── */}
      <section className="ct-section" id="request" aria-labelledby="request-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow ct-eyebrow--secure">Pickup request</span>
            <h2 className="ct-h2" id="request-title">Request a business pickup</h2>
            <p className="ct-lede">Four short steps. {POLICY.request} {POLICY.confirm}</p>
          </div>
          <div className="ct-request">
            <PickupForm />
            <aside className="ct-request__aside" aria-label="What happens after you send a request">
              <div className="ct-panel">
                <h3 className="ct-h3">After you send it</h3>
                <ol style={{ marginTop: 14 }}>
                  <li>We review your list against the pickup policy.</li>
                  <li>We contact you to confirm eligibility, any fees and timing.</li>
                  <li>Pickup is scheduled only once you agree to the confirmed scope.</li>
                </ol>
              </div>
              <div className="ct-note ct-note--warm">
                <Icon name="info" size={18} />
                <span>We do not promise same-day or same-week pickup. Timing depends on location, volume and availability.</span>
              </div>
              <div className="ct-panel">
                <h3 className="ct-h3">Rather send a list?</h3>
                <p className="ct-small" style={{ marginTop: 8 }}>
                  Email an inventory or photos to{' '}
                  <a className="ct-inline-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>, or call{' '}
                  <a className="ct-inline-link" href={PHONE_HREF} data-cta-location="pickup_form_aside">{PHONE_DISPLAY}</a>.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 5 ── Process ──────────────────────────────────────────────────────── */}
      <section className="ct-section ct-section--ink ct-gridlines" aria-labelledby="process-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow">How pickup works</span>
            <h2 className="ct-h2" id="process-title">From your list to selected documentation, in four steps</h2>
          </div>
          <ol className="ct-rail">
            {PROCESS_STEPS.map((s) => (
              <li key={s.title}>
                <h3 className="ct-h3">{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 ── Documentation ────────────────────────────────────────────────── */}
      <section className="ct-section" aria-labelledby="docs-title">
        <div className="ct-wrap">
          <div className="ct-head ct-head--split">
            <div>
              <span className="ct-eyebrow ct-eyebrow--secure">Documentation</span>
              <h2 className="ct-h2" id="docs-title">Five documents, each with a different job</h2>
            </div>
            <p className="ct-lede">{POLICY.documents} Tell us what your records policy or auditor needs and we will confirm what applies to your project.</p>
          </div>
          <table className="ct-table">
            <caption>Documentation is scoped per project. Serial-number tracking and data destruction certificates are not automatic.</caption>
            <thead>
              <tr><th scope="col">Document</th><th scope="col">What it records</th><th scope="col">When it applies</th></tr>
            </thead>
            <tbody>
              {DOCUMENT_TYPES.map((d) => (
                <tr key={d.name}>
                  <th scope="row">{d.name}</th>
                  <td data-label="What it records">{d.what}</td>
                  <td data-label="When it applies">{d.when}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ct-paths" style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
            {SERVICE_LINKS.map((s, i) => (
              <div key={s.href} className={`ct-path${i === 0 ? ' ct-path--secure' : i === 1 ? ' ct-path--ink' : ''}`}>
                <span className="ct-path__icon"><Icon name={s.icon} size={22} /></span>
                <h3 className="ct-h3"><Link href={s.href}>{s.title}</Link></h3>
                <p>{s.body}</p>
                <span className="ct-path__go" aria-hidden="true">Service details <Icon name="arrow" size={18} /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 ── Coverage ─────────────────────────────────────────────────────── */}
      <section className="ct-section ct-section--mineral" aria-labelledby="coverage-title">
        <div className="ct-wrap ct-split">
          <div className="ct-stack">
            <span className="ct-eyebrow">Local coverage</span>
            <h2 className="ct-h2" id="coverage-title">Serving {SERVICE_AREA}</h2>
            <p className="ct-body">
              We travel to your site across Orange County and South Los Angeles. These are service areas —
              we do not operate a branch in each city, and coverage for your address is confirmed when we review your request.
            </p>
            <Link href="/service-areas" className="ct-link">View all service areas <Icon name="arrow" size={18} /></Link>
          </div>
          <nav aria-label="Principal service areas">
            <ul className="ct-chips">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link className="ct-chip" href={`/e-waste-recycling/${c.slug}`}>
                    <Icon name="pin" size={14} /> {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* 8 ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="ct-section" aria-labelledby="faq-title">
        <div className="ct-wrap ct-wrap--narrow">
          <div className="ct-head">
            <span className="ct-eyebrow">Pickup FAQ</span>
            <h2 className="ct-h2" id="faq-title">Business pickup questions</h2>
          </div>
          <FaqList faqs={FAQS} />
        </div>
      </section>

      {/* 9 ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="ct-cta" aria-labelledby="cta-title">
        <div className="ct-wrap ct-cta__grid">
          <div className="ct-cta__copy">
            <span className="ct-eyebrow">Ready when you are</span>
            <h2 className="ct-h2" id="cta-title">Send your list. We&apos;ll confirm the rest.</h2>
            <p className="ct-lede">
              Business electronics pickup across {SERVICE_AREA}. No obligation until you approve the confirmed scope.
            </p>
          </div>
          <div className="ct-cta__actions">
            <a href="#request" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="pickup_final">Request a Business Pickup</a>
            <div className="ct-cta__phone">
              <Icon name="phone" size={22} />
              <div>
                <a href={PHONE_HREF} data-cta-location="pickup_final">{PHONE_DISPLAY}</a>
                <small>{HOURS}</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </PickupProvider>
  )
}

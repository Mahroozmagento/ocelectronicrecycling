// app/page.tsx — Home
// Guides visitors into three intentions: business pickup, data destruction and
// IT asset disposition. Fully server-rendered; no client JavaScript of its own.
import type { Metadata } from 'next'
import Link from 'next/link'
import FaqList from '@/components/Faq'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import Photo from '@/components/Photo'
import { REGIONS, getCityBySlug } from '@/lib/cities'
import { faqNode, graph, type Faq } from '@/lib/schema'
import {
  COURTESY_ITEMS, DEFAULT_OG_IMAGE, ELIGIBILITY_FACTS, FEATURED_CITY_SLUGS, HOURS, PHONE_DISPLAY, PHONE_HREF,
  PICKUP_MINIMUM, POLICY, PROCESS_STEPS, QUALIFYING_ITEMS, SERVICE_AREA, SITE_URL, TV_FEE,
} from '@/lib/site'

const TITLE = 'OC Electronic Recycling — Orange County E-Waste & ITAD'
const DESCRIPTION = `Business electronics pickup, recycling, ITAD and data destruction across ${SERVICE_AREA}. ${PICKUP_MINIMUM}-item pickup minimum; scope confirmed first.`

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
}

const PATHWAYS = [
  {
    href: '/business-pickup',
    tone: '',
    icon: 'truck',
    num: '01',
    title: 'Business electronics pickup',
    body: 'Collection from your office, warehouse or server room once we have confirmed what qualifies.',
    points: [`${PICKUP_MINIMUM}+ qualifying major items`, `Televisions $${TV_FEE} each`, 'Request online in four steps'],
    go: 'Check pickup eligibility',
  },
  {
    href: '/services/data-destruction',
    tone: ' ct-path--secure',
    icon: 'lock',
    num: '02',
    title: 'Secure data destruction',
    body: 'Sanitization or physical destruction for drives and other data-bearing media — a service you select.',
    points: ['Guided by NIST SP 800-88', 'Wipe for reuse or destroy', 'Certificate for media processed'],
    go: 'Compare destruction methods',
  },
  {
    href: '/services/itad',
    tone: ' ct-path--ink',
    icon: 'layers',
    num: '03',
    title: 'IT asset disposition',
    body: 'A planned exit for retired IT: inventory, data handling, value recovery and documented disposition.',
    points: ['Refreshes, moves and decommissions', 'Serialized reporting by scope', 'Resale assessed, not promised'],
    go: 'See how ITAD works',
  },
]

// Visible FAQ and FAQPage schema come from this one array.
const FAQS: Faq[] = [
  {
    q: 'What does OC Electronic Recycling do?',
    a: `We collect retired business electronics across ${SERVICE_AREA}, provide data sanitization or physical destruction when you select that service, and route equipment to reuse or recycling through downstream processors.`,
  },
  {
    q: 'Who qualifies for business pickup?',
    a: `Business pickup requires at least ${PICKUP_MINIMUM} qualifying major electronic items, such as computers, servers, monitors or networking equipment. Small accessories can be included but do not count toward the minimum. Final acceptance, fees and timing are confirmed before scheduling.`,
  },
  {
    q: 'Is there a fee to recycle electronics?',
    a: `Most accepted qualifying electronics can be recycled without a recycling fee. Televisions carry a $${TV_FEE} recycling fee per unit, and oversized, specialized or hazardous equipment is confirmed individually.`,
  },
  {
    q: 'Is data destruction automatic when we recycle computers?',
    a: 'No. Data destruction is a selected service and is not automatically included with recycling. Choose sanitization or physical destruction when you request pickup if your devices hold business data.',
  },
  {
    q: 'What documentation can we receive?',
    a: 'Depending on the service you select and the equipment processed, documentation can include a pickup manifest, a serialized asset inventory, a Certificate of Recycling, a Certificate of Data Destruction and chain-of-custody documentation.',
  },
]

export default function HomePage() {
  const featured = FEATURED_CITY_SLUGS.map(getCityBySlug).filter((c) => c !== undefined)

  return (
    <>
      <JsonLd data={graph(faqNode('/', FAQS))} />

      {/* 1 ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="ct-hero ct-gridlines">
        <div className="ct-wrap">
          <div className="ct-hero__grid ct-hero__grid--photo">
            <div className="ct-hero__copy ct-rise">
              <span className="ct-eyebrow">{SERVICE_AREA}</span>
              <h1 className="ct-h1">
                Electronics recycling and secure IT disposal <em>for Orange County businesses</em>
              </h1>
              <p className="ct-lede">
                We pick up retired business technology, protect the data on it when you select that service, and route
                equipment to reuse or responsible recycling — with documentation matched to your project.
              </p>
              <div className="ct-hero__actions">
                <Link href="/business-pickup" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="home_hero">
                  Request a Business Pickup
                </Link>
                <Link href="/services" className="ct-btn ct-btn--ghost ct-btn--lg">Explore Services</Link>
              </div>
              <p className="ct-hero__phone">
                <Icon name="phone" size={18} />
                <span>Call <a href={PHONE_HREF} data-cta-location="home_hero">{PHONE_DISPLAY}</a> · {HOURS}</span>
              </p>
            </div>
            <div className="ct-hero__photo ct-in">
              <Photo
                name="facility"
                sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 980px) 560px, (max-width: 1240px) 40vw, 500px"
                eager
                caption="Inside our warehouse: equipment is sorted by type before processing."
              />
            </div>
          </div>

          {/* 2 ── Eligibility strip ──────────────────────────────────────── */}
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

      {/* 3 ── Three pathways ───────────────────────────────────────────────── */}
      <section className="ct-section" aria-labelledby="paths-title">
        <div className="ct-wrap">
          <div className="ct-head ct-head--split">
            <div>
              <span className="ct-eyebrow">Start here</span>
              <h2 className="ct-h2" id="paths-title">Three ways we help businesses retire technology</h2>
            </div>
            <p className="ct-lede">
              Most projects combine all three. Pick the one that matches the question you need answered first.
            </p>
          </div>
          <div className="ct-paths">
            {PATHWAYS.map((p) => (
              <div key={p.href} className={`ct-path${p.tone}`}>
                <span className="ct-path__num">{p.num}</span>
                <span className="ct-path__icon"><Icon name={p.icon} size={22} /></span>
                <h3 className="ct-h3"><Link href={p.href}>{p.title}</Link></h3>
                <p>{p.body}</p>
                <ul className="ct-checks">
                  {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <span className="ct-path__go" aria-hidden="true">{p.go} <Icon name="arrow" size={18} /></span>
              </div>
            ))}
          </div>
          <p className="ct-small" style={{ marginTop: 20 }}>
            Looking for something else?{' '}
            <Link className="ct-inline-link" href="/services/recycling">Electronics recycling</Link> and{' '}
            <Link className="ct-inline-link" href="/services">all services</Link>.
          </p>
        </div>
      </section>

      {/* 4 ── Chain-of-custody story ───────────────────────────────────────── */}
      <section className="ct-section ct-section--ink2" aria-labelledby="custody-title">
        <div className="ct-wrap">
          <div className="ct-head ct-head--split">
            <div>
              <span className="ct-eyebrow">Example chain-of-custody workflow</span>
              <h2 className="ct-h2" id="custody-title">Every handoff has a step — and a record when you need one</h2>
            </div>
            <p className="ct-lede">
              This is how a typical business project moves, from your first message to the paperwork in your scope.
              It is an illustration of the process, not a live feed.
            </p>
          </div>
          <Photo
            name="overview"
            className="ct-photo--wide"
            sizes="(max-width: 1240px) calc(100vw - 32px), 1200px"
            ratioSm="4 / 3"
            position="30% 50%"
            caption="Company trucks and sorted equipment bins at our warehouse."
          />
          <ol className="ct-rail">
            {PROCESS_STEPS.map((s) => (
              <li key={s.title}>
                <h3 className="ct-h3">{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 32 }}>
            <Link href="/how-it-works" className="ct-link">See the full process <Icon name="arrow" size={18} /></Link>
          </p>
        </div>
      </section>

      {/* 5 ── Business pickup eligibility feature ──────────────────────────── */}
      <section className="ct-section ct-section--mineral" aria-labelledby="pickup-title">
        <div className="ct-wrap ct-split ct-split--center">
          <div className="ct-stack">
            <span className="ct-eyebrow ct-eyebrow--warm">Business pickup eligibility</span>
            <h2 className="ct-h2" id="pickup-title">Know whether you qualify before you ask</h2>
            <p className="ct-body">{POLICY.minimum} {POLICY.fees}</p>
            <p className="ct-body">{POLICY.unusual} {POLICY.request}</p>
            <div className="ct-hero__actions">
              <Link href="/business-pickup#estimator" className="ct-btn ct-btn--ink ct-btn--lg" data-cta-location="home_eligibility">
                Estimate your eligibility
              </Link>
              <Link href="/business-pickup#what-counts" className="ct-btn ct-btn--ghost ct-btn--lg">What counts?</Link>
            </div>
          </div>
          <div className="ct-panel ct-panel--lift">
            <h3 className="ct-h3">Counts toward the {PICKUP_MINIMUM}-item minimum</h3>
            <ul className="ct-checks" style={{ marginTop: 14, color: 'var(--ct-text-2)' }}>
              {QUALIFYING_ITEMS.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <h3 className="ct-h3" style={{ marginTop: 22 }}>Welcome, but does not count</h3>
            <p className="ct-small" style={{ marginTop: 8 }}>
              {COURTESY_ITEMS.slice(0, 4).join(', ')} and similar small accessories.
            </p>
          </div>
        </div>
      </section>

      {/* 6 ── Data destruction explanation ─────────────────────────────────── */}
      <section className="ct-section" aria-labelledby="dd-title">
        <div className="ct-wrap">
          <div className="ct-head ct-head--split">
            <div>
              <span className="ct-eyebrow ct-eyebrow--secure">Secure data destruction</span>
              <h2 className="ct-h2" id="dd-title">Wipe it or destroy it — your call, made before pickup</h2>
            </div>
            <p className="ct-lede">
              {POLICY.data} NIST SP 800-88 is a media-sanitization guideline we work with reference to — it is not a certification.
            </p>
          </div>
          <table className="ct-table">
            <caption>Method is chosen per device type and your requirements, and confirmed before pickup.</caption>
            <thead>
              <tr><th scope="col">Method</th><th scope="col">Best when</th><th scope="col">What you receive</th></tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Data sanitization (wiping)</th>
                <td data-label="Best when">Drives are working and the hardware will be reused or resold.</td>
                <td data-label="What you receive">A Certificate of Data Destruction recording the method for the media processed.</td>
              </tr>
              <tr>
                <th scope="row">Physical destruction</th>
                <td data-label="Best when">Media is failed, obsolete, or policy requires that it never be reused.</td>
                <td data-label="What you receive">A Certificate of Data Destruction for the media destroyed.</td>
              </tr>
              <tr>
                <th scope="row">Recycling only</th>
                <td data-label="Best when">Equipment holds no business data, or drives were already removed.</td>
                <td data-label="What you receive">A Certificate of Recycling on request. No data service is performed.</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: 26 }}>
            <Link href="/services/data-destruction" className="ct-link">Data destruction service details <Icon name="arrow" size={18} /></Link>
          </p>
        </div>
      </section>

      {/* 7 ── Responsible downstream processing ────────────────────────────── */}
      <section className="ct-section ct-section--ink ct-gridlines" aria-labelledby="down-title">
        <div className="ct-wrap ct-split ct-split--center">
          <div className="ct-stack">
            <span className="ct-eyebrow">Responsible processing</span>
            <h2 className="ct-h2" id="down-title">Where equipment goes after it leaves your site</h2>
            <p className="ct-body">
              Equipment is evaluated for reuse first, then for parts, then for material recovery. Material streams are
              routed to downstream processors in line with California e-waste regulations.
            </p>
            <p className="ct-body">
              We describe the process rather than promise an outcome: we do not publish a landfill-diversion figure we cannot document.
            </p>
            <Link href="/services/recycling" className="ct-link">How electronics recycling works <Icon name="arrow" size={18} /></Link>
          </div>
          <ul className="ct-lanes">
            <li>
              <span className="ct-lanes__tag"><Icon name="recycle" size={16} /> Reuse</span>
              <p><strong>Working equipment</strong>Assessed for resale or redeployment after any selected data service is complete.</p>
            </li>
            <li>
              <span className="ct-lanes__tag"><Icon name="layers" size={16} /> Parts</span>
              <p><strong>Usable components</strong>Recovered from equipment that is not worth keeping whole.</p>
            </li>
            <li>
              <span className="ct-lanes__tag"><Icon name="box" size={16} /> Materials</span>
              <p><strong>Metals, plastics, glass and boards</strong>Separated and sent to downstream processors for recovery.</p>
            </li>
          </ul>
        </div>
        <div className="ct-wrap">
          <Photo
            name="sorting"
            className="ct-photo--after"
            sizes="(max-width: 1240px) calc(100vw - 32px), 1200px"
            ratioSm="4 / 3"
            caption="Equipment is sorted by type on our processing floor."
          />
        </div>
      </section>

      {/* 8 ── Service-area discovery ───────────────────────────────────────── */}
      <section className="ct-section ct-section--mineral" aria-labelledby="areas-title">
        <div className="ct-wrap ct-split">
          <div className="ct-stack">
            <span className="ct-eyebrow">Service areas</span>
            <h2 className="ct-h2" id="areas-title">We come to you across {SERVICE_AREA}</h2>
            <p className="ct-body">
              Coverage spans {REGIONS.length} parts of Orange County — north, central, south and the coast — plus South
              Los Angeles. City pages describe service areas, not branch locations.
            </p>
            <Link href="/service-areas" className="ct-link">View all service areas <Icon name="arrow" size={18} /></Link>
          </div>
          <nav aria-label="Principal service areas">
            <ul className="ct-chips">
              {featured.map((c) => (
                <li key={c.slug}>
                  <Link className="ct-chip" href={`/e-waste-recycling/${c.slug}`}><Icon name="pin" size={14} /> {c.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* 9 ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="ct-section" aria-labelledby="faq-title">
        <div className="ct-wrap ct-wrap--narrow">
          <div className="ct-head">
            <span className="ct-eyebrow">FAQ</span>
            <h2 className="ct-h2" id="faq-title">Common questions</h2>
          </div>
          <FaqList faqs={FAQS} />
          <p className="ct-small" style={{ marginTop: 20 }}>
            More detail in the <Link className="ct-inline-link" href="/business-pickup#faq-title">pickup FAQ</Link> and the{' '}
            <Link className="ct-inline-link" href="/resources">resource center</Link>.
          </p>
        </div>
      </section>

      {/* 10 ── Final CTA ───────────────────────────────────────────────────── */}
      <section className="ct-cta" aria-labelledby="cta-title">
        <div className="ct-wrap ct-cta__grid">
          <div className="ct-cta__copy">
            <span className="ct-eyebrow">Next step</span>
            <h2 className="ct-h2" id="cta-title">Tell us what you&apos;re retiring</h2>
            <p className="ct-lede">
              Send a list, a few photos or a rough count. We confirm what we can accept, any fees and timing before anything is scheduled.
            </p>
          </div>
          <div className="ct-cta__actions">
            <Link href="/business-pickup" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="home_final">
              Request a Business Pickup
            </Link>
            <div className="ct-cta__phone">
              <Icon name="phone" size={22} />
              <div>
                <a href={PHONE_HREF} data-cta-location="home_final">{PHONE_DISPLAY}</a>
                <small>{HOURS} · {SERVICE_AREA}</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

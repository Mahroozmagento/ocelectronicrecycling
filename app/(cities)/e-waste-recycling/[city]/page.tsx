// app/(cities)/e-waste-recycling/[city]/page.tsx
// Shared template for every service-area page. All 34 pages are produced from
// lib/cities.ts — fix copy here or in the data, never on a single city.
//
// IMPORTANT: sentences that include the city name are built as template
// strings (see `t` below), never as JSX text split across lines. JSX trims the
// whitespace around a line break, which is what once produced "mostIrvine".
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import FaqList from '@/components/Faq'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import { getAllCitySlugs, getCityBySlug, type CityData } from '@/lib/cities'
import { breadcrumbNode, faqNode, graph, serviceNode, type Crumb, type Faq } from '@/lib/schema'
import {
  CONFIRM_ITEMS, COURTESY_ITEMS, DEFAULT_OG_IMAGE, ELIGIBILITY_FACTS, HOURS, PHONE_DISPLAY, PHONE_HREF,
  PICKUP_MINIMUM, POLICY, PROCESS_STEPS, QUALIFYING_ITEMS, SERVICE_AREA, SITE_URL, TV_FEE,
} from '@/lib/site'

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ city: slug }))
}

// Unknown slugs return a real 404 instead of rendering on demand.
export const dynamicParams = false

const pathFor = (city: CityData) => `/e-waste-recycling/${city.slug}`
const h1For = (city: CityData) => `Electronics Recycling & Business Pickup in ${city.name}`

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) return {}
  const url = `${SITE_URL}${pathFor(city)}`
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${city.metaTitle} | OC Electronic Recycling`,
      description: city.metaDescription,
      url,
      siteName: 'OC Electronic Recycling',
      locale: 'en_US',
      type: 'website',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${city.metaTitle} | OC Electronic Recycling`,
      description: city.metaDescription,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}

/** FAQ shared by every city, plus the optional city-specific question. */
function faqsFor(city: CityData): Faq[] {
  const n = city.name
  const base: Faq[] = [
    {
      q: `Is business electronics pickup available in ${n}?`,
      a: `${n} is within our Orange County service area. Business pickup may be available for requests with at least ${PICKUP_MINIMUM} qualifying major electronic items. We confirm acceptance, any fees and pickup timing before anything is scheduled.`,
    },
    {
      q: `Does it cost anything to recycle electronics in ${n}?`,
      a: `Most accepted qualifying electronics can be recycled without a recycling fee. Televisions carry a $${TV_FEE} recycling fee per unit, and requests below the ${PICKUP_MINIMUM}-item minimum may require a pickup fee. All charges are confirmed with you first.`,
    },
    {
      q: 'Is data destruction included with recycling?',
      a: 'No. Data destruction is a selected service and is not automatically included. If your equipment holds business data, choose data sanitization or physical destruction when you request pickup, and a Certificate of Data Destruction can be issued for the media processed.',
    },
    {
      q: `Do you have a branch or drop-off location in ${n}?`,
      a: `We serve ${n} as a service area and travel to your site, so this page does not represent a branch location. Contact us if you would like to ask about drop-off options.`,
    },
  ]
  if (city.faq) base.splice(1, 0, city.faq)
  return base
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) notFound()

  const path = pathFor(city)
  const faqs = faqsFor(city)
  const nearby = city.nearby.map(getCityBySlug).filter((c) => c !== undefined)
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: city.name, path },
  ]

  // Every sentence containing the city name is a complete string.
  const n = city.name
  const placeKind = city.kind === 'community' ? 'community' : 'city'
  const t = {
    eyebrow: `Service area · ${city.region}, Orange County`,
    lede: `Pickup, recycling and selected data destruction for businesses and organizations in ${n}. ${n} is part of our ${SERVICE_AREA} coverage — a service area, not a branch location.`,
    localTitle: `Business technology in ${n}`,
    scenariosTitle: `Common equipment scenarios in ${n}`,
    servicesTitle: `Services available to ${n} businesses`,
    eligibilityTitle: `Pickup eligibility for ${n}`,
    eligibilityBody: `${POLICY.minimum} ${POLICY.fees} ${POLICY.confirm}`,
    acceptedTitle: `What we can collect in ${n}`,
    dataTitle: 'Data destruction options',
    processTitle: `How pickup works in ${n}`,
    faqTitle: `Questions from ${n} businesses`,
    nearbyTitle: `Service areas near ${n}`,
    ctaTitle: `Request a business pickup in ${n}`,
    ctaBody: `Tell us what you have at your ${n} location. We confirm eligibility, any fees and timing before anything is scheduled.`,
    residents: `Home offices and households in this ${placeKind} can contact us to ask about options; the same confirmation process applies.`,
  }

  return (
    <>
      <JsonLd
        data={graph(
          serviceNode({
            path,
            name: `Electronics recycling and business pickup in ${n}`,
            serviceType: 'Electronics recycling, IT asset disposition and data destruction',
            description: city.metaDescription,
            // Service area only — deliberately no LocalBusiness address for a city page.
            areaServed: {
              '@type': city.kind === 'community' ? 'Place' : 'City',
              name: `${n}, California`,
              containedInPlace: { '@type': 'AdministrativeArea', name: 'Orange County, California' },
            },
          }),
          breadcrumbNode(path, crumbs),
          faqNode(path, faqs),
        )}
      />

      {/* Hero */}
      <section className="ct-hero ct-hero--page ct-gridlines">
        <div className="ct-wrap">
          <Breadcrumbs crumbs={crumbs} />
          <div className="ct-hero__copy ct-rise" style={{ marginTop: 22, maxWidth: 860 }}>
            <span className="ct-eyebrow">{t.eyebrow}</span>
            <h1 className="ct-h1">{h1For(city)}</h1>
            <p className="ct-lede">{t.lede}</p>
            <div className="ct-hero__actions">
              <Link href="/business-pickup" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="city_hero">
                Request a Business Pickup
              </Link>
              <a href={PHONE_HREF} className="ct-btn ct-btn--ghost ct-btn--lg" data-cta-location="city_hero">
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

      {/* Local context */}
      <section className="ct-section" aria-labelledby="local-title">
        <div className="ct-wrap ct-split ct-split--wide-left">
          <div className="ct-stack">
            <span className="ct-eyebrow">Local context</span>
            <h2 className="ct-h2" id="local-title">{t.localTitle}</h2>
            <p className="ct-body">{city.intro}</p>
            <p className="ct-body">{city.context}</p>
          </div>
          <div className="ct-panel">
            <h3 className="ct-h3">{t.scenariosTitle}</h3>
            <ul className="ct-checks" style={{ marginTop: 16, color: 'var(--ct-text-2)' }}>
              {city.scenarios.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <p className="ct-small" style={{ marginTop: 16 }}>
              Typical situations for this area — not a list of past projects. {t.residents}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="ct-section ct-section--mineral" aria-labelledby="services-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow">Service summary</span>
            <h2 className="ct-h2" id="services-title">{t.servicesTitle}</h2>
          </div>
          <div className="ct-paths" style={{ background: '#fff' }}>
            <div className="ct-path">
              <span className="ct-path__icon"><Icon name="truck" size={22} /></span>
              <h3 className="ct-h3"><Link href="/business-pickup">Business pickup</Link></h3>
              <p>Collection from your site for requests that meet the {PICKUP_MINIMUM}-item minimum, once scope and timing are confirmed.</p>
              <span className="ct-path__go" aria-hidden="true">Check eligibility <Icon name="arrow" size={18} /></span>
            </div>
            <div className="ct-path ct-path--secure">
              <span className="ct-path__icon"><Icon name="lock" size={22} /></span>
              <h3 className="ct-h3"><Link href="/services/data-destruction">Data destruction</Link></h3>
              <p>Sanitization with reference to NIST SP 800-88 guidelines, or physical destruction, when you select a data service.</p>
              <span className="ct-path__go" aria-hidden="true">Data destruction details <Icon name="arrow" size={18} /></span>
            </div>
            <div className="ct-path ct-path--ink">
              <span className="ct-path__icon"><Icon name="layers" size={22} /></span>
              <h3 className="ct-h3"><Link href="/services/itad">IT asset disposition</Link></h3>
              <p>Inventory, value recovery and documented disposition for larger refreshes and decommissions.</p>
              <span className="ct-path__go" aria-hidden="true">ITAD details <Icon name="arrow" size={18} /></span>
            </div>
          </div>
          <p className="ct-small" style={{ marginTop: 18 }}>
            Looking for general recycling information? See{' '}
            <Link className="ct-inline-link" href="/services/recycling">how electronics recycling works</Link>.
          </p>
        </div>
      </section>

      {/* Eligibility + accepted items */}
      <section className="ct-section" aria-labelledby="accepted-title">
        <div className="ct-wrap">
          <div className="ct-head ct-head--split">
            <div>
              <span className="ct-eyebrow ct-eyebrow--warm">{t.eligibilityTitle}</span>
              <h2 className="ct-h2" id="accepted-title">{t.acceptedTitle}</h2>
            </div>
            <p className="ct-lede">{t.eligibilityBody}</p>
          </div>
          <div className="ct-triage">
            <div className="ct-triage__col ct-triage__col--major">
              <div className="ct-triage__head">
                <span className="ct-triage__tag"><Icon name="check" size={14} /> Counts toward the minimum</span>
                <h3 className="ct-h3">Qualifying major equipment</h3>
              </div>
              <div className="ct-triage__body">
                <ul className="ct-checks">{QUALIFYING_ITEMS.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            </div>
            <div className="ct-triage__col ct-triage__col--courtesy">
              <div className="ct-triage__head">
                <span className="ct-triage__tag"><Icon name="plus" size={14} /> Does not count</span>
                <h3 className="ct-h3">Courtesy add-on items</h3>
              </div>
              <div className="ct-triage__body">
                <ul className="ct-checks ct-checks--plus">{COURTESY_ITEMS.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            </div>
            <div className="ct-triage__col ct-triage__col--confirm">
              <div className="ct-triage__head">
                <span className="ct-triage__tag"><Icon name="alert" size={14} /> Confirmed individually</span>
                <h3 className="ct-h3">Ask first</h3>
              </div>
              <div className="ct-triage__body">
                <ul className="ct-checks ct-checks--ask">{CONFIRM_ITEMS.slice(0, 6).map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 22 }}>
            <Link href="/business-pickup#estimator" className="ct-link">
              Estimate your eligibility <Icon name="arrow" size={18} />
            </Link>
          </p>
        </div>
      </section>

      {/* Data destruction */}
      <section className="ct-section ct-section--ink2" aria-labelledby="data-title">
        <div className="ct-wrap ct-split ct-split--center">
          <div className="ct-stack">
            <span className="ct-eyebrow ct-eyebrow--secure">Data security</span>
            <h2 className="ct-h2" id="data-title">{t.dataTitle}</h2>
            <p className="ct-body">
              {POLICY.data} Decide before pickup whether drives should be sanitized for reuse or physically destroyed,
              and tell us which documentation your records require.
            </p>
            <Link href="/services/data-destruction" className="ct-link">
              Compare sanitization and destruction <Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className="ct-lanes">
            <li>
              <span className="ct-lanes__tag"><Icon name="drive" size={16} /> Sanitize</span>
              <p><strong>Data sanitization</strong>Drives are overwritten with reference to NIST SP 800-88 guidelines so the hardware can be reused.</p>
            </li>
            <li>
              <span className="ct-lanes__tag"><Icon name="lock" size={16} /> Destroy</span>
              <p><strong>Physical destruction</strong>Media is physically destroyed when it should not, or cannot, be reused.</p>
            </li>
            <li>
              <span className="ct-lanes__tag"><Icon name="doc" size={16} /> Document</span>
              <p><strong>Certificate of Data Destruction</strong>Issued for the media processed when a data service is selected.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="ct-section ct-section--mineral" aria-labelledby="process-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow">Process</span>
            <h2 className="ct-h2" id="process-title">{t.processTitle}</h2>
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

      {/* FAQ + nearby */}
      <section className="ct-section" aria-labelledby="faq-title">
        <div className="ct-wrap ct-split ct-split--wide-left">
          <div>
            <div className="ct-head">
              <span className="ct-eyebrow">FAQ</span>
              <h2 className="ct-h2" id="faq-title">{t.faqTitle}</h2>
            </div>
            <FaqList faqs={faqs} />
          </div>
          <nav className="ct-citygroup" aria-labelledby="nearby-title">
            <h3 id="nearby-title">{t.nearbyTitle}</h3>
            <ul>
              {nearby.map((c) => (
                <li key={c.slug}>
                  <Link href={`/e-waste-recycling/${c.slug}`}>{c.name} <Icon name="chevron" size={16} /></Link>
                </li>
              ))}
              <li>
                <Link href="/service-areas">All service areas <Icon name="chevron" size={16} /></Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* CTA */}
      <section className="ct-cta" aria-labelledby="cta-title">
        <div className="ct-wrap ct-cta__grid">
          <div className="ct-cta__copy">
            <span className="ct-eyebrow">Next step</span>
            <h2 className="ct-h2" id="cta-title">{t.ctaTitle}</h2>
            <p className="ct-lede">{t.ctaBody}</p>
          </div>
          <div className="ct-cta__actions">
            <Link href="/business-pickup" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="city_final">
              Request a Business Pickup
            </Link>
            <div className="ct-cta__phone">
              <Icon name="phone" size={22} />
              <div>
                <a href={PHONE_HREF} data-cta-location="city_final">{PHONE_DISPLAY}</a>
                <small>{HOURS}</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

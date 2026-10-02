// Server component (no "use client"): renders visible FAQ markup and the matching
// JSON-LD (Service + BreadcrumbList + FAQPage). Reused by the three core service
// pages so structured data always mirrors the visible content.
import Link from 'next/link'

export type Faq = { q: string; a: string }

const BASE = 'https://www.ocelectronicrecycling.com'
const BUSINESS_ID = `${BASE}/#business`

export function ServiceStructuredData({
  name,
  path,
  description,
  serviceType,
  breadcrumbName,
  faqs,
}: {
  name: string
  path: string // e.g. "/services/itad"
  description: string
  serviceType: string
  breadcrumbName: string
  faqs: Faq[]
}) {
  const url = `${BASE}${path}`
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name,
      serviceType,
      description,
      url,
      provider: { '@id': BUSINESS_ID },
      areaServed: { '@type': 'AdministrativeArea', name: 'Orange County, California' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/services` },
        { '@type': 'ListItem', position: 3, name: breadcrumbName, item: url },
      ],
    },
  ]
  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  const schema = { '@context': 'https://schema.org', '@graph': graph }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FaqSection({ faqs, heading = 'Frequently Asked Questions' }: { faqs: Faq[]; heading?: string }) {
  return (
    <section className="svc-faq">
      <div className="container">
        <span className="overline" style={{ color: 'var(--blue)' }}>FAQ</span>
        <h2 className="section-title" style={{ color: 'var(--navy)' }}>{heading}</h2>
        <div className="svc-faq__list">
          {faqs.map((f) => (
            <details key={f.q} className="svc-faq__item">
              <summary className="svc-faq__q">{f.q}</summary>
              <div className="svc-faq__a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// Small presentational helpers reused across the service pages.
export function IncludeExclude({
  includes,
  excludes,
}: {
  includes: string[]
  excludes: string[]
}) {
  return (
    <div className="svc-scope">
      <div className="svc-scope__col svc-scope__col--in">
        <h3>What&apos;s included</h3>
        <ul>
          {includes.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <div className="svc-scope__col svc-scope__col--out">
        <h3>What we don&apos;t do</h3>
        <ul>
          {excludes.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function RelatedLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <div className="svc-related">
      {links.map((l) => (
        <Link key={l.href + l.label} href={l.href} className="svc-related__link">
          {l.label} →
        </Link>
      ))}
    </div>
  )
}

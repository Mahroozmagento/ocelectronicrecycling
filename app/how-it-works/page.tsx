// app/how-it-works/page.tsx — the end-to-end process, stated accurately.
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import Photo from '@/components/Photo'
import { breadcrumbNode, graph, type Crumb } from '@/lib/schema'
import { DOCUMENT_TYPES, HOURS, PHONE_DISPLAY, PHONE_HREF, POLICY, PROCESS_STEPS, SERVICE_AREA, SITE_URL } from '@/lib/site'

const PATH = '/how-it-works'
const TITLE = 'How It Works'
const DESCRIPTION = 'How business electronics pickup works: send your list, we confirm scope and eligibility, then pickup, selected data services, processing and documentation.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: `${TITLE} | OC Electronic Recycling`,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    images: [{ url: '/image/how-it-works-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | OC Electronic Recycling`,
    description: DESCRIPTION,
    images: ['/image/how-it-works-oc-electronic-recycling.webp'],
  },
}

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'How It Works', path: PATH },
]

const DETAILS = [
  {
    title: 'Before pickup',
    items: [
      'Approximate quantities by equipment type, plus any unusual items',
      'Pickup address, access, floor, elevator or dock details',
      'Whether any devices need data sanitization or physical destruction',
      'Which documents your records or auditors require',
    ],
  },
  {
    title: 'What we confirm',
    items: [
      'Which items we can accept, and whether the request meets the pickup minimum',
      'Any fees, including the per-unit television fee',
      'The data services and documentation in scope',
      'An available pickup window — nothing is scheduled until you agree',
    ],
  },
  {
    title: 'After pickup',
    items: [
      'Selected data services are performed on the media in scope',
      'Equipment is evaluated for reuse, then routed to material recovery',
      'Documents in your scope are issued once processing is complete',
      'Questions about a project? Call us with your company name',
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbNode(PATH, CRUMBS))} />

      <section className="ct-hero ct-hero--page ct-gridlines">
        <div className="ct-wrap">
          <Breadcrumbs crumbs={CRUMBS} />
          <div className="ct-hero__grid ct-hero__grid--page" style={{ marginTop: 22 }}>
            <div className="ct-hero__copy ct-rise">
              <span className="ct-eyebrow">The process</span>
              <h1 className="ct-h1">How business pickup and processing work</h1>
              <p className="ct-lede">
                Four steps from your first message to the documentation in your scope. Nothing is scheduled until
                we have confirmed eligibility, any fees and timing with you.
              </p>
              <div className="ct-hero__actions">
                <Link href="/business-pickup" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="hiw_hero">Request a Business Pickup</Link>
                <a href={PHONE_HREF} className="ct-btn ct-btn--ghost ct-btn--lg" data-cta-location="hiw_hero"><Icon name="phone" size={18} /> {PHONE_DISPLAY}</a>
              </div>
            </div>
            <Photo name="inspection" className="ct-in" sizes="(max-width: 980px) calc(100vw - 32px), (max-width: 1240px) 46vw, 576px" ratio="3 / 2" position="100% 50%" eager />
          </div>
        </div>
      </section>

      <section className="ct-section" aria-labelledby="steps-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow">Step by step</span>
            <h2 className="ct-h2" id="steps-title">Four steps, each with a clear handoff</h2>
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

      <section className="ct-section ct-section--mineral" aria-labelledby="detail-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow">In detail</span>
            <h2 className="ct-h2" id="detail-title">What happens before, during and after</h2>
          </div>
          <div className="ct-triage">
            {DETAILS.map((d, i) => (
              <div key={d.title} className={`ct-triage__col ${i === 0 ? 'ct-triage__col--courtesy' : i === 1 ? 'ct-triage__col--confirm' : 'ct-triage__col--major'}`}>
                <div className="ct-triage__head">
                  <span className="ct-triage__tag">0{i + 1}</span>
                  <h3 className="ct-h3">{d.title}</h3>
                </div>
                <div className="ct-triage__body">
                  <ul className="ct-checks">{d.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
          <p className="ct-small" style={{ marginTop: 20 }}>{POLICY.minimum} {POLICY.fees} {POLICY.data}</p>
        </div>
      </section>

      <section className="ct-section" aria-labelledby="docs-title">
        <div className="ct-wrap">
          <div className="ct-head ct-head--split">
            <div>
              <span className="ct-eyebrow ct-eyebrow--secure">Documentation</span>
              <h2 className="ct-h2" id="docs-title">Documents are matched to your scope</h2>
            </div>
            <p className="ct-lede">{POLICY.documents}</p>
          </div>
          <table className="ct-table">
            <caption>Serial-number tracking and data destruction certificates are not automatic — request them in your scope.</caption>
            <thead><tr><th scope="col">Document</th><th scope="col">What it records</th><th scope="col">When it applies</th></tr></thead>
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
        </div>
      </section>

      <section className="ct-cta" aria-labelledby="cta-title">
        <div className="ct-wrap ct-cta__grid">
          <div className="ct-cta__copy">
            <span className="ct-eyebrow">Ready to start?</span>
            <h2 className="ct-h2" id="cta-title">Step one takes about three minutes</h2>
            <p className="ct-lede">Send your list online, or call. Serving {SERVICE_AREA}.</p>
          </div>
          <div className="ct-cta__actions">
            <Link href="/business-pickup" className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="hiw_final">Request a Business Pickup</Link>
            <div className="ct-cta__phone">
              <Icon name="phone" size={22} />
              <div><a href={PHONE_HREF} data-cta-location="hiw_final">{PHONE_DISPLAY}</a><small>{HOURS}</small></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

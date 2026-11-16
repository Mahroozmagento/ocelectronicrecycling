// app/resources/page.tsx — knowledge hub.
// Every link points to a page that exists on this site or to an official source.
// There are deliberately no downloads: none exist yet, and none are implied.
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import { breadcrumbNode, graph, type Crumb } from '@/lib/schema'
import { blogPosts } from '@/posts/blog-data'
import { PHONE_DISPLAY, PHONE_HREF, PICKUP_MINIMUM, SITE_URL, TV_FEE } from '@/lib/site'

const PATH = '/resources'
const TITLE = 'Resource Center'
const DESCRIPTION = 'Guides and checklists for retiring business electronics in California: pickup preparation, data sanitization, ITAD planning and official regulatory sources.'
const REVIEWED = 'November 2026'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: `${TITLE} | OC Electronic Recycling`,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    images: [{ url: '/image/resources-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | OC Electronic Recycling`,
    description: DESCRIPTION,
    images: ['/image/resources-oc-electronic-recycling.webp'],
  },
}

const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Resources', path: PATH },
]

const TOPICS = [
  {
    title: 'Preparing for a business pickup',
    body: 'What qualifies, how to plan an office cleanout, and what happens to equipment afterward.',
    service: { href: '/business-pickup', label: 'Business pickup' },
    slugs: ['free-electronics-pickup-orange-county', 'office-cleanout-electronics-disposal-oc', 'what-happens-to-recycled-electronics', 'tv-recycling-orange-county'],
  },
  {
    title: 'Data security and sanitization',
    body: 'Wiping versus shredding, what a destruction certificate records, and data on network gear.',
    service: { href: '/services/data-destruction', label: 'Data destruction' },
    slugs: ['hard-drive-shred-vs-wipe-guide', 'certified-data-destruction-california', 'data-destruction-network-switches-routers', 'how-to-recycle-old-computers-safely'],
  },
  {
    title: 'Planning IT asset disposition',
    body: 'How ITAD differs from recycling, chain of custody, and decommissioning projects.',
    service: { href: '/services/itad', label: 'IT asset disposition' },
    slugs: ['what-is-itad-explained', 'it-asset-chain-of-custody-california', 'data-center-decommissioning-checklist', 'it-refresh-cycle-decommissioning-orange-county'],
  },
  {
    title: 'California disposal rules',
    body: 'An overview of the state rules that apply when businesses dispose of electronics.',
    service: { href: '/services/recycling', label: 'Electronics recycling' },
    slugs: ['california-e-waste-law-for-businesses', 'e-waste-recycling-irvine-compliance', 'pci-dss-hardware-disposal-requirements', 'e-waste-recycling-orange-county-guide'],
  },
]

const CHECKLIST = [
  'Count equipment by type: desktops, laptops, servers, networking, monitors, phones and tablets, printers, televisions.',
  `Check the total against the ${PICKUP_MINIMUM}-item minimum for qualifying major equipment (accessories do not count).`,
  `List televisions separately — each carries a $${TV_FEE} recycling fee.`,
  'Note anything unusual: loose drives, UPS units, batteries, CRTs, racks, lab or medical equipment.',
  'Decide which devices need data sanitization or physical destruction, if any.',
  'Write down the documents your records or auditors require.',
  'Gather access details: floor, elevator, loading dock, parking and building hours.',
  'Take a few photos of the equipment if the mix is complex.',
]

const SOURCES = [
  { name: 'California Department of Toxic Substances Control (DTSC) — electronic hazardous waste', href: 'https://dtsc.ca.gov/electronic-hazardous-waste/', note: 'State guidance on managing e-waste as universal or hazardous waste.' },
  { name: 'CalRecycle — electronic waste', href: 'https://calrecycle.ca.gov/electronics/', note: 'The Covered Electronic Waste program and the Electronic Waste Recycling Act of 2003.' },
  { name: 'NIST Special Publication 800-88 — Guidelines for Media Sanitization', href: 'https://csrc.nist.gov/pubs/sp/800/88/r1/final', note: 'The federal guideline describing Clear, Purge and Destroy. It is guidance, not a certification.' },
  { name: 'California Civil Code §1798.81 — disposal of customer records', href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1798.81.', note: 'The state requirement to make personal information unreadable before records are disposed of.' },
]

export default function ResourcesPage() {
  const bySlug = new Map(blogPosts.map((p) => [p.slug, p]))

  return (
    <>
      <JsonLd data={graph(breadcrumbNode(PATH, CRUMBS))} />

      <section className="ct-hero ct-hero--page ct-gridlines">
        <div className="ct-wrap">
          <Breadcrumbs crumbs={CRUMBS} />
          <div className="ct-hero__copy ct-rise" style={{ marginTop: 22, maxWidth: 820 }}>
            <span className="ct-eyebrow">Resource center</span>
            <h1 className="ct-h1">Guides for retiring business electronics</h1>
            <p className="ct-lede">
              Practical guides, a pickup preparation checklist and links to the official sources behind California&apos;s
              disposal rules. General information only — not legal advice.
            </p>
            <p className="ct-small">Maintained by OC Electronic Recycling · Hub reviewed {REVIEWED}</p>
          </div>
        </div>
      </section>

      <section className="ct-section" aria-labelledby="guides-title">
        <div className="ct-wrap">
          <div className="ct-head">
            <span className="ct-eyebrow">Guides by topic</span>
            <h2 className="ct-h2" id="guides-title">Start with the question you have</h2>
          </div>
          {TOPICS.map((t) => (
            <div key={t.title} className="ct-topic">
              <div className="ct-topic__head">
                <h3 className="ct-h3">{t.title}</h3>
                <p>{t.body}</p>
                <Link href={t.service.href} className="ct-link">{t.service.label} <Icon name="arrow" size={16} /></Link>
              </div>
              <ul className="ct-guides">
                {t.slugs.map((slug) => {
                  const post = bySlug.get(slug)
                  if (!post) return null
                  const updated = post.dateModified ?? post.publishDate
                  return (
                    <li key={slug}>
                      <Link href={`/blog/${slug}`}>
                        <span className="ct-guides__title">{post.title}</span>
                        <span className="ct-guides__meta">{post.readTime} · Updated <time dateTime={updated}>{new Date(`${updated}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })}</time></span>
                        <Icon name="arrow" size={18} />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
          <p style={{ marginTop: 28 }}>
            <Link href="/blog" className="ct-link">Browse all articles <Icon name="arrow" size={18} /></Link>
          </p>
        </div>
      </section>

      <section className="ct-section ct-section--mineral" aria-labelledby="checklist-title">
        <div className="ct-wrap ct-split ct-split--wide-left">
          <div className="ct-panel">
            <span className="ct-eyebrow">Checklist</span>
            <h2 className="ct-h2" id="checklist-title" style={{ margin: '12px 0 20px' }}>Before you request a pickup</h2>
            <ol className="ct-numlist">
              {CHECKLIST.map((c) => <li key={c}>{c}</li>)}
            </ol>
          </div>
          <div className="ct-stack">
            <h3 className="ct-h3">Ready with your list?</h3>
            <p className="ct-body">
              The pickup request form follows the same order as this checklist, and the eligibility estimator shows
              how your list compares with the minimum before you send it.
            </p>
            <Link href="/business-pickup#estimator" className="ct-btn ct-btn--ink" data-cta-location="resources_checklist">Estimate your eligibility</Link>
            <a href={PHONE_HREF} className="ct-inline-link" data-cta-location="resources_checklist">Or call {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>

      <section className="ct-section ct-section--ink2" aria-labelledby="sources-title">
        <div className="ct-wrap ct-split">
          <div className="ct-stack">
            <span className="ct-eyebrow ct-eyebrow--secure">Official sources</span>
            <h2 className="ct-h2" id="sources-title">Check the rules at the source</h2>
            <p className="ct-body">
              Regulations and guidance change. For anything with legal consequences, rely on the agencies and
              publications themselves — and on your own counsel — rather than any vendor summary, including ours.
            </p>
          </div>
          <ul className="ct-sources">
            {SOURCES.map((s) => (
              <li key={s.href}>
                <a className="ct-link" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.name} <Icon name="external" size={15} />
                  <span className="ct-vh"> (opens in a new tab)</span>
                </a>
                <p>{s.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

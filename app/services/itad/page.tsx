// app/services/itad/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ServiceStructuredData,
  FaqSection,
  IncludeExclude,
  RelatedLinks,
  type Faq,
} from '@/components/ServiceStructuredData'

export const metadata: Metadata = {
  title: 'IT Asset Disposition (ITAD)',
  description:
    'IT asset disposition (ITAD) in Orange County — asset inventory, data sanitization following NIST 800-88 guidelines, value recovery, and documented downstream recycling for businesses.',
  alternates: { canonical: 'https://www.ocelectronicrecycling.com/services/itad' },
  openGraph: {
    title: 'IT Asset Disposition (ITAD) in Orange County',
    description:
      'Asset inventory, data sanitization, value recovery, and documented downstream recycling for Orange County businesses.',
    url: 'https://www.ocelectronicrecycling.com/services/itad',
    images: [{ url: '/image/itad-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Asset Disposition (ITAD) in Orange County',
    description:
      'Asset inventory, data sanitization, value recovery, and documented downstream recycling for Orange County businesses.',
    images: ['/image/itad-oc-electronic-recycling.webp'],
  },
}

const FEATURES = [
  { icon: '📋', title: 'Asset Inventory', desc: 'Devices are cataloged — serial number, make, model, and condition grade — to build a manifest before processing begins.' },
  { icon: '💰', title: 'Value Recovery', desc: 'Working assets are assessed for potential resale, with transparent reporting on any proceeds. Not every asset has resale value.' },
  { icon: '🔒', title: 'Data Sanitization', desc: 'Data-bearing devices are wiped or physically destroyed following NIST 800-88 guidelines before any disposition decision.' },
  { icon: '🌿', title: 'Responsible Disposal', desc: 'Non-working equipment is dismantled and recycled through vetted downstream processors in compliance with California e-waste regulations.' },
  { icon: '📊', title: 'Audit-Ready Reporting', desc: 'Certificates, manifests, and disposition records are compiled to support your internal compliance and audit needs.' },
  { icon: '🚛', title: 'Logistics Management', desc: 'Pickup, transport, and processing are handled end-to-end, with chain-of-custody maintained throughout.' },
]

const ACCEPTED = [
  'Desktops, laptops & workstations', 'Servers & rack equipment', 'Networking (switches, routers, firewalls)',
  'Storage arrays & loose drives (HDD/SSD)', 'Monitors & displays', 'Phones, tablets & mobile devices',
  'Printers, copiers & MFPs', 'UPS units & batteries', 'Peripherals, cables & accessories',
]

const STEPS = [
  { n: '01', t: 'Scope & schedule', d: 'We review your equipment list, timeline, data-security requirements, and pickup location, then confirm a plan and appointment.' },
  { n: '02', t: 'Inventory & chain of custody', d: 'On collection, assets are logged and a chain-of-custody record begins — tracked from your site through processing.' },
  { n: '03', t: 'Data sanitization', d: 'Every data-bearing device is wiped or physically destroyed following NIST 800-88 guidelines before any resale or recycling decision.' },
  { n: '04', t: 'Disposition & reporting', d: 'Assets are remarketed, harvested for parts, or recycled through vetted processors. You receive certificates, manifests, and a disposition report.' },
]

const INCLUDES = [
  'Serialized asset inventory and manifest',
  'NIST 800-88-guided data sanitization or destruction',
  'Certificate of destruction for data-bearing media',
  'Value-recovery assessment and resale reporting where applicable',
  'Chain-of-custody documentation from pickup to processing',
  'Recycling of non-working assets via vetted downstream processors',
]
const EXCLUDES = [
  'Guaranteed resale values or fixed buy-back pricing',
  'Legal or compliance sign-off (we provide documentation; your counsel advises)',
  'On-site software license transfer or data migration',
  'Certifications we do not hold (see documentation for what is provided)',
]

const FAQS: Faq[] = [
  { q: 'What is ITAD, and how is it different from e-waste recycling?', a: 'IT asset disposition (ITAD) is the end-of-life management of business IT equipment — inventory, data sanitization, potential value recovery, and final disposition. E-waste recycling is one possible outcome within ITAD. Responsible ITAD always includes recycling for assets that cannot be reused, but adds data-security handling, documentation, and remarketing that general recycling does not.' },
  { q: 'How is data on our devices handled?', a: 'Every data-bearing device is identified during inventory and sanitized following NIST 800-88 guidelines — either overwritten with verified software or physically destroyed — before any disposition decision. A certificate of destruction is issued for the media processed.' },
  { q: 'Do you buy back or resell our equipment?', a: 'Working assets are assessed for potential resale, and we report transparently on any proceeds. Resale value depends on age, condition, and market demand, so we do not promise a fixed price. Equipment with no resale value is recycled responsibly.' },
  { q: 'What documentation do we receive?', a: 'Depending on the scope you select, documentation can include a serialized asset manifest, certificate(s) of data destruction, chain-of-custody records, and a final disposition report suitable for internal audits.' },
  { q: 'Can you handle a full server room or data center decommission?', a: 'Yes. We coordinate scheduling, on-site inventory, secure transport, and chain of custody for server and networking equipment, then sanitize data-bearing media before recycling or remarketing.' },
  { q: 'Which areas do you serve?', a: 'We serve businesses throughout Orange County, California. Coverage is a service area, not a network of local offices — see our service-areas page for the cities we cover.' },
]

export default function ITADPage() {
  return (
    <>
      <ServiceStructuredData
        name="IT Asset Disposition (ITAD)"
        path="/services/itad"
        serviceType="IT asset disposition, data sanitization, and electronics recycling"
        description={metadata.description as string}
        breadcrumbName="IT Asset Disposition (ITAD)"
        faqs={FAQS}
      />

      <div className="svc-inner-hero" style={{
        backgroundImage: `linear-gradient(to right, rgba(7,8,15,0.6), rgba(7,8,15,0.35)), url('/image/itad-oc-electronic-recycling.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      }}>
        <div className="container">
          <span className="overline">Enterprise Service</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 900, letterSpacing: '-.03em', marginTop: '10px' }}>
            IT Asset Disposition<br />(ITAD) in Orange County
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', marginTop: '16px', maxWidth: '560px', lineHeight: 1.7 }}>
            End-of-life management for your IT equipment — inventory, data sanitization following
            NIST 800-88 guidelines, value recovery where possible, and documented, responsible disposal.
          </p>
          <div className="dd-badge-row" style={{ marginTop: '28px' }}>
            <span className="dd-badge nist">NIST 800-88</span>
            <span className="dd-badge ca">CA E-Waste Regulations</span>
          </div>
        </div>
      </div>

      {/* Direct answer + who it's for */}
      <section className="svc-section svc-section--light">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>What It Is &amp; Who It&apos;s For</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Retire IT hardware without the data risk</h2>
          <p className="svc-lead">
            <strong>IT asset disposition (ITAD)</strong> is the process of retiring business technology at end of life:
            taking inventory, sanitizing or destroying the data it holds, recovering value where the market supports it,
            and recycling what&apos;s left through vetted downstream processors. It&apos;s built for <strong>IT and
            operations managers, office and facility managers, and finance or compliance teams</strong> who need
            equipment to leave the building with documentation — not questions.
          </p>
          <p className="svc-lead" style={{ marginTop: '16px' }}>
            Common triggers: a hardware refresh, an office move or downsizing, a lease return, a server-room
            decommission, or a merger that leaves duplicate equipment. In each case the risk is the same — a
            data-bearing device leaving your control undocumented — and a documented ITAD process is designed to reduce it.
          </p>
        </div>
      </section>

      {/* What the service includes */}
      <section className="svc-section svc-section--white">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>Service Scope</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>What ITAD includes</h2>
          <div className="svc-features" style={{ marginTop: '24px' }}>
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="svc-feature-card">
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope in/out */}
      <section className="svc-section svc-section--light">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>Clear Boundaries</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>What we do — and what we don&apos;t</h2>
          <IncludeExclude includes={INCLUDES} excludes={EXCLUDES} />
        </div>
      </section>

      {/* Accepted assets */}
      <section className="svc-section svc-section--white">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>Equipment</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Assets commonly handled in ITAD</h2>
          <div className="svc-chip-grid">
            {ACCEPTED.map((a) => <span key={a} className="svc-chip">{a}</span>)}
          </div>
          <p className="svc-lead" style={{ marginTop: '18px', fontSize: '.92rem' }}>
            Not sure whether we can take a specific item? <a href="tel:9492873056" style={{ color: 'var(--blue)', fontWeight: 700 }}>Call (949) 287-3056</a> — we&apos;ll confirm before pickup.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="svc-section svc-section--light">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>How It Works</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>The ITAD process, step by step</h2>
          <div className="svc-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="svc-step">
                <div className="svc-step__n">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data & documentation + service area + related */}
      <section className="svc-section svc-section--white">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>Data &amp; Documentation</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Chain of custody you can hand an auditor</h2>
          <p className="svc-lead">
            Data-bearing assets are identified during inventory and handled first. Sanitization methods are selected
            with reference to applicable NIST 800-88 media-sanitization guidance; where media cannot be reliably
            overwritten, it is physically destroyed. Certificates of destruction, asset manifests, and chain-of-custody
            records are provided based on the service scope you select — a documented process that helps reduce data-security risk.
          </p>
          <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', margin: '28px 0 12px', fontSize: '1.05rem' }}>Orange County coverage</h3>
          <p className="svc-lead">
            We provide ITAD as a service throughout Orange County, California. This is a service area — we come to
            you — not a claim of a physical office in each city.
          </p>
          <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', margin: '28px 0 12px', fontSize: '1.05rem' }}>Related guides &amp; pages</h3>
          <RelatedLinks
            links={[
              { href: '/blog/it-asset-disposition-orange-county', label: 'ITAD in Orange County (guide)' },
              { href: '/blog/what-is-itad-explained', label: 'What is ITAD? (explainer)' },
              { href: '/blog/server-decommissioning-services-orange-county', label: 'Server decommissioning guide' },
              { href: '/services/data-destruction', label: 'Secure data destruction' },
              { href: '/services/recycling', label: 'E-waste recycling' },
              { href: '/service-areas', label: 'Orange County service areas' },
            ]}
          />
          <p className="svc-lead" style={{ marginTop: '18px', fontSize: '.92rem' }}>
            For an accurate quote, it helps to share your approximate device counts by type, the number of
            data-bearing drives, your location, and your timeline.
          </p>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="ITAD questions, answered" />

      <section className="cta-section">
        <div className="container">
          <h2>Enterprise ITAD<br />Made Simple</h2>
          <p>Tell us what you&apos;re retiring — we&apos;ll recommend the right approach.</p>
          <a href="tel:9492873056" className="cta-phone">(949) 287-3056</a>
          <div className="cta-actions">
            <Link href="/contact" className="btn-primary btn-large">Get ITAD Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}

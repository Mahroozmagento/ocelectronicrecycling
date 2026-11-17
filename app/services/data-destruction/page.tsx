// app/services/data-destruction/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import {
  ServiceStructuredData,
  FaqSection,
  IncludeExclude,
  RelatedLinks,
  type Faq,
} from '@/components/ServiceStructuredData'

export const metadata: Metadata = {
  title: 'Secure Data Destruction with Certificate',
  description:
    'Hard drive shredding and data sanitization guided by NIST SP 800-88 in Orange County, CA. A Certificate of Data Destruction is issued for the media processed.',
  alternates: { canonical: 'https://www.ocelectronicrecycling.com/services/data-destruction' },
  openGraph: {
    title: 'Secure Data Destruction with Certificate',
    description:
      'Hard drive shredding and data sanitization guided by NIST SP 800-88 in Orange County, CA. A Certificate of Data Destruction is issued for the media processed.',
    url: 'https://www.ocelectronicrecycling.com/services/data-destruction',
    images: [{ url: '/image/data-destruction-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Data Destruction with Certificate',
    description:
      'Hard drive shredding and data sanitization guided by NIST SP 800-88 in Orange County, CA. A Certificate of Data Destruction is issued for the media processed.',
    images: ['/image/data-destruction-oc-electronic-recycling.webp'],
  },
}

const FEATURES = [
  { icon: 'drive', title: 'Physical Shredding', desc: 'Shredding reduces drives to fragments — designed to render media unusable and make data recovery impractical. Ask if your policy requires witnessed destruction.' },
  { icon: 'scan', title: 'Software Overwrite', desc: 'NIST 800-88 Clear and Purge methods for HDDs and SSDs, with verification. Suitable when drives will be reused after sanitization.' },
  { icon: 'doc', title: 'Certificate of Destruction', desc: 'Records the method used for the media processed, with serial numbers when serialized tracking is in scope — documentation to support your records.' },
]

const MEDIA = [
  'Hard disk drives (HDD)', 'Solid-state drives (SSD & NVMe)', 'Laptops & desktops with internal storage',
  'Servers & storage arrays', 'Backup tapes (LTO/DAT)', 'USB & flash media',
  'Phones & tablets', 'Network switches, routers & firewalls', 'Copiers/MFPs with internal drives',
]

const STEPS = [
  { n: '01', t: 'Identify data-bearing media', d: 'For equipment in your data destruction scope, data-bearing media is identified, separated and logged before anything else happens.' },
  { n: '02', t: 'Choose the method', d: 'Reusable drives can be overwritten (NIST 800-88 Clear/Purge) with verification; drives that cannot be reliably overwritten are physically destroyed.' },
  { n: '03', t: 'Destroy or sanitize', d: 'Media is shredded, or wiped on dedicated workstations with a verification pass. Witnessed destruction is confirmed per project.' },
  { n: '04', t: 'Document & certify', d: 'A Certificate of Data Destruction is issued for the media processed, with serial-level detail and custody records when they are in scope.' },
]

const INCLUDES = [
  'NIST 800-88-guided sanitization (Clear/Purge) or physical destruction',
  'Hard-drive shredding (witnessed destruction confirmed per project)',
  'Certificate of Data Destruction for the media processed',
  'Serial-level detail and chain-of-custody records when in scope',
  'Recycling of destroyed media through downstream processors',
]
const EXCLUDES = [
  'Data recovery, forensic imaging, or file retrieval',
  'Legal certification that a specific regulation is satisfied (documentation supports your own compliance review)',
  'No guarantee of a specific particle size beyond the equipment’s rated output',
  'Certifications we do not hold — we describe our methods, not accreditations we lack',
]

const FAQS: Faq[] = [
  { q: 'Do you shred hard drives or wipe them?', a: 'Both are available. Physical shredding is used when media should be destroyed outright; software overwriting (following NIST 800-88 Clear or Purge methods, with a verification pass) is used when a drive will be reused. We help you pick based on the device type and your requirements.' },
  { q: 'What does the certificate of destruction include?', a: 'It records the sanitization or destruction method used for the media processed and the date, with drive serial numbers when serialized tracking is part of the agreed scope. It is intended as documentation to support your internal records; it is not a legal opinion.' },
  { q: 'Can destruction be witnessed or done at our location?', a: 'Not for every project. If your policy requires witnessed or on-site destruction, say so when you request service and we will confirm whether it can be arranged before anything is scheduled.' },
  { q: 'Can you destroy SSDs and modern flash storage?', a: 'Yes. SSDs and NVMe drives are handled with methods appropriate to flash media — physical destruction, or a Purge-level approach with verification — because traditional multi-pass overwrites designed for magnetic drives are not appropriate for flash.' },
  { q: 'How is this different from just deleting files or reformatting?', a: 'Deleting or reformatting typically leaves recoverable data. Sanitization following NIST 800-88 is designed to make recovery impractical, and physical destruction renders the media unusable — with documentation to evidence what was done.' },
  { q: 'Do you serve businesses across Orange County?', a: 'Yes — we serve businesses across Orange County and South Los Angeles as a service area. Business pickup requires at least five qualifying major items; loose drives and smaller jobs are confirmed individually.' },
]

export default function DataDestructionPage() {
  return (
    <>
      <ServiceStructuredData
        name="Secure Data Destruction"
        path="/services/data-destruction"
        serviceType="Hard drive shredding and data sanitization"
        description={metadata.description as string}
        breadcrumbName="Data Destruction"
        faqs={FAQS}
      />

      <div className="svc-inner-hero" style={{
        backgroundImage: `linear-gradient(to right, rgba(7,8,15,0.6), rgba(7,8,15,0.35)), url('/image/data-destruction-oc-electronic-recycling.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      }}>
        <div className="container">
          <span className="overline" style={{ color: 'var(--red)' }}>Security Service</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 900, letterSpacing: '-.03em', marginTop: '10px' }}>
            Secure Data Destruction<br />with Certificate
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', marginTop: '16px', maxWidth: '560px', lineHeight: 1.7 }}>
            Data sanitization guided by NIST SP 800-88, or physical shredding. A Certificate of Data Destruction
            is issued for the media processed to support your compliance and audit records.
          </p>
          <div className="dd-badge-row" style={{ marginTop: '28px' }}>
            <span className="dd-badge nist">Guided by NIST SP 800-88</span>
            <span className="dd-badge ca">CA E-Waste Regulations</span>
          </div>
        </div>
      </div>

      {/* Direct answer + who it's for */}
      <section className="svc-section svc-section--light">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>What It Is &amp; Who It&apos;s For</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Make retired data unrecoverable — with proof</h2>
          <p className="svc-lead">
            <strong>Data destruction</strong> is the sanitization or physical destruction of storage media so the
            information it held can no longer be read. It matters most to <strong>IT and security teams, healthcare
            and legal practices, financial and professional firms, and any business</strong> disposing of computers,
            servers, or drives that once held customer, employee, or client data.
          </p>
          <p className="svc-lead" style={{ marginTop: '16px' }}>
            A single discarded drive with intact data can create real exposure. Our documented, NIST 800-88-guided
            process is designed to reduce that risk — and to give you paperwork that shows exactly what was done.
          </p>
        </div>
      </section>

      {/* Methods / scope */}
      <section className="svc-section svc-section--white">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>Methods</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Two proven approaches</h2>
          <div className="svc-features" style={{ marginTop: '24px' }}>
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="svc-feature-card">
                <span className="ct-feature-icon"><Icon name={icon} size={22} /></span>
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
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>What&apos;s included — and what&apos;s not</h2>
          <IncludeExclude includes={INCLUDES} excludes={EXCLUDES} />
        </div>
      </section>

      {/* Accepted media */}
      <section className="svc-section svc-section--white">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>Media</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Media we destroy or sanitize</h2>
          <div className="svc-chip-grid">
            {MEDIA.map((m) => <span key={m} className="svc-chip">{m}</span>)}
          </div>
          <p className="svc-lead" style={{ marginTop: '18px', fontSize: '.92rem' }}>
            Have a media type not listed? <a href="tel:9492873056" style={{ color: 'var(--blue)', fontWeight: 700 }}>Call (949) 287-3056</a> — we&apos;ll confirm handling before pickup.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="svc-section svc-section--light">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>How It Works</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>From intake to certificate</h2>
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

      {/* Documentation + service area + related */}
      <section className="svc-section svc-section--white">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>Documentation &amp; Coverage</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Documentation that supports your records</h2>
          <p className="svc-lead">
            Physical destruction is designed to render media unusable and make data recovery impractical, and software
            sanitization methods are selected with reference to applicable NIST 800-88 media-sanitization guidance.
            Certificates of destruction and chain-of-custody records are provided based on the selected service scope.
            We describe our methods honestly and do not imply that any standards body certifies the company.
          </p>
          <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', margin: '28px 0 12px', fontSize: '1.05rem' }}>Orange County coverage</h3>
          <p className="svc-lead">
            Available across Orange County and South Los Angeles as a service area. Witnessed destruction is confirmed
            per project. This is a service area, not a physical office in each city.
          </p>
          <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', margin: '28px 0 12px', fontSize: '1.05rem' }}>Related guides &amp; pages</h3>
          <RelatedLinks
            links={[
              { href: '/business-pickup', label: 'Request a pickup with data destruction' },
              { href: '/blog/certified-data-destruction-california', label: 'What a destruction certificate proves' },
              { href: '/blog/hard-drive-shred-vs-wipe-guide', label: 'Shred vs. wipe: which to choose' },
              { href: '/blog/data-destruction-network-switches-routers', label: 'Data on switches & routers' },
              { href: '/services/itad', label: 'IT asset disposition (ITAD)' },
              { href: '/service-areas', label: 'Orange County service areas' },
            ]}
          />
          <p className="svc-lead" style={{ marginTop: '18px', fontSize: '.92rem' }}>
            For an accurate quote, share the number and type of drives or devices, whether destruction must be witnessed, and your location and timeline.
          </p>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="Data destruction questions, answered" />

      <section className="cta-section">
        <div className="container">
          <h2>Your Data Security<br />Starts Here</h2>
          <p>Tell us what needs destroying — we&apos;ll recommend shredding or wiping.</p>
          <a href="tel:9492873056" className="cta-phone">(949) 287-3056</a>
          <div className="cta-actions">
            <Link href="/business-pickup" className="btn-primary btn-large" data-cta-location="dd_final">Request Data Destruction</Link>
          </div>
        </div>
      </section>
    </>
  )
}

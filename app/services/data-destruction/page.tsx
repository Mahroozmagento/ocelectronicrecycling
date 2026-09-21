// app/services/data-destruction/page.tsx
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
  title: 'Secure Data Destruction with Certificate',
  description:
    'Hard drive shredding and data sanitization following NIST 800-88 guidelines in Orange County, CA. Certificate of destruction issued per device, with chain-of-custody documentation.',
  alternates: { canonical: 'https://www.ocelectronicrecycling.com/services/data-destruction' },
  openGraph: {
    title: 'Secure Data Destruction with Certificate',
    description:
      'Hard drive shredding and data sanitization following NIST 800-88 guidelines in Orange County, CA. Certificate of destruction issued per device.',
    url: 'https://www.ocelectronicrecycling.com/services/data-destruction',
    images: [{ url: '/image/data-destruction-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Data Destruction with Certificate',
    description:
      'Hard drive shredding and data sanitization following NIST 800-88 guidelines in Orange County, CA. Certificate of destruction issued per device.',
    images: ['/image/data-destruction-oc-electronic-recycling.webp'],
  },
}

const FEATURES = [
  { icon: '🔨', title: 'Physical Shredding', desc: 'Industrial shredders reduce drives to fragments — designed to render media unusable and make data recovery impractical. Available on-site or at our secure facility.' },
  { icon: '💿', title: 'Software Overwrite', desc: 'NIST 800-88 Clear and Purge methods for HDDs and SSDs, with verification. Suitable when drives will be reused after sanitization.' },
  { icon: '📄', title: 'Certificate of Destruction', desc: 'Issued per device with serial number, make/model, method used, and date — audit-ready documentation to support your records.' },
]

const MEDIA = [
  'Hard disk drives (HDD)', 'Solid-state drives (SSD & NVMe)', 'Laptops & desktops with internal storage',
  'Servers & storage arrays', 'Backup tapes (LTO/DAT)', 'USB & flash media',
  'Phones & tablets', 'Network switches, routers & firewalls', 'Copiers/MFPs with internal drives',
]

const STEPS = [
  { n: '01', t: 'Identify data-bearing media', d: 'During intake, every device is checked for storage. Data-bearing media is separated and logged before anything else happens.' },
  { n: '02', t: 'Choose the method', d: 'Reusable drives can be overwritten (NIST 800-88 Clear/Purge) with verification; drives that cannot be reliably overwritten are physically destroyed.' },
  { n: '03', t: 'Destroy or sanitize', d: 'Shredding is available on-site or at our secure facility. Software wiping runs on dedicated workstations with a verification pass.' },
  { n: '04', t: 'Document & certify', d: 'A certificate of destruction is issued per device, with serial-level detail and chain-of-custody records for your files.' },
]

const INCLUDES = [
  'NIST 800-88-guided sanitization (Clear/Purge) or physical destruction',
  'On-site or facility-based hard-drive shredding',
  'Serial-level certificate of destruction per device',
  'Chain-of-custody documentation from pickup to destruction',
  'Recycling of destroyed media through vetted downstream processors',
]
const EXCLUDES = [
  'Data recovery, forensic imaging, or file retrieval',
  'Legal certification that a specific regulation is satisfied (documentation supports your own compliance review)',
  'Guarantees of a specific particle size beyond the equipment’s rated output',
  'Certifications we do not hold — we describe our methods, not accreditations we lack',
]

const FAQS: Faq[] = [
  { q: 'Do you shred hard drives or wipe them?', a: 'Both are available. Physical shredding is used when media should be destroyed outright; software overwriting (following NIST 800-88 Clear or Purge methods, with a verification pass) is used when a drive will be reused. We help you pick based on the device type and your requirements.' },
  { q: 'What does the certificate of destruction include?', a: 'It records the device serial number, make/model, the sanitization or destruction method used, and the date. It is intended as audit-ready documentation to support your internal records; it is not a legal opinion.' },
  { q: 'Is shredding available on-site at our location?', a: 'On-site shredding can be arranged for qualifying jobs, so you can witness destruction before media leaves your site. Facility-based destruction is also available. Ask us which fits your volume and location.' },
  { q: 'Can you destroy SSDs and modern flash storage?', a: 'Yes. SSDs and NVMe drives are handled with methods appropriate to flash media — physical destruction, or a Purge-level approach with verification — because traditional multi-pass overwrites designed for magnetic drives are not appropriate for flash.' },
  { q: 'How is this different from just deleting files or reformatting?', a: 'Deleting or reformatting typically leaves recoverable data. Sanitization following NIST 800-88 is designed to make recovery impractical, and physical destruction renders the media unusable — with documentation to evidence what was done.' },
  { q: 'Do you serve businesses across Orange County?', a: 'Yes — we serve businesses throughout Orange County, California as a service area (we come to you), and can coordinate secure transport for facility-based destruction.' },
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
            Data sanitization and physical shredding following NIST 800-88 guidelines. Every device
            processed receives a certificate of destruction to support your compliance and audit records.
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
            Available throughout Orange County, California as a service area — on-site destruction for qualifying jobs,
            or secure transport to our facility. This is a service area, not a physical office in each city.
          </p>
          <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', margin: '28px 0 12px', fontSize: '1.05rem' }}>Related guides &amp; pages</h3>
          <RelatedLinks
            links={[
              { href: '/blog/certified-data-destruction-california', label: 'What a destruction certificate proves' },
              { href: '/blog/hard-drive-shred-vs-wipe-guide', label: 'Shred vs. wipe: which to choose' },
              { href: '/blog/data-destruction-network-switches-routers', label: 'Data on switches & routers' },
              { href: '/services/itad', label: 'IT asset disposition (ITAD)' },
              { href: '/service-areas', label: 'Orange County service areas' },
            ]}
          />
          <p className="svc-lead" style={{ marginTop: '18px', fontSize: '.92rem' }}>
            For an accurate quote, share the number and type of drives or devices, whether you need on-site or
            facility destruction, and your location and timeline.
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
            <Link href="/contact" className="btn-primary btn-large">Schedule Destruction</Link>
          </div>
        </div>
      </section>
    </>
  )
}

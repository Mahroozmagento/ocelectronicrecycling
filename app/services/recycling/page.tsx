// app/services/recycling/page.tsx
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
  title: 'E-Waste Recycling Orange County',
  description:
    'Business e-waste recycling in Orange County, CA, in line with California regulations. Computers, servers, phones and more; $39 per TV; 5-item pickup minimum.',
  alternates: { canonical: 'https://www.ocelectronicrecycling.com/services/recycling' },
  openGraph: {
    title: 'E-Waste Recycling in Orange County',
    description:
      'Business e-waste recycling in Orange County, CA, in line with California regulations. Computers, servers, phones and more; $39 per TV.',
    url: 'https://www.ocelectronicrecycling.com/services/recycling',
    images: [{ url: '/image/recycling-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Waste Recycling in Orange County',
    description:
      'Business e-waste recycling in Orange County, CA, in line with California regulations. Computers, servers, phones and more; $39 per TV.',
    images: ['/image/recycling-oc-electronic-recycling.webp'],
  },
}

const ITEMS = [
  { icon: 'laptop', title: 'Computers & Laptops', desc: 'Desktops, laptops, tablets, and Chromebooks — all brands, most conditions. Data wipe available for drives.' },
  { icon: 'mobile', title: 'Phones & Tablets', desc: 'Most makes and models, including devices with cracked screens. Data destruction available as a selected service.' },
  { icon: 'printer', title: 'Printers & Peripherals', desc: 'Printers, scanners, monitors, keyboards, mice, cables, and accessories.' },
  { icon: 'tv', title: 'TVs & Displays', desc: 'Flat-panel TVs carry a $39 recycling fee per unit. CRT televisions and monitors are confirmed individually.' },
  { icon: 'alert', title: 'Batteries & Hazardous', desc: 'UPS units, batteries and anything containing lamps or liquids are confirmed individually before pickup.' },
  { icon: 'building', title: 'Office Cleanouts', desc: 'Mixed loads from relocations and cleanouts. Accessories ride along but do not count toward the five-item minimum.' },
]

const STEPS = [
  { n: '01', t: 'Sort at intake', d: 'Incoming electronics are separated by type so each material stream can be routed correctly.' },
  { n: '02', t: 'Handle data-bearing devices', d: 'When a data service is selected, media with storage is wiped or destroyed before recycling.' },
  { n: '03', t: 'Dismantle & recover', d: 'Devices are dismantled and materials — metals, plastics, glass, boards — are separated for recovery.' },
  { n: '04', t: 'Route downstream', d: 'Material streams go to downstream processors for recovery.' },
]

const INCLUDES = [
  'Business electronics recycling (residents can ask about options)',
  'Business pickup for requests with 5+ qualifying major items',
  'Sorting and routing to downstream processors',
  'Optional data wipe or destruction for data-bearing devices',
  'Recycling certificate on request',
]
const EXCLUDES = [
  'Non-electronic waste (general trash, furniture, appliances outside e-waste scope)',
  'No fixed pricing before we confirm item types and volume',
  'Claims of a specific landfill-diversion percentage we cannot document',
  'Certifications we do not hold',
]

const FAQS: Faq[] = [
  { q: 'Is e-waste recycling free?', a: 'Most accepted qualifying electronics can be recycled without a recycling fee. Televisions carry a $39 recycling fee per unit. Business pickup requires at least five qualifying major items; smaller requests may require a pickup fee. All charges are confirmed before scheduling.' },
  { q: 'What electronics do you accept?', a: 'Computers, laptops, monitors, phones, tablets, printers, servers and networking gear count as qualifying major items, and televisions are accepted for a $39 fee per unit. UPS units, batteries, CRTs and other oversized, specialized or hazardous items are confirmed individually.' },
  { q: 'Do you wipe data before recycling?', a: 'Only when you select a data destruction service — it is not automatic. When selected, data-bearing media is sanitized with reference to NIST SP 800-88 guidelines or physically destroyed before recycling, and a Certificate of Data Destruction can be issued for the media processed.' },
  { q: 'Is recycling handled legally in California?', a: 'Materials are handled in line with California e-waste regulations, including the Electronic Waste Recycling Act, and routed to downstream processors.' },
  { q: 'What happens to the materials you collect?', a: 'Devices are sorted and dismantled, and material streams (metals, plastics, glass, circuit boards) are routed to downstream processors for recovery — diverting materials from landfill through documented processing rather than sending them to municipal waste.' },
  { q: 'Do you serve my city in Orange County?', a: 'We serve businesses across Orange County and South Los Angeles. See our service-areas page, or enter your ZIP code in the pickup request form for guidance; coverage is confirmed when we review your request.' },
]

export default function RecyclingPage() {
  return (
    <>
      <ServiceStructuredData
        name="E-Waste Recycling"
        path="/services/recycling"
        serviceType="Electronics and e-waste recycling"
        description={metadata.description as string}
        breadcrumbName="E-Waste Recycling"
        faqs={FAQS}
      />

      <div className="svc-inner-hero" style={{
        backgroundImage: `linear-gradient(to right, rgba(7,8,15,0.6), rgba(7,8,15,0.35)), url('/image/recycling-oc-electronic-recycling.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      }}>
        <div className="container">
          <span className="overline">Green Service</span>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 900, letterSpacing: '-.03em', marginTop: '10px' }}>
            E-Waste Recycling<br />in Orange County
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', marginTop: '16px', maxWidth: '560px', lineHeight: 1.7 }}>
            Business electronics recycling in line with California e-waste regulations. Equipment is evaluated
            for reuse, then routed to downstream processors for material recovery.
          </p>
          <div className="dd-badge-row" style={{ marginTop: '28px' }}>
            <span className="dd-badge ca">CA E-Waste Regulations</span>
            <span className="dd-badge nist">Data destruction: optional, selected</span>
          </div>
        </div>
      </div>

      {/* Direct answer + who it's for */}
      <section className="svc-section svc-section--light">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>What It Is &amp; Who It&apos;s For</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Recycle electronics the responsible way</h2>
          <p className="svc-lead">
            <strong>E-waste recycling</strong> is the responsible collection, sorting, and material recovery of
            end-of-life electronics so hazardous components stay out of landfills. It serves <strong>Orange County
            businesses, offices, schools, and residents</strong> clearing out computers, TVs, phones, printers, and
            other electronics — from a single device to a full office cleanout.
          </p>
          <p className="svc-lead" style={{ marginTop: '16px' }}>
            California classifies many electronic components as hazardous and restricts landfill disposal, so
            recycling through a responsible provider isn&apos;t just good practice — it helps keep your disposal
            compliant.
          </p>
        </div>
      </section>

      {/* What we accept */}
      <section className="svc-section svc-section--white">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>What We Accept</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Electronics we recycle</h2>
          <div className="svc-features" style={{ marginTop: '24px' }}>
            {ITEMS.map(({ icon, title, desc }) => (
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

      {/* Process */}
      <section className="svc-section svc-section--white">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>How It Works</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>From pickup to downstream recovery</h2>
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

      {/* Data + service area + related */}
      <section className="svc-section svc-section--light">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>Data &amp; Coverage</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Data safety and where we serve</h2>
          <p className="svc-lead">
            Recycling and data security go together. If your devices held business or personal data, ask about our
            secure data destruction service — it is not automatic, but when selected, media is wiped with reference to NIST
            SP 800-88 guidelines or physically destroyed before recycling. Materials are evaluated for reuse, recovery, or
            transfer to appropriate downstream processors.
          </p>
          <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', margin: '28px 0 12px', fontSize: '1.05rem' }}>Orange County coverage</h3>
          <p className="svc-lead">
            We provide recycling as a service across Orange County and South Los Angeles, with business pickup for
            requests of five or more qualifying major items. This is a service area — not a drop-off location in every city.
          </p>
          <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', margin: '28px 0 12px', fontSize: '1.05rem' }}>Related guides &amp; pages</h3>
          <RelatedLinks
            links={[
              { href: '/business-pickup', label: 'Check business pickup eligibility' },
              { href: '/blog/e-waste-recycling-orange-county-guide', label: 'Orange County e-waste guide' },
              { href: '/blog/what-happens-to-recycled-electronics', label: 'What happens to recycled electronics' },
              { href: '/blog/tv-recycling-orange-county', label: 'TV recycling in Orange County' },
              { href: '/services/data-destruction', label: 'Secure data destruction' },
              { href: '/service-areas', label: 'Orange County service areas' },
            ]}
          />
          <p className="svc-lead" style={{ marginTop: '18px', fontSize: '.92rem' }}>
            For an accurate quote, tell us roughly what you have, the volume, whether any devices hold data, and your
            location and timeline.
          </p>
        </div>
      </section>

      <FaqSection faqs={FAQS} heading="E-waste recycling questions, answered" />

      <section className="cta-section">
        <div className="container">
          <h2>Recycle Right.<br />Recycle Responsibly.</h2>
          <p>Send your list — we&apos;ll confirm eligibility, fees and timing.</p>
          <a href="tel:9492873056" className="cta-phone">(949) 287-3056</a>
          <div className="cta-actions">
            <Link href="/business-pickup" className="btn-primary btn-large" data-cta-location="recycling_final">Request a Business Pickup</Link>
          </div>
        </div>
      </section>
    </>
  )
}

// app/services/recycling/page.tsx
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
  title: 'E-Waste Recycling Orange County',
  description:
    'Business and residential e-waste recycling in Orange County, CA, in compliance with California regulations. Computers, TVs, phones, and more — sorted and routed to vetted downstream processors.',
  alternates: { canonical: 'https://www.ocelectronicrecycling.com/services/recycling' },
  openGraph: {
    title: 'E-Waste Recycling in Orange County',
    description:
      'Business and residential e-waste recycling in Orange County, CA, in compliance with California regulations. Computers, TVs, phones, and more.',
    url: 'https://www.ocelectronicrecycling.com/services/recycling',
    images: [{ url: '/image/recycling-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Waste Recycling in Orange County',
    description:
      'Business and residential e-waste recycling in Orange County, CA, in compliance with California regulations. Computers, TVs, phones, and more.',
    images: ['/image/recycling-oc-electronic-recycling.webp'],
  },
}

const ITEMS = [
  { icon: '💻', title: 'Computers & Laptops', desc: 'Desktops, laptops, tablets, and Chromebooks — all brands, most conditions. Data wipe available for drives.' },
  { icon: '📱', title: 'Phones & Tablets', desc: 'All makes and models, including devices with cracked screens. Factory-reset verification available.' },
  { icon: '🖨️', title: 'Printers & Peripherals', desc: 'Printers, scanners, monitors, keyboards, mice, cables, and accessories.' },
  { icon: '📺', title: 'TVs & Displays', desc: 'LCD, LED, OLED, and CRT televisions and monitors, handled in compliance with California e-waste regulations.' },
  { icon: '🔋', title: 'Batteries & Hazardous', desc: 'Lithium-ion, NiMH, and lead-acid batteries, plus components such as mercury lamps, handled with appropriate care.' },
  { icon: '🏢', title: 'Business Bulk Drops', desc: 'Large-volume business drop-offs welcome. Call ahead and we’ll have a team ready to help you unload.' },
]

const STEPS = [
  { n: '01', t: 'Sort at intake', d: 'Incoming electronics are separated by type so each material stream can be routed correctly.' },
  { n: '02', t: 'Handle data-bearing devices', d: 'Anything with storage is flagged so data can be wiped or destroyed on request before recycling.' },
  { n: '03', t: 'Dismantle & recover', d: 'Devices are dismantled and materials — metals, plastics, glass, boards — are separated for recovery.' },
  { n: '04', t: 'Route downstream', d: 'Material streams go to vetted downstream processors, diverting materials from landfill through documented processing.' },
]

const INCLUDES = [
  'Business and residential electronics recycling',
  'Scheduled business pickup for qualifying volumes',
  'Sorting and routing to vetted downstream processors',
  'Optional data wipe or destruction for data-bearing devices',
  'Recycling certificate on request',
]
const EXCLUDES = [
  'Non-electronic waste (general trash, furniture, appliances outside e-waste scope)',
  'Guaranteed pricing before we confirm item types and volume',
  'Claims of a specific landfill-diversion percentage we cannot document',
  'Certifications we do not hold',
]

const FAQS: Faq[] = [
  { q: 'Is e-waste recycling free?', a: 'Business pickup is free for qualifying volumes, and many drop-offs are accepted at no charge. Some items or small-quantity residential pickups may involve a fee — we confirm before scheduling so there are no surprises.' },
  { q: 'What electronics do you accept?', a: 'Computers, laptops, monitors, TVs, phones, tablets, printers, servers, networking gear, batteries, and most other electronics. If you are unsure about a specific item, call us and we will confirm.' },
  { q: 'Do you wipe data before recycling?', a: 'On request, yes. Data-bearing devices are flagged at intake and can be wiped or physically destroyed following NIST 800-88 guidelines before recycling, with a certificate of destruction available.' },
  { q: 'Is recycling handled legally in California?', a: 'Yes. Materials are handled in compliance with California e-waste regulations, including the Electronic Waste Recycling Act, and routed through vetted downstream vendors.' },
  { q: 'What happens to the materials you collect?', a: 'Devices are sorted and dismantled, and material streams (metals, plastics, glass, circuit boards) are routed to downstream processors for recovery — diverting materials from landfill through documented processing rather than sending them to municipal waste.' },
  { q: 'Do you serve my city in Orange County?', a: 'We provide recycling as a service throughout Orange County, California. See our service-areas page for the cities we cover, or call to confirm your location.' },
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
            Business and residential electronics recycling, in compliance with California e-waste regulations.
            Materials are sorted and routed to vetted downstream processors to divert them from landfill.
          </p>
          <div className="dd-badge-row" style={{ marginTop: '28px' }}>
            <span className="dd-badge ca">CA E-Waste Regulations</span>
            <span className="dd-badge nist">NIST 800-88 (optional data wipe)</span>
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

      {/* Process */}
      <section className="svc-section svc-section--white">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>How It Works</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>From drop-off to downstream recovery</h2>
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
            secure data destruction service — data-bearing media is flagged at intake and can be wiped or destroyed
            following NIST 800-88 guidelines before recycling. Materials are evaluated for reuse, recovery, or
            transfer to appropriate downstream processors.
          </p>
          <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', margin: '28px 0 12px', fontSize: '1.05rem' }}>Orange County coverage</h3>
          <p className="svc-lead">
            We provide recycling as a service throughout Orange County, California, with scheduled pickup for
            qualifying business volumes. This is a service area — not a physical drop-off location in every city.
          </p>
          <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', margin: '28px 0 12px', fontSize: '1.05rem' }}>Related guides &amp; pages</h3>
          <RelatedLinks
            links={[
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
          <p>Drop off or schedule a pickup — we&apos;ll handle the rest.</p>
          <a href="tel:9492873056" className="cta-phone">(949) 287-3056</a>
          <div className="cta-actions">
            <Link href="/contact" className="btn-primary btn-large">Drop Off or Schedule Pickup</Link>
          </div>
        </div>
      </section>
    </>
  )
}

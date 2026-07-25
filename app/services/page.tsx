// app/services/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateIn, { StaggerGroup, PageHero } from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Complete electronics lifecycle services in Orange County — data destruction, ITAD, e-waste recycling, business pickup.',
  alternates: { canonical: 'https://www.ocelectronicrecycling.com/services' },
}

const SERVICES = [
  { icon: '🔐', title: 'Data Destruction',        href: '/services/data-destruction', accent: 'red-accent',   bg: 'red-bg',   desc: 'Following NIST 800-88 and DoD 5220.22-M guidelines. Physical shredding and software overwrite. Certificates within 48 hours.' },
  { icon: '💼', title: 'IT Asset Disposition',    href: '/services/itad',             accent: '',             bg: '',         desc: 'Full lifecycle — inventory, data sanitization, value recovery, and responsible disposal. Audit-ready reporting.' },
  { icon: '♻️', title: 'E-Waste Recycling',       href: '/services/recycling',        accent: '',             bg: '',         desc: 'In compliance with California e-waste regulations. All electronics accepted. Zero landfill commitment on every item.' },
  { icon: '🚛', title: 'Business Pickup',          href: '/contact',                   accent: 'amber-accent', bg: 'amber-bg', desc: 'On-demand or scheduled pickup anywhere in Orange County. No volume minimums. Same-week appointments available.' },
  { icon: '🖥️', title: 'Server Decommission',     href: '/contact',                   accent: 'blue-accent',  bg: 'blue-bg',  desc: 'Full rack decommission with on-site chain-of-custody. Coordinated logistics and secure transport.' },
  { icon: '📱', title: 'Mobile Device Recycling',  href: '/contact',                   accent: 'cyan-accent',  bg: 'cyan-bg',  desc: 'MDM-assisted wipe or factory reset verification. iOS and Android. Compliance-ready reporting.' },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        overline="What We Do"
        title={<>Complete Electronics<br />Lifecycle Services</>}
        subtitle="From a single laptop to a full data center decommission — every phase documented and zero-landfill."
        bgImage="/image/services-oc-electronic-recycling.webp"
      />

      <div style={{ background: 'var(--light)', padding: '80px 0' }}>
        <div className="container">
          <StaggerGroup className="svc-features">
            {SERVICES.map(({ icon, title, href, accent, bg, desc }) => (
              <div key={title} className={`svc-card ${accent}`}>
                <div className={`svc-icon ${bg}`}>{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href={href} className="svc-link">View Service →</Link>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </div>

      <section className="cta-section">
        <div className="container">
          <AnimateIn from="up" delay={0.1}>
            <span className="overline">Not Sure Which Service?</span>
            <h2>Call Us — We&apos;ll Assess<br />Your Situation</h2>
            <p>We recommend the right approach for your volume, industry, and compliance needs.</p>
            <a href="tel:9492873056" className="cta-phone">(949) 287-3056</a>
            <div className="cta-actions">
              <Link href="/contact" className="btn-primary btn-large">Get a Custom Quote</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}

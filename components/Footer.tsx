// components/Footer.tsx
import Link from 'next/link'
import { BrandMark } from '@/components/Icon'
import { getCityBySlug } from '@/lib/cities'
import { HOURS, PHONE_DISPLAY, PHONE_HREF, POLICY, SERVICE_AREA } from '@/lib/site'

const SERVICES = [
  { label: 'Business Pickup', href: '/business-pickup' },
  { label: 'IT Asset Disposition (ITAD)', href: '/services/itad' },
  { label: 'Data Destruction', href: '/services/data-destruction' },
  { label: 'E-Waste Recycling', href: '/services/recycling' },
  { label: 'All Services', href: '/services' },
]
const COMPANY = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
const AREA_SLUGS = ['irvine', 'anaheim', 'santa-ana', 'costa-mesa', 'newport-beach']

export default function Footer() {
  const year = new Date().getFullYear()
  const areas = AREA_SLUGS.map(getCityBySlug).filter((c) => c !== undefined)
  return (
    <footer className="ct-footer">
      <div className="ct-wrap">
        <div className="ct-footer__grid">
          <div className="ct-footer__brand">
            <Link href="/" className="ct-logo" aria-label="OC Electronic Recycling — home">
              <BrandMark size={32} />
              <b>OC Electronic<span>&nbsp;Recycling</span></b>
            </Link>
            <p>
              Business electronics pickup, data destruction and IT asset disposition across {SERVICE_AREA}.
            </p>
            <a href={PHONE_HREF} className="ct-footer__phone" data-cta-location="footer">{PHONE_DISPLAY}</a>
            <p>{HOURS}</p>
          </div>

          <nav aria-label="Services">
            <h2>Services</h2>
            <ul>
              {SERVICES.map(({ label, href }) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2>Company</h2>
            <ul>
              {COMPANY.map(({ label, href }) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Service areas">
            <h2>Service areas</h2>
            <ul>
              {areas.map((c) => (
                <li key={c.slug}><Link href={`/e-waste-recycling/${c.slug}`}>{c.name}</Link></li>
              ))}
              <li><Link href="/service-areas">All service areas</Link></li>
            </ul>
          </nav>
        </div>

        <div className="ct-footer__base">
          <p>© {year} OC Electronic Recycling. {POLICY.confirm}</p>
          <div className="ct-footer__legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <span>
              Site by{' '}
              <a href="https://nirowebix.com" target="_blank" rel="noopener noreferrer">NiroWebix</a>
              {' · '}
              <a href="https://nextechoc.com" target="_blank" rel="noopener noreferrer">NexTechOC</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

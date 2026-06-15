// components/Footer.tsx
import Link from 'next/link'

const SERVICES = [
  { label: 'Data Destruction',   href: '/services/data-destruction' },
  { label: 'ITAD',               href: '/services/itad' },
  { label: 'E-Waste Recycling',  href: '/services/recycling' },
  { label: 'Business Pickup', href: '/contact' },
  { label: 'Server Decommission', href: '/services/itad' },
]
const COMPANY = [
  { label: 'About Us',     href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Resources',    href: '/resources' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Contact',      href: '/contact' },
]
const COMPLIANCE = [
  { label: 'NIST 800-88',      href: '/services/data-destruction' },
  { label: 'CA DTSC',          href: '/services/recycling' },
  { label: 'HIPAA Compliant',  href: '/services/data-destruction' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <div className="logo-icon" style={{width:28,height:28,fontSize:'.85rem'}}>♻</div>
              OC Electronic Recycling
            </div>
            <p className="footer-desc">
              Orange County&apos;s certified e-waste recycling and ITAD partner.
              Responsible disposal, certified data destruction, and full compliance documentation.
            </p>
            <div className="footer-phone">
              <a href="tel:9493450285">☎ (949) 345-0285</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              {SERVICES.map(({ label, href }) => (
                <li key={`svc-${label}`}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {COMPANY.map(({ label, href }) => (
                <li key={`co-${href}`}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Compliance</h4>
            <ul>
              {COMPLIANCE.map(({ label, href }) => (
                <li key={`comp-${label}`}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} OC Electronic Recycling. All rights reserved. Orange County, CA.</p>
          <div className="footer-credits">
            <span style={{color:'#445566',fontSize:'.78rem'}}>Designed &amp; Built by</span>
            <a href="https://nirowebix.com" target="_blank" rel="noopener noreferrer">NiroWebix.com</a>
            <a href="https://nextechoc.com"  target="_blank" rel="noopener noreferrer">NexTechOC.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

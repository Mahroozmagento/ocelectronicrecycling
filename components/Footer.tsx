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
const LEGAL = [
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
              Orange County&apos;s e-waste recycling and ITAD partner.
              Responsible disposal, Certified Data Destruction, and full documentation.
            </p>
            <div className="footer-phone">
              <a href="tel:9492873056">☎ (949) 287-3056</a>
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
            <h4>Legal</h4>
            <ul>
              {LEGAL.map(({ label, href }) => (
                <li key={`legal-${label}`}><Link href={href}>{label}</Link></li>
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

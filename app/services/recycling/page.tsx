// app/services/recycling/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'E-Waste Recycling Orange County',
  description: 'California DTSC compliant e-waste recycling in Orange County. All electronics accepted. Zero landfill commitment.',
}

const ITEMS = [
  { icon: '💻', title: 'Computers & Laptops',     desc: 'Desktops, laptops, tablets, Chromebooks. All brands, any condition. Free data wipe included.' },
  { icon: '📱', title: 'Phones & Tablets',         desc: 'All makes and models. Factory reset verification. Accepted even with cracked screens.' },
  { icon: '🖨️', title: 'Printers & Peripherals',  desc: 'Printers, scanners, monitors, keyboards, mice, cables, and accessories.' },
  { icon: '📺', title: 'TVs & Displays',           desc: 'LCD, LED, OLED, and CRT televisions. Monitors of all sizes. Recycled per California AB 2901.' },
  { icon: '🔋', title: 'Batteries & Hazardous',   desc: 'Lithium-ion, NiMH, lead-acid. Proper handling for hazardous components including mercury lamps.' },
  { icon: '🏢', title: 'Business Bulk Drops',      desc: 'No volume limits for business drop-offs. Call ahead and we\'ll have a team ready to unload.' },
]

export default function RecyclingPage() {
  return (
    <>
      <div className="svc-inner-hero">
        <div className="container">
          <span className="overline">Green Service</span>
          <h1 style={{fontFamily:'var(--font-head)',fontSize:'clamp(2rem,5vw,4rem)',fontWeight:900,letterSpacing:'-.03em',marginTop:'10px'}}>
            E-Waste Recycling<br />Orange County
          </h1>
          <p style={{color:'var(--muted)',fontSize:'1rem',marginTop:'16px',maxWidth:'520px',lineHeight:1.7}}>
            California DTSC compliant. We accept all electronics from businesses and residents.
            Zero landfill commitment on every item.
          </p>
        </div>
      </div>

      <div style={{background:'var(--light)',padding:'80px 0'}}>
        <div className="container">
          <div className="svc-features">
            {ITEMS.map(({ icon, title, desc }) => (
              <div key={title} className="svc-feature-card">
                <div style={{fontSize:'2rem',marginBottom:'12px'}}>{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="cta-section">
        <div className="container">
          <h2>Recycle Right.<br />Recycle Certified.</h2>
          <a href="tel:9493450285" className="cta-phone">(949) 345-0285</a>
          <div className="cta-actions">
            <Link href="/contact" className="btn-primary btn-large">Drop Off or Schedule Pickup</Link>
          </div>
        </div>
      </section>
    </>
  )
}

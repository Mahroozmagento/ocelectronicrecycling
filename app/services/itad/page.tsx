// app/services/itad/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'IT Asset Disposition (ITAD)',
  description: 'Complete ITAD services in Orange County — inventory, data sanitization, value recovery, and certified disposal.',
}

const FEATURES = [
  { icon: '📋', title: 'Asset Inventory',       desc: 'Every device cataloged: serial number, make, model, RAM, storage, condition grade. Full manifest before processing begins.' },
  { icon: '💰', title: 'Value Recovery',         desc: 'Working assets assessed for resale. Fair market valuations and transparent reporting on any proceeds from device resale.' },
  { icon: '🔒', title: 'Data Sanitization',      desc: 'All data-bearing devices wiped or shredded before any disposition decision. Zero data liability — guaranteed and documented.' },
  { icon: '🌿', title: 'Responsible Disposal',   desc: 'Non-working equipment dismantled and recycled per California DTSC regulations. Zero landfill policy on all ITAD clients.' },
  { icon: '📊', title: 'Audit-Ready Reporting',  desc: 'Certificates, manifests, and disposition reports ready for SOX, HIPAA, GLBA, and internal compliance audits.' },
  { icon: '🚛', title: 'Logistics Management',   desc: 'Pickup, transport, and processing all handled end-to-end. Chain-of-custody maintained throughout.' },
]

export default function ITADPage() {
  return (
    <>
      <div className="svc-inner-hero">
        <div className="container">
          <span className="overline">Enterprise Service</span>
          <h1 style={{fontFamily:'var(--font-head)',fontSize:'clamp(2rem,5vw,4rem)',fontWeight:900,letterSpacing:'-.03em',marginTop:'10px'}}>
            IT Asset Disposition<br />(ITAD)
          </h1>
          <p style={{color:'var(--muted)',fontSize:'1rem',marginTop:'16px',maxWidth:'520px',lineHeight:1.7}}>
            Complete end-of-life management for your IT equipment. We maximize value recovery
            while ensuring zero data liability and full regulatory compliance.
          </p>
        </div>
      </div>

      <div style={{background:'var(--light)',padding:'80px 0'}}>
        <div className="container">
          <div className="svc-features">
            {FEATURES.map(({ icon, title, desc }) => (
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
          <h2>Enterprise ITAD<br />Made Simple</h2>
          <a href="tel:9493450285" className="cta-phone">(949) 345-0285</a>
          <div className="cta-actions">
            <Link href="/contact" className="btn-primary btn-large">Get ITAD Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}

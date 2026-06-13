// app/services/data-destruction/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Certified Data Destruction',
  description: 'NIST 800-88 compliant hard drive shredding and data destruction in Orange County CA. Certificates issued per device within 48hrs.',
}

export default function DataDestructionPage() {
  return (
    <>
      <div className="svc-inner-hero" style={{background:'linear-gradient(135deg,var(--navy),#1a0508)'}}>
        <div className="container">
          <span className="overline" style={{color:'var(--red)'}}>Security Service</span>
          <h1 style={{fontFamily:'var(--font-head)',fontSize:'clamp(2rem,5vw,4rem)',fontWeight:900,letterSpacing:'-.03em',marginTop:'10px'}}>
            Certified Hard Drive<br />&amp; Data Destruction
          </h1>
          <p style={{color:'var(--muted)',fontSize:'1rem',marginTop:'16px',maxWidth:'520px',lineHeight:1.7}}>
            NIST 800-88 compliant data sanitization and physical shredding.
            Every device gets a certificate. Every certificate is your legal protection.
          </p>
          <div className="dd-badge-row" style={{marginTop:'28px'}}>
            <span className="dd-badge nist">NIST 800-88</span>
            <span className="dd-badge dod">DoD 5220.22-M</span>
            <span className="dd-badge ca">CA DTSC Compliant</span>
          </div>
        </div>
      </div>

      <div style={{background:'var(--light)',padding:'80px 0'}}>
        <div className="container">
          <div className="svc-features">
            {[
              { icon: '🔨', title: 'Physical Shredding',          desc: 'Industrial-grade shredders reduce hard drives to particles under 2mm. Impossible to reconstruct. Available on-site or at our secure facility.' },
              { icon: '💿', title: 'Software Overwrite',          desc: 'NIST 800-88 Clear and Purge methods for SSDs and HDDs. Multiple-pass overwrites with verification. Drives can be reused after wiping.' },
              { icon: '📄', title: 'Certificates of Destruction', desc: 'Issued per device with serial number, make/model, method used, technician ID, and timestamp. Audit-ready, legally defensible documentation.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="svc-feature-card">
                <div style={{fontSize:'2rem',marginBottom:'12px'}}>{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          <div className="amber-urgent" style={{maxWidth:'700px',margin:'0 auto 48px'}}>
            <div className="amber-urgent-icon">⚠️</div>
            <div className="amber-urgent-text">
              <strong>California AB 1103 &amp; SB 1386</strong> require businesses to protect consumer
              data on disposed devices. Non-compliance can result in fines up to{' '}
              <strong>$2,500 per record</strong>. Call <strong>(949) 345-0285</strong> today.
            </div>
          </div>

          <div style={{background:'var(--navy)',borderRadius:'16px',padding:'40px',maxWidth:'700px',margin:'0 auto'}}>
            <span className="overline" style={{color:'var(--red)'}}>Destruction Progress</span>
            <h3 style={{fontFamily:'var(--font-head)',fontSize:'1.1rem',fontWeight:700,margin:'8px 0 20px',color:'#fff'}}>
              Active Shredding Session
            </h3>
            {['WD 2TB HDD','Samsung 500GB SSD','Seagate 4TB HDD','Kingston 256GB NVMe'].map((drive, i) => (
              <div key={drive}>
                <div style={{fontSize:'.72rem',color:'var(--muted)',fontWeight:700,margin:`${i>0?'10px':'0'} 0 6px`}}>
                  Device {i+1} — {drive}
                </div>
                <div className="shred-bar-track">
                  <div className="shred-bar-fill" style={{animationDelay:`${i*0.3}s`}} />
                </div>
              </div>
            ))}
            <div style={{marginTop:'24px',padding:'16px',background:'rgba(244,67,54,.08)',borderRadius:'10px',border:'1px solid rgba(244,67,54,.2)'}}>
              <div style={{fontSize:'.72rem',fontWeight:700,color:'var(--red)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'6px'}}>Certificate Status</div>
              <div style={{fontFamily:'var(--font-head)',fontWeight:800,fontSize:'1rem',color:'#fff'}}>✓ Issuing upon completion</div>
              <div style={{fontSize:'.75rem',color:'var(--muted)',marginTop:'4px'}}>Delivered to your email within 48hrs</div>
            </div>
          </div>
        </div>
      </div>

      <section className="cta-section">
        <div className="container">
          <h2>Your Data Security<br />Starts Here</h2>
          <a href="tel:9493450285" className="cta-phone">(949) 345-0285</a>
          <div className="cta-actions">
            <Link href="/contact" className="btn-primary btn-large">Schedule Destruction</Link>
          </div>
        </div>
      </section>
    </>
  )
}

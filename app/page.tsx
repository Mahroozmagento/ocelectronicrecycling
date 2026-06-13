// app/page.tsx
// ─────────────────────────────────────────────────────────────
// Home page — OC Electronic Recycling
// Place this file at: app/page.tsx
// ─────────────────────────────────────────────────────────────
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'OC Electronic Recycling — Orange County E-Waste & ITAD',
  description:
    "Orange County's premier e-waste recycling and ITAD company. " +
    'Certified data destruction, business pickup. Call (949) 345-0285.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="hero">
        <div className="hero-left">
          <div className="hero-bracket">Orange County — Est. 2024</div>
          <h1 className="hero-h1">
            We Recycle<br /><em>Electronics.</em><br />You Stay Clean.
          </h1>
          <p className="hero-sub">
            Certified data destruction, ITAD services, and responsible e-waste
            recycling for businesses and residents across Orange County, California.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn-primary btn-large">
              Schedule Pickup
            </Link>
            <a href="tel:9493450285" className="btn-outline btn-large">
              ☎ (949) 345-0285
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-num" data-count="500">500</div>
              <div className="hero-stat-label">Tons Diverted / Year</div>
            </div>
            <div>
              <div className="hero-stat-num" data-count="100">100</div>
              <div className="hero-stat-label">% Data Verified</div>
            </div>
            <div>
              <div className="hero-stat-num" data-count="2500">2,500</div>
              <div className="hero-stat-label">Clients Served</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-r-ph">
            {/* ★ Replace this div with:
                <Image src="/images/hero.jpg" alt="OC Electronic Recycling facility"
                  fill style={{objectFit:'cover',opacity:.75}} priority />
            */}
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📸</div>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '.85rem', color: '#00e676', letterSpacing: '.08em', marginBottom: '6px' }}>
              YOUR FACILITY PHOTO
            </div>
            <div style={{ fontSize: '.75rem', color: '#8899aa', textAlign: 'center', maxWidth: '200px', lineHeight: 1.6 }}>
              900 × 1100 px · JPG/WebP
            </div>
          </div>
          <div className="hero-float-card card-tl">
            <div className="hfc-label">Certified Process</div>
            <div className="hfc-value">NIST 800-88 ✓</div>
          </div>
          <div className="hero-float-card card-br">
            <div className="hfc-label">CA DTSC Compliant</div>
            <div className="hfc-value">Always ✓</div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[
            'E-Waste Recycling','Certified Data Destruction','IT Asset Disposition',
            'Business Pickup','NIST 800-88 Compliant','Orange County CA',
            'Hard Drive Shredding','Server Decommission',
            'E-Waste Recycling','Certified Data Destruction','IT Asset Disposition',
            'Business Pickup','NIST 800-88 Compliant','Orange County CA',
            'Hard Drive Shredding','Server Decommission',
          ].map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FACILITY PHOTO PLACEHOLDER ────────────────────────── */}
      <div style={{ background: 'var(--light)', padding: '0 0 60px 0' }}>
        <div className="img-placeholder img-placeholder-banner" data-label="FACILITY OVERVIEW"
          style={{ width: '100%', height: '260px', minHeight: '260px', borderRadius: 0,
            background: 'linear-gradient(135deg,#0d1528 0%,#111f3a 50%,#0a1535 100%)',
            position: 'relative', overflow: 'hidden', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
              <div className="facility-label">FACILITY OVERVIEW</div>
          <div style={{ fontSize: '3rem' }}>🏭</div>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', color: '#00e676' }}>
            FACILITY / OPERATION PHOTO
          </div>
          <div style={{ fontSize: '.78rem', color: '#8899aa', textAlign: 'center', maxWidth: '360px', lineHeight: 1.7 }}>
            Wide shot of your recycling floor or team · 1400 × 520 px
          </div>
        </div>
      </div>

      {/* ── TRUST STATS ──────────────────────────────────────── */}
      <section className="trust-band section-light">
        <div className="container">
          <span className="overline" style={{ color: 'var(--blue)' }}>Why OC Trusts Us</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>The Numbers Speak</h2>
          <div className="trust-grid">
            {[
              { num: '500',   label: 'Tons Recycled Annually' },
              { num: '2,500', label: 'Businesses Served' },
              { num: '100%',  label: 'Data Verified Destroyed' },
              { num: '48hr',  label: 'Certificate Turnaround' },
            ].map(({ num, label }) => (
              <div key={label} className="trust-card">
                <div className="trust-number">{num}</div>
                <div className="trust-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section id="services" className="section-light">
        <div className="container">
          <div className="services-intro">
            <span className="overline" style={{ color: 'var(--blue)' }}>What We Offer</span>
            <h2 className="section-title" style={{ color: 'var(--navy)' }}>Our Services</h2>
            <p style={{ color: '#4a5568', fontSize: '.95rem', lineHeight: 1.7, marginTop: '16px' }}>
              Full-service electronics lifecycle management for businesses and individuals
              across Orange County, CA.
            </p>
          </div>
          <div className="svc-grid">
            {[
              { icon: '🔐', title: 'Data Destruction',      href: '/services/data-destruction', accent: 'red-accent',   bg: 'red-bg',   desc: 'NIST 800-88 compliant hard drive wiping and physical shredding. Certificates issued for every device.' },
              { icon: '💼', title: 'IT Asset Disposition',  href: '/services/itad',             accent: '',             bg: '',         desc: 'Complete ITAD lifecycle — inventory, data sanitization, resale, and responsible disposal.' },
              { icon: '♻️', title: 'E-Waste Recycling',     href: '/services/recycling',        accent: '',             bg: '',         desc: 'California DTSC compliant. Zero landfill commitment — everything sorted and processed responsibly.' },
              { icon: '🚛', title: 'Business Pickup',       href: '/contact',                   accent: 'amber-accent', bg: 'amber-bg', desc: 'Scheduled or on-demand pickup throughout Orange County. We handle the heavy lifting.' },
              { icon: '🖥️', title: 'Server Decommission',   href: '/services',                  accent: 'blue-accent',  bg: 'blue-bg',  desc: 'Full rack decommission with data destruction, asset inventory, and logistics management.' },
              { icon: '📱', title: 'Mobile Device Recycling',href: '/services',                 accent: 'cyan-accent',  bg: 'cyan-bg',  desc: 'Smartphones, tablets, wearables — factory reset verification plus secure recycling.' },
            ].map(({ icon, title, href, accent, bg, desc }) => (
              <Link key={title} href={href} className={`svc-card ${accent}`}>
                <div className={`svc-icon ${bg}`}>{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="svc-link">Learn More →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA DESTRUCTION ─────────────────────────────────── */}
      <section id="data-destruction" className="section-dark">
        <div className="container">
          <div className="dd-inner">
            <div>
              <span className="overline" style={{ color: 'var(--red)' }}>Critical Security</span>
              <h2 className="section-title">Data Destruction<br />Done Right</h2>
              <p style={{ color: '#8899aa', lineHeight: 1.7, margin: '20px 0' }}>
                One discarded hard drive with intact data can cost thousands in fines.
                Our process eliminates that risk completely.
              </p>
              <div className="dd-badge-row">
                <span className="dd-badge nist">NIST 800-88</span>
                <span className="dd-badge dod">DoD 5220.22-M</span>
                <span className="dd-badge ca">CA DTSC Compliant</span>
              </div>
              <div className="cert-list">
                {[
                  'Physical shredding available on-site or at our facility',
                  'Certificate of destruction issued per device',
                  'Full audit trail and chain-of-custody documentation',
                  'HIPAA, GLBA, and SOX compliance support',
                ].map(item => (
                  <div key={item} className="cert-item">
                    <div className="cert-check">✓</div>{item}
                  </div>
                ))}
              </div>
              <div className="amber-urgent">
                <div className="amber-urgent-icon">⚠️</div>
                <div className="amber-urgent-text">
                  <strong>Don&apos;t risk it.</strong> California law requires proper data disposal.
                  Call <strong>(949) 345-0285</strong> for a same-week appointment.
                </div>
              </div>
            </div>
            <div className="shred-visual">
              <span className="overline" style={{ color: 'var(--red)' }}>Destruction Progress</span>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 700, margin: '8px 0 20px', color: '#fff' }}>
                Active Shredding Session
              </h3>
              {['WD 2TB HDD', 'Samsung 500GB SSD', 'Seagate 4TB HDD', 'Kingston 256GB NVMe'].map((drive, i) => (
                <div key={drive}>
                  <div style={{ fontSize: '.72rem', color: 'var(--muted)', fontWeight: 700, margin: `${i > 0 ? '10px' : '0'} 0 6px` }}>
                    Device {i + 1} — {drive}
                  </div>
                  <div className="shred-bar-track">
                    <div className="shred-bar-fill" style={{ animationDelay: `${i * 0.3}s` }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(244,67,54,.08)', borderRadius: '10px', border: '1px solid rgba(244,67,54,.2)' }}>
                <div style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--red)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Certificate Status
                </div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', color: '#fff' }}>✓ Issuing upon completion</div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '4px' }}>Delivered to your email within 48hrs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENVIRONMENTAL ────────────────────────────────────── */}
      <section id="environmental" className="section-dark2">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <span className="overline">Environmental Impact</span>
            <h2 className="section-title">Our Green Footprint</h2>
            <p style={{ color: 'var(--muted)', marginTop: '16px', lineHeight: 1.7 }}>
              Every device we recycle stays out of landfills and toxic waste streams.
            </p>
          </div>
          <div className="env-grid">
            {[
              { icon: '🌍', num: '500T',  label: 'E-Waste Diverted from Landfills Annually' },
              { icon: '⚡', num: '2M',    label: 'kWh Energy Saved Through Material Recovery' },
              { icon: '💧', num: '98%',   label: 'Materials Recycled or Reused — Zero Landfill' },
              { icon: '🏆', num: '12+',   label: 'Tons of Hazardous Materials Safely Handled' },
            ].map(({ icon, num, label }) => (
              <div key={label} className="env-stat">
                <div className="env-icon">{icon}</div>
                <div className="env-num">{num}</div>
                <div className="env-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section id="testimonials" className="section-dark">
        <div className="container">
          <div style={{ maxWidth: '480px', marginBottom: '60px' }}>
            <span className="overline">Client Reviews</span>
            <h2 className="section-title">What OC Businesses Say</h2>
          </div>
          <div className="testi-grid">
            {[
              { text: '"We decommissioned an entire server room — 80+ drives. OC Electronic Recycling handled everything in one day and had our certificates ready the next morning. Incredible service."', name: 'David M.', role: 'IT Director — Irvine Manufacturing Co.' },
              { text: '"As a healthcare provider, HIPAA compliance is non-negotiable. These guys understood exactly what we needed, provided proper documentation, and were completely professional."', name: 'Priya S.', role: 'Compliance Officer — Aliso Viejo Medical Group' },
              { text: '"Scheduled a pickup for 40 old laptops. They came same week, inventoried everything on-site, and I got a detailed report with serial numbers. Exactly what you want."', name: 'Mark T.', role: 'Operations Manager — Newport Beach Firm' },
            ].map(({ text, name, role }) => (
              <div key={name} className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">{text}</p>
                <div className="testi-name">{name}</div>
                <div className="testi-role">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="container">
          <span className="overline">Ready to Start?</span>
          <h2>Responsible Recycling<br />Starts With a Call</h2>
          <p>Orange County&apos;s most trusted e-waste and ITAD partner is one call away.</p>
          <a href="tel:9493450285" className="cta-phone">(949) 345-0285</a>
          <div className="cta-actions">
            <Link href="/contact" className="btn-primary btn-large">Schedule Pickup</Link>
            <Link href="/contact" className="btn-outline btn-large">Get a Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}

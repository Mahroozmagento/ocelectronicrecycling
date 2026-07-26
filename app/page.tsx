// app/page.tsx
// ─────────────────────────────────────────────────────────────
// Home page — OC Electronic Recycling
// Place this file at: app/page.tsx
// ─────────────────────────────────────────────────────────────
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import AnimateIn, { StaggerGroup } from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'OC Electronic Recycling — Orange County E-Waste & ITAD',
  description:
    "Orange County's premier e-waste recycling and ITAD company. " +
    'Certified data destruction, business pickup. Call (949) 287-3056.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'OC Electronic Recycling — Orange County E-Waste & ITAD',
    description: "Orange County's premier e-waste recycling and ITAD company. Certified data destruction, business pickup.",
    url: 'https://www.ocelectronicrecycling.com',
    images: [{ url: '/image/hero-facility-oc-electronic-recycling.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OC Electronic Recycling — Orange County E-Waste & ITAD',
    description: "Orange County's premier e-waste recycling and ITAD company. Certified data destruction, business pickup.",
    images: ['/image/hero-facility-oc-electronic-recycling.webp'],
  },
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="hero">
        <div className="hero-left">
          <div className="hero-bracket">Orange County — Est. 2012</div>
          <h1 className="hero-h1">
            We Recycle<br /><em>Electronics.</em><br />You Stay Clean.
          </h1>
          <p className="hero-sub">
            Certified Data Destruction, ITAD services, and responsible e-waste
            recycling for businesses and residents across Orange County, California.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn-primary btn-large">
              Schedule Pickup
            </Link>
            <a href="tel:9492873056" className="btn-outline btn-large">
              ☎ (949) 287-3056
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-r-ph">
           <Image
  src="/image/hero-facility-oc-electronic-recycling.webp"
  alt="OC Electronic Recycling facility"
  fill
  style={{ objectFit: 'cover', opacity: .75 }}
  priority
/>
          </div>
          <div className="hero-float-card card-tl">
            <div className="hfc-label">Data Sanitization</div>
            <div className="hfc-value">NIST 800-88 Guidelines</div>
          </div>
          <div className="hero-float-card card-br">
            <div className="hfc-label">Response Time</div>
            <div className="hfc-value">Same Week ✓</div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[
            'E-Waste Recycling','Certified Data Destruction','IT Asset Disposition',
            'Business Pickup','NIST 800-88 Guidelines','Orange County CA',
            'Hard Drive Shredding','Server Decommission',
            'E-Waste Recycling','Certified Data Destruction','IT Asset Disposition',
            'Business Pickup','NIST 800-88 Guidelines','Orange County CA',
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
        <div className="cta-section" data-label="FACILITY OVERVIEW"
          style={{ width: '100%', height: '260px', minHeight: '260px', borderRadius: 0,
            
            position: 'relative', overflow: 'hidden', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
              <div className="facility-label">FACILITY OVERVIEW</div>
          
        </div>
      </div>

      {/* ── TRUST STATS ──────────────────────────────────────── */}
      <section className="trust-band section-light">
        <div className="container">
          <AnimateIn from="up" style={{ position: 'relative' }}>
            <span className="overline" style={{ color: 'var(--blue)' }}>Why OC Trusts Us</span>
            <h2 className="section-title" style={{ color: 'var(--navy)' }}>What Sets Us Apart</h2>
          </AnimateIn>
          <StaggerGroup className="trust-grid">
            {[
              { num: 'NIST 800-88', label: 'Sanitization Guidelines Followed' },
              { num: 'Per Device',   label: 'Certificate of Destruction Issued' },
              { num: 'Serial-Level', label: 'Asset Documentation Provided' },
              { num: 'Same Week',    label: 'Business Pickup Available' },
            ].map(({ num, label }) => (
              <div key={label} className="trust-card">
                <div className="trust-number">{num}</div>
                <div className="trust-label">{label}</div>
              </div>
            ))}
          </StaggerGroup>
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
              { icon: '🔐', title: 'Data Destruction',      href: '/services/data-destruction', accent: 'red-accent',   bg: 'red-bg',   desc: 'Hard drive wiping and physical shredding following NIST 800-88 guidelines. Certificates issued for every device.' },
              { icon: '💼', title: 'IT Asset Disposition',  href: '/services/itad',             accent: '',             bg: '',         desc: 'Complete ITAD lifecycle — inventory, data sanitization, resale, and responsible disposal.' },
              { icon: '♻️', title: 'E-Waste Recycling',     href: '/services/recycling',        accent: '',             bg: '',         desc: 'In compliance with California e-waste regulations. Zero landfill commitment — everything sorted and processed responsibly.' },
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
                <span className="dd-badge ca">CA E-Waste Regulations</span>
              </div>
              <div className="cert-list">
                {[
                  'Physical shredding available on-site',
                  'Certificate of destruction issued per device',
                  'Full audit trail and chain-of-custody documentation',
                  'Documentation to support your compliance needs',
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
                  Call <strong>(949) 287-3056</strong> for a same-week appointment.
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
                <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '4px' }}>Delivered to your email</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENVIRONMENTAL ────────────────────────────────────── */}
      <section id="environmental" className="section-dark2">
        <div className="container">
          <AnimateIn from="up">
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
              <span className="overline">Environmental Impact</span>
              <h2 className="section-title">Our Green Footprint</h2>
              <p style={{ color: 'var(--muted)', marginTop: '16px', lineHeight: 1.7 }}>
                Every device we recycle stays out of landfills and toxic waste streams.
              </p>
            </div>
          </AnimateIn>
          <StaggerGroup className="env-grid">
            {[
              { icon: '🌍', num: 'Zero Landfill Commitment',        label: 'Every device is sorted and routed to the correct downstream recycler.' },
              { icon: '♻️', num: 'Responsible Material Recovery',   label: 'Materials are recovered and processed through vetted recycling partners.' },
              { icon: '📋', num: 'California-Compliant Processing', label: 'Handled in compliance with California e-waste regulations.' },
            ].map(({ icon, num, label }) => (
              <div key={num} className="env-stat">
                <div className="env-icon">{icon}</div>
                <div className="env-num" style={{ fontSize: '1.3rem', lineHeight: 1.25 }}>{num}</div>
                <div className="env-label">{label}</div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────────────
          Real testimonials can go back in this spot later — same
          section position, same testi-grid/testi-card styling
          infrastructure, just swap the data array and card contents. */}
      <section id="what-you-get" className="section-dark">
        <div className="container">
          <AnimateIn from="up">
            <div style={{ maxWidth: '480px', marginBottom: '60px', position: 'relative' }}>
              <span className="overline">Our Commitment</span>
              <h2 className="section-title">What You Get</h2>
            </div>
          </AnimateIn>
          <StaggerGroup className="testi-grid testi-grid--4">
            {[
              { icon: '📄', title: 'Certificate of Destruction',      desc: 'Issued for every device we process.' },
              { icon: '🔢', title: 'Serial-Level Asset Documentation', desc: 'Full inventory and tracking, device by device.' },
              { icon: '🔗', title: 'Full Chain-of-Custody',           desc: 'Tracked from pickup through final processing.' },
              { icon: '🛡️', title: 'NIST 800-88 Aligned Process',     desc: 'Data sanitization following recognized federal guidelines.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="testi-card">
                <div className="trust-feature-icon">{icon}</div>
                <div className="trust-feature-title">{title}</div>
                <div className="trust-feature-desc">{desc}</div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="cta-section cta-bottom-section">
        <div className="container">
          <span className="overline">Ready to Start?</span>
          <h2>Responsible Recycling<br />Starts With a Call</h2>
          <p>Orange County&apos;s most trusted e-waste and ITAD partner is one call away.</p>
          <a href="tel:9492873056" className="cta-phone">(949) 287-3056</a>
          <div className="cta-actions">
            <Link href="/contact" className="btn-primary btn-large">Schedule Pickup</Link>
            <Link href="/contact" className="btn-outline btn-large">Get a Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}

// app/resources/page.tsx
// NOTE: No 'use client' needed here — AnimateIn handles client-side
// Removed onMouseEnter/onMouseLeave (not allowed in Server Components)
import type { Metadata } from 'next'
import AnimateIn, { StaggerGroup, PageHero } from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'Resource Center',
  description: 'Guides, infographics, and tools to help your business manage e-waste and IT assets responsibly in Orange County.',
}

const GUIDES = [
  { icon: '♻️', bg: '#e8f5e9', tag: '📄 Guide · 5 min read',  title: 'California E-Waste Regulations: What Your Business Must Know',       desc: 'A breakdown of AB 2901, SB 1386, and DTSC requirements for businesses disposing of electronics in California. Updated for 2025.' },
  { icon: '🔐', bg: '#e3f2fd', tag: '📊 Infographic · Visual', title: 'NIST 800-88 Data Destruction Standard Explained',                      desc: 'Visual guide to the three levels of data sanitization: Clear, Purge, and Destroy. Know which method your business requires.' },
  { icon: '⚠️', bg: '#ffeaea', tag: '📋 Checklist · Download', title: 'IT Asset Disposition Checklist: 12 Steps Before You Dispose',          desc: "Don't let a data breach happen on your way out. This checklist walks through every step from inventory to final certificate." },
]

const STATS = [
  { label: 'Hard Drives (HDDs)',   pct: 38 },
  { label: 'Laptops / Desktops',   pct: 29 },
  { label: 'Mobile Devices',       pct: 18 },
  { label: 'Servers / Networking', pct: 15 },
]

const DOWNLOADS = [
  { icon: '📄', name: 'ITAD Policy Template',    size: 'PDF — 180KB' },
  { icon: '📊', name: 'E-Waste Audit Checklist', size: 'XLSX — 45KB' },
  { icon: '📋', name: 'NIST 800-88 Quick Ref',   size: 'PDF — 92KB' },
]

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        overline="Knowledge Base"
        title="Resource Center"
        subtitle="Guides, infographics, and tools to help your business manage e-waste and IT assets responsibly and compliantly."
      />

      <section style={{ background: 'var(--light)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

            {/* Main guides */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {GUIDES.map(({ icon, bg, tag, title, desc }, i) => (
                <AnimateIn key={title} from="left" delay={i * 0.12}>
                  <div style={{
                    background: '#fff',
                    borderRadius: '14px',
                    padding: '28px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    gap: '20px',
                    cursor: 'pointer',
                    transition: 'box-shadow .2s, transform .2s',
                  }}>
                    <div style={{
                      width: '80px', height: '80px',
                      borderRadius: '10px',
                      background: bg,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                    }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '.75rem', color: 'var(--muted)', fontWeight: 600, marginBottom: '8px' }}>{tag}</div>
                      <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', marginBottom: '8px' }}>{title}</h3>
                      <p style={{ fontSize: '.85rem', color: '#4a5568', lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Stats widget */}
              <AnimateIn from="right" delay={0.1}>
                <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '.92rem', color: 'var(--navy)', marginBottom: '16px' }}>
                    📊 E-Waste by the Numbers
                  </h4>
                  {STATS.map(({ label, pct }) => (
                    <div key={label} style={{ marginBottom: '14px' }}>
                      <div style={{ fontSize: '.78rem', color: '#4a5568', fontWeight: 600, marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{label}</span><span>{pct}%</span>
                      </div>
                      <div style={{ height: '7px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, borderRadius: '4px', background: 'linear-gradient(90deg,var(--blue),var(--cyan))' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </AnimateIn>

              {/* Downloads widget */}
              <AnimateIn from="right" delay={0.22}>
                <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '.92rem', color: 'var(--navy)', marginBottom: '16px' }}>
                    📥 Free Downloads
                  </h4>
                  {DOWNLOADS.map(({ icon, name, size }) => (
                    <div key={name} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '10px', borderRadius: '8px',
                      background: '#f8faff', marginBottom: '8px',
                      cursor: 'pointer',
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                      <div>
                        <div style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--navy)' }}>{name}</div>
                        <div style={{ fontSize: '.68rem', color: 'var(--muted)' }}>{size}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimateIn>

              {/* CTA widget */}
              <AnimateIn from="right" delay={0.34}>
                <div style={{ background: 'var(--navy)', borderRadius: '14px', padding: '24px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>📞</div>
                  <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Need Help?</h4>
                  <p style={{ fontSize: '.82rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                    Our team can answer any compliance or recycling question.
                  </p>
                  <a href="tel:9493450285" style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '.95rem', color: 'var(--green)' }}>
                    (949) 345-0285
                  </a>
                </div>
              </AnimateIn>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

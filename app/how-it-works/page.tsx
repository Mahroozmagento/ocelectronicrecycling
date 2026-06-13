// app/how-it-works/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateIn, { StaggerGroup, PageHero } from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Simple, transparent, fully documented — from your first call to your final certificate.',
}

const STEPS = [
  { num: '01', title: 'Schedule',    desc: 'Call or submit a quote request. We confirm within 24 hours. Same-week service typically available.' },
  { num: '02', title: 'Collection',  desc: 'Technicians arrive on time with sealed containers and chain-of-custody forms. Every asset logged on-site.' },
  { num: '03', title: 'Processing',  desc: 'Data destroyed first — always. Devices assessed for reuse, disassembly, or recycling per material type.' },
  { num: '04', title: 'Certificate', desc: 'Recycling and data destruction certificate emailed within 48 hours. Audit-ready, every time.' },
]

const GUARANTEES = [
  { icon: '🔐', title: 'Data First',        desc: 'Every data-bearing device is wiped or shredded before anything else. Chain-of-custody follows every step.' },
  { icon: '📋', title: 'Full Manifest',     desc: 'Serial numbers, asset tags, condition grades captured for every item. Complete inventory before processing.' },
  { icon: '♻️', title: 'Zero Landfill',    desc: 'Every component sorted by material type and routed to the correct certified downstream recycler.' },
  { icon: '📄', title: 'Your Certificate', desc: 'Data destruction and recycling certificates delivered within 48 hours, with full asset manifest.' },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        overline="The Process"
        title="How It Works"
        subtitle="Simple, transparent, and fully documented. Here's exactly what happens from your first call to your final certificate."
      />

      <section style={{ background: 'var(--light)', padding: '80px 0' }}>
        <div className="container">
          <AnimateIn from="up" delay={0.1}>
            <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 60px' }}>
              <span className="overline" style={{ color: 'var(--blue)' }}>Step by Step</span>
              <h2 className="section-title" style={{ color: 'var(--navy)' }}>4 Simple Steps</h2>
            </div>
          </AnimateIn>
          <StaggerGroup className="hiw-timeline">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="hiw-step">
                <div className="hiw-num">{num}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section style={{ background: 'var(--navy2)', padding: '80px 0' }}>
        <div className="container">
          <AnimateIn from="up" delay={0.1}>
            <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 60px' }}>
              <span className="overline">What We Guarantee</span>
              <h2 className="section-title" style={{ color: 'var(--c-white)' }}>Every Time, Without Exception</h2>
            </div>
          </AnimateIn>
          <StaggerGroup className="svc-features">
            {GUARANTEES.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)', borderRadius: '14px', padding: '32px 28px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontSize: '.88rem', color: 'var(--muted)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <AnimateIn from="up">
            <h2>Ready to Start?</h2>
            <a href="tel:9493450285" className="cta-phone">(949) 345-0285</a>
            <div className="cta-actions">
              <Link href="/contact" className="btn-primary btn-large">Schedule Now</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}

// app/about/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateIn, { StaggerGroup } from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'OC Electronic Recycling — built for Orange County. Local, certified, responsible e-waste recycling and ITAD.',
}

const MISSION = [
  { icon: '🔒', title: 'Security First',    desc: 'Data destruction happens before anything else. No exceptions. Your data risk is zero before we recycle anything.' },
  { icon: '🌿', title: 'Zero Landfill',     desc: 'Every component sorted and routed to the correct downstream recycler. Nothing ends up in a landfill.' },
  { icon: '📄', title: 'Full Documentation',desc: 'Certificates, manifests, and chain-of-custody records for everything. Always ready for audits.' },
  { icon: '🤝', title: 'Local & Trusted',   desc: 'An Orange County business serving Orange County. Real people you can call, meet, and hold accountable.' },
]

export default function AboutPage() {
  return (
    <>
      <div className="about-hero">
        <div className="container">
          <AnimateIn from="fade" delay={0} duration={0.5}>
            <span className="overline">Our Story</span>
          </AnimateIn>
          <AnimateIn from="up" delay={0.1} duration={0.7}>
            <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 900, letterSpacing: '-.03em', marginTop: '10px' }}>
              Built for Orange County
            </h1>
          </AnimateIn>
          <AnimateIn from="up" delay={0.22}>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', marginTop: '16px', maxWidth: '520px', lineHeight: 1.7 }}>
              A local business with deep roots in the ITAD and e-waste industry.
              We built OC Electronic Recycling to do recycling right.
            </p>
          </AnimateIn>
        </div>
      </div>

      <div style={{ background: 'var(--light)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '60px' }}>
            <AnimateIn from="left">
              <span className="overline" style={{ color: 'var(--blue)' }}>Our Mission</span>
              <h2 className="section-title" style={{ color: 'var(--navy)' }}>Responsible. Certified. Local.</h2>
              <p style={{ color: '#4a5568', lineHeight: 1.75, margin: '20px 0' }}>
                OC Electronic Recycling was founded by a team with hands-on experience in the e-waste and ITAD industry.
                We&apos;ve seen how recycling is done when compliance is an afterthought — and we exist to do the opposite.
              </p>
              <p style={{ color: '#4a5568', lineHeight: 1.75, marginBottom: '24px' }}>
                Every device is handled with full chain-of-custody documentation. Every data-bearing device receives proper
                destruction before any other step. Every client receives documentation they can show an auditor.
              </p>
              <a href="tel:9493450285" style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--blue)' }}>
                ☎ (949) 345-0285
              </a>
            </AnimateIn>

            <AnimateIn from="right">
              <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', border: '1px solid #e2e8f0' }}>
                <div style={{ height: '180px', borderRadius: '10px', background: 'linear-gradient(135deg,#0d1528,#1a2840)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', marginBottom: '24px', border: '2px dashed rgba(0,230,118,.2)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '10px', left: '12px', background: 'var(--blue)', color: '#fff', fontSize: '.6rem', fontWeight: 800, letterSpacing: '.12em', padding: '3px 10px', borderRadius: '20px' }}>TEAM PHOTO</div>
                  <div style={{ fontSize: '2rem' }}>👥</div>
                  <div style={{ fontSize: '.72rem', color: '#8899aa', textAlign: 'center' }}>Replace with your team photo<br />700 × 460 px</div>
                </div>
                {[
                  { num: '2,500+', color: 'var(--blue)',  label: 'Clients served across Orange County' },
                  { num: '500T',   color: 'var(--green)', label: 'E-waste diverted from landfills annually' },
                  { num: '100%',   color: 'var(--red)',   label: 'Data destruction verified and certified' },
                ].map(({ num, color, label }) => (
                  <div key={num} style={{ marginBottom: '20px' }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '2rem', color, marginBottom: '4px' }}>{num}</div>
                    <div style={{ color: '#4a5568', fontSize: '.88rem' }}>{label}</div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
            {MISSION.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: '#fff', borderRadius: '14px', padding: '28px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '12px' }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px', fontSize: '1rem' }}>{title}</h3>
                <p style={{ fontSize: '.88rem', color: '#4a5568', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </div>

      <section className="cta-section">
        <div className="container">
          <AnimateIn from="up">
            <h2>Meet the Team</h2>
            <p>Have questions about our process or certifications? Call us directly.</p>
            <a href="tel:9493450285" className="cta-phone">(949) 345-0285</a>
            <div className="cta-actions">
              <Link href="/contact" className="btn-primary btn-large">Get in Touch</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}

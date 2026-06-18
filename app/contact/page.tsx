// app/contact/page.tsx
'use client'
import { useState, useRef } from 'react'
import AnimateIn from '@/components/AnimateIn'

const SERVICES_LIST = [
  'Data Destruction / Hard Drive Shredding',
  'IT Asset Disposition (ITAD)',
  'E-Waste Recycling',
  'Business Pickup',
  'Server / Data Center Decommission',
  'Other / Not Sure',
]

const CONTACT_INFO = [
  { icon: '📞', label: 'Call Us',     value: <a href="tel:9493450285" style={{ color: 'var(--blue)' }}>(949) 345-0285</a> },
  { icon: '✉️', label: 'Email',       value: <a href="mailto:info@ocelectronicrecycling.com" style={{ color: 'var(--blue)', fontSize: '.9rem' }}>info@ocelectronicrecycling.com</a> },
  { icon: '📍', label: 'Service Area',value: <><span>Orange County, CA</span><br /><span style={{ fontWeight: 400, fontSize: '.82rem', color: '#4a5568' }}>Irvine · Anaheim · Santa Ana · Newport Beach<br />Huntington Beach · Laguna Niguel · Mission Viejo</span></> },
  { icon: '🕐', label: 'Hours',       value: <><span>Mon–Fri: 8am – 6pm</span><br /><span style={{ fontWeight: 400, fontSize: '.82rem' }}>Sat: By appointment</span></> },
]

export default function ContactPage() {
  const [files, setFiles]         = useState<File[]>([])
  const [dragOver, setDragOver]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending]     = useState(false)
  const fileInputRef              = useRef<HTMLInputElement>(null)

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return
    const arr = Array.from(incoming)
    setFiles(prev => {
      const names = new Set(prev.map(f => f.name))
      return [...prev, ...arr.filter(f => !names.has(f.name))]
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          service: formData.get('service'),
          message: formData.get('message'),
        }),
      })
      if (res.ok) {
        setSending(false)
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setSending(false)
        alert('Something went wrong. Please call us at (949) 345-0285.')
      }
    } catch {
      setSending(false)
      alert('Something went wrong. Please call us at (949) 345-0285.')
    }
  }

  return (
    <>
      {/* Hero */}
      <div 
  className="svc-inner-hero"
  style={{
    backgroundImage: `linear-gradient(to right, rgba(7,8,15,0.6), rgba(7,8,15,0.35)), url('/image/contact-oc-electronic-recycling.webp')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center right',
  }}
>
        <div className="container">
          <AnimateIn from="fade" delay={0} duration={0.5}>
            <span className="overline">Get Started</span>
          </AnimateIn>
          <AnimateIn from="up" delay={0.1} duration={0.7}>
            <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 900, letterSpacing: '-.03em', marginTop: '10px' }}>
              Request a Quote<br />or Schedule Pickup
            </h1>
          </AnimateIn>
          <AnimateIn from="up" delay={0.22}>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', marginTop: '16px', maxWidth: '520px', lineHeight: 1.7 }}>
              Fill out the form or call us directly. We respond to all inquiries within 24 hours — usually same day.
            </p>
          </AnimateIn>
        </div>
      </div>

      <div style={{ background: 'var(--light)', padding: '60px 0' }}>
        <div className="container">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>

            {/* Form */}
            <AnimateIn from="left" delay={0.1}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Send Us a Message</h3>

                {submitted && (
                  <div style={{ background: 'rgba(0,230,118,.1)', border: '1px solid var(--green)', borderRadius: '10px', padding: '16px', marginBottom: '20px', color: 'var(--green)', fontFamily: 'var(--font-head)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.2rem' }}>✅</span>
                    Message sent! We&apos;ll be in touch within 24 hours.
                  </div>
                )}

                <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input className="form-control" type="text" name="name" placeholder="John" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input className="form-control" type="text" name="lastName" placeholder="Smith" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Company Name</label>
                  <input className="form-control" type="text" name="company" placeholder="Acme Corp (optional)" />
                </div>

                <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="email" name="email" placeholder="john@company.com" required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input className="form-control" type="tel" name="phone" placeholder="(949) 000-0000" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Needed</label>
                  <select className="form-control" name="service">
                    <option value="">Select a service...</option>
                    {SERVICES_LIST.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-control" name="message" rows={4} placeholder="Describe your equipment, volume, or timeline..." style={{ resize: 'vertical' }} />
                </div>

                {/* Drag and drop upload */}
                {/* <label style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '.78rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: '8px' }}>
                  Attachments (optional)
                </label>
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
                  onClick={() => fileInputRef.current?.click()}
                  style={{ border: `2px dashed ${dragOver ? 'var(--blue)' : '#d1d5db'}`, borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'border-color .2s, background .2s', background: dragOver ? '#f0f4ff' : 'transparent', marginBottom: '18px' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📎</div>
                  <div style={{ fontSize: '.85rem', color: '#4a5568', fontWeight: 500 }}>
                    Drag &amp; drop files here, or <strong style={{ color: 'var(--blue)' }}>browse</strong>
                  </div>
                  <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '4px' }}>
                    PDF, XLSX, CSV, JPG, PNG, DOC — Max 10MB each
                  </div>
                  <input ref={fileInputRef} type="file" multiple accept=".pdf,.xlsx,.csv,.jpg,.jpeg,.png,.doc,.docx" style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
                </div>

                {files.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
                    {files.map((f, i) => (
                      <div key={i} style={{ background: '#e3f2fd', borderRadius: '6px', padding: '8px 12px', fontSize: '.78rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{f.name} <span style={{ color: 'var(--muted)', fontSize: '.7rem' }}>({(f.size / 1024).toFixed(0)}KB)</span></span>
                        <button type="button" onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                          style={{ cursor: 'pointer', color: 'var(--red)', fontWeight: 700, background: 'none', border: 'none', fontSize: '1.1rem', lineHeight: 1 }}>×</button>
                      </div>
                    ))}
                  </div>
                )} */}
                {/* Attachments note */}
<div style={{ background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', fontSize: '0.85rem', color: '#4a5568' }}>
  📎 Need to send attachments? Email us directly at{' '}
  <a href="mailto:info@ocelectronicrecycling.com" style={{ color: 'var(--blue)', fontWeight: 600 }}>
    info@ocelectronicrecycling.com
  </a>
</div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '.95rem' }} disabled={sending}>
                  {sending ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </AnimateIn>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {CONTACT_INFO.map(({ icon, label, value }, i) => (
                <AnimateIn key={label} from="right" delay={i * 0.1 + 0.1}>
                  <div style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{icon}</div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--navy)' }}>{value}</div>
                  </div>
                </AnimateIn>
              ))}

              {/* Map placeholder */}
              <AnimateIn from="right" delay={0.5}>
                <div style={{ background: 'linear-gradient(135deg,#e3f2fd,#e8f5e9)', borderRadius: '14px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px', position: 'relative', border: '2px dashed rgba(41,121,255,.25)' }}>
                 <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212949.84039433654!2d-118.05!3d33.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dc925c54d5f7cf%3A0xdea6c3618b085268!2sOrange%20County%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
  width="100%"
  height="300"
  style={{borderRadius:'10px', border:'none'}}
  allowFullScreen
  loading="lazy"
/>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

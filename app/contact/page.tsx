// app/contact/page.tsx — general enquiries. Business pickup requests have
// their own structured form at /business-pickup.
'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'
import { trackEvent } from '@/lib/analytics'
import { getStoredUTM } from '@/lib/utm'
import { EMAIL, HOURS, PHONE_DISPLAY, PHONE_HREF, SERVICE_AREA } from '@/lib/site'

const SERVICES_LIST = [
  'Data Destruction / Hard Drive Shredding',
  'IT Asset Disposition (ITAD)',
  'E-Waste Recycling',
  'Business Pickup',
  'Server / Data Center Decommission',
  'Other / Not Sure',
]

const CONTACT_INFO = [
  { icon: 'phone', label: 'Call', value: <a href={PHONE_HREF} className="ct-inline-link" data-cta-location="contact_info">{PHONE_DISPLAY}</a> },
  { icon: 'mail', label: 'Email', value: <a href={`mailto:${EMAIL}`} className="ct-inline-link">{EMAIL}</a> },
  { icon: 'pin', label: 'Service area', value: <>{SERVICE_AREA}<br /><span className="ct-small">A service area — we travel to your site.</span></> },
  { icon: 'clock', label: 'Hours', value: HOURS },
]

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const statusRef = useRef<HTMLDivElement>(null)
  const sendingRef = useRef(false)

  // Set after mount (not during render) so server/client HTML match for this hidden field.
  const [renderedAt, setRenderedAt] = useState<number | null>(null)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setRenderedAt(Date.now()) }, [])

  // Fire contact_form_start once, on the visitor's first interaction with the form.
  const startedRef = useRef(false)
  const handleFormStart = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackEvent('contact_form_start', { page_type: 'contact' })
  }

  // Move focus to the success/error message so it is announced and visible.
  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus()
  }, [status])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sendingRef.current) return // duplicate-submission guard
    sendingRef.current = true
    const form = e.currentTarget
    setStatus('sending')
    try {
      const formData = new FormData(form)
      const service = formData.get('service')
      const utm = getStoredUTM()
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          service,
          message: formData.get('message'),
          utm_source: utm?.utm_source,
          utm_medium: utm?.utm_medium,
          utm_campaign: utm?.utm_campaign,
          website: formData.get('website'),
          formRenderedAt: formData.get('formRenderedAt'),
        }),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
        // Privacy-safe: the (non-PII) selected service category only.
        trackEvent('contact_form_submit_success', { page_type: 'contact', service })
      } else {
        // Entered values stay in the form so the visitor can retry.
        setStatus('error')
        trackEvent('contact_form_submit_error', { page_type: 'contact', error_category: 'server' })
      }
    } catch {
      setStatus('error')
      trackEvent('contact_form_submit_error', { page_type: 'contact', error_category: 'network' })
    } finally {
      sendingRef.current = false
    }
  }

  const sending = status === 'sending'

  return (
    <>
      <section className="ct-hero ct-hero--page ct-gridlines">
        <div className="ct-wrap">
          <div className="ct-hero__copy ct-rise" style={{ maxWidth: 820 }}>
            <span className="ct-eyebrow">Contact</span>
            <h1 className="ct-h1">Contact OC Electronic Recycling</h1>
            <p className="ct-lede">
              Questions about a project, a document or an unusual item? Send a message or call during business hours.
            </p>
          </div>
        </div>
      </section>

      <section className="ct-section ct-section--mineral">
        <div className="ct-wrap">
          <div className="ct-note ct-note--warm" style={{ marginBottom: 28 }}>
            <Icon name="truck" size={18} />
            <span>
              <strong>Requesting a business pickup?</strong> The{' '}
              <Link href="/business-pickup" className="ct-inline-link" data-cta-location="contact_note">business pickup request form</Link>{' '}
              collects quantities, location and data needs so we can confirm eligibility faster.
            </span>
          </div>

          <div className="ct-request">
            <form className="ct-form" onSubmit={handleSubmit} onFocusCapture={handleFormStart} onChange={handleFormStart} aria-labelledby="contact-form-title">
              <div className="ct-form__body">
                <h2 id="contact-form-title" className="ct-form__title">Send us a message</h2>

                {status === 'success' && (
                  <div ref={statusRef} tabIndex={-1} role="status" className="ct-note" style={{ marginBottom: 20 }}>
                    <Icon name="check" size={18} />
                    <span><strong>Message sent.</strong> Thank you — we will reply to the email address you provided.</span>
                  </div>
                )}
                {status === 'error' && (
                  <div ref={statusRef} tabIndex={-1} role="alert" className="ct-form__summary">
                    <Icon name="alert" size={20} />
                    <div>
                      <strong>Your message was not sent.</strong>
                      <p>Your text is still in the form — please try again, or call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.</p>
                    </div>
                  </div>
                )}

                {/* Honeypot — real visitors never see or fill this in. */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="ct-hp" />
                <input type="hidden" name="formRenderedAt" value={renderedAt ?? ''} readOnly />

                <div className="ct-form__grid">
                  <div className="ct-form__row">
                    <div className="ct-field">
                      <label htmlFor="cf-name">First name</label>
                      <input id="cf-name" type="text" name="name" autoComplete="given-name" required />
                    </div>
                    <div className="ct-field">
                      <label htmlFor="cf-lastName">Last name</label>
                      <input id="cf-lastName" type="text" name="lastName" autoComplete="family-name" required />
                    </div>
                  </div>
                  <div className="ct-field">
                    <label htmlFor="cf-company">Company <span className="ct-opt">optional</span></label>
                    <input id="cf-company" type="text" name="company" autoComplete="organization" />
                  </div>
                  <div className="ct-form__row">
                    <div className="ct-field">
                      <label htmlFor="cf-email">Email</label>
                      <input id="cf-email" type="email" name="email" autoComplete="email" required />
                    </div>
                    <div className="ct-field">
                      <label htmlFor="cf-phone">Phone <span className="ct-opt">optional</span></label>
                      <input id="cf-phone" type="tel" name="phone" autoComplete="tel" />
                    </div>
                  </div>
                  <div className="ct-field">
                    <label htmlFor="cf-service">Topic</label>
                    <select id="cf-service" name="service" defaultValue="">
                      <option value="">Select a topic…</option>
                      {SERVICES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="ct-field">
                    <label htmlFor="cf-message">Message</label>
                    <textarea id="cf-message" name="message" rows={5} aria-describedby="cf-message-hint" />
                    <p className="ct-field__hint" id="cf-message-hint">
                      Need to send a file or photos? Email <a className="ct-inline-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                    </p>
                  </div>
                </div>
              </div>
              <div className="ct-form__foot">
                <div className="ct-form__nav">
                  <button type="submit" className="ct-btn ct-btn--ink" disabled={sending}>
                    {sending ? 'Sending…' : 'Send message'}
                  </button>
                </div>
                <p className="ct-small">
                  We use your details only to reply. See our <Link href="/privacy-policy" className="ct-inline-link">Privacy Policy</Link>.
                </p>
              </div>
            </form>

            <aside className="ct-request__aside" aria-label="Contact details">
              <div className="ct-panel">
                <ul className="ct-contact">
                  {CONTACT_INFO.map(({ icon, label, value }) => (
                    <li key={label}>
                      <span className="ct-projects__icon"><Icon name={icon} size={18} /></span>
                      <div>
                        <span className="ct-contact__label">{label}</span>
                        <span className="ct-contact__value">{value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <iframe
                title="Map of Orange County, California — our general service area"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212949.84039433654!2d-118.05!3d33.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dc925c54d5f7cf%3A0xdea6c3618b085268!2sOrange%20County%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="260"
                style={{ borderRadius: 12, border: '1px solid var(--ct-line)', display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

'use client'
// Multi-step business pickup request form.
//  • Validation rules live in lib/pickup.ts and are re-run on the server.
//  • Entered data is kept in state, so nothing is lost on a validation or
//    network error, and a request can only be sent once at a time.
//  • Success is shown only after the server confirms the request was handed off.
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'
import { trackEvent } from '@/lib/analytics'
import { getStoredUTM } from '@/lib/utm'
import {
  ACCESS_OPTIONS, DATA_OPTIONS, DOCUMENT_OPTIONS, EQUIPMENT_CATEGORIES, PHOTO_RULES,
  REFERRAL_OPTIONS, STEP_FIELDS, TIMEFRAME_OPTIONS, ZIP_MESSAGES, firstErrorStep,
  validatePickupRequest, zipArea, type FieldErrors, type PickupField,
} from '@/lib/pickup'
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site'
import { usePickup } from './PickupContext'
import QuantityStepper from './QuantityStepper'

const STEPS = [
  { id: 'equipment', label: 'Equipment', title: 'What needs to be picked up?' },
  { id: 'location', label: 'Location', title: 'Where is the equipment?' },
  { id: 'services', label: 'Data & documents', title: 'Data handling and documentation' },
  { id: 'contact', label: 'Contact', title: 'Who should we confirm with?' },
] as const

interface Fields {
  itemList: string
  address: string
  city: string
  zip: string
  timeframe: string
  access: string
  accessNotes: string
  dataService: string
  documents: string[]
  notes: string
  fullName: string
  company: string
  email: string
  phone: string
  referral: string
  consent: boolean
}

const EMPTY: Fields = {
  itemList: '', address: '', city: '', zip: '', timeframe: '', access: '', accessNotes: '',
  dataService: '', documents: [], notes: '', fullName: '', company: '', email: '', phone: '',
  referral: '', consent: false,
}

interface Photo { id: string; blob: Blob; url: string }

type Status = 'idle' | 'sending' | 'success' | 'error'

const FIELD_LABELS: Record<PickupField, string> = {
  quantities: 'Equipment quantities', itemList: 'Item list', address: 'Pickup address', city: 'City',
  zip: 'ZIP code', timeframe: 'Preferred timeframe', access: 'Access at the location',
  accessNotes: 'Access details', dataService: 'Data destruction', documents: 'Documentation',
  notes: 'Notes', fullName: 'Full name', company: 'Company', email: 'Business email', phone: 'Phone',
  referral: 'How you heard about us', consent: 'Confirmation',
}

/** Downscale in the browser so five phone photos fit in one request. */
async function resizeImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  try {
    const attempts: [number, number][] = [[1600, 0.82], [1280, 0.72], [1024, 0.62]]
    for (const [maxSide, quality] of attempts) {
      const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
      const w = Math.max(1, Math.round(bitmap.width * scale))
      const h = Math.max(1, Math.round(bitmap.height * scale))
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('no-canvas')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, w, h)
      ctx.drawImage(bitmap, 0, 0, w, h)
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
      if (blob && blob.size <= PHOTO_RULES.maxBytes) return blob
    }
    throw new Error('too-large')
  } finally {
    bitmap.close()
  }
}

export default function PickupForm() {
  const { quantities, setQuantity, resetQuantities, estimate } = usePickup()
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [photoError, setPhotoError] = useState('')
  const [photoBusy, setPhotoBusy] = useState(false)

  const headingRef = useRef<HTMLHeadingElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const renderedAtRef = useRef(0)
  const startedRef = useRef(false)
  const sendingRef = useRef(false)
  const stepChangedAtRef = useRef(0)
  const moveFocusRef = useRef<'heading' | 'summary' | 'success' | null>(null)
  const photosRef = useRef<Photo[]>([])
  const photoSeqRef = useRef(0)

  useEffect(() => { renderedAtRef.current = Date.now() }, [])

  // Release preview URLs when the form unmounts.
  useEffect(() => { photosRef.current = photos }, [photos])
  useEffect(() => () => { photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)) }, [])

  // Move keyboard / screen-reader focus after a step change, an error or success.
  useEffect(() => {
    const target = moveFocusRef.current
    moveFocusRef.current = null
    if (target === 'heading') headingRef.current?.focus()
    else if (target === 'summary') summaryRef.current?.focus()
    else if (target === 'success') successRef.current?.focus()
  })

  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackEvent('form_start', { form: 'pickup' })
  }

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    markStarted()
    setFields((prev) => ({ ...prev, [key]: value }))
    if (errors[key as PickupField]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const changeQuantity = (id: string, value: number) => {
    markStarted()
    setQuantity(id, value)
    if (errors.quantities) setErrors((prev) => ({ ...prev, quantities: undefined }))
  }

  const toggleDocument = (id: string) => {
    set('documents', fields.documents.includes(id) ? fields.documents.filter((d) => d !== id) : [...fields.documents, id])
  }

  const validate = () => validatePickupRequest({ ...fields, quantities })

  const goNext = () => {
    const result = validate()
    const stepErrors: FieldErrors = {}
    for (const f of STEP_FIELDS[step]) if (result.errors[f]) stepErrors[f] = result.errors[f]
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      moveFocusRef.current = 'summary'
      return
    }
    setErrors({})
    trackEvent('form_step_complete', { form: 'pickup', step: step + 1, step_name: STEPS[step].id })
    moveFocusRef.current = 'heading'
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const goBack = () => {
    setErrors({})
    moveFocusRef.current = 'heading'
    setStep((s) => Math.max(0, s - 1))
  }

  const addPhotos = async (list: FileList | null) => {
    if (!list || list.length === 0) return
    markStarted()
    setPhotoError('')
    setPhotoBusy(true)
    const next = [...photos]
    const problems: string[] = []
    for (const file of Array.from(list)) {
      if (next.length >= PHOTO_RULES.maxFiles) {
        problems.push(`You can attach up to ${PHOTO_RULES.maxFiles} photos.`)
        break
      }
      if (!(PHOTO_RULES.types as readonly string[]).includes(file.type)) {
        problems.push('Photos must be JPEG, PNG or WebP images.')
        continue
      }
      if (file.size > PHOTO_RULES.maxOriginalBytes) {
        problems.push('One photo was larger than 15 MB and was skipped.')
        continue
      }
      try {
        const blob = await resizeImage(file)
        const total = next.reduce((sum, p) => sum + p.blob.size, 0) + blob.size
        if (total > PHOTO_RULES.maxTotalBytes) {
          problems.push('The photos are too large together. Remove one, or email them to us instead.')
          break
        }
        photoSeqRef.current += 1
        next.push({ id: `photo-${photoSeqRef.current}`, blob, url: URL.createObjectURL(blob) })
      } catch {
        problems.push('One photo could not be read and was skipped.')
      }
    }
    setPhotos(next)
    setPhotoError([...new Set(problems)].join(' '))
    setPhotoBusy(false)
  }

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const gone = prev.find((p) => p.id === id)
      if (gone) URL.revokeObjectURL(gone.url)
      return prev.filter((p) => p.id !== id)
    })
    setPhotoError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < STEPS.length - 1) { stepChangedAtRef.current = Date.now(); goNext(); return }
    if (sendingRef.current) return // duplicate-submission guard
    // Ignore an accidental double-click on "Continue" that lands on the final step.
    if (Date.now() - stepChangedAtRef.current < 500) return

    const result = validate()
    if (!result.ok) {
      setErrors(result.errors)
      const errStep = firstErrorStep(result.errors)
      if (errStep >= 0 && errStep !== step) setStep(errStep)
      moveFocusRef.current = 'summary'
      return
    }

    sendingRef.current = true
    setStatus('sending')
    setServerMessage('')
    try {
      const utm = getStoredUTM()
      const body = new FormData()
      body.append('payload', JSON.stringify({ ...result.value, consent: true }))
      photos.forEach((p, i) => body.append('photos', p.blob, `photo-${i + 1}.jpg`))
      body.append('website', honeypotRef.current?.value ?? '')
      body.append('formRenderedAt', String(renderedAtRef.current))
      if (utm?.utm_source) body.append('utm_source', utm.utm_source)
      if (utm?.utm_medium) body.append('utm_medium', utm.utm_medium)
      if (utm?.utm_campaign) body.append('utm_campaign', utm.utm_campaign)

      const res = await fetch('/api/pickup-request', { method: 'POST', body })
      const data: { success?: boolean; errors?: FieldErrors; message?: string } = await res.json().catch(() => ({}))

      if (res.ok && data.success === true) {
        setStatus('success')
        moveFocusRef.current = 'success'
        trackEvent('form_submit_success', {
          form: 'pickup',
          photo_count: photos.length,
          meets_minimum: estimate.status === 'meets',
        })
      } else if (res.status === 400 && data.errors) {
        setErrors(data.errors)
        const errStep = firstErrorStep(data.errors)
        if (errStep >= 0) setStep(errStep)
        setStatus('idle')
        moveFocusRef.current = 'summary'
        trackEvent('form_submit_error', { form: 'pickup', error_category: 'validation' })
      } else {
        setServerMessage(data.message ?? '')
        setStatus('error')
        moveFocusRef.current = 'summary'
        trackEvent('form_submit_error', {
          form: 'pickup',
          error_category: res.status === 413 ? 'too_large' : res.status === 429 ? 'rate_limited' : 'server',
        })
      }
    } catch {
      setStatus('error')
      moveFocusRef.current = 'summary'
      trackEvent('form_submit_error', { form: 'pickup', error_category: 'network' })
    } finally {
      sendingRef.current = false
    }
  }

  const startOver = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url))
    setPhotos([])
    setFields(EMPTY)
    resetQuantities()
    setErrors({})
    setStep(0)
    setStatus('idle')
    startedRef.current = false
    renderedAtRef.current = Date.now()
    moveFocusRef.current = 'heading'
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="ct-form ct-form--done">
        <div className="ct-done">
          <span className="ct-done__badge"><Icon name="check" size={26} /></span>
          <h3 className="ct-h2" tabIndex={-1} ref={successRef}>Request received</h3>
          <p className="ct-done__lead">
            Thank you. Your request has been sent to our team. <strong>This is not a confirmed appointment.</strong>
          </p>
          <ol className="ct-done__next">
            <li><strong>We review your list.</strong> We check what we can accept and whether the request meets the pickup minimum.</li>
            <li><strong>We contact you to confirm.</strong> You will hear from us about eligibility, any fees and available pickup timing.</li>
            <li><strong>You approve the details.</strong> A pickup is only scheduled once you have agreed to the confirmed scope.</li>
          </ol>
          {estimate.tvCount > 0 && (
            <p className="ct-note ct-note--warm">
              <Icon name="info" size={18} />
              <span>Your list includes {estimate.tvCount} {estimate.tvCount === 1 ? 'television' : 'televisions'}. The estimated recycling fee is ${estimate.tvFee}, confirmed before scheduling.</span>
            </p>
          )}
          <p className="ct-small">
            Need to add something? Call <a className="ct-inline-link" href={PHONE_HREF} data-cta-location="pickup_form_success">{PHONE_DISPLAY}</a> and mention your company name.
          </p>
          <button type="button" className="ct-btn ct-btn--ghost" onClick={startOver}>Send another request</button>
        </div>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  const errorEntries = (Object.entries(errors) as [PickupField, string | undefined][]).filter(([, msg]) => msg)
  const describe = (name: PickupField, hintId?: string) =>
    [errors[name] ? `pf-${name}-err` : null, hintId ?? null].filter(Boolean).join(' ') || undefined
  const zipState = zipArea(fields.zip)
  const sending = status === 'sending'
  const isLast = step === STEPS.length - 1

  const fieldError = (name: PickupField) =>
    errors[name] ? (
      <p className="ct-field__err" id={`pf-${name}-err`}>
        <Icon name="alert" size={14} /> {errors[name]}
      </p>
    ) : null

  return (
    <form className="ct-form" onSubmit={handleSubmit} noValidate aria-labelledby="pf-title">
      {/* Progress */}
      <div className="ct-form__top">
        <ol className="ct-steps">
          {STEPS.map((s, i) => (
            <li key={s.id} className={i < step ? 'is-done' : i === step ? 'is-current' : undefined} aria-current={i === step ? 'step' : undefined}>
              <span className="ct-steps__num">{i < step ? <Icon name="check" size={14} /> : i + 1}</span>
              <span className="ct-steps__label">{s.label}</span>
            </li>
          ))}
        </ol>
        <div className="ct-progress" aria-hidden="true">
          <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      <div className="ct-form__body">
        <p className="ct-form__stepno">Step {step + 1} of {STEPS.length}</p>
        <h3 id="pf-title" className="ct-form__title" tabIndex={-1} ref={headingRef}>{STEPS[step].title}</h3>

        {(errorEntries.length > 0 || status === 'error') && (
          <div className="ct-form__summary" role="alert" tabIndex={-1} ref={summaryRef}>
            <Icon name="alert" size={20} />
            <div>
              {status === 'error' ? (
                <>
                  <strong>Your request was not sent.</strong>
                  <p>
                    {serverMessage || 'Something went wrong on our side or with the connection.'} Your details are still here — please try again, or call{' '}
                    <a href={PHONE_HREF} data-cta-location="pickup_form_error">{PHONE_DISPLAY}</a>.
                  </p>
                </>
              ) : (
                <>
                  <strong>Please check {errorEntries.length === 1 ? 'this field' : `these ${errorEntries.length} fields`}:</strong>
                  <ul>
                    {errorEntries.map(([name, msg]) => (
                      <li key={name}><a href={`#pf-${name}`}>{FIELD_LABELS[name]}</a> — {msg}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}

        {/* Honeypot — real visitors never see or fill this in. */}
        <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="ct-hp" />

        {/* ── Step 1: equipment ─────────────────────────────────────────────── */}
        {step === 0 && (
          <div className="ct-form__grid">
            <fieldset className="ct-fieldset" id="pf-quantities" aria-describedby={describe('quantities', 'pf-quantities-hint')}>
              <legend>Approximate quantities</legend>
              <p className="ct-field__hint" id="pf-quantities-hint">Estimates are fine. We confirm the final list with you.</p>
              <div className="ct-form__qty">
                {EQUIPMENT_CATEGORIES.map((cat) => (
                  <QuantityStepper key={cat.id} category={cat} value={quantities[cat.id] ?? 0} onChange={(v) => changeQuantity(cat.id, v)} idPrefix="pf-qty" />
                ))}
              </div>
              {fieldError('quantities')}
              {estimate.status !== 'empty' && (
                <p className={`ct-note${estimate.status === 'meets' ? '' : ' ct-note--warm'}`} role="status">
                  <Icon name={estimate.status === 'meets' ? 'check' : 'info'} size={18} />
                  <span>{estimate.messages[0]}{estimate.tvCount > 0 ? ` Estimated television fee: $${estimate.tvFee}.` : ''}</span>
                </p>
              )}
            </fieldset>

            <div className="ct-field">
              <label htmlFor="pf-itemList">Item list or description <span className="ct-opt">optional</span></label>
              <textarea id="pf-itemList" rows={3} value={fields.itemList} maxLength={2000}
                aria-describedby={describe('itemList', 'pf-itemList-hint')} aria-invalid={errors.itemList ? true : undefined}
                onChange={(e) => set('itemList', e.target.value)} />
              <p className="ct-field__hint" id="pf-itemList-hint">Models, sizes, or anything unusual — for example “two 42U racks” or “65-inch TVs”.</p>
              {fieldError('itemList')}
            </div>

            <div className="ct-field">
              <span className="ct-field__label" id="pf-photos-label">Equipment photos <span className="ct-opt">optional</span></span>
              <div className="ct-photos" role="group" aria-labelledby="pf-photos-label" aria-describedby="pf-photos-hint">
                {photos.map((p, i) => (
                  <div key={p.id} className="ct-photos__item">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                    <img src={p.url} alt={`Equipment photo ${i + 1}`} width={96} height={96} />
                    <button type="button" aria-label={`Remove photo ${i + 1}`} onClick={() => removePhoto(p.id)}>
                      <Icon name="x" size={14} />
                    </button>
                  </div>
                ))}
                {photos.length < PHOTO_RULES.maxFiles && (
                  <label className={`ct-photos__add${photoBusy ? ' is-busy' : ''}`}>
                    <input type="file" accept={PHOTO_RULES.accept} multiple disabled={photoBusy}
                      onChange={(e) => { void addPhotos(e.target.files); e.target.value = '' }} />
                    <Icon name="camera" size={22} />
                    <span>{photoBusy ? 'Preparing…' : 'Add photos'}</span>
                  </label>
                )}
              </div>
              <p className="ct-field__hint" id="pf-photos-hint">
                Up to {PHOTO_RULES.maxFiles} images (JPEG, PNG or WebP). Photos are resized on your device before upload. {photos.length} of {PHOTO_RULES.maxFiles} added.
              </p>
              {photoError && <p className="ct-field__err" role="alert"><Icon name="alert" size={14} /> {photoError}</p>}
            </div>
          </div>
        )}

        {/* ── Step 2: location ──────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="ct-form__grid">
            <div className="ct-field">
              <label htmlFor="pf-address">Pickup street address</label>
              <input id="pf-address" type="text" autoComplete="street-address" value={fields.address} maxLength={200}
                aria-required="true" aria-invalid={errors.address ? true : undefined} aria-describedby={describe('address')}
                onChange={(e) => set('address', e.target.value)} />
              {fieldError('address')}
            </div>
            <div className="ct-form__row">
              <div className="ct-field">
                <label htmlFor="pf-city">City</label>
                <input id="pf-city" type="text" autoComplete="address-level2" value={fields.city} maxLength={80}
                  aria-required="true" aria-invalid={errors.city ? true : undefined} aria-describedby={describe('city')}
                  onChange={(e) => set('city', e.target.value)} />
                {fieldError('city')}
              </div>
              <div className="ct-field">
                <label htmlFor="pf-zip">ZIP code</label>
                <input id="pf-zip" type="text" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" maxLength={5} value={fields.zip}
                  aria-required="true" aria-invalid={errors.zip ? true : undefined} aria-describedby={describe('zip', 'pf-zip-hint')}
                  onChange={(e) => set('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} />
                {fieldError('zip')}
              </div>
            </div>
            <p className={`ct-note${zipState === 'orange-county' ? '' : ' ct-note--warm'}`} id="pf-zip-hint" role="status" hidden={zipState === 'invalid'}>
              <Icon name="pin" size={18} />
              <span>{zipState === 'invalid' ? '' : ZIP_MESSAGES[zipState]}</span>
            </p>

            <div className="ct-form__row">
              <div className="ct-field">
                <label htmlFor="pf-timeframe">Preferred timeframe</label>
                <select id="pf-timeframe" value={fields.timeframe} aria-required="true"
                  aria-invalid={errors.timeframe ? true : undefined} aria-describedby={describe('timeframe', 'pf-timeframe-hint')}
                  onChange={(e) => set('timeframe', e.target.value)}>
                  <option value="">Select…</option>
                  {TIMEFRAME_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <p className="ct-field__hint" id="pf-timeframe-hint">A preference only — pickup timing is confirmed by our team.</p>
                {fieldError('timeframe')}
              </div>
              <div className="ct-field">
                <label htmlFor="pf-access">Access at the location</label>
                <select id="pf-access" value={fields.access} aria-required="true"
                  aria-invalid={errors.access ? true : undefined} aria-describedby={describe('access')}
                  onChange={(e) => set('access', e.target.value)}>
                  <option value="">Select…</option>
                  {ACCESS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                {fieldError('access')}
              </div>
            </div>

            <div className="ct-field">
              <label htmlFor="pf-accessNotes">Floor, elevator, dock or parking details <span className="ct-opt">optional</span></label>
              <textarea id="pf-accessNotes" rows={3} value={fields.accessNotes} maxLength={600}
                aria-describedby="pf-accessNotes-hint" onChange={(e) => set('accessNotes', e.target.value)} />
              <p className="ct-field__hint" id="pf-accessNotes-hint">For example: “3rd floor, freight elevator, dock open 8–4, check in with security.”</p>
            </div>
          </div>
        )}

        {/* ── Step 3: data and documents ────────────────────────────────────── */}
        {step === 2 && (
          <div className="ct-form__grid">
            <fieldset className="ct-fieldset" id="pf-dataService" aria-describedby={describe('dataService', 'pf-data-hint')}>
              <legend>Do any devices need data destruction?</legend>
              <p className="ct-field__hint" id="pf-data-hint">Data destruction is a selected service. It is not automatically included with recycling.</p>
              <div className="ct-choices">
                {DATA_OPTIONS.map((o) => (
                  <label key={o.id} className="ct-choice">
                    <input type="radio" name="dataService" value={o.id} checked={fields.dataService === o.id} onChange={() => set('dataService', o.id)} />
                    <span>
                      <strong>{o.label}</strong>
                      <small>{o.note}</small>
                    </span>
                  </label>
                ))}
              </div>
              {fieldError('dataService')}
            </fieldset>

            <fieldset className="ct-fieldset" id="pf-documents" aria-describedby="pf-docs-hint">
              <legend>Documentation you need <span className="ct-opt">optional</span></legend>
              <p className="ct-field__hint" id="pf-docs-hint">Availability depends on the service selected and the equipment processed. We confirm what applies.</p>
              <div className="ct-choices ct-choices--two">
                {DOCUMENT_OPTIONS.map((o) => (
                  <label key={o.id} className="ct-choice">
                    <input type="checkbox" checked={fields.documents.includes(o.id)} onChange={() => toggleDocument(o.id)} />
                    <span>
                      <strong>{o.label}</strong>
                      <small>{o.note}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="ct-field">
              <label htmlFor="pf-notes">Anything else we should know? <span className="ct-opt">optional</span></label>
              <textarea id="pf-notes" rows={3} value={fields.notes} maxLength={2000} onChange={(e) => set('notes', e.target.value)} />
            </div>
          </div>
        )}

        {/* ── Step 4: contact ───────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="ct-form__grid">
            <div className="ct-form__row">
              <div className="ct-field">
                <label htmlFor="pf-fullName">Full name</label>
                <input id="pf-fullName" type="text" autoComplete="name" value={fields.fullName} maxLength={120}
                  aria-required="true" aria-invalid={errors.fullName ? true : undefined} aria-describedby={describe('fullName')}
                  onChange={(e) => set('fullName', e.target.value)} />
                {fieldError('fullName')}
              </div>
              <div className="ct-field">
                <label htmlFor="pf-company">Company or organization</label>
                <input id="pf-company" type="text" autoComplete="organization" value={fields.company} maxLength={160}
                  aria-required="true" aria-invalid={errors.company ? true : undefined} aria-describedby={describe('company')}
                  onChange={(e) => set('company', e.target.value)} />
                {fieldError('company')}
              </div>
            </div>
            <div className="ct-form__row">
              <div className="ct-field">
                <label htmlFor="pf-email">Business email</label>
                <input id="pf-email" type="email" autoComplete="email" value={fields.email} maxLength={200}
                  aria-required="true" aria-invalid={errors.email ? true : undefined} aria-describedby={describe('email')}
                  onChange={(e) => set('email', e.target.value)} />
                {fieldError('email')}
              </div>
              <div className="ct-field">
                <label htmlFor="pf-phone">Phone</label>
                <input id="pf-phone" type="tel" autoComplete="tel" value={fields.phone} maxLength={40}
                  aria-required="true" aria-invalid={errors.phone ? true : undefined} aria-describedby={describe('phone')}
                  onChange={(e) => set('phone', e.target.value)} />
                {fieldError('phone')}
              </div>
            </div>
            <div className="ct-field">
              <label htmlFor="pf-referral">How did you hear about us? <span className="ct-opt">optional</span></label>
              <select id="pf-referral" value={fields.referral} onChange={(e) => set('referral', e.target.value)}>
                <option value="">Select…</option>
                {REFERRAL_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="ct-consent" id="pf-consent">
              <label className="ct-choice ct-choice--plain">
                <input type="checkbox" checked={fields.consent} aria-required="true"
                  aria-invalid={errors.consent ? true : undefined} aria-describedby={describe('consent', 'pf-consent-hint')}
                  onChange={(e) => set('consent', e.target.checked)} />
                <span>
                  <strong>I understand this is a request, not a confirmed appointment, and I agree to be contacted about it.</strong>
                </span>
              </label>
              <p className="ct-field__hint" id="pf-consent-hint">
                We use these details only to respond to your request. See our{' '}
                <Link href="/privacy-policy" className="ct-inline-link">Privacy Policy</Link> and{' '}
                <Link href="/terms-of-service" className="ct-inline-link">Terms of Service</Link>.
              </p>
              {fieldError('consent')}
            </div>
          </div>
        )}
      </div>

      <div className="ct-form__foot">
        <p className="ct-form__assure">
          <Icon name="info" size={16} />
          <span>A request is not a confirmed appointment. Eligibility, applicable charges and timing are confirmed before scheduling.</span>
        </p>
        <div className="ct-form__nav">
          {step > 0 && (
            <button type="button" className="ct-btn ct-btn--ghost" onClick={goBack} disabled={sending}>Back</button>
          )}
          <button type="submit" className="ct-btn ct-btn--ink" disabled={sending} aria-disabled={sending}>
            {isLast ? (sending ? 'Sending request…' : 'Send pickup request') : 'Continue'}
            {!isLast && <Icon name="arrow" size={18} />}
          </button>
        </div>
        <p className="ct-vh" role="status" aria-live="polite">{sending ? 'Sending your request.' : ''}</p>
      </div>
    </form>
  )
}

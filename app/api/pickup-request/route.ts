// app/api/pickup-request/route.ts
// Receives the Business Pickup request form (multipart/form-data).
// Everything the browser validated is validated again here, photos are checked
// by their magic bytes (not their declared type), filenames are generated on
// the server, and success is returned only after the email handoff succeeds.
import { NextResponse } from 'next/server'
import { clientKey, rateLimited, sendNotification, type MailAttachment } from '@/lib/mail'
import {
  DATA_OPTIONS, DOCUMENT_OPTIONS, EQUIPMENT_CATEGORIES, PHOTO_RULES, escapeHtml, estimatePickup,
  safePhotoName, sniffImageType, validatePickupRequest, zipArea, type PickupRequestInput,
} from '@/lib/pickup'

const MIN_ELAPSED_MS = 4000
// Hard ceiling on the whole request body (fields + resized photos).
const MAX_BODY_BYTES = PHOTO_RULES.maxTotalBytes + 256 * 1024

function fail(status: number, message: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ success: false, message, ...extra }, { status })
}

function row(label: string, value: string) {
  return `<tr><th align="left" valign="top" style="padding:4px 14px 4px 0;white-space:nowrap">${escapeHtml(label)}</th><td style="padding:4px 0">${value}</td></tr>`
}

export async function POST(request: Request) {
  try {
    const declared = Number(request.headers.get('content-length') ?? 0)
    if (declared > MAX_BODY_BYTES) {
      return fail(413, 'The request is too large. Remove a photo or email photos to us instead.')
    }

    if (rateLimited(`pickup:${clientKey(request)}`)) {
      return fail(429, 'Too many requests from this connection. Please wait a few minutes or call us.')
    }

    let form: FormData
    try {
      form = await request.formData()
    } catch {
      return fail(400, 'The request could not be read. Please try again.')
    }

    // Honeypot: real visitors never fill this in. Respond as if accepted so
    // automated senders learn nothing, but send nothing.
    if (String(form.get('website') ?? '').trim() !== '') {
      console.log('[pickup-spam] blocked: honeypot filled')
      return NextResponse.json({ success: true })
    }

    // Time gate: a four-step form cannot be completed by a person in seconds.
    const renderedAt = Number(form.get('formRenderedAt'))
    const elapsed = Date.now() - renderedAt
    if (!renderedAt || Number.isNaN(elapsed) || elapsed < MIN_ELAPSED_MS) {
      console.log('[pickup-spam] blocked: submitted too fast', { elapsedMs: elapsed })
      return fail(400, 'That was faster than we expected. Please review your request and send it again.')
    }

    // ── Fields ───────────────────────────────────────────────────────────────
    let input: PickupRequestInput
    try {
      const parsed: unknown = JSON.parse(String(form.get('payload') ?? ''))
      if (!parsed || typeof parsed !== 'object') throw new Error('bad payload')
      input = parsed as PickupRequestInput
    } catch {
      return fail(400, 'The request could not be read. Please try again.')
    }

    const result = validatePickupRequest(input)
    if (!result.ok) {
      return fail(400, 'Some details need attention.', { errors: result.errors })
    }
    const req = result.value

    // ── Photos ───────────────────────────────────────────────────────────────
    const files = form.getAll('photos').filter((f): f is File => typeof f === 'object' && f !== null && 'arrayBuffer' in f)
    if (files.length > PHOTO_RULES.maxFiles) {
      return fail(400, `Please attach no more than ${PHOTO_RULES.maxFiles} photos.`)
    }
    const attachments: MailAttachment[] = []
    let totalBytes = 0
    for (const [i, file] of files.entries()) {
      if (file.size === 0) continue
      if (file.size > PHOTO_RULES.maxBytes) {
        return fail(413, 'One of the photos is too large. Please remove it and try again.')
      }
      totalBytes += file.size
      if (totalBytes > PHOTO_RULES.maxTotalBytes) {
        return fail(413, 'The photos are too large together. Remove one, or email photos to us instead.')
      }
      const buffer = Buffer.from(await file.arrayBuffer())
      const type = sniffImageType(buffer)
      if (!type) {
        return fail(400, 'One of the attachments is not a supported image (JPEG, PNG or WebP).')
      }
      // The client-supplied filename is discarded; a safe name is generated here.
      attachments.push({ filename: safePhotoName(i, type), content: buffer })
    }

    // ── Email ────────────────────────────────────────────────────────────────
    const estimate = estimatePickup(req.quantities)
    const equipmentRows = EQUIPMENT_CATEGORIES
      .filter((c) => req.quantities[c.id])
      .map((c) => row(c.label, String(req.quantities[c.id])))
      .join('')
    const dataLabel = DATA_OPTIONS.find((o) => o.id === req.dataService)?.label ?? req.dataService
    const docLabels = req.documents
      .map((id) => DOCUMENT_OPTIONS.find((o) => o.id === id)?.label ?? id)
      .join(', ')
    const utm = ['utm_source', 'utm_medium', 'utm_campaign']
      .map((k) => String(form.get(k) ?? '').slice(0, 120))
    const nl2br = (s: string) => escapeHtml(s).replace(/\n/g, '<br />')

    const html = `
      <h2>New business pickup request</h2>
      <p><em>This is a request only. Eligibility, fees and timing still need to be confirmed with the customer.</em></p>
      <h3>Contact</h3>
      <table cellpadding="0" cellspacing="0">
        ${row('Name', escapeHtml(req.fullName))}
        ${row('Company', escapeHtml(req.company))}
        ${row('Email', escapeHtml(req.email))}
        ${row('Phone', escapeHtml(req.phone))}
        ${row('Heard via', escapeHtml(req.referral || 'Not provided'))}
      </table>
      <h3>Location</h3>
      <table cellpadding="0" cellspacing="0">
        ${row('Address', escapeHtml(req.address))}
        ${row('City / ZIP', `${escapeHtml(req.city)} ${escapeHtml(req.zip)} (ZIP check: ${escapeHtml(zipArea(req.zip))})`)}
        ${row('Preferred timeframe', escapeHtml(req.timeframe))}
        ${row('Access', escapeHtml(req.access))}
        ${row('Access details', nl2br(req.accessNotes) || '—')}
      </table>
      <h3>Equipment</h3>
      <table cellpadding="0" cellspacing="0">
        ${equipmentRows || row('Quantities', 'None entered — see item list')}
        ${row('Qualifying major items', `${estimate.majorCount} (estimate: ${escapeHtml(estimate.status)})`)}
        ${row('Televisions / est. fee', `${estimate.tvCount} / $${estimate.tvFee}`)}
        ${row('Item list', nl2br(req.itemList) || '—')}
        ${row('Photos attached', String(attachments.length))}
      </table>
      <h3>Services</h3>
      <table cellpadding="0" cellspacing="0">
        ${row('Data destruction', escapeHtml(dataLabel))}
        ${row('Documentation requested', escapeHtml(docLabels || 'None selected'))}
        ${row('Notes', nl2br(req.notes) || '—')}
      </table>
      <hr />
      <p><strong>Lead source:</strong> ${escapeHtml(utm.some(Boolean) ? utm.map((v) => v || '(none)').join(' / ') : 'Direct / no campaign tracked')}</p>
    `

    await sendNotification({
      subject: `Pickup request: ${req.company} — ${estimate.totalCount} items, ${req.city}`.replace(/[\r\n\t]+/g, ' ').slice(0, 180),
      html,
      replyTo: req.email,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Pickup request error:', error)
    return fail(500, 'We could not send your request just now.')
  }
}

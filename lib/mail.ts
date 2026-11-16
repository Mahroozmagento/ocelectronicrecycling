// lib/mail.ts — server-only email handoff shared by the contact and pickup
// request routes. Import only from route handlers.
import { Resend } from 'resend'

// Instantiate lazily: the constructor throws when RESEND_API_KEY is absent, and
// doing that at module scope would break `next build` without the secret.
let client: Resend | null = null
function getClient(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY)
  return client
}

const FROM = process.env.CONTACT_FROM_EMAIL || 'OC Electronic Recycling <noreply@nextechoc.com>'
const TO = process.env.CONTACT_TO_EMAIL || 'nirowebix@gmail.com'

export interface MailAttachment {
  filename: string
  content: Buffer
}

/**
 * Sends a notification email. Throws if the provider rejects the message, so a
 * route can never report success for a request that was not actually handed off.
 */
export async function sendNotification({
  subject,
  html,
  replyTo,
  attachments,
}: {
  subject: string
  html: string
  replyTo?: string
  attachments?: MailAttachment[]
}): Promise<void> {
  const { error } = await getClient().emails.send({
    from: FROM,
    to: TO,
    replyTo,
    subject,
    html,
    attachments,
  })
  if (error) throw new Error(`Email provider error: ${error.name ?? 'unknown'}`)
}

// ── Tiny in-memory rate limiter ─────────────────────────────────────────────
// Best-effort only (per server instance). It blunts simple floods without
// needing external storage; the honeypot and time gate do the rest.
const hits = new Map<string, number[]>()

export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) hits.clear()
  return false
}

export function clientKey(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for') ?? ''
  return fwd.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
}

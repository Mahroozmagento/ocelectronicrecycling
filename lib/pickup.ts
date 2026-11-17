// lib/pickup.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for business-pickup policy, the eligibility estimate
// and request validation. Used by the estimator, the request form, the API
// route, city pages and FAQs so the published policy cannot drift between them.
//
// Keep this file dependency-free (no imports, no TS-only runtime features): it
// is also loaded directly by `node --test`.
// ─────────────────────────────────────────────────────────────────────────────

/** Minimum number of qualifying major items for a business pickup request. */
export const PICKUP_MINIMUM = 5
/** Recycling fee per television, in US dollars. */
export const TV_FEE = 39

export type CategoryKind = 'major' | 'review'

export interface EquipmentCategory {
  id: string
  label: string
  hint: string
  /** `major` counts toward the minimum; `review` is confirmed individually. */
  kind: CategoryKind
  /** Televisions carry the per-unit recycling fee. */
  tv?: boolean
  icon: string
}

export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  { id: 'desktops',   label: 'Desktop computers',             hint: 'Towers, all-in-ones, workstations',        kind: 'major',  icon: 'desktop' },
  { id: 'laptops',    label: 'Laptops',                       hint: 'Notebooks, Chromebooks',                   kind: 'major',  icon: 'laptop' },
  { id: 'servers',    label: 'Servers',                       hint: 'Rack, tower and blade servers',            kind: 'major',  icon: 'server' },
  { id: 'networking', label: 'Networking equipment',          hint: 'Switches, routers, firewalls',             kind: 'major',  icon: 'network' },
  { id: 'monitors',   label: 'Monitors',                      hint: 'Flat-panel computer displays',             kind: 'major',  icon: 'monitor' },
  { id: 'mobile',     label: 'Tablets and smartphones',       hint: 'Company phones, tablets',                  kind: 'major',  icon: 'mobile' },
  { id: 'printers',   label: 'Printers and office equipment', hint: 'Printers, copiers, scanners, phones',      kind: 'major',  icon: 'printer' },
  { id: 'tvs',        label: 'Televisions',                   hint: `$${TV_FEE} recycling fee per unit`,        kind: 'major',  icon: 'tv', tv: true },
  { id: 'storage',    label: 'Storage media / drives',        hint: 'Loose hard drives, SSDs, backup tapes',    kind: 'review', icon: 'drive' },
  { id: 'other',      label: 'Other equipment',               hint: 'Anything not listed — we confirm first',   kind: 'review', icon: 'box' },
]

export const CATEGORY_IDS = EQUIPMENT_CATEGORIES.map((c) => c.id)

export type Quantities = Record<string, number>

export type EstimateStatus = 'empty' | 'meets' | 'below' | 'review'

export interface Estimate {
  status: EstimateStatus
  /** Items that count toward the minimum. */
  majorCount: number
  /** Items confirmed individually (loose drives, other equipment). */
  reviewCount: number
  totalCount: number
  tvCount: number
  /** Estimated television recycling fee in dollars (tvCount × TV_FEE). */
  tvFee: number
  /** Additional qualifying items needed to reach the minimum (0 when met). */
  shortBy: number
  /** Plain-language, nonbinding result lines. The first line is the headline. */
  messages: string[]
}

export const MAX_QUANTITY = 9999

/** Coerce any input into a safe whole-number quantity. */
export function cleanQuantity(value: unknown): number {
  const n = typeof value === 'number' ? value : parseInt(String(value ?? ''), 10)
  if (!Number.isFinite(n) || n <= 0) return 0
  return Math.min(Math.floor(n), MAX_QUANTITY)
}

export const ESTIMATE_DISCLAIMER =
  'Final eligibility, fees and timing will be confirmed by our team.'

/**
 * Nonbinding eligibility estimate. This never confirms service or pricing — it
 * only tells the visitor how their list compares with the published policy.
 */
export function estimatePickup(quantities: Quantities): Estimate {
  let majorCount = 0
  let reviewCount = 0
  let tvCount = 0
  for (const cat of EQUIPMENT_CATEGORIES) {
    const qty = cleanQuantity(quantities[cat.id])
    if (cat.kind === 'major') majorCount += qty
    else reviewCount += qty
    if (cat.tv) tvCount += qty
  }
  const totalCount = majorCount + reviewCount
  const tvFee = tvCount * TV_FEE
  const shortBy = Math.max(0, PICKUP_MINIMUM - majorCount)

  let status: EstimateStatus
  const messages: string[] = []
  if (totalCount === 0) {
    status = 'empty'
    messages.push('Add approximate quantities to see how your request compares with the pickup minimum.')
  } else if (majorCount >= PICKUP_MINIMUM) {
    status = 'meets'
    messages.push('Your request appears to meet the five-item pickup minimum.')
  } else if (majorCount > 0) {
    status = 'below'
    messages.push('Your request may require a pickup fee or additional qualifying equipment.')
    messages.push(
      `${shortBy} more qualifying major ${shortBy === 1 ? 'item' : 'items'} would reach the five-item minimum.`,
    )
  } else {
    status = 'review'
    messages.push('Loose drives and other equipment are reviewed individually — send the details and we will confirm what is possible.')
  }
  if (status !== 'review' && reviewCount > 0) {
    messages.push('Loose drives and other equipment are reviewed individually and do not count toward the minimum automatically.')
  }
  if (tvCount > 0) {
    messages.push(
      `Televisions: estimated recycling fee is $${TV_FEE} per unit — ${tvCount} × $${TV_FEE} = $${tvFee}.`,
    )
  }
  if (totalCount > 0) messages.push(ESTIMATE_DISCLAIMER)

  return { status, majorCount, reviewCount, totalCount, tvCount, tvFee, shortBy, messages }
}

// ── ZIP guidance ────────────────────────────────────────────────────────────
// Orange County ZIP codes fall mostly in 926xx–928xx, with a handful of 906xx /
// 907xx codes in north-west OC. 928xx also contains a few Riverside County
// codes (Norco, Corona), excluded below. This is guidance only: the team
// confirms coverage for every request.
const OC_90X = new Set([
  '90620', '90621', '90622', '90623', '90624', '90630', '90631', '90632', '90633',
  '90680', '90720', '90721', '90740', '90742', '90743',
])
const NON_OC_928 = new Set(['92860', '92877', '92878', '92879', '92880', '92881', '92882', '92883'])

export type ZipArea = 'invalid' | 'orange-county' | 'confirm' | 'outside'

export function zipArea(zip: string): ZipArea {
  const z = String(zip ?? '').trim()
  if (!/^\d{5}$/.test(z)) return 'invalid'
  const p3 = z.slice(0, 3)
  if (p3 === '926' || p3 === '927') return 'orange-county'
  if (p3 === '928') return NON_OC_928.has(z) ? 'outside' : 'orange-county'
  if (OC_90X.has(z)) return 'orange-county'
  // Los Angeles County codes begin 900–918. South Los Angeles coverage is
  // confirmed case by case, so these are never auto-approved or auto-declined.
  if (/^9(0\d|1[0-8])$/.test(p3)) return 'confirm'
  return 'outside'
}

export const ZIP_MESSAGES: Record<ZipArea, string> = {
  invalid: 'Enter a five-digit ZIP code.',
  'orange-county': 'This ZIP code is in Orange County, inside our regular service area. Pickup availability is still confirmed before scheduling.',
  confirm: 'This ZIP code is in Los Angeles County. We serve South Los Angeles — send your request and we will confirm coverage for your address.',
  outside: 'This ZIP code looks outside our usual service area. You can still send the request and we will tell you whether we can help.',
}

// ── Request options ─────────────────────────────────────────────────────────
export const TIMEFRAME_OPTIONS = [
  'Flexible',
  'Within about two weeks',
  'Within about a month',
  'A specific date or deadline (add it in the notes)',
] as const

export const ACCESS_OPTIONS = [
  'Ground floor / easy access',
  'Loading dock available',
  'Upper floor with elevator',
  'Stairs only',
  'Not sure',
] as const

export const DATA_OPTIONS = [
  { id: 'none',     label: 'No data destruction needed',            note: 'Recycling only. Data-bearing devices are not sanitized or destroyed unless you select a data service.' },
  { id: 'sanitize', label: 'Data sanitization (wiping)',             note: 'Drives are overwritten with reference to NIST SP 800-88 guidance so they can be reused.' },
  { id: 'destroy',  label: 'Physical destruction (shredding)',       note: 'Media is physically destroyed so it cannot be reused.' },
  { id: 'unsure',   label: 'Not sure yet — help me decide',          note: 'We will ask a few questions and recommend an approach before anything is scheduled.' },
] as const

export const DOCUMENT_OPTIONS = [
  { id: 'manifest',     label: 'Pickup manifest',                    note: 'A record of the equipment collected at pickup.' },
  { id: 'inventory',    label: 'Serialized asset inventory',         note: 'A serial-number-level list, when it is part of the agreed project scope.' },
  { id: 'cor',          label: 'Certificate of Recycling',           note: 'Confirms the equipment was processed for recycling.' },
  { id: 'cod',          label: 'Certificate of Data Destruction',    note: 'Issued for data-bearing media when a data destruction service is selected.' },
  { id: 'custody',      label: 'Chain-of-custody documentation',     note: 'Records each handoff from pickup through processing.' },
] as const

export const REFERRAL_OPTIONS = [
  'Search engine',
  'Referral or word of mouth',
  'Returning customer',
  'Social media',
  'Other',
] as const

// ── Photo upload rules ──────────────────────────────────────────────────────
export const PHOTO_RULES = {
  maxFiles: 5,
  /** Per-file limit after client-side resizing (bytes). */
  maxBytes: 800 * 1024,
  /** Combined limit so the request stays under typical serverless body caps. */
  maxTotalBytes: 3500 * 1024,
  /** Largest original file we will try to resize in the browser (bytes). */
  maxOriginalBytes: 15 * 1024 * 1024,
  types: ['image/jpeg', 'image/png', 'image/webp'],
  accept: 'image/jpeg,image/png,image/webp',
} as const

export type SniffedImage = 'image/jpeg' | 'image/png' | 'image/webp'

/** Identify an image by its magic bytes — never trust the declared MIME type. */
export function sniffImageType(bytes: Uint8Array): SniffedImage | null {
  if (bytes.length < 12) return null
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg'
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) return 'image/png'
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) return 'image/webp'
  return null
}

const IMAGE_EXT: Record<SniffedImage, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

/** Server-generated attachment name. Client filenames are never reused. */
export function safePhotoName(index: number, type: SniffedImage): string {
  return `equipment-photo-${index + 1}.${IMAGE_EXT[type]}`
}

// ── Text helpers ────────────────────────────────────────────────────────────
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function text(value: unknown, max: number): string {
  // Strip control characters (keep newlines/tabs), collapse runaway length.
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// ── Request validation (shared by the form and the API route) ───────────────
export interface PickupRequestInput {
  quantities?: unknown
  itemList?: unknown
  fullName?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
  address?: unknown
  city?: unknown
  zip?: unknown
  timeframe?: unknown
  access?: unknown
  accessNotes?: unknown
  dataService?: unknown
  documents?: unknown
  notes?: unknown
  referral?: unknown
  consent?: unknown
}

export interface PickupRequest {
  quantities: Quantities
  itemList: string
  fullName: string
  company: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  timeframe: string
  access: string
  accessNotes: string
  dataService: string
  documents: string[]
  notes: string
  referral: string
  consent: true
}

export type PickupField = keyof PickupRequest
export type FieldErrors = Partial<Record<PickupField, string>>

export interface ValidationResult {
  ok: boolean
  errors: FieldErrors
  /** Normalized values. Only safe to use when `ok` is true. */
  value: PickupRequest
}

/** Which fields belong to each step of the request form. */
export const STEP_FIELDS: PickupField[][] = [
  ['quantities', 'itemList'],
  ['address', 'city', 'zip', 'timeframe', 'access', 'accessNotes'],
  ['dataService', 'documents', 'notes'],
  ['fullName', 'company', 'email', 'phone', 'referral', 'consent'],
]

export function validatePickupRequest(input: PickupRequestInput): ValidationResult {
  const errors: FieldErrors = {}

  const rawQ = (input.quantities && typeof input.quantities === 'object' ? input.quantities : {}) as Record<string, unknown>
  const quantities: Quantities = {}
  for (const id of CATEGORY_IDS) {
    const qty = cleanQuantity(rawQ[id])
    if (qty > 0) quantities[id] = qty
  }
  const itemList = text(input.itemList, 2000)
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0)
  if (totalItems === 0 && itemList.length < 3) {
    errors.quantities = 'Add an approximate quantity for at least one equipment type, or describe the equipment in the item list.'
  }

  const fullName = text(input.fullName, 120)
  if (fullName.length < 2) errors.fullName = 'Enter your full name.'

  const company = text(input.company, 160)
  if (company.length < 2) errors.company = 'Enter your company or organization name.'

  const email = text(input.email, 200).toLowerCase()
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address, like name@company.com.'

  const phone = text(input.phone, 40)
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) errors.phone = 'Enter a phone number with area code.'

  const address = text(input.address, 200)
  if (address.length < 5) errors.address = 'Enter the street address where the equipment is located.'

  const city = text(input.city, 80)
  if (city.length < 2) errors.city = 'Enter the city.'

  const zip = text(input.zip, 10)
  if (zipArea(zip) === 'invalid') errors.zip = ZIP_MESSAGES.invalid

  const timeframe = text(input.timeframe, 80)
  if (!(TIMEFRAME_OPTIONS as readonly string[]).includes(timeframe)) {
    errors.timeframe = 'Choose a preferred timeframe.'
  }

  const access = text(input.access, 80)
  if (!(ACCESS_OPTIONS as readonly string[]).includes(access)) {
    errors.access = 'Tell us about access at the pickup location.'
  }
  const accessNotes = text(input.accessNotes, 600)

  const dataService = text(input.dataService, 20)
  if (!DATA_OPTIONS.some((o) => o.id === dataService)) {
    errors.dataService = 'Choose a data destruction option.'
  }

  const docIds = DOCUMENT_OPTIONS.map((o) => o.id as string)
  const documents = Array.isArray(input.documents)
    ? [...new Set(input.documents.map((d) => String(d)).filter((d) => docIds.includes(d)))]
    : []

  const notes = text(input.notes, 2000)

  const referralRaw = text(input.referral, 60)
  const referral = (REFERRAL_OPTIONS as readonly string[]).includes(referralRaw) ? referralRaw : ''

  if (input.consent !== true && input.consent !== 'true' && input.consent !== 'on') {
    errors.consent = 'Please confirm you agree before sending the request.'
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: {
      quantities, itemList, fullName, company, email, phone, address, city, zip,
      timeframe, access, accessNotes, dataService, documents, notes, referral, consent: true,
    },
  }
}

/** First step (0-based) that contains an error, or -1 when there are none. */
export function firstErrorStep(errors: FieldErrors): number {
  return STEP_FIELDS.findIndex((fields) => fields.some((f) => errors[f]))
}

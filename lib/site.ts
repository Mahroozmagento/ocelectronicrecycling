// lib/site.ts
// Verified business facts and shared copy fragments. Anything that states a
// policy lives here (or in lib/pickup.ts) so every page says the same thing.
import { PICKUP_MINIMUM, TV_FEE } from './pickup'

export { PICKUP_MINIMUM, TV_FEE }

export const SITE_URL = 'https://www.ocelectronicrecycling.com'
export const SITE_NAME = 'OC Electronic Recycling'
export const BUSINESS_ID = `${SITE_URL}/#business`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const PHONE_DISPLAY = '(949) 287-3056'
export const PHONE_HREF = 'tel:+19492873056'
export const EMAIL = 'info@ocelectronicrecycling.com'
export const HOURS = 'Mon–Fri, 8am–6pm'

/** The only service-area wording used sitewide. Not a list of offices. */
export const SERVICE_AREA = 'Orange County and South Los Angeles'
/** Founding year, explicitly confirmed by the business owner. Used in the
 * homepage hero ("Since 2012") and as LocalBusiness `foundingDate`. */
export const FOUNDING_YEAR = '2012'

export const DEFAULT_OG_IMAGE = '/image/hero-facility-oc-electronic-recycling.webp'

// ── Policy statements (reuse these; do not paraphrase the numbers) ──────────
export const POLICY = {
  minimum: `Business pickup requires at least ${PICKUP_MINIMUM} qualifying major electronic items.`,
  courtesy: 'Small accessories can be included with a pickup, but they do not count toward the minimum.',
  fees: `Most accepted qualifying electronics can be recycled without a recycling fee. Televisions carry a $${TV_FEE} recycling fee per unit.`,
  confirm: 'Final acceptance, fees and pickup timing are confirmed before anything is scheduled.',
  request: 'Sending a request does not confirm an appointment.',
  unusual: 'Oversized, specialized, hazardous or unusual equipment is confirmed individually.',
  data: 'Data destruction is a selected service — it is not automatically included with recycling.',
  documents: 'Available documentation depends on the service you select and the equipment processed.',
  area: `We serve businesses across ${SERVICE_AREA}. City pages describe service areas, not branch locations.`,
} as const

/** Three compact facts used in eligibility strips across the site. */
export const ELIGIBILITY_FACTS = [
  { value: `${PICKUP_MINIMUM}+`, label: 'qualifying major items', detail: 'Business pickup minimum' },
  { value: `$${TV_FEE}`, label: 'per television', detail: 'Most other accepted electronics have no recycling fee' },
  { value: 'Confirmed', label: 'before scheduling', detail: 'Eligibility, fees and timing' },
] as const

// ── What counts toward a pickup ─────────────────────────────────────────────
export const QUALIFYING_ITEMS = [
  'Desktop computers and workstations',
  'Laptops',
  'Servers',
  'Network switches, routers and firewalls',
  'Flat-panel monitors',
  'Tablets and smartphones',
  'Printers, copiers and office equipment',
  `Televisions ($${TV_FEE} fee per unit)`,
]

export const COURTESY_ITEMS = [
  'Keyboards and mice',
  'Cables and power adapters',
  'Docking stations',
  'Webcams and headsets',
  'Chargers and small accessories',
  'Other small peripherals',
]

export const CONFIRM_ITEMS = [
  'Loose hard drives, SSDs and backup tapes',
  'UPS units and batteries',
  'CRT monitors and CRT televisions',
  'Large copiers, plotters and production printers',
  'Server racks, cabinets and kiosks',
  'Medical, laboratory or industrial equipment',
  'Appliances and anything containing liquids or lamps',
  'Damaged or swollen batteries',
]

// ── Process (used on Business Pickup, homepage and city pages) ──────────────
export const PROCESS_STEPS = [
  {
    title: 'Tell us what you have',
    body: 'Share approximate quantities, your location and any data or documentation needs. Photos help but are optional.',
  },
  {
    title: 'We confirm scope and eligibility',
    body: 'We review the request and confirm what we can accept, any fees, and available pickup timing before anything is scheduled.',
  },
  {
    title: 'Pickup and chain-of-custody',
    body: 'Equipment is collected at your site. The handoff, and any manifest or custody records in your scope, are documented from that point onward.',
  },
  {
    title: 'Processing and selected documentation',
    body: 'Data services you selected are performed, equipment is routed to reuse or recycling, and the documentation in your scope is issued.',
  },
] as const

// ── Documentation types ─────────────────────────────────────────────────────
export const DOCUMENT_TYPES = [
  {
    name: 'Pickup manifest',
    what: 'A record of the equipment collected at your site.',
    when: 'Prepared when it is part of your pickup scope — tell us if you need one.',
  },
  {
    name: 'Serialized asset inventory',
    what: 'A serial-number-level list of assets, with make and model where available.',
    when: 'Provided when serialized tracking is part of the agreed project scope.',
  },
  {
    name: 'Certificate of Recycling',
    what: 'Confirms that the listed equipment was processed for recycling.',
    when: 'Available for recycled equipment on request.',
  },
  {
    name: 'Certificate of Data Destruction',
    what: 'Records the sanitization or destruction method used for data-bearing media.',
    when: 'Issued when you select a data destruction service.',
  },
  {
    name: 'Chain-of-custody documentation',
    what: 'A record of each handoff from pickup through processing.',
    when: 'Scope is agreed before pickup for projects that require it.',
  },
] as const

// ── Navigation ──────────────────────────────────────────────────────────────
export const PRIMARY_NAV = [
  { label: 'Business Pickup', href: '/business-pickup' },
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

/** Principal service-area pages linked from the homepage, footer and pickup page. */
export const FEATURED_CITY_SLUGS = [
  'irvine', 'anaheim', 'santa-ana', 'costa-mesa', 'newport-beach',
  'huntington-beach', 'fullerton', 'orange', 'tustin', 'lake-forest',
] as const

// lib/photos.ts
// The company's own photography in /public/image, kept in one place so every
// page uses the real dimensions (for layout stability and correct aspect
// ratios) and the same descriptive alt text. Alt text describes what is
// visible in each photo and makes no claims beyond it.
//
// Not listed here, because they were already unused on `main` before the
// redesign: dd, dfd, gg, ggghh and jkj (variants of the storefront photo used
// for contact-oc-electronic-recycling.webp), dfdf and tyt (duplicates of the
// resources photo), sss (duplicate of the recycling photo) and contact-hero
// (a city skyline, not a company photo). The files are kept in /public/image.

export interface CompanyPhoto {
  src: string
  width: number
  height: number
  alt: string
}

export const PHOTOS = {
  /** Warehouse processing floor. Restored as the homepage hero image. */
  facility: {
    src: '/image/hero-facility-oc-electronic-recycling.webp',
    width: 1800,
    height: 2200,
    alt: 'Inside the OC Electronic Recycling warehouse: rows of bins sorted into laptops, phones and tablets, two staff members in safety vests on the floor, and the company logo on the back wall.',
  },
  /** Trucks and sorted bins. Was the homepage "Facility Overview" band. */
  overview: {
    src: '/image/hero-overview-oc-electronic-recycling.webp',
    width: 2056,
    height: 765,
    alt: 'OC Electronic Recycling box trucks parked inside the warehouse beside bins labelled laptops, phones, tablets, hard drives and circuit boards.',
  },
  /** Sorting tables. Was the homepage bottom-CTA background. */
  sorting: {
    src: '/image/cta-bottom-oc-electronic-recycling.webp',
    width: 1967,
    height: 799,
    alt: 'Staff in OC Electronic Recycling shirts sorting electronics at long warehouse tables, with bins labelled laptops, phones, circuit boards and tablets.',
  },
  /** Team in the warehouse. Was the About hero background. */
  about: {
    src: '/image/about-oc-electronic-recycling.webp',
    width: 3060,
    height: 1100,
    alt: 'The OC Electronic Recycling team standing together in the warehouse beside a company box truck and bins of laptops and circuit boards.',
  },
  /** Crew with trucks. Was the photo in the About page panel. */
  team: {
    src: '/image/about-team.webp',
    width: 1915,
    height: 821,
    alt: 'OC Electronic Recycling crew standing in front of two company box trucks inside the warehouse.',
  },
  /** Building exterior at dusk. Was the Contact hero background. */
  exterior: {
    src: '/image/contact-oc-electronic-recycling.webp',
    width: 3200,
    height: 1100,
    alt: 'Building with OC Electronic Recycling signage at dusk, with a company box truck at the loading dock.',
  },
  /** Technician with a laptop. Was the How It Works hero background. */
  inspection: {
    src: '/image/how-it-works-oc-electronic-recycling.webp',
    width: 3200,
    height: 1100,
    alt: 'A technician in an OC Electronic Recycling shirt checking a laptop at a sorting bin, with colleagues working in the warehouse behind him.',
  },
  /** Document on a tablet. Was the Resources hero background. */
  records: {
    src: '/image/resources-oc-electronic-recycling.webp',
    width: 2344,
    height: 1100,
    alt: 'A staff member in an OC Electronic Recycling shirt holding a tablet that shows a certificate-style document.',
  },
  /** Workbenches. Was the Services hero background. */
  workbench: {
    src: '/image/services-oc-electronic-recycling.webp',
    width: 3200,
    height: 1100,
    alt: 'Technicians in OC Electronic Recycling shirts sorting and taking apart electronics at warehouse workbenches.',
  },
} as const satisfies Record<string, CompanyPhoto>

export type PhotoName = keyof typeof PHOTOS

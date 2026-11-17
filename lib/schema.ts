// lib/schema.ts
// JSON-LD builders. Every builder takes the same data that is rendered on the
// page, so structured data cannot say something the visitor cannot see.
import { BUSINESS_ID, SITE_URL } from './site'

export type Faq = { q: string; a: string }
export type Crumb = { name: string; path: string }

export const abs = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`)

/** Orange County + South Los Angeles, as named places (no fabricated address). */
export const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Orange County, California' },
  { '@type': 'Place', name: 'South Los Angeles, California' },
]

export function faqNode(path: string, faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbNode(path: string, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  }
}

export function serviceNode({
  path,
  name,
  serviceType,
  description,
  areaServed = AREA_SERVED,
}: {
  path: string
  name: string
  serviceType: string
  description: string
  areaServed?: unknown
}) {
  return {
    '@type': 'Service',
    '@id': `${abs(path)}#service`,
    name,
    serviceType,
    description,
    url: abs(path),
    provider: { '@id': BUSINESS_ID },
    areaServed,
  }
}

export function graph(...nodes: unknown[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) }
}

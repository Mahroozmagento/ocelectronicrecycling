import { MetadataRoute } from 'next'
import { blogPosts } from '@/posts/blog-data'
import { cities } from '@/lib/cities'

const BASE_URL = 'https://www.ocelectronicrecycling.com'

// Truthful lastmod values. Never use `new Date()` here: that would stamp every
// URL with the build time and falsely signal that every page changed.
// Update a date only when that page's content substantively changes.
const UPDATED = {
  redesign: new Date('2026-11-15'), // business-pickup launch, homepage/city/resources rebuild, claim cleanup
  previous: new Date('2026-09-21'),
}

export default function sitemap(): MetadataRoute.Sitemap {
  const d = UPDATED.redesign
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: d, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/business-pickup`, lastModified: d, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE_URL}/services`, lastModified: d, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services/data-destruction`, lastModified: d, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services/itad`, lastModified: d, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services/recycling`, lastModified: d, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/how-it-works`, lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/service-areas`, lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/resources`, lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: d, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: d, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: d, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: d, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: d, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/e-waste-recycling/${city.slug}`,
    lastModified: d,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Blog posts use their genuine dates: dateModified only when a material
  // editorial update happened, otherwise the original publish date.
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.publishDate),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...cityPages, ...blogPages]
}

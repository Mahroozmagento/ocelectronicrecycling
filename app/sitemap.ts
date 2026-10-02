import { MetadataRoute } from 'next'
import { blogPosts } from '@/posts/blog-data'
import { cities } from '@/lib/cities'

const BASE_URL = 'https://www.ocelectronicrecycling.com'

// Stable content-change dates. Using `new Date()` here would stamp every URL with
// the build time on every deployment, falsely signalling that all pages changed.
// Bump CONTENT_LAST_UPDATED only when the corresponding pages substantively change.
const CONTENT_LAST_UPDATED = new Date('2026-09-21')

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services/data-destruction`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services/itad`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services/recycling`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/how-it-works`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/resources`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/service-areas`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: CONTENT_LAST_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // City service-area pages
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/e-waste-recycling/${city.slug}`,
    lastModified: CONTENT_LAST_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Blog posts — use each post's genuine publish date, not the build time.
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...cityPages, ...blogPages]
}

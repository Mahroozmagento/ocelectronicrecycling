#!/usr/bin/env node
/**
 * Rendered-site SEO guardrail. Crawls a running build and checks what search
 * engines and visitors actually receive.
 *
 *   npm run build && npm start -- -p 3200 &
 *   npm run seo:crawl -- --url http://localhost:3200
 *
 * Checks every page reachable from the sitemap and internal links:
 *   status 200 without redirects · one <h1> · unique non-empty <title> and
 *   meta description · exactly one absolute, self-referencing www canonical ·
 *   no accidental noindex · JSON-LD parses · no AggregateRating or street
 *   address · at most one FAQPage, whose questions and answers are visible on
 *   the page · internal links resolve · images have alt text · no joined
 *   dynamic words, retired claims or mojibake in visible text · pickup policy
 *   present on pickup and city pages · robots.txt and 404 behave.
 */
import { decodeEntities, findClaims, findJoinedWords, hasMojibake, textOf, visibleText } from './seo-rules.mjs'

const args = process.argv.slice(2)
const BASE = (args[args.indexOf('--url') + 1] || process.env.SEO_BASE_URL || '').replace(/\/$/, '')
if (!BASE || args.indexOf('--url') === -1 && !process.env.SEO_BASE_URL) {
  console.error('Usage: node scripts/seo-crawl.mjs --url http://localhost:3200')
  process.exit(2)
}
const PROD = 'https://www.ocelectronicrecycling.com'
const errors = []
const warnings = []
const fail = (u, msg) => errors.push(`${u}: ${msg}`)

async function get(path, { redirect = 'manual' } = {}) {
  const res = await fetch(BASE + path, { redirect, headers: { 'user-agent': 'seo-crawl' } })
  const body = res.status === 200 || res.status === 404 ? await res.text() : ''
  return { status: res.status, location: res.headers.get('location'), type: res.headers.get('content-type') || '', body }
}

// ── robots + sitemap ────────────────────────────────────────────────────────
const robots = await get('/robots.txt')
if (robots.status !== 200) fail('/robots.txt', `status ${robots.status}`)
if (!/Sitemap:\s*https:\/\/www\.ocelectronicrecycling\.com\/sitemap\.xml/i.test(robots.body)) fail('/robots.txt', 'missing canonical Sitemap line')
if (/^Disallow:\s*\/\s*$/im.test(robots.body)) fail('/robots.txt', 'disallows the whole site')

const sm = await get('/sitemap.xml')
if (sm.status !== 200) fail('/sitemap.xml', `status ${sm.status}`)
const sitemapPaths = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const loc = m[1].trim()
  if (!loc.startsWith(PROD)) fail('/sitemap.xml', `non-canonical host in <loc> ${loc}`)
  return loc.replace(PROD, '') || '/'
})
for (const m of sm.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
  if (new Date(m[1]) > new Date(Date.now() + 86400000)) fail('/sitemap.xml', `lastmod in the future: ${m[1]}`)
}

// ── crawl ───────────────────────────────────────────────────────────────────
const queue = ['/', ...sitemapPaths]
const seen = new Set()
const pages = new Map() // path -> { title, desc }
const linkSources = new Map() // target -> first source

while (queue.length) {
  const path = queue.shift()
  if (seen.has(path)) continue
  seen.add(path)
  const r = await get(path)
  if (r.status !== 200) {
    fail(path, `status ${r.status}${r.location ? ` → ${r.location}` : ''}${linkSources.has(path) ? ` (linked from ${linkSources.get(path)})` : sitemapPaths.includes(path) ? ' (in sitemap)' : ''}`)
    continue
  }
  if (!r.type.includes('text/html')) continue
  const html = r.body
  const head = (html.match(/<head>([\s\S]*?)<\/head>/) || [, html])[1]

  // Metadata
  const title = textOf((head.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '')
  const desc = decodeEntities((head.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '')
  const canonicals = [...head.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1])
  const robotsMeta = (head.match(/<meta name="robots" content="([^"]+)"/) || [])[1] || ''
  if (!title) fail(path, 'missing <title>')
  if (!desc) fail(path, 'missing meta description')
  else if (desc.length > 170) warnings.push(`${path}: meta description is ${desc.length} characters`)
  if (canonicals.length !== 1) fail(path, `expected 1 canonical, found ${canonicals.length}`)
  else {
    const expected = path === '/' ? PROD : PROD + path
    if (canonicals[0] !== expected) fail(path, `canonical ${canonicals[0]} is not self-referencing (${expected})`)
  }
  if (/noindex/i.test(robotsMeta)) fail(path, `unexpected robots meta "${robotsMeta}"`)
  pages.set(path, { title, desc })

  // Headings
  const h1s = html.match(/<h1[\s>]/g) || []
  if (h1s.length !== 1) fail(path, `expected exactly 1 <h1>, found ${h1s.length}`)

  // Structured data
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
  const nodes = []
  for (const b of blocks) {
    try {
      const json = JSON.parse(b)
      nodes.push(...(json['@graph'] || [json]))
    } catch (e) {
      fail(path, `malformed JSON-LD: ${e.message}`)
    }
  }
  const allLd = JSON.stringify(nodes)
  if (/AggregateRating|"Review"/.test(allLd)) fail(path, 'ratings/reviews in structured data')
  if (/streetAddress/.test(allLd)) fail(path, 'street address in structured data (none is verified)')
  for (const m of allLd.matchAll(/"(?:item|url|@id)":"([^"]+)"/g)) {
    if (m[1].startsWith('/')) fail(path, `relative URL in JSON-LD: ${m[1]}`)
  }
  const faqs = nodes.filter((n) => n['@type'] === 'FAQPage')
  if (faqs.length > 1) fail(path, `${faqs.length} FAQPage blocks (max 1)`)
  const text = visibleText(html)
  const flatText = text.replace(/\s+/g, ' ')
  if (faqs.length === 1) {
    const summaries = [...html.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((m) => textOf(m[1]))
    for (const q of faqs[0].mainEntity || []) {
      if (!summaries.includes(q.name)) fail(path, `FAQ schema question not visible as written: "${q.name}"`)
      const answer = q.acceptedAnswer?.text || ''
      if (!flatText.includes(answer.replace(/\s+/g, ' '))) fail(path, `FAQ schema answer not visible as written for "${q.name.slice(0, 50)}"`)
    }
    if ((faqs[0].mainEntity || []).length !== summaries.length) {
      warnings.push(`${path}: ${summaries.length} visible <summary> items vs ${(faqs[0].mainEntity || []).length} FAQ schema questions`)
    }
  }

  // Visible text quality
  const isBlog = path.startsWith('/blog/')
  for (const w of findJoinedWords(text)) fail(path, `joined words in visible text: "${w}"`)
  for (const c of findClaims(text, { isBlog })) fail(path, `${c.why}: "…${c.snippet.trim()}…"`)
  if (hasMojibake(text) || hasMojibake(title) || hasMojibake(desc)) fail(path, 'mojibake in visible text or metadata')

  // Policy presence on conversion pages
  if (path === '/business-pickup' || path.startsWith('/e-waste-recycling/')) {
    if (!/\$39\b/.test(flatText)) fail(path, 'missing the $39 per-television fee')
    if (!/at least 5 qualifying major/i.test(flatText)) fail(path, 'missing the 5-item pickup minimum')
    if (!/confirmed before/i.test(flatText)) fail(path, 'missing "confirmed before scheduling" language')
  }
  if (path.startsWith('/e-waste-recycling/') && !/href="\/business-pickup"/.test(html)) fail(path, 'city page does not link to /business-pickup')

  // Images
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(m[0])) fail(path, `image without alt: ${m[0].slice(0, 80)}`)
  }

  // Internal links
  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    let href = decodeEntities(m[1])
    if (href.startsWith(PROD)) href = href.slice(PROD.length) || '/'
    if (!href.startsWith('/') || href.startsWith('//')) continue
    href = href.split('#')[0].split('?')[0]
    if (!href || /\.(xml|txt|ico|png|jpe?g|webp|svg|pdf|html)$/.test(href) || href.startsWith('/_next') || href.startsWith('/api/')) continue
    if (href !== '/' && href.endsWith('/')) fail(path, `trailing-slash internal link ${href}`)
    if (href !== path && !linkSources.has(href)) linkSources.set(href, path)
    if (!seen.has(href) && !queue.includes(href)) queue.push(href)
  }
}

// Orphans: sitemap pages that no crawled page links to
for (const p of sitemapPaths) {
  if (p !== '/' && !linkSources.has(p)) warnings.push(`${p}: in sitemap but not linked from any crawled page`)
}
for (const p of pages.keys()) {
  if (!sitemapPaths.includes(p)) warnings.push(`${p}: indexable page missing from sitemap`)
}

// Uniqueness
const byTitle = new Map()
const byDesc = new Map()
for (const [p, { title, desc }] of pages) {
  byTitle.set(title, [...(byTitle.get(title) || []), p])
  byDesc.set(desc, [...(byDesc.get(desc) || []), p])
}
for (const [t, ps] of byTitle) if (t && ps.length > 1) fail(ps.join(', '), `duplicate title "${t}"`)
for (const [d, ps] of byDesc) if (d && ps.length > 1) fail(ps.join(', '), `duplicate description "${d.slice(0, 60)}…"`)

// 404 behaviour
const nf = await get('/this-page-should-not-exist-' + Date.now())
if (nf.status !== 404) fail('/<missing>', `expected 404, got ${nf.status}`)
else if (!/<meta name="robots" content="[^"]*noindex/.test(nf.body)) fail('/<missing>', '404 page is missing noindex')
const nfCity = await get('/e-waste-recycling/not-a-real-city')
if (nfCity.status !== 404) fail('/e-waste-recycling/not-a-real-city', `expected 404, got ${nfCity.status}`)

console.log(`Crawled ${pages.size} pages (${sitemapPaths.length} in sitemap).`)
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`)
  for (const w of warnings) console.log('  ~ ' + w)
}
if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):`)
  for (const e of errors) console.error('  - ' + e)
  process.exit(1)
}
console.log('\n✓ Rendered-site check passed.')

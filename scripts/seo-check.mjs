#!/usr/bin/env node
/**
 * SEO regression guardrail (source-level, no build required).
 *
 * Fails CI on the classes of problems this project has fought before:
 *   - Wrong-host or missing canonicals on priority routes
 *   - Duplicate or missing titles/descriptions across city + blog data
 *   - Re-introduction of retired high-risk marketing claims
 *   - Multiple / missing <h1> on priority route files
 *   - Sitemap regressing to build-time lastModified for static routes
 *
 * Intentionally conservative: it matches concrete, retired phrases rather than
 * broad wording, so ordinary copy edits do not break the build.
 *
 * Run: `npm run seo:check`
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CANONICAL_HOST = 'https://www.ocelectronicrecycling.com'
const errors = []
const read = (p) => readFileSync(join(ROOT, p), 'utf8')

function walk(dir, out = []) {
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = join(dir, name)
    const st = statSync(join(ROOT, rel))
    if (st.isDirectory()) walk(rel, out)
    else if (/\.(tsx?|ts)$/.test(name)) out.push(rel)
  }
  return out
}

// ── 1. Canonicals on priority routes use the canonical host (or relative "/") ──
const priorityRoutes = [
  'app/page.tsx',
  'app/services/page.tsx',
  'app/services/itad/page.tsx',
  'app/services/data-destruction/page.tsx',
  'app/services/recycling/page.tsx',
  'app/how-it-works/page.tsx',
  'app/about/page.tsx',
  'app/contact/layout.tsx',
  'app/service-areas/page.tsx',
  'app/blog/page.tsx',
]
for (const route of priorityRoutes) {
  const src = read(route)
  const m = src.match(/canonical:\s*['"`]([^'"`]+)['"`]/)
  if (!m) {
    errors.push(`[canonical] ${route}: no canonical found`)
    continue
  }
  const val = m[1]
  if (!(val === '/' || val.startsWith(CANONICAL_HOST))) {
    errors.push(`[canonical] ${route}: canonical "${val}" is not the canonical host`)
  }
  if (/^https?:\/\/(?!www\.ocelectronicrecycling\.com)/.test(val)) {
    errors.push(`[canonical] ${route}: wrong-host canonical "${val}"`)
  }
}

// ── 2. Exactly one <h1> on priority page routes (skip layouts) ──
// PageHero and BlogIndexHero each render exactly one <h1>, so a page that uses
// one of them (and no literal <h1>) still has a single H1.
for (const route of priorityRoutes.filter((r) => r.endsWith('page.tsx'))) {
  const src = read(route)
  const literal = (src.match(/<h1[\s>]/g) || []).length
  const heroH1 = /<PageHero[\s>]/.test(src) || /<BlogIndexHero[\s>]/.test(src) ? 1 : 0
  const count = literal + heroH1
  if (count !== 1) errors.push(`[h1] ${route}: expected exactly 1 <h1>, found ${count}`)
}

// ── 3. City + blog data: unique, non-empty titles & descriptions ──
function checkUnique(file, field) {
  const src = read(file)
  const re = new RegExp(`${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'g')
  const seen = new Map()
  let m
  while ((m = re.exec(src))) {
    const v = m[1].trim()
    if (!v) errors.push(`[${field}] ${file}: empty value`)
    seen.set(v, (seen.get(v) || 0) + 1)
  }
  for (const [v, n] of seen) {
    if (n > 1) errors.push(`[${field}] ${file}: duplicated ${n}× → "${v.slice(0, 60)}"`)
  }
}
checkUnique('lib/cities.ts', 'metaTitle')
checkUnique('lib/cities.ts', 'metaDescription')
checkUnique('posts/blog-data.ts', 'metaTitle')
checkUnique('posts/blog-data.ts', 'metaDescription')

// ── 3b. Cross-source title collisions between static routes, city, and blog ──
// (Static route `title:` strings get the site suffix appended by the template,
// so compare the base title text against city/blog metaTitles.)
const allTitles = new Map()
const addTitle = (t, where) => {
  const v = t.trim()
  if (!v) return
  const list = allTitles.get(v) || []
  list.push(where)
  allTitles.set(v, list)
}
for (const route of priorityRoutes) {
  const m = read(route).match(/\btitle:\s*['"`]([^'"`\n]+)['"`]/)
  if (m) addTitle(m[1], route)
}
for (const file of ['lib/cities.ts', 'posts/blog-data.ts']) {
  const re = /metaTitle:\s*"((?:[^"\\]|\\.)*)"/g
  let m
  while ((m = re.exec(read(file)))) addTitle(m[1], file)
}
for (const [t, where] of allTitles) {
  if (where.length > 1) errors.push(`[title] collision "${t}" across: ${where.join(', ')}`)
}

// ── 4. Retired high-risk claims must not reappear in visible/source content ──
// (Blog articles are excluded: they use NIST/DoD/statute terms educationally.)
const bannedPatterns = [
  { re: /most trusted/i, why: 'superlative "most trusted"' },
  { re: /\bpremier\b/i, why: 'superlative "premier"' },
  { re: /zero data liability/i, why: 'legal guarantee "zero data liability"' },
  { re: /legally defensible/i, why: 'legal conclusion "legally defensible"' },
  { re: /Data Destruction Guaranteed/i, why: 'guarantee claim' },
  { re: /eliminates that risk completely/i, why: 'absolute risk claim' },
  { re: /Nothing (we collect )?goes to landfill/i, why: 'absolute zero-landfill claim' },
  { re: /346K\+\s*(Anaheim )?Residents Served/i, why: 'fabricated served count' },
  { re: /5,000\+\s*Irvine Businesses Served/i, why: 'fabricated served count' },
  { re: /2,500\+/,  why: 'fabricated client count' },
  { re: /500T/, why: 'fabricated tonnage' },
  { re: /Certified Data Destruction/, why: 'certification implication (use "Secure Data Destruction")' },
]
const scanFiles = walk('app').concat(walk('components'), ['lib/cities.ts'])
for (const file of scanFiles) {
  const src = read(file)
  for (const { re, why } of bannedPatterns) {
    if (re.test(src)) errors.push(`[claim] ${file}: retired claim reappeared — ${why}`)
  }
}

// ── 5. Sitemap must not stamp static routes with build-time new Date() ──
const sitemap = read('app/sitemap.ts')
if (/lastModified:\s*new Date\(\)/.test(sitemap)) {
  errors.push('[sitemap] app/sitemap.ts: uses build-time `new Date()` for lastModified')
}

// ── Report ──
if (errors.length) {
  console.error(`\n✗ SEO check failed with ${errors.length} issue(s):\n`)
  for (const e of errors) console.error('  - ' + e)
  console.error('')
  process.exit(1)
}
console.log('✓ SEO check passed — canonicals, H1s, metadata uniqueness, claims, and sitemap all OK.')

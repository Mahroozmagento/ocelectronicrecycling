#!/usr/bin/env node
/**
 * SEO + content-accuracy guardrail (source level, no build required).
 *
 *   npm run seo:check
 *
 * Fails on:
 *   - Retired / prohibited claims (same-week, "all electronics", superlatives,
 *     universal certificates, NIST-as-certification, served counts, Est. 2012…)
 *   - JSX that would join a word to a dynamic value ("most{city.name}" → "mostIrvine")
 *   - City data that reintroduces ZIPs, statistics or relationship claims
 *   - Pickup policy numbers that disagree with lib/pickup.ts (5 items, $39 per TV)
 *   - Duplicate or missing titles / descriptions in city, blog and route data
 *   - Fake download links or invented file-size labels; empty public files
 *   - Mojibake; build-time sitemap lastModified
 *
 * Rendered-page checks (H1, canonicals, FAQ/schema parity, broken links,
 * sitemap status codes, noindex) live in scripts/seo-crawl.mjs.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { findClaims, hasMojibake } from './seo-rules.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const fail = (msg) => errors.push(msg)
const read = (p) => readFileSync(join(ROOT, p), 'utf8')

function walk(dir, exts, out = []) {
  const abs = join(ROOT, dir)
  if (!existsSync(abs)) return out
  for (const name of readdirSync(abs)) {
    const rel = join(dir, name)
    const st = statSync(join(ROOT, rel))
    if (st.isDirectory()) walk(rel, exts, out)
    else if (exts.some((e) => name.endsWith(e))) out.push(rel)
  }
  return out
}

const sourceFiles = [...walk('app', ['.ts', '.tsx']), ...walk('components', ['.ts', '.tsx']), ...walk('lib', ['.ts'])]

// ── 1. Policy source of truth ───────────────────────────────────────────────
const pickupSrc = read('lib/pickup.ts')
const MIN = Number((pickupSrc.match(/export const PICKUP_MINIMUM = (\d+)/) || [])[1])
const FEE = Number((pickupSrc.match(/export const TV_FEE = (\d+)/) || [])[1])
if (MIN !== 5) fail(`[policy] lib/pickup.ts PICKUP_MINIMUM is ${MIN}, expected 5`)
if (FEE !== 39) fail(`[policy] lib/pickup.ts TV_FEE is ${FEE}, expected 39`)

const policyScan = [...sourceFiles, 'posts/blog-data.ts']
for (const file of policyScan) {
  const src = read(file)
  for (const m of src.matchAll(/\$(\d+)\s*(?:recycling )?fee per (?:unit|television|tv)|\$(\d+) per (?:television|tv)\b/gi)) {
    const v = Number(m[1] ?? m[2])
    if (v !== FEE) fail(`[policy] ${file}: TV fee "$${v}" disagrees with TV_FEE ($${FEE})`)
  }
  for (const m of src.matchAll(/\b(\d+)-item (?:pickup )?minimum/gi)) {
    if (Number(m[1]) !== MIN) fail(`[policy] ${file}: "${m[0]}" disagrees with PICKUP_MINIMUM (${MIN})`)
  }
}

// ── 2. Retired / prohibited claims in source ────────────────────────────────
for (const file of [...sourceFiles, 'posts/blog-data.ts']) {
  if (file === 'lib/pickup.ts') continue
  const src = read(file)
  const isBlog = file === 'posts/blog-data.ts'
  for (const hit of findClaims(src, { isBlog })) {
    fail(`[claim] ${file}: ${hit.why} → "…${hit.snippet.trim()}…"`)
  }
}

// ── 3. JSX that would glue text to a dynamic value ──────────────────────────
// JSX removes whitespace that contains a line break, so prose on one line and
// `{city.name}` on the next renders as "mostIrvine". Inline adjacency too.
for (const file of sourceFiles.filter((f) => f.endsWith('.tsx'))) {
  const lines = read(file).split('\n')
  lines.forEach((line, i) => {
    if (/[A-Za-z]\{(?:city|c|n|post|p)(?:\.\w+)?\}|\{(?:city|c|n)(?:\.\w+)?\}[A-Za-z]/.test(line) && !/[`'"]/.test(line.replace(/=\{[^}]*\}/g, ''))) {
      fail(`[joined-text] ${file}:${i + 1}: text touches an expression → ${line.trim().slice(0, 90)}`)
    }
    const next = lines[i + 1]
    if (next === undefined) return
    const a = line.trim()
    const b = next.trim()
    if (/^[A-Za-z][A-Za-z ,'’.&;-]*[A-Za-z]$/.test(a) && /^\{[\w.]+\}/.test(b) && !/^(return|const|let|import|export|else|case|default)\b/.test(a)) {
      fail(`[joined-text] ${file}:${i + 1}-${i + 2}: prose line followed by "{…}" on the next line will render without a space → "${a.slice(-30)}" + "${b.slice(0, 30)}"`)
    }
  })
}

// ── 4. City data rules ──────────────────────────────────────────────────────
const citySrc = read('lib/cities.ts')
for (const field of ['zip', 'population', 'heroStat', 'heroStatLabel', 'nearbyLandmark']) {
  if (new RegExp(`\\b${field}\\s*:`).test(citySrc)) fail(`[city] lib/cities.ts reintroduced the "${field}" field (fabricated or location-implying data)`)
}
const cityBody = citySrc.slice(citySrc.indexOf('export const cities'))
for (const [re, why] of [
  [/\b\d{1,3}(,\d{3})+\+?|\b\d+K\+/g, 'statistic'],
  [/\btrust(s|ed)? (us|OC)\b|\brel(y|ies) on (us|OC)\b|\bchoose OC\b|\bwe partner\b|\bbusinesses trust\b/gi, 'relationship claim'],
  [/\b(free|no-cost)\b/gi, 'free claim (policy lives in lib/site.ts)'],
  [/\bour (office|location|facility|branch)\b|\blocated in\b/gi, 'location claim'],
]) {
  for (const m of cityBody.matchAll(re)) fail(`[city] lib/cities.ts: ${why} "${m[0]}"`)
}
const citySlugs = [...cityBody.matchAll(/slug: '([^']+)'/g)].map((m) => m[1])
for (const m of cityBody.matchAll(/nearby: \[([^\]]*)\]/g)) {
  for (const s of [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1])) {
    if (!citySlugs.includes(s)) fail(`[city] nearby slug "${s}" does not exist`)
  }
}

// ── 5. Title / description uniqueness ───────────────────────────────────────
const titles = new Map()
const addTitle = (t, where) => {
  const v = t.trim()
  if (!v) return fail(`[title] empty title in ${where}`)
  titles.set(v, [...(titles.get(v) || []), where])
}
function uniqueField(file, field) {
  const seen = new Map()
  for (const m of read(file).matchAll(new RegExp(`${field}:\\s*["'\`]((?:[^"'\`\\\\]|\\\\.)*)["'\`]`, 'g'))) {
    const v = m[1].trim()
    if (!v) fail(`[${field}] ${file}: empty value`)
    seen.set(v, (seen.get(v) || 0) + 1)
    if (field === 'metaTitle') addTitle(v, file)
  }
  for (const [v, n] of seen) if (n > 1) fail(`[${field}] ${file}: duplicated ${n}× → "${v.slice(0, 70)}"`)
  return seen.size
}
if (uniqueField('lib/cities.ts', 'metaTitle') !== citySlugs.length) fail('[metaTitle] every city needs its own metaTitle')
uniqueField('lib/cities.ts', 'metaDescription')
uniqueField('posts/blog-data.ts', 'metaTitle')
uniqueField('posts/blog-data.ts', 'metaDescription')
for (const file of sourceFiles.filter((f) => /(^|\/)page\.tsx$/.test(f) || f.endsWith('layout.tsx'))) {
  const src = read(file)
  const m = src.match(/const TITLE = ['"`]([^'"`]+)['"`]/) || src.match(/^\s{2}title: ['"`]([^'"`|]+)['"`],/m)
  if (m && !file.includes('[')) addTitle(m[1], file)
  if (/^  title: ['"][^'"]*\| OC Electronic Recycling['"],/m.test(src)) {
    fail(`[title] ${file}: page title repeats the site suffix that the root template already adds`)
  }
}
for (const [t, where] of titles) if (where.length > 1) fail(`[title] collision "${t}" across ${where.join(', ')}`)

// ── 6. Downloads must be real ───────────────────────────────────────────────
for (const file of [...sourceFiles, 'posts/blog-data.ts']) {
  const src = read(file)
  for (const m of src.matchAll(/["'(]\/([\w\-/]+\.(pdf|xlsx|xls|docx|doc|csv|zip))["')]/gi)) {
    const p = join(ROOT, 'public', m[1])
    if (!existsSync(p)) fail(`[download] ${file}: links to /${m[1]} which does not exist in /public`)
    else if (statSync(p).size === 0) fail(`[download] ${file}: /${m[1]} is empty`)
  }
  if (/\b(PDF|XLSX|DOCX|CSV)\s*[—–-]\s*\d+\s?KB\b/.test(src)) fail(`[download] ${file}: hard-coded file-size label (sizes must come from the real file)`)
  if (/Free Downloads/i.test(src)) fail(`[download] ${file}: "Free Downloads" section without verified files`)
}
for (const file of walk('public', ['.pdf', '.xlsx', '.docx', '.csv', '.zip', '.webp', '.png', '.jpg', '.svg', '.ico', '.html'])) {
  if (statSync(join(ROOT, file)).size === 0) fail(`[public] ${relative(ROOT, join(ROOT, file))} is empty`)
}

// ── 7. Mojibake ─────────────────────────────────────────────────────────────
for (const file of [...sourceFiles, 'posts/blog-data.ts', ...walk('app', ['.css'])]) {
  const lines = read(file).split('\n')
  lines.forEach((l, i) => { if (hasMojibake(l)) fail(`[mojibake] ${file}:${i + 1}: ${l.trim().slice(0, 80)}`) })
}

// ── 8. Sitemap ──────────────────────────────────────────────────────────────
if (/lastModified:\s*new Date\(\)/.test(read('app/sitemap.ts'))) fail('[sitemap] app/sitemap.ts uses build-time `new Date()` for lastModified')
if (!read('app/sitemap.ts').includes('/business-pickup')) fail('[sitemap] /business-pickup is missing from the sitemap')

// ── Report ──────────────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`\n✗ SEO check failed with ${errors.length} issue(s):\n`)
  for (const e of errors) console.error('  - ' + e)
  console.error('')
  process.exit(1)
}
console.log(`✓ SEO source check passed — ${sourceFiles.length} source files, ${citySlugs.length} cities, policy ${MIN}-item minimum / $${FEE} per TV.`)

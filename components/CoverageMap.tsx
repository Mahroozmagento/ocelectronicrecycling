// components/CoverageMap.tsx
// Service Areas hero visual: a simplified, geographically oriented sketch of
// Orange County with one node per service-area page, plus a soft zone for
// eligible South Los Angeles requests.
//
// Accuracy notes:
// - Geometry is projected from approximate latitude/longitude (equirectangular,
//   cos-latitude corrected), so the shape and city positions are oriented
//   correctly, but the outline is simplified and is NOT a service boundary.
// - South Los Angeles is drawn as a dashed, unfilled zone on purpose: no
//   verified boundary exists, and coverage is confirmed per request.
// - No city is marked as a base or branch.
// The SVG is decorative (aria-hidden); the facts it supports are real text.
import { cities } from '@/lib/cities'

const W = 597
const H = 483

const OC_OUTLINE = 'M178 219.4 L189.4 189.8 L215.3 155.3 L240 127.7 L253.7 107 L262.9 78.7 L310 75.2 L364.5 78.7 L410.4 107 L439.1 131.1 L486.8 172.5 L519.5 224.3 L561.4 289.8 L575.2 345 L571.2 382.9 L523.5 427.8 L472.4 465.1 L447.8 438.2 L410.4 412.6 L385.8 386.4 L360.5 355.4 L318 327.8 L295.1 316.7 L266.4 296.7 L240 276 L211.2 248.4 Z'
/** Faint context coastline west of Seal Beach (Long Beach, San Pedro, Palos Verdes). */
const LA_COAST = 'M178 219.4 L149.3 209.1 L126.3 207 L90.7 229.1 L68.9 239.4 L14.4 217.4 L0 196.7'
/** A route roughly along the I-5 corridor, continuing north-west toward South LA. */
const ROUTE = 'M117.7 58.7 L172.2 86.3 L221 120.8 L264.1 139.4 L295.6 162.1 L315.7 200.1 L341.6 224.3 L370.3 255.3 L413.3 296.7 L429.4 345 L439.1 386.4 L462.1 431.3'
const SOUTH_LA = { cx: 89, cy: 86.3, rx: 74.6, ry: 58.7 }

/** Approximate position of each service-area page, keyed by city slug. */
export const COVERAGE_NODES: Record<string, [number, number]> = {
  'anaheim': [290.5, 154.6], 'irvine': [341, 259.4], 'santa-ana': [316.9, 216.7], 'huntington-beach': [241.7, 276],
  'garden-grove': [276.7, 197.3], 'fullerton': [284.2, 131.1], 'orange': [325.5, 187.7], 'costa-mesa': [287.6, 289.1],
  'newport-beach': [281.9, 304.3], 'mission-viejo': [429.4, 317.4], 'tustin': [341, 216.7], 'lake-forest': [419.6, 285],
  'buena-park': [242.2, 132.5], 'westminster': [244.5, 207.7], 'yorba-linda': [348.4, 118], 'placentia': [315.7, 129.7],
  'la-habra': [272.1, 88.3], 'brea': [298.5, 98.7], 'aliso-viejo': [398.4, 334.6], 'laguna-niguel': [409.3, 370.5],
  'laguna-hills': [406.4, 308.4], 'laguna-beach': [365.7, 357.4], 'dana-point': [414.5, 409.2], 'san-clemente': [463.8, 436.8],
  'san-juan-capistrano': [435.1, 385], 'rancho-santa-margarita': [469, 289.1], 'coto-de-caza': [478.2, 314.6],
  'ladera-ranch': [449.5, 350.5], 'foothill-ranch': [436.3, 258.1], 'el-toro': [419.1, 300.2],
  'trabuco-canyon': [476.5, 274.6], 'cypress': [219.9, 167.7], 'stanton': [245.1, 178], 'la-palma': [214.1, 147.7],
}

/** A few place names for orientation only — not offices or branches. */
const LABELS: { slug: string; dx: number; dy: number; anchor?: 'start' | 'end' | 'middle' }[] = [
  { slug: 'fullerton', dx: 8, dy: -6 },
  { slug: 'anaheim', dx: 9, dy: 4 },
  { slug: 'santa-ana', dx: -9, dy: 4, anchor: 'end' },
  { slug: 'irvine', dx: 9, dy: 4 },
  { slug: 'huntington-beach', dx: -9, dy: 4, anchor: 'end' },
  { slug: 'mission-viejo', dx: 9, dy: 4 },
  { slug: 'san-clemente', dx: 9, dy: 4 },
]

export default function CoverageMap() {
  const labelled = new Set(LABELS.map((l) => l.slug))
  const nodes = cities.map((c) => ({ slug: c.slug, name: c.name, at: COVERAGE_NODES[c.slug] })).filter((n) => n.at)

  return (
    <svg className="ct-cov__map" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ct-cov-route" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b7bff" />
          <stop offset="0.45" stopColor="#1fcf85" />
          <stop offset="1" stopColor="#1fcf85" />
        </linearGradient>
        <radialGradient id="ct-cov-glow" cx="0.55" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(31,207,133,0.10)" />
          <stop offset="1" stopColor="rgba(31,207,133,0)" />
        </radialGradient>
      </defs>

      {/* soft centre glow */}
      <ellipse cx="350" cy="250" rx="230" ry="190" fill="url(#ct-cov-glow)" />

      {/* context: LA coastline and the South LA request zone */}
      <path d={LA_COAST} fill="none" stroke="rgba(169,184,203,.28)" strokeWidth="1" strokeDasharray="2 4" />
      <ellipse {...SOUTH_LA} fill="rgba(59,123,255,.07)" stroke="rgba(156,192,255,.55)" strokeWidth="1" strokeDasharray="3 5" />
      <text x={SOUTH_LA.cx} y={SOUTH_LA.cy - 4} textAnchor="middle" className="ct-cov__zone">South Los Angeles</text>
      <text x={SOUTH_LA.cx} y={SOUTH_LA.cy + 12} textAnchor="middle" className="ct-cov__zone-sub">eligible requests</text>

      {/* Orange County (simplified outline, not a service boundary) */}
      <path d={OC_OUTLINE} fill="rgba(255,255,255,.028)" stroke="rgba(169,184,203,.5)" strokeWidth="1.2" strokeLinejoin="round" />
      <text x="452" y="196" textAnchor="middle" className="ct-cov__region">ORANGE COUNTY</text>

      {/* route + travelling highlight */}
      <path d={ROUTE} fill="none" stroke="url(#ct-cov-route)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" strokeDasharray="1 5" />
      <path d={ROUTE} pathLength={100} className="ct-cov__pulse" fill="none" stroke="#1fcf85" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

      {/* one node per service-area page */}
      {nodes.map((n) => (
        <circle key={n.slug} cx={n.at[0]} cy={n.at[1]} r={labelled.has(n.slug) ? 3.4 : 2.5} className={labelled.has(n.slug) ? 'ct-cov__node ct-cov__node--named' : 'ct-cov__node'} />
      ))}
      {LABELS.map((l) => {
        const at = COVERAGE_NODES[l.slug]
        const name = cities.find((c) => c.slug === l.slug)?.name
        if (!at || !name) return null
        return (
          <text key={l.slug} x={at[0] + l.dx} y={at[1] + l.dy} textAnchor={l.anchor ?? 'start'} className="ct-cov__label">{name}</text>
        )
      })}
    </svg>
  )
}

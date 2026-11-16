// components/CustodyVisuals.tsx
// Two original, server-rendered illustrations of the custody workflow. Both are
// explicitly labelled as examples — they never present sample data as live
// customer activity.
import Icon from '@/components/Icon'

const FLOW = [
  { icon: 'truck',   title: 'Collected at your site',        sub: 'Handoff recorded at pickup',                 doc: 'Pickup manifest' },
  { icon: 'scan',    title: 'Scope checked in',              sub: 'Counts compared with your request',          doc: 'Asset inventory*' },
  { icon: 'lock',    title: 'Data service, if selected',     sub: 'Sanitized or physically destroyed',          doc: 'Cert. of Data Destruction*' },
  { icon: 'recycle', title: 'Reuse or material recovery',    sub: 'Routed to downstream processors',            doc: 'Cert. of Recycling*' },
]

/** Vertical "manifest" rail — used as the Business Pickup hero illustration. */
export function CustodyManifest({ caption = true }: { caption?: boolean }) {
  return (
    <figure>
      <div className="ct-manifest" role="img" aria-label="Example workflow: equipment is collected at your site, checked in against your request, sanitized or destroyed if you selected a data service, then routed to reuse or material recovery. Documents marked with an asterisk depend on the service scope.">
        <div className="ct-manifest__bar" aria-hidden="true">
          <span>Example workflow</span>
          <b>Illustrative · not live data</b>
        </div>
        <ul className="ct-manifest__inputs" aria-hidden="true">
          <li><Icon name="laptop" size={15} /> Laptops</li>
          <li><Icon name="server" size={15} /> Servers</li>
          <li><Icon name="monitor" size={15} /> Monitors</li>
          <li><Icon name="network" size={15} /> Network gear</li>
        </ul>
        <ol className="ct-manifest__flow" aria-hidden="true">
          {FLOW.map((s) => (
            <li key={s.title}>
              <span className="ct-manifest__node"><Icon name={s.icon} size={20} /></span>
              <span>
                <span className="ct-manifest__title" style={{ display: 'block' }}>{s.title}</span>
                <span className="ct-manifest__sub" style={{ display: 'block' }}>{s.sub}</span>
              </span>
              <span className="ct-manifest__doc"><Icon name="doc" size={12} /> {s.doc}</span>
            </li>
          ))}
        </ol>
      </div>
      {caption && (
        <figcaption className="ct-art-caption">* Depends on the service you select and the equipment processed.</figcaption>
      )}
    </figure>
  )
}

const STATIONS = [
  { x: 260, y: 62,  icon: 'truck',   label: 'Collect' },
  { x: 458, y: 260, icon: 'lock',    label: 'Protect data' },
  { x: 260, y: 458, icon: 'recycle', label: 'Recover' },
  { x: 62,  y: 260, icon: 'doc',     label: 'Document' },
]

const ICON_PATHS: Record<string, string[]> = {
  truck: ['M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7', 'M5.200 17.500a1.800 1.800 0 1 0 3.600 0 1.800 1.800 0 0 0-3.600 0M15.200 17.500a1.800 1.800 0 1 0 3.600 0 1.800 1.800 0 0 0-3.600 0'],
  lock: ['M5 10.5h14v10H5zM8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2.5'],
  recycle: ['M20 12a8 8 0 0 1-13.7 5.6M4 12a8 8 0 0 1 13.7-5.6', 'M17.5 2.5v4h-4M6.5 21.5v-4h4'],
  doc: ['M6 3h8l4 4v14H6z', 'M14 3v4h4M9 12h6M9 16h6'],
}

/**
 * Circular custody loop — the homepage hero illustration. The side labels sit
 * under their stations (not beside them) so the drawing stays compact and its
 * text stays readable on phones; label text carries an ink halo so it reads
 * cleanly where the loop overlaps the warehouse photo.
 */
export function CustodyLoop() {
  return (
    <svg
      className="ct-loop"
      viewBox="-8 0 536 540"
      role="img"
      aria-label="Chain-of-custody loop: collect at your site, protect data if that service is selected, recover materials through reuse or recycling, and document according to your project scope."
    >
      <defs>
        <linearGradient id="ct-loop-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1fcf85" />
          <stop offset="1" stopColor="#3b7bff" />
        </linearGradient>
      </defs>
      {/* technical rings */}
      <circle cx="260" cy="260" r="246" fill="none" stroke="rgba(255,255,255,.06)" />
      <g className="ct-loop__spin">
        <circle cx="260" cy="260" r="224" fill="none" stroke="rgba(255,255,255,.14)" strokeDasharray="2 10" />
      </g>
      <circle cx="260" cy="260" r="198" fill="none" stroke="url(#ct-loop-g)" strokeWidth="2.500" strokeDasharray="250 61" strokeDashoffset="-48" strokeLinecap="round" />
      <circle cx="260" cy="260" r="128" fill="rgba(10,18,32,.55)" stroke="rgba(255,255,255,.08)" />
      {/* travelling pulse */}
      <g className="ct-loop__pulse">
        <circle cx="260" cy="62" r="5" fill="#fff" />
        <circle cx="260" cy="62" r="11" fill="none" stroke="rgba(31,207,133,.5)" />
      </g>
      {/* centre */}
      <text x="260" y="238" textAnchor="middle" fill="#a9b8cb" fontSize="13" letterSpacing="2.400" style={{ fontFamily: 'var(--ct-mono)' }}>EXAMPLE WORKFLOW</text>
      <text x="260" y="274" textAnchor="middle" fill="#fff" fontSize="30" fontWeight="800" letterSpacing="-0.600">Chain of custody</text>
      <text x="260" y="302" textAnchor="middle" fill="#a9b8cb" fontSize="15">pickup → processing → paperwork</text>
      {/* stations */}
      {STATIONS.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="35" fill="#0f1a2c" stroke="rgba(255,255,255,.2)" />
          <g transform={`translate(${s.x - 13} ${s.y - 13}) scale(1.080)`} fill="none" stroke={s.icon === 'lock' || s.icon === 'doc' ? '#9cc0ff' : '#1fcf85'} strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round">
            {ICON_PATHS[s.icon].map((d) => <path key={d} d={d} />)}
          </g>
        </g>
      ))}
      {/* labels */}
      <g className="ct-loop__labels" fill="#fff" fontSize="20" fontWeight="700">
        <text x="310" y="50">Collect</text>
        <text x="310" y="72" fill="#b6c3d4" fontSize="16" fontWeight="500">at your site</text>
        <text x="458" y="322" textAnchor="middle">Protect data</text>
        <text x="458" y="343" textAnchor="middle" fill="#b6c3d4" fontSize="16" fontWeight="500">if selected</text>
        <text x="212" y="478" textAnchor="end">Recover</text>
        <text x="212" y="499" textAnchor="end" fill="#b6c3d4" fontSize="16" fontWeight="500">reuse or recycle</text>
        <text x="62" y="322" textAnchor="middle">Document</text>
        <text x="62" y="343" textAnchor="middle" fill="#b6c3d4" fontSize="16" fontWeight="500">per your scope</text>
      </g>
    </svg>
  )
}

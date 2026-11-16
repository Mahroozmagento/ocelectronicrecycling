// components/CustodyVisuals.tsx
// An original, server-rendered illustration of the custody workflow. It is
// explicitly labelled as an example — it never presents sample data as live
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

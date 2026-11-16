// components/Breadcrumbs.tsx — visible breadcrumb trail (schema is emitted by
// the page with breadcrumbNode() from the same array).
import Link from 'next/link'
import type { Crumb } from '@/lib/schema'

export default function Breadcrumbs({ crumbs, tone = 'dark' }: { crumbs: Crumb[]; tone?: 'dark' | 'light' }) {
  return (
    <nav className={`ct-crumbs ct-crumbs--${tone}`} aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <li key={c.path}>
              {last ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

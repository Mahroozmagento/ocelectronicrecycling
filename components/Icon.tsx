// components/Icon.tsx
// Small inline SVG icon set (server component, no icon package). Icons are
// decorative by default; pass `title` when an icon carries meaning on its own.
import type { ReactNode } from 'react'

const PATHS: Record<string, ReactNode> = {
  desktop: (<><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M9 20h6M12 16v4" /></>),
  laptop: (<><rect x="5" y="5" width="14" height="10" rx="1.5" /><path d="M2.5 19h19" /></>),
  server: (<><rect x="4" y="3.5" width="16" height="7" rx="1.5" /><rect x="4" y="13.5" width="16" height="7" rx="1.5" /><path d="M7.5 7h.01M7.5 17h.01M11 7h5M11 17h5" /></>),
  network: (<><rect x="9" y="3" width="6" height="5" rx="1" /><rect x="3" y="16" width="6" height="5" rx="1" /><rect x="15" y="16" width="6" height="5" rx="1" /><path d="M12 8v4M6 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" /></>),
  monitor: (<><rect x="3" y="4" width="18" height="13" rx="1.5" /><path d="M8 21h8" /></>),
  mobile: (<><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18h2" /></>),
  printer: (<><path d="M7 8V3.5h10V8" /><rect x="3.5" y="8" width="17" height="9" rx="1.5" /><rect x="7" y="14" width="10" height="6.5" rx="1" /></>),
  tv: (<><rect x="2.5" y="5" width="19" height="12" rx="1.5" /><path d="M8 21l1.5-4M16 21l-1.5-4" /></>),
  drive: (<><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="10" r="3.5" /><path d="M8 17.5h.01M12 10h.01" /></>),
  box: (<><path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z" /><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" /></>),
  truck: (<><path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>),
  shield: (<><path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6z" /><path d="m9 12 2.2 2.2L15.2 10" /></>),
  lock: (<><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2.5" /></>),
  recycle: (<><path d="M20 12a8 8 0 0 1-13.7 5.6M4 12a8 8 0 0 1 13.7-5.6" /><path d="M17.5 2.5v4h-4M6.5 21.5v-4h4" /></>),
  doc: (<><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>),
  check: (<path d="m5 12.5 4.5 4.5L19 7.5" />),
  arrow: (<path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />),
  phone: (<path d="M5 3.5h3.5l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4.5 1.5V19a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.700A2 2 0 0 1 5 3.5z" />),
  pin: (<><path d="M12 21.5s7-6.2 7-11.500a7 7 0 0 0-14 0c0 5.300 7 11.500 7 11.500z" /><circle cx="12" cy="10" r="2.500" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5.200l3.300 2" /></>),
  plus: (<path d="M12 5v14M5 12h14" />),
  minus: (<path d="M5 12h14" />),
  info: (<><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.500h.010" /></>),
  alert: (<><path d="M12 3.500 2.500 20h19z" /><path d="M12 10v4.500M12 17.200h.010" /></>),
  camera: (<><path d="M3.500 8h3.500l1.500-2.500h7L17 8h3.500v11.500h-17z" /><circle cx="12" cy="13.500" r="3.500" /></>),
  x: (<path d="M6 6l12 12M18 6 6 18" />),
  menu: (<path d="M4 7h16M4 12h16M4 17h16" />),
  layers: (<><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>),
  scan: (<><path d="M4 8V5.500A1.500 1.500 0 0 1 5.500 4H8M16 4h2.500A1.500 1.500 0 0 1 20 5.500V8M20 16v2.500a1.500 1.500 0 0 1-1.500 1.500H16M8 20H5.500A1.500 1.500 0 0 1 4 18.500V16" /><path d="M8 9v6M11 9v6M14 9v6M17 9v6" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.500 7 8.500 6 8.500-6" /></>),
  building: (<><path d="M5 21V4.500h9V21M14 9h5v12M3 21h18" /><path d="M8 8h3M8 12h3M8 16h3" /></>),
  chevron: (<path d="m9 5.500 6.500 6.500L9 18.500" />),
  search: (<><circle cx="11" cy="11" r="6.500" /><path d="m16 16 4.500 4.500" /></>),
  book: (<><path d="M4 4.500h6.500a2 2 0 0 1 2 2V20a2 2 0 0 0-2-1.500H4zM20 4.500h-5.500a2 2 0 0 0-2 2V20a2 2 0 0 1 2-1.500H20z" /></>),
  external: (<><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>),
}

export type IconName = keyof typeof PATHS

export default function Icon({
  name,
  size = 20,
  title,
  className,
}: {
  name: string
  size?: number
  title?: string
  className?: string
}) {
  const path = PATHS[name] ?? PATHS.box
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {path}
    </svg>
  )
}

/** Brand mark: an open ring (circular recovery) with a custody node. */
export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="#0f1a2c" />
      <path d="M23.500 16a7.500 7.500 0 1 1-3.100-6.070" stroke="#1fcf85" strokeWidth="2.600" strokeLinecap="round" />
      <path d="M20.700 5.700v4.400h-4.400" stroke="#1fcf85" strokeWidth="2.600" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23.500" cy="16" r="2.300" fill="#3b7bff" />
    </svg>
  )
}

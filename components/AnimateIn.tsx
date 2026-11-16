// components/AnimateIn.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Lightweight entrance helpers. These used to depend on a JavaScript animation
// library and rendered content at opacity:0 until hydration. They are now plain
// server components with a short CSS-only entrance (see `.ct-in` in
// app/styles/ct-core.css), so content is always present and visible in the HTML,
// nothing waits on JavaScript, and `prefers-reduced-motion` is respected.
//
// The props are unchanged so existing pages keep working.
// ─────────────────────────────────────────────────────────────────────────────
import { Children } from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale' | 'fade'

interface Props {
  children: React.ReactNode
  from?: Direction
  delay?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
  once?: boolean
}

export default function AnimateIn({ children, delay = 0, className, style }: Props) {
  return (
    <div
      className={`ct-in${className ? ` ${className}` : ''}`}
      style={{ ...style, animationDelay: delay ? `${Math.min(delay, 0.4)}s` : undefined }}
    >
      {children}
    </div>
  )
}

interface StaggerProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  stagger?: number
  from?: Direction
}

/** Lays out children in the given grid; each child keeps its own wrapper. */
export function StaggerGroup({ children, className, style }: StaggerProps) {
  return (
    <div className={className} style={style}>
      {Children.map(children, (child, i) => (
        <div className="ct-in" style={{ animationDelay: `${Math.min(i * 0.05, 0.3)}s` }}>
          {child}
        </div>
      ))}
    </div>
  )
}

interface HeroProps {
  overline?: string
  overlineColor?: string
  title: string | React.ReactNode
  subtitle?: string
  children?: React.ReactNode
  bgImage?: string
}

/** Inner-page hero used by Services, How It Works, About-style pages. */
export function PageHero({ overline, overlineColor, title, subtitle, children, bgImage }: HeroProps) {
  return (
    <div
      className="svc-inner-hero"
      style={bgImage ? {
        backgroundImage: `linear-gradient(to right, rgba(7,8,15,0.78), rgba(7,8,15,0.5)), url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      } : undefined}
    >
      <div className="container ct-rise">
        {overline && (
          <span className="overline" style={overlineColor ? { color: overlineColor } : {}}>
            {overline}
          </span>
        )}
        <h1 style={{
          fontFamily: 'var(--font-head)',
          fontSize: 'clamp(2rem,5vw,4rem)',
          fontWeight: 900,
          letterSpacing: '-.03em',
          marginTop: overline ? '10px' : 0,
          lineHeight: 1.05,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: '#c3cfdd', fontSize: '1rem', marginTop: '16px', maxWidth: '560px', lineHeight: 1.7 }}>
            {subtitle}
          </p>
        )}
        {children && <div>{children}</div>}
      </div>
    </div>
  )
}

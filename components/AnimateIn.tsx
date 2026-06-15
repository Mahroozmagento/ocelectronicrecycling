'use client'
// components/AnimateIn.tsx
// ─────────────────────────────────────────────────────────────
// Reusable entrance animation wrapper using Framer Motion
// Usage:
//   <AnimateIn>  ← fade up (default)
//   <AnimateIn from="left">
//   <AnimateIn from="right">
//   <AnimateIn from="scale">
//   <AnimateIn delay={0.2}>  ← stagger with delay
//
// Wrap ANY element or section — it will animate in when
// it enters the viewport.
// ─────────────────────────────────────────────────────────────
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale' | 'fade'

interface Props {
  children: React.ReactNode
  from?:     Direction
  delay?:    number
  duration?: number
  className?: string
  style?:    React.CSSProperties
  once?:     boolean   // animate only first time (default: true)
}

function getVariants(from: Direction) {
  const base = { opacity: 0 }
  const variants = {
    up:    { hidden: { ...base, y: 32  }, visible: { opacity: 1, y: 0 } },
    left:  { hidden: { ...base, x: -32 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { ...base, x: 32  }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { ...base, scale: .88 }, visible: { opacity: 1, scale: 1 } },
    fade:  { hidden: { opacity: 0 },         visible: { opacity: 1 } },
  }
  return variants[from]
}

export default function AnimateIn({
  children,
  from     = 'up',
  delay    = 0,
  duration = 0.6,
  className,
  style,
  once     = true,
}: Props) {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once, margin: '-60px' })
  const variants = getVariants(from)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1], // cubic-bezier — snappy premium feel
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// StaggerGroup — animates children one by one with delay
// Usage:
//   <StaggerGroup>
//     <div>Card 1</div>
//     <div>Card 2</div>
//     <div>Card 3</div>
//   </StaggerGroup>
// ─────────────────────────────────────────────────────────────
interface StaggerProps {
  children:  React.ReactNode
  className?: string
  style?:    React.CSSProperties
  stagger?:  number  // delay between each child (default: 0.08s)
  from?:     Direction
}

export function StaggerGroup({
  children,
  className,
  style,
  stagger = 0.08,
  from    = 'up',
}: StaggerProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const variants = getVariants(from)

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: stagger } },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
      style={style}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={variants}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// PageHero — special entrance for page hero titles
// Animates the overline, h1, and paragraph in sequence
// Usage:
//   <PageHero
//     overline="What We Do"
//     title="Complete Electronics Lifecycle Services"
//     subtitle="From a single laptop to a full data center..."
//   />
// ─────────────────────────────────────────────────────────────
interface HeroProps {
  overline?: string
  overlineColor?: string
  title:     string | React.ReactNode
  subtitle?: string
  children?: React.ReactNode  // extra content below (badges, buttons, etc.)
  bgImage?: string;
}

export function PageHero({
  overline,
  overlineColor,
  title,
  subtitle,
  children,
  bgImage,
}: HeroProps) {
  return (
    <div 
      className="svc-inner-hero"
      style={bgImage ? {
        backgroundImage: `linear-gradient(to right, rgba(7,8,15,0.6), rgba(7,8,15,0.35)), url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      } : undefined}
    >
      <div className="container">
        {overline && (
          <AnimateIn from="fade" delay={0} duration={0.5}>
            <span className="overline" style={overlineColor ? { color: overlineColor } : {}}>
              {overline}
            </span>
          </AnimateIn>
        )}
        <AnimateIn from="up" delay={0.1} duration={0.7}>
          <h1 style={{
            fontFamily: 'var(--font-head)',
            fontSize:   'clamp(2rem,5vw,4rem)',
            fontWeight: 900,
            letterSpacing: '-.03em',
            marginTop: overline ? '10px' : 0,
            lineHeight: 1.05,
          }}>
            {title}
          </h1>
        </AnimateIn>
        {subtitle && (
          <AnimateIn from="up" delay={0.22} duration={0.65}>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', marginTop: '16px', maxWidth: '520px', lineHeight: 1.7 }}>
              {subtitle}
            </p>
          </AnimateIn>
        )}
        {children && (
          <AnimateIn from="up" delay={0.34} duration={0.6}>
            {children}
          </AnimateIn>
        )}
      </div>
    </div>
  )
}

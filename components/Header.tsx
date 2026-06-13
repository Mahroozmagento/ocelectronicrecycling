// components/Header.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Resources',    href: '/resources' },
  { label: 'Blog',         href: '/blog' },
  { label: 'About',        href: '/about' },
  { label: 'Contact',      href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      {/* Preheader */}
      <div className="preheader">
        🌿 Orange County&apos;s #1 Certified E-Waste Recycler &amp; ITAD Provider
        &nbsp;|&nbsp; Call Now:&nbsp;
        <a href="tel:9493450285">(949) 345-0285</a>
      </div>

      {/* Main header */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="logo">
          <div className="logo-icon">♻</div>
          OC Electronic<span>&nbsp;Recycling</span>
        </Link>

        <nav className="main-nav">
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href}
              className={`nav-link${pathname === href ? ' is-active' : ''}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="hdr-cta">
          <a href="tel:9493450285" className="hdr-phone">☎ (949) 345-0285</a>
          <Link href="/contact" className="btn-primary">Get a Quote</Link>
          <button className="hamburger" onClick={() => setOpen(true)}
            aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <nav className="mobile-nav open">
          <button className="mobile-nav-close" onClick={() => setOpen(false)}>✕</button>
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} className="nav-link"
              onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <div className="mobile-phone-big">☎ (949) 345-0285</div>
        </nav>
      )}

      {/* Mobile bottom nav */}
      <nav className="mobile-bottom-nav">
        <div className="mbn-inner">
          {[
            { icon: '🏠', label: 'Home',      href: '/' },
            { icon: '⚙️', label: 'Services',  href: '/services', dot: true },
            { icon: '📚', label: 'Resources', href: '/resources' },
            { icon: '📝', label: 'Blog',      href: '/blog' },
            { icon: '📞', label: 'Contact',   href: '/contact' },
          ].map(({ icon, label, href, dot }) => (
            <Link key={href} href={href}
              className={`mbn-item${pathname === href ? ' is-active' : ''}`}>
              <div className="mbn-icon">{icon}</div>
              <span>{label}</span>
              {dot && <span className="mbn-dot" />}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}

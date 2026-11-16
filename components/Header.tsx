// components/Header.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon, { BrandMark } from '@/components/Icon'
import { HOURS, PHONE_DISPLAY, PHONE_HREF, PRIMARY_NAV, SERVICE_AREA } from '@/lib/site'

function isCurrent(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const pickupHref = pathname === '/business-pickup' ? '#request' : '/business-pickup'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change. Intentional state reset on navigation.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(false) }, [pathname])

  // Modal behaviour for the mobile menu: focus management, Escape, scroll lock
  // and a simple focus trap so keyboard users cannot tab behind the panel.
  useEffect(() => {
    if (!open) return
    const menuBtn = menuBtnRef.current
    closeBtnRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      menuBtn?.focus()
    }
  }, [open])

  return (
    <>
      <a href="#main" className="ct-skip">Skip to main content</a>

      <div className="ct-topbar">
        <div className="ct-wrap ct-topbar__in">
          <span className="ct-topbar__area">
            <Icon name="pin" size={14} />
            Serving businesses across {SERVICE_AREA}
          </span>
          <span className="ct-topbar__hours">
            {HOURS} · <a href={PHONE_HREF} data-cta-location="topbar">{PHONE_DISPLAY}</a>
          </span>
        </div>
      </div>

      <header className={`ct-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="ct-wrap ct-header__in">
          <Link href="/" className="ct-logo" aria-label="OC Electronic Recycling — home">
            <BrandMark size={34} />
            <b>OC Electronic<span>&nbsp;Recycling</span></b>
          </Link>

          <nav className="ct-nav" aria-label="Primary">
            {PRIMARY_NAV.map(({ label, href }) => (
              <Link key={href} href={href} aria-current={isCurrent(pathname, href) ? 'page' : undefined}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="ct-header__cta">
            <a href={PHONE_HREF} className="ct-header__phone" data-cta-location="header" aria-label={`Call ${PHONE_DISPLAY}`}>
              <Icon name="phone" size={18} />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <Link href={pickupHref} className="ct-btn ct-btn--primary ct-btn--sm" data-cta-location="header">
              Request Pickup
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              className="ct-menu-btn"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div ref={panelRef} id="mobile-menu" className="ct-mobile" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="ct-mobile__top">
            <Link href="/" className="ct-logo" onClick={() => setOpen(false)} aria-label="OC Electronic Recycling — home">
              <BrandMark size={34} />
              <b>OC Electronic<span>&nbsp;Recycling</span></b>
            </Link>
            <button ref={closeBtnRef} type="button" className="ct-menu-btn" style={{ display: 'inline-flex' }} aria-label="Close menu" onClick={() => setOpen(false)}>
              <Icon name="x" size={22} />
            </button>
          </div>
          <nav className="ct-mobile__nav" aria-label="Primary">
            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} onClick={() => setOpen(false)}>
              Home <Icon name="chevron" size={18} />
            </Link>
            {PRIMARY_NAV.map(({ label, href }) => (
              <Link key={href} href={href} aria-current={isCurrent(pathname, href) ? 'page' : undefined} onClick={() => setOpen(false)}>
                {label} <Icon name="chevron" size={18} />
              </Link>
            ))}
          </nav>
          <div className="ct-mobile__foot">
            <Link href={pickupHref} className="ct-btn ct-btn--primary ct-btn--lg" data-cta-location="mobile_menu" onClick={() => setOpen(false)}>
              Request a Business Pickup
            </Link>
            <a href={PHONE_HREF} className="ct-btn ct-btn--ghost ct-btn--lg" data-cta-location="mobile_menu">
              <Icon name="phone" size={18} /> Call {PHONE_DISPLAY}
            </a>
            <p>{HOURS}. Serving {SERVICE_AREA}.</p>
          </div>
        </div>
      )}

      {/* Mobile action bar: the two primary next steps, always within reach */}
      <div className="ct-actionbar">
        <a href={PHONE_HREF} className="ct-btn ct-btn--ghost" data-cta-location="action_bar" aria-label={`Call ${PHONE_DISPLAY}`}>
          <Icon name="phone" size={18} /> Call
        </a>
        <Link href={pickupHref} className="ct-btn ct-btn--primary" data-cta-location="action_bar">
          Request a Business Pickup
        </Link>
      </div>
    </>
  )
}

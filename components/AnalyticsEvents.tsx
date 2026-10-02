'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'
import { captureUTM } from '@/lib/utm'

// Derive a coarse, non-identifying "page type" from the path for event context.
function pageType(path: string): string {
  if (path === '/') return 'home'
  if (path === '/contact') return 'contact'
  if (path === '/services') return 'services_index'
  if (path.startsWith('/services/')) return 'service_detail'
  if (path.startsWith('/e-waste-recycling/')) return 'city'
  if (path.startsWith('/blog/')) return 'blog_post'
  if (path === '/blog') return 'blog_index'
  if (path === '/service-areas') return 'service_areas'
  return path.replace(/^\//, '') || 'other'
}

export default function AnalyticsEvents() {
  const pathname = usePathname()

  // First-touch UTM capture — first-party, functional (used only for the lead
  // email), not gated by analytics consent.
  useEffect(() => {
    captureUTM()
  }, [])

  // service_page_viewed: /services and /services/*
  useEffect(() => {
    if (pathname === '/services' || pathname.startsWith('/services/')) {
      trackEvent('service_page_viewed', { page_path: pathname })
    }
  }, [pathname])

  // Delegated click listeners. Privacy-safe: we send a coarse CTA location and
  // page type only — never the phone number, form values, or any PII.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const path = window.location.pathname
      const type = pageType(path)

      // phone_click — click-to-call. Do NOT transmit the phone number itself.
      const phoneLink = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null
      if (phoneLink) {
        trackEvent('phone_click', {
          page_type: type,
          cta_location: phoneLink.dataset.ctaLocation || 'inline',
        })
        return
      }

      // quote_cta_click — any CTA that routes to the contact/quote page.
      const quoteCta = target.closest('a[href="/contact"], a[href^="/contact?"]') as HTMLAnchorElement | null
      if (quoteCta) {
        trackEvent('quote_cta_click', {
          page_type: type,
          cta_location: quoteCta.dataset.ctaLocation || (quoteCta.textContent || '').trim().slice(0, 40),
        })
        return
      }

      // chat widget launcher (third-party widget)
      const chatLauncher = target.closest('button[aria-label="Chat with us"]')
      if (chatLauncher) {
        trackEvent('chat_widget_opened', { page_type: type })
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}

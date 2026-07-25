'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'
import { captureUTM } from '@/lib/utm'

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

  // Delegated click listeners so every tel: link and the chat widget launcher
  // are covered without instrumenting each one individually.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const phoneLink = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null
      if (phoneLink) {
        trackEvent('phone_number_clicked', {
          phone_number: phoneLink.getAttribute('href'),
          page_path: window.location.pathname,
        })
        return
      }

      const chatLauncher = target.closest('button[aria-label="Chat with us"]')
      if (chatLauncher) {
        trackEvent('chat_widget_opened', { page_path: window.location.pathname })
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}

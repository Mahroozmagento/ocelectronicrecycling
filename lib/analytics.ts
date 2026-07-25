import { sendGAEvent } from '@next/third-parties/google'
import { getConsent } from '@/lib/consent'

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (getConsent() !== 'accepted') return
  sendGAEvent('event', event, params)
}

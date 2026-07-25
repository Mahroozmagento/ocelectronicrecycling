export type ConsentStatus = 'accepted' | 'declined'

const STORAGE_KEY = 'ocer_consent'
const CHANGE_EVENT = 'ocer-consent-change'

export function getConsent(): ConsentStatus | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'accepted' || value === 'declined' ? value : null
}

export function setConsent(status: ConsentStatus) {
  window.localStorage.setItem(STORAGE_KEY, status)
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: status }))
}

export function onConsentChange(handler: (status: ConsentStatus) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<ConsentStatus>).detail)
  window.addEventListener(CHANGE_EVENT, listener)
  return () => window.removeEventListener(CHANGE_EVENT, listener)
}

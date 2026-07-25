const STORAGE_KEY = 'ocer_utm'
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000 // 30 days, first-touch attribution window

export type UTMData = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  capturedAt: number
}

// First-touch: only stores UTM params if none are already saved (or the saved ones expired).
export function captureUTM() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const utm_source = params.get('utm_source') || undefined
  const utm_medium = params.get('utm_medium') || undefined
  const utm_campaign = params.get('utm_campaign') || undefined
  if (!utm_source && !utm_medium && !utm_campaign) return

  const existing = getStoredUTM()
  if (existing) return // first touch already recorded and still valid

  const data: UTMData = { utm_source, utm_medium, utm_campaign, capturedAt: Date.now() }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getStoredUTM(): UTMData | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    const data: UTMData = JSON.parse(raw)
    if (Date.now() - data.capturedAt > MAX_AGE_MS) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

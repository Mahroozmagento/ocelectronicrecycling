'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getConsent, setConsent } from '@/lib/consent'

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getConsent() === null)
  }, [])

  if (!visible) return null

  const choose = (status: 'accepted' | 'declined') => {
    setConsent(status)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 500,
        background: 'var(--navy)',
        borderTop: '1px solid rgba(255,255,255,.08)',
        boxShadow: '0 -8px 30px rgba(0,0,0,.35)',
        padding: '18px 20px',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <p style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.6, margin: 0, maxWidth: '640px' }}>
          We use cookies for analytics (Google Analytics, Microsoft Clarity) to understand how visitors use this
          site. We only turn these on if you accept — see our{' '}
          <Link href="/privacy-policy" style={{ color: 'var(--green)' }}>
            Privacy Policy
          </Link>{' '}
          for details.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={() => choose('declined')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,.2)',
              color: 'var(--muted)',
              borderRadius: '8px',
              padding: '10px 18px',
              fontFamily: 'var(--font-head)',
              fontWeight: 700,
              fontSize: '.82rem',
              cursor: 'pointer',
            }}
          >
            Decline
          </button>
          <button
            onClick={() => choose('accepted')}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '.82rem' }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

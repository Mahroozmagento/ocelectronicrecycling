'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getConsent, onConsentChange } from '@/lib/consent'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

export default function AnalyticsScripts() {
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    setAccepted(getConsent() === 'accepted')
    return onConsentChange((status) => setAccepted(status === 'accepted'))
  }, [])

  if (!accepted) return null

  return (
    <>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {CLARITY_ID && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      )}
    </>
  )
}

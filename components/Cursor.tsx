// components/Cursor.tsx
// Custom cursor + mouse glow — must be 'use client' (browser-only)
'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring || !glow) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
      glow.style.left = mx + 'px'
      glow.style.top  = my + 'px'
    }

    const animRing = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(animRing)
    }
    raf = requestAnimationFrame(animRing)

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a,button,.svc-card,.blog-card,.testi-card,.resource-card,.scroll-step,.faq-q,.mbn-item'
      )
      if (el) {
        ring.style.width  = '54px'
        ring.style.height = '54px'
        ring.style.borderColor = '#00e676'
      } else {
        ring.style.width  = '36px'
        ring.style.height = '36px'
        ring.style.borderColor = 'rgba(0,230,118,.5)'
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  id="cur-dot"  />
      <div ref={ringRef} id="cur-ring" />
      <div ref={glowRef} id="cur-glow" />
    </>
  )
}

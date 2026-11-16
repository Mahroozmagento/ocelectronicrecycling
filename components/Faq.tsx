// components/Faq.tsx
// Server-rendered FAQ built on native <details>, so it works without
// JavaScript and is keyboard accessible by default. Pair with faqNode() from
// lib/schema using the SAME array so visible text and FAQPage schema match.
import type { Faq } from '@/lib/schema'

export default function FaqList({ faqs, id }: { faqs: Faq[]; id?: string }) {
  return (
    <div className="ct-faq" id={id}>
      {faqs.map((f) => (
        <details key={f.q} className="ct-faq__item">
          <summary className="ct-faq__q">
            <span>{f.q}</span>
            <span className="ct-faq__mark" aria-hidden="true" />
          </summary>
          <p className="ct-faq__a">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

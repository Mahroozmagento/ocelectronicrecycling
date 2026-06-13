'use client'

export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="faq-section">
      <h2 style={{fontFamily:'var(--font-head)',fontWeight:800,marginBottom:'20px',color:'var(--navy)'}}>Frequently Asked Questions</h2>
      {faqs.map(({ q, a }) => (
        <div key={q} className="faq-item">
          <div className="faq-q" onClick={(e) => {
            const ans = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement
            const icon = (e.currentTarget as HTMLElement).querySelector('.faq-icon') as HTMLElement
            const isOpen = ans.classList.contains('open')
            document.querySelectorAll('.faq-a').forEach(el => el.classList.remove('open'))
            document.querySelectorAll('.faq-icon').forEach(el => { (el as HTMLElement).textContent = '+' })
            if (!isOpen) { ans.classList.add('open'); if(icon) icon.textContent = '−' }
          }}>
            {q}<span className="faq-icon">+</span>
          </div>
          <div className="faq-a"><p>{a}</p></div>
        </div>
      ))}
    </div>
  )
}
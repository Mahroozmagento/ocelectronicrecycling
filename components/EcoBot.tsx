'use client'
import { useState } from 'react'

type Msg = { role: 'bot' | 'user'; text: string }

function reply(msg: string): string {
  const m = msg.toLowerCase()

  if (/^(hi|hello|hey|good morning|good afternoon)/.test(m))
    return "Hi there! 👋 I'm EcoBot, your OC Electronic Recycling assistant. How can I help you today?"
  if (/irvine/.test(m)) return "Yes! We serve Irvine. Call (949) 345-0285 to schedule a pickup!"
  if (/anaheim/.test(m)) return "Yes! We serve Anaheim. Call (949) 345-0285!"
  if (/santa ana/.test(m)) return "Yes! We serve Santa Ana. Call (949) 345-0285!"
  if (/huntington beach/.test(m)) return "Yes! We serve Huntington Beach. Call (949) 345-0285!"
  if (/newport beach/.test(m)) return "Yes! We serve Newport Beach. Call (949) 345-0285!"
  if (/costa mesa/.test(m)) return "Yes! We serve Costa Mesa. Call (949) 345-0285!"
  if (/fullerton/.test(m)) return "Yes! We serve Fullerton. Call (949) 345-0285!"
  if (/garden grove/.test(m)) return "Yes! We serve Garden Grove. Call (949) 345-0285!"
  if (/mission viejo/.test(m)) return "Yes! We serve Mission Viejo. Call (949) 345-0285!"
  if (/lake forest/.test(m)) return "Yes! We serve Lake Forest. Call (949) 345-0285!"
  if (/aliso viejo/.test(m)) return "Yes! We serve Aliso Viejo. Call (949) 345-0285!"
  if (/laguna niguel/.test(m)) return "Yes! We serve Laguna Niguel. Call (949) 345-0285!"
  if (/laguna beach/.test(m)) return "Yes! We serve Laguna Beach. Call (949) 345-0285!"
  if (/laguna hills/.test(m)) return "Yes! We serve Laguna Hills. Call (949) 345-0285!"
  if (/laguna woods/.test(m)) return "Yes! We serve Laguna Woods. Call (949) 345-0285!"
  if (/tustin/.test(m)) return "Yes! We serve Tustin. Call (949) 345-0285!"
  if (/yorba linda/.test(m)) return "Yes! We serve Yorba Linda. Call (949) 345-0285!"
  if (/placentia/.test(m)) return "Yes! We serve Placentia. Call (949) 345-0285!"
  if (/brea/.test(m)) return "Yes! We serve Brea. Call (949) 345-0285!"
  if (/buena park/.test(m)) return "Yes! We serve Buena Park. Call (949) 345-0285!"
  if (/cypress/.test(m)) return "Yes! We serve Cypress. Call (949) 345-0285!"
  if (/la habra/.test(m)) return "Yes! We serve La Habra. Call (949) 345-0285!"
  if (/seal beach/.test(m)) return "Yes! We serve Seal Beach. Call (949) 345-0285!"
  if (/los alamitos/.test(m)) return "Yes! We serve Los Alamitos. Call (949) 345-0285!"
  if (/westminster/.test(m)) return "Yes! We serve Westminster. Call (949) 345-0285!"
  if (/fountain valley/.test(m)) return "Yes! We serve Fountain Valley. Call (949) 345-0285!"
  if (/stanton/.test(m)) return "Yes! We serve Stanton. Call (949) 345-0285!"
  if (/san clemente/.test(m)) return "Yes! We serve San Clemente. Call (949) 345-0285!"
  if (/san juan capistrano/.test(m)) return "Yes! We serve San Juan Capistrano. Call (949) 345-0285!"
  if (/dana point/.test(m)) return "Yes! We serve Dana Point. Call (949) 345-0285!"
  if (/rancho santa margarita/.test(m)) return "Yes! We serve Rancho Santa Margarita. Call (949) 345-0285!"
  if (/villa park/.test(m)) return "Yes! We serve Villa Park. Call (949) 345-0285!"
  if (/foothill ranch/.test(m)) return "Yes! We serve Foothill Ranch. Call (949) 345-0285!"
  if (/what cities|which cities|areas|where do you|do you serve|orange county/.test(m))
    return "We serve 34 cities across Orange County including Irvine, Anaheim, Santa Ana, Huntington Beach, Newport Beach, Costa Mesa and more! Call (949) 345-0285 to confirm your city."
  if (/data|destroy|wipe|shred|hard drive|nist|hipaa|dod/.test(m))
    return "We offer certified data destruction following NIST 800-88 standards. Certificate of destruction issued per device within 48 hours. Call (949) 345-0285!"
  if (/itad|asset|disposition|decommission|server/.test(m))
    return "Our ITAD service covers full inventory, certified data wipe, value recovery, and responsible disposal end-to-end. Call (949) 345-0285!"
  if (/pickup|pick up|pick-up|come to|collect|schedule/.test(m))
    return "We offer free business pickups throughout Orange County — often same week! Call (949) 345-0285 or use our contact form."
  if (/accept|take|recycle|laptop|computer|phone|tv|monitor|printer|tablet|what can/.test(m))
    return "We accept laptops, desktops, phones, tablets, servers, TVs, monitors, printers, cables, and most electronics. Call (949) 345-0285 if unsure!"
  if (/price|cost|quot|fee|free|charge|how much/.test(m))
   return "Free pickup for businesses with 5+ items! TVs and waste electronics are $50. Call (949) 345-0285 for a quote!"
  if (/certif|complian|r2|iso|licensed/.test(m))
    return "We are R2 certified and compliant with NIST 800-88, HIPAA, CA DTSC, and DOD standards. Certificates issued per device within 48 hours."
  if (/how does it work|process|steps|how do i|getting started/.test(m))
    return "Simple! 1) Schedule a pickup. 2) We collect your electronics. 3) Certified data destruction. 4) You receive certificates. Call (949) 345-0285!"
  if (/hours|open|when|time/.test(m))
    return "We're open Monday–Friday, 8:00 AM – 5:00 PM. Call (949) 345-0285 to schedule!"
  if (/phone|call|number|contact|reach|email/.test(m))
    return "Call us at (949) 345-0285 or email info@ocelectronicrecycling.com. We're happy to help!"
  if (/who are you|about|company/.test(m))
    return "OC Electronic Recycling is Orange County's trusted e-waste and certified data destruction provider serving 34 OC cities. Call (949) 345-0285!"
  if (/thank|thanks|great|awesome|perfect/.test(m))
    return "You're welcome! 😊 Call (949) 345-0285 anytime you need us!"

  return 'Great question! Call (949) 345-0285 or use our contact form. Happy to help!'
}

export default function EcoBot() {
  const [open, setOpen]   = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs]   = useState<Msg[]>([
    { role: 'bot', text: "Hi! I'm EcoBot 🌿 Ask me anything about e-waste, data destruction, or our services in Orange County!" }
  ])

  const send = () => {
    const text = input.trim()
    if (!text) return
    const next: Msg[] = [...msgs, { role: 'user', text }]
    setMsgs(next)
    setInput('')
    setTimeout(() => setMsgs(m => [...m, { role: 'bot', text: reply(text) }]), 650)
  }

  return (
    <>
      <button id="ecobot-btn" onClick={() => setOpen(o => !o)} aria-label="Open EcoBot">♻</button>

      {open && (
        <div id="ecobot-window" className="open">
          <div className="eco-head">
            <div className="eco-avatar">♻</div>
            <div>
              <div className="eco-name">EcoBot</div>
              <div className="eco-status">● Online</div>
            </div>
            <button className="eco-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="eco-messages">
            {msgs.map((m, i) => (
              <div key={i} className={`eco-msg ${m.role}`}>{m.text}</div>
            ))}
          </div>
          <div className="eco-input-row">
            <input
              className="eco-input"
              placeholder="Ask a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button className="eco-send" onClick={send}>→</button>
          </div>
        </div>
      )}
    </>
  )
}
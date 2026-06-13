// components/EcoBot.tsx
'use client'
import { useState } from 'react'

type Msg = { role: 'bot' | 'user'; text: string }

function reply(msg: string): string {
  const m = msg.toLowerCase()
  if (/price|cost|quot/.test(m))        return 'Call (949) 345-0285 for a free same-day quote!'
  if (/data|hard.?drive|shred/.test(m)) return 'We offer NIST 800-88 data destruction with certificates per device within 48hrs.'
  if (/pickup|pick.up/.test(m))         return 'Business pickups throughout OC — often same week! Call (949) 345-0285.'
  if (/itad/.test(m))                   return 'ITAD covers inventory, data wipe, value recovery, certified disposal. End-to-end.'
  if (/certif/.test(m))                 return 'Certificates of destruction issued per device within 48 hours.'
  if (/accept|what can/.test(m))        return 'We accept all electronics — laptops, desktops, phones, servers, TVs, cables, and more.'
  return 'Great question! Call (949) 345-0285 or use our contact form. Happy to help!'
}

export default function EcoBot() {
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState('')
  const [msgs, setMsgs]       = useState<Msg[]>([
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

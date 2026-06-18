import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: `You are EcoBot, the helpful assistant for OC Electronic Recycling — an e-waste recycling, certified data destruction, ITAD, and business electronics pickup service covering 34 cities in Orange County, California. Phone: (949) 345-0285. Website: www.ocelectronicrecycling.com. Be concise, friendly, and helpful. Keep replies under 3 sentences. Always encourage customers to call or use the contact form for quotes and pickups.`,
      messages: [{ role: 'user', content: message }]
    })
    const text = response.content[0].type === 'text' ? response.content[0].text : 'Please call (949) 345-0285 for help.'
    return NextResponse.json({ reply: text })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ reply: 'Sorry, something went wrong. Please call (949) 345-0285.' }, { status: 500 })
  }
}
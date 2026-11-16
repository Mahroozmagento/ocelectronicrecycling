import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OC Electronic Recycling',
    short_name: 'OC E-Recycling',
    description: 'Business electronics pickup, data destruction and IT asset disposition across Orange County and South Los Angeles.',
    start_url: '/',
    display: 'browser',
    background_color: '#0a1220',
    theme_color: '#0a1220',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  }
}

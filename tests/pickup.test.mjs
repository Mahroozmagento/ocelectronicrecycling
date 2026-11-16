// Unit tests for the business-pickup policy module (lib/pickup.ts).
// Run with: npm test   (Node 22+ strips TypeScript types natively)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  PICKUP_MINIMUM, TV_FEE, PHOTO_RULES, cleanQuantity, escapeHtml, estimatePickup, firstErrorStep,
  safePhotoName, sniffImageType, validatePickupRequest, zipArea,
} from '../lib/pickup.ts'

test('published policy numbers', () => {
  assert.equal(PICKUP_MINIMUM, 5)
  assert.equal(TV_FEE, 39)
  assert.equal(PHOTO_RULES.maxFiles, 5)
})

test('estimate: empty list asks for quantities and promises nothing', () => {
  const e = estimatePickup({})
  assert.equal(e.status, 'empty')
  assert.equal(e.totalCount, 0)
  assert.ok(!e.messages.join(' ').match(/confirmed|guarantee/i))
})

test('estimate: five qualifying items meets the minimum, with a nonbinding disclaimer', () => {
  const e = estimatePickup({ laptops: 3, monitors: 2 })
  assert.equal(e.status, 'meets')
  assert.equal(e.majorCount, 5)
  assert.equal(e.shortBy, 0)
  assert.equal(e.messages[0], 'Your request appears to meet the five-item pickup minimum.')
  assert.ok(e.messages.includes('Final eligibility, fees and timing will be confirmed by our team.'))
})

test('estimate: below the minimum mentions a possible fee and how many items are missing', () => {
  const e = estimatePickup({ desktops: 3 })
  assert.equal(e.status, 'below')
  assert.equal(e.shortBy, 2)
  assert.match(e.messages[0], /may require a pickup fee or additional qualifying equipment/)
  assert.match(e.messages[1], /2 more qualifying major items/)
})

test('estimate: televisions count as major items and carry $39 each', () => {
  const e = estimatePickup({ tvs: 4, servers: 1 })
  assert.equal(e.status, 'meets')
  assert.equal(e.tvCount, 4)
  assert.equal(e.tvFee, 156)
  assert.ok(e.messages.some((m) => m.includes('$39 per unit') && m.includes('4 × $39 = $156')))
})

test('estimate: loose drives and other equipment do not count toward the minimum', () => {
  const onlyReview = estimatePickup({ storage: 40, other: 3 })
  assert.equal(onlyReview.status, 'review')
  assert.equal(onlyReview.majorCount, 0)
  const mixed = estimatePickup({ laptops: 4, storage: 10 })
  assert.equal(mixed.status, 'below')
  assert.ok(mixed.messages.some((m) => m.includes('reviewed individually')))
})

test('cleanQuantity rejects junk and clamps large values', () => {
  assert.equal(cleanQuantity('-3'), 0)
  assert.equal(cleanQuantity('abc'), 0)
  assert.equal(cleanQuantity(2.9), 2)
  assert.equal(cleanQuantity(10_000_000), 9999)
})

test('ZIP guidance: Orange County, Los Angeles County (confirm) and outside', () => {
  assert.equal(zipArea('92618'), 'orange-county') // Irvine
  assert.equal(zipArea('92801'), 'orange-county') // Anaheim
  assert.equal(zipArea('90620'), 'orange-county') // Buena Park
  assert.equal(zipArea('92880'), 'outside') // Corona (Riverside County)
  assert.equal(zipArea('90044'), 'confirm') // South Los Angeles — confirmed case by case
  assert.equal(zipArea('94105'), 'outside')
  assert.equal(zipArea('9261'), 'invalid')
})

const VALID = {
  quantities: { laptops: 6 },
  fullName: 'Pat Example',
  company: 'Example Co',
  email: 'pat@example.com',
  phone: '(949) 555-0100',
  address: '100 Main Street',
  city: 'Irvine',
  zip: '92618',
  timeframe: 'Flexible',
  access: 'Loading dock available',
  dataService: 'destroy',
  documents: ['cod', 'bogus'],
  consent: true,
}

test('validation accepts a complete request and drops unknown options', () => {
  const r = validatePickupRequest(VALID)
  assert.equal(r.ok, true, JSON.stringify(r.errors))
  assert.deepEqual(r.value.documents, ['cod'])
})

test('validation: missing consent, bad email, bad ZIP and empty equipment are reported per field', () => {
  const r = validatePickupRequest({ ...VALID, quantities: {}, itemList: '', email: 'nope', zip: 'ABCDE', consent: false })
  assert.equal(r.ok, false)
  for (const f of ['quantities', 'email', 'zip', 'consent']) assert.ok(r.errors[f], `expected error for ${f}`)
  assert.equal(firstErrorStep(r.errors), 0)
})

test('validation: an item list alone is enough when no quantities are given', () => {
  const r = validatePickupRequest({ ...VALID, quantities: {}, itemList: 'Two 42U racks of servers' })
  assert.equal(r.ok, true)
})

test('validation strips control characters and caps length', () => {
  const r = validatePickupRequest({ ...VALID, notes: 'ok\u0000\u0007' + 'x'.repeat(5000) })
  assert.ok(!r.value.notes.includes('\u0000'))
  assert.ok(r.value.notes.length <= 2000)
})

test('image sniffing trusts magic bytes, not names', () => {
  const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0])
  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0])
  const webp = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50])
  const exe = new Uint8Array([0x4d, 0x5a, 0x90, 0, 3, 0, 0, 0, 4, 0, 0, 0])
  assert.equal(sniffImageType(jpeg), 'image/jpeg')
  assert.equal(sniffImageType(png), 'image/png')
  assert.equal(sniffImageType(webp), 'image/webp')
  assert.equal(sniffImageType(exe), null)
  assert.equal(safePhotoName(0, 'image/png'), 'equipment-photo-1.png')
})

test('escapeHtml neutralises markup in emails', () => {
  assert.equal(escapeHtml('<img src=x onerror="a">'), '&lt;img src=x onerror=&quot;a&quot;&gt;')
})

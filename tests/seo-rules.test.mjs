// Fixture tests for the regression detectors in scripts/seo-rules.mjs, so the
// guardrails themselves are proven to catch the defects they exist for.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findClaims, findJoinedWords, hasMojibake, visibleText } from '../scripts/seo-rules.mjs'

test('joined dynamic words are detected', () => {
  assert.deepEqual(findJoinedWords('Serving mostIrvine businesses'), ['mostIrvine'])
  assert.ok(findJoinedWords('FreePickup for all').includes('FreePickup'))
  assert.ok(findJoinedWords('Data wiped to NIST800-88').includes('NIST8'))
})

test('legitimate brand casing and spaced text are not flagged', () => {
  assert.deepEqual(findJoinedWords('Sign out of iCloud on your iPhone, then check LinkedIn.'), [])
  assert.deepEqual(findJoinedWords('Businesses in Irvine and Santa Ana, along Orangethorpe Avenue.'), [])
})

test('retired claims are caught on commercial pages', () => {
  const ids = (t, o) => findClaims(t, o).map((c) => c.id)
  assert.ok(ids('Same-week pickup available for most locations.').includes('same-week'))
  assert.ok(ids('We accept all electronics.').includes('all-electronics'))
  assert.ok(ids('We take it all!').includes('take-it-all'))
  assert.ok(ids("Orange County's most trusted recycler").includes('most-trusted'))
  assert.ok(ids('Our NIST 800-88 certified process').includes('nist-cert'))
  assert.ok(ids('A certificate for every device').includes('cert-every'))
  assert.ok(ids('Free business pickup for everyone').includes('free-pickup'))
  assert.ok(ids('346K+ Anaheim residents served').includes('served-count'))
  // Founding year: 2012 is confirmed; any other year or a tenure count is flagged.
  assert.deepEqual(ids('Since 2012'), [])
  assert.deepEqual(ids('Est. 2012'), [])
  assert.ok(ids('Since 2009').includes('founding-since'))
  assert.deepEqual(ids('Since 2005, California has regulated e-waste.', { isBlog: true }), [])
  assert.ok(ids('Founded in 2010', { isBlog: true }).includes('founding-year'))
  assert.ok(ids('Established in 2015').includes('founding-year'))
  assert.ok(ids('Over 14 years of experience').includes('tenure-count'))
  assert.ok(ids('Zero landfill policy').includes('zero-landfill'))
})

test('negated statements and educational blog discussion are allowed', () => {
  assert.deepEqual(findClaims('We do not promise same-day or same-week pickup.'), [])
  assert.deepEqual(findClaims('Resale value is never guaranteed.'), [])
  assert.deepEqual(findClaims('What "zero landfill" claims actually mean', { isBlog: true }), [])
  assert.ok(findClaims('Zero landfill commitment', { isBlog: false }).length > 0)
})

test('mojibake is detected', () => {
  assert.equal(hasMojibake('Orange County â€” service'), true)
  assert.equal(hasMojibake('Orange County — service'), false)
})

test('visible text ignores scripts and keeps word boundaries between blocks', () => {
  const t = visibleText('<main><h2>Irvine</h2><p>Business</p><script>var mostIrvine=1</script></main>')
  assert.deepEqual(findJoinedWords(t), [])
  assert.match(t, /Irvine\s+Business/)
})

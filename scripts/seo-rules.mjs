// scripts/seo-rules.mjs
// Shared detectors used by seo-check.mjs (source), seo-crawl.mjs (rendered
// site) and tests/seo-rules.test.mjs. Rules target concrete, retired claims and
// rendering defects — not ordinary wording — so copy edits do not break CI.

/** Words with internal capitals that are legitimate in visible text. */
export const CAMEL_ALLOW = new Set([
  'iPhone', 'iPad', 'iPads', 'iCloud', 'iMessage', 'macOS', 'iOS', 'LinkedIn', 'YouTube', 'NiroWebix', 'NexTechOC',
  'GetDataBack', 'PowerEdge', 'ProLiant', 'SaaS', 'eBay', 'PostalAddress', 'JavaScript', 'TypeScript', 'GitHub',
  'McDonald', 'DeVry', 'LaserJet', 'OfficeJet', 'ThinkPad', 'ChromeOS', 'WordPress', 'PayPal', 'FedEx', 'DoD',
  'NVMe', 'PCIe', 'eWaste', 'OneDrive', 'SharePoint', 'BitLocker', 'FileVault', 'QuickBooks', 'MacBook', 'iMac',
  'AppleCare', 'FortiGate', 'SonicWall', 'ePHI', 'TeamViewer', 'AnyDesk', 'LastPass', 'HubSpot', 'NetApp',
  'DigiCert', 'CalRecycle', 'PCBs', 'CEDs', 'CRTs', 'HDDs', 'SSDs', 'UPSs', 'PDUs', 'MFPs', 'IDs', 'MSPs', 'QSAs',
  'SBOMs', 'APIs', 'URLs', 'VLANs', 'VPNs', 'LEDs', 'LCDs', 'OLEDs', 'TVs', 'PCs', 'eSATA', 'mSATA', 'DisplayPort',
  'ProCurve', 'CloudKey', 'UniFi', 'AirPods', 'OnePlus', 'BlackBerry', 'iDRAC', 'iLO', 'ePO', 'LoRaWAN', 'WiFi',
  'MacOS', 'SysAdmin', 'DevOps', 'NetFlow', 'PoE', 'CoC', 'DoS', 'NaN', 'EcoBot', 'StorageTek', 'InfiniBand',
  'NetBox', 'ServiceNow', 'PagerDuty', 'SolarWinds', 'MySQL', 'PostgreSQL', 'McAfee', 'TrueNAS', 'FreeNAS',
  'IoT', 'SoC', 'WebP', 'VoIP', 'EoS', 'EoL', 'EoX', 'TPMs', 'BIOSes', 'ASICs', 'NICs', 'HBAs', 'SANs', 'NASes', 'KVMs', 'OSes', 'RAIDs', 'LUNs',
  'GBs', 'TBs', 'eReaders', 'SMBs', 'CISOs', 'CIOs', 'CFOs', 'CTOs', 'DPOs', 'SLAs', 'NDAs', 'RFPs', 'SOWs',
])

/**
 * Find joined words in rendered visible text — the class of bug that produced
 * "mostIrvine", "FreePickup" and "NIST800". Returns the offending tokens.
 */
export function findJoinedWords(text) {
  const hits = new Set()
  const tokens = String(text).match(/[A-Za-z][A-Za-z0-9]*[a-z][A-Z][A-Za-z0-9]*/g) || []
  for (const t of tokens) {
    if (CAMEL_ALLOW.has(t)) continue
    // Plurals / possessives of allowed words, e.g. "iPhones".
    if (CAMEL_ALLOW.has(t.replace(/s$/, ''))) continue
    hits.add(t)
  }
  for (const m of String(text).match(/\bNIST\d/g) || []) hits.add(m)
  return [...hits]
}

/** Is the match at `index` negated within the preceding window ("do not promise same-week")? */
export function isNegated(text, index, window = 70) {
  const before = text.slice(Math.max(0, index - window), index).toLowerCase()
  return /\b(not|no|never|don't|doesn't|won't|cannot|without|avoid|unsupported|nor)\b/.test(before)
}

/**
 * Retired / prohibited claims. `scope: 'site'` rules apply to every page;
 * `scope: 'commercial'` rules skip blog articles, where some phrases are
 * discussed critically (e.g. explaining what "zero landfill" claims mean).
 * `negatable` rules are allowed when clearly negated nearby.
 */
export const CLAIM_RULES = [
  { id: 'same-week', re: /same[- ]week/gi, scope: 'site', negatable: true, why: 'same-week promise' },
  { id: 'same-day', re: /same[- ]day/gi, scope: 'site', negatable: true, why: 'same-day promise' },
  { id: 'within-48', re: /within 48 hours/gi, scope: 'site', negatable: true, why: 'fixed turnaround promise' },
  { id: 'all-electronics', re: /\b(accept|take|recycle)s? all electronics\b|\ball electronics accepted\b/gi, scope: 'site', negatable: true, why: '"all electronics" claim' },
  { id: 'take-it-all', re: /we take it all/gi, scope: 'site', negatable: false, why: '"we take it all" claim' },
  { id: 'most-trusted', re: /most trusted/gi, scope: 'site', negatable: false, why: 'superlative' },
  { id: 'premier', re: /\bpremier\b/gi, scope: 'site', negatable: false, why: 'superlative' },
  { id: 'number-one', re: /#1\b|number[- ]one (e-?waste|recycler|itad)/gi, scope: 'site', negatable: false, why: 'superlative' },
  { id: 'est-2012', re: /\bEst\.? 2012\b/g, scope: 'site', negatable: false, why: 'unverified founding year' },
  { id: 'free-pickup', re: /\bfree (business |electronics |computer |scheduled )?pick-?up\b/gi, scope: 'site', negatable: true, why: 'unqualified free-pickup claim' },
  { id: 'no-minimum', re: /\bno (volume )?minimums?\b/gi, scope: 'site', negatable: false, why: 'contradicts the 5-item minimum' },
  { id: 'nist-cert', re: /NIST[^.]{0,25}\bcertified\b|certified (to|under) NIST|NIST certification/gi, scope: 'site', negatable: true, why: 'NIST 800-88 described as a certification' },
  { id: 'cert-every', re: /certificate (for|with) every|every (device|drive|job) (gets|receives) a certificate/gi, scope: 'site', negatable: false, why: 'universal certificate promise' },
  { id: 'fully-compliant', re: /fully compliant/gi, scope: 'site', negatable: true, why: 'compliance guarantee' },
  { id: 'served-count', re: /\d[\d,.]*\s*[KkMm]?\+?\s*(?:[A-Z][a-z]+\s+){0,3}(residents|businesses|clients|customers) served|\d[\d,.]*\s*[KkMm]?\+\s*(clients|customers|businesses)\b/gi, scope: 'site', negatable: false, why: 'fabricated served count' },
  { id: 'guaranteed', re: /\bguarantee(d|s)?\b/gi, scope: 'commercial', negatable: true, why: 'guarantee claim' },
  { id: 'zero-landfill', re: /zero[- ]landfill|nothing (goes|ends up) (to|in) (a )?landfill/gi, scope: 'commercial', negatable: true, why: 'absolute landfill claim' },
  { id: 'certified-dd', re: /Certified Data Destruction/g, scope: 'commercial', negatable: false, why: 'certification implication' },
  { id: 'apex', re: /\bApex\b/g, scope: 'site', negatable: false, why: 'competitor name / credentials' },
]

/** Apply claim rules to visible text. Returns [{ id, why, snippet }]. */
export function findClaims(text, { isBlog = false } = {}) {
  const out = []
  const t = String(text)
  for (const rule of CLAIM_RULES) {
    if (rule.scope === 'commercial' && isBlog) continue
    rule.re.lastIndex = 0
    let m
    while ((m = rule.re.exec(t))) {
      if (rule.negatable && isNegated(t, m.index)) continue
      out.push({ id: rule.id, why: rule.why, snippet: t.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).replace(/\s+/g, ' ') })
    }
  }
  return out
}

/** Typical mojibake produced by UTF-8 text decoded as Windows-1252. */
export const MOJIBAKE_RE = /â€[”“™˜œ\u009d]|â€"|Ã[\u0080-¿]|Â[ -¿]|ï¿½|�/

export function hasMojibake(text) {
  return MOJIBAKE_RE.test(String(text))
}

// ── HTML helpers for the crawler ─────────────────────────────────────────────
export function decodeEntities(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
}

/** Visible text of the <main> region (scripts, styles and tags removed). */
export function visibleText(html) {
  const main = (String(html).match(/<main[^>]*>([\s\S]*)<\/main>/) || [, String(html)])[1]
  return decodeEntities(
    main
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      // React separates adjacent text nodes with <!-- --> — those ARE joined
      // in the browser, so remove them without a space. Every other tag is
      // treated as a boundary, so block-styled spans never look glued.
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(br|\/p|\/li|\/h[1-6]|\/div|\/td|\/th|\/summary|\/dt|\/dd)[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/[ \t]+/g, ' ')
}

export function textOf(fragment) {
  return decodeEntities(String(fragment).replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
}

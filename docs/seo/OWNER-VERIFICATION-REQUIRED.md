# Owner Verification Required

Updated 2026-11-16 for the Circular Technology Operations redesign.

This list covers business facts and claims that the repository can't prove. The site now states only the policies listed under "Verified policies" below. Everything else was removed or worded conservatively. **Please confirm each open item before deployment.** If you have evidence for an item, stronger wording can come back. If you don't, leave the current wording as it is.

**Status key:**
- `removed`: deleted from the site.
- `qualified`: softened; safe to ship as it is.
- `verify`: still on the site in some form and needs your confirmation.
- `config`: a deployment setting, not copy.

## Verified policies (the source of truth in `lib/pickup.ts` and `lib/site.ts`)

- **Service area:** Orange County and South Los Angeles.
- **Pickup minimum:** business pickup needs at least **5 qualifying major items**. Accessories are welcome but don't count toward the minimum.
- **Fees:** most accepted qualifying electronics have no recycling fee. Televisions are **$39 per unit**.
- **Confirmed individually:** oversized, specialized, hazardous or unusual items.
- **Requests and timing:** a request is not a confirmed booking. The site makes no same-day or same-week promise.
- **City pages** describe service areas, not branch locations.
- **Data and documentation:**
  - Documentation depends on the service selected and the equipment processed.
  - Data destruction is never automatic.
  - Serial-number reporting is provided only when it is in the agreed scope.
- **Wording rules:** NIST SP 800-88 is described as a guideline, never as a certification. No "zero landfill" guarantee.

If any of these change, edit them in `lib/pickup.ts` / `lib/site.ts`. `npm run seo:check` fails if hard-coded copy disagrees with them.

## Open items

| # | Item | Where | Current state | What we need from you | Status |
|---|---|---|---|---|---|
| 1 | "Est. 2012" founding year | Old homepage hero | Removed everywhere | Business registration date, if you want a founding year shown | removed |
| 2 | DTSC registration, facility ID, or any other regulatory authorization | Nowhere on the site | Not claimed. Copy says equipment is handled "in line with California e-waste regulations" | Your own registration or authorization numbers and their scope. Never use another company's ID | verify |
| 3 | Certifications (R2, e-Stewards, NAID AAA, ISO 14001, etc.) | Nowhere on the site | Not claimed. "Certificate" refers only to the documents you issue | Copies of current certificates, if any, so they can be stated accurately | verify |
| 4 | On-site or witnessed shredding | Data destruction page, FAQ | Described as "confirmed per project" | Whether you offer it, and where (your site or a facility) | verify |
| 5 | Which documents you actually issue: pickup manifest, serialized inventory, Certificate of Recycling, Certificate of Data Destruction, chain-of-custody record | `DOCUMENT_TYPES` in `lib/site.ts`; Business Pickup, How It Works and service pages | All five listed as "available depending on scope" | Confirm each one. Remove any you don't offer | verify |
| 6 | Serial-level (serialized) asset inventory | ITAD page, documentation table | "When in scope" | Confirm it's offered and whether a fee applies | verify |
| 7 | South Los Angeles coverage boundaries | Header, footer, schema `areaServed`, Business Pickup page, ZIP guidance | ZIPs 900–918 get "we'll confirm your address", not "yes" | The exact cities or ZIPs you serve in LA County. This would let the ZIP helper say "yes" where appropriate | verify |
| 8 | The 34 city and community pages (all in Orange County) | `lib/cities.ts` | Each says "a service area, not a branch location". Unincorporated communities are typed `community` (El Toro, Coto de Caza, Foothill Ranch, Ladera Ranch, Trabuco Canyon) | Confirm you serve every listed place. Delete any you don't | verify |
| 9 | Typical turnaround for pickup scheduling and for documents | How It Works, FAQs | No time window stated. "Timing depends on location, volume and availability" | A typical window, if you want one stated | verify |
| 10 | Drop-off location | City FAQ ("Do you have a branch or drop-off location?") | Says you travel to the customer's site and invites them to ask about drop-off | Whether a drop-off location exists and its address | verify |
| 11 | Hours (Mon–Fri, 8am–6pm) | Header, footer, contact page, schema | Saturday hours removed from the contact page because nothing confirmed them | Confirm the hours, including Saturday | verify |
| 12 | Insurance or bonding | Nowhere on the site | Not claimed | Certificates, if you want this stated | verify |
| 13 | Staff credentials and background checks | Nowhere on the site | Not claimed | Evidence, if you want this stated | verify |
| 14 | Client counts, tonnage, landfill-diversion percentages, reviews | Previously on the about, home and city pages | Removed. The site says you don't publish a diversion figure you can't document | Records for a stated period, if you want a figure restored | removed |
| 15 | `sameAs` social profiles (Facebook, LinkedIn) | Previously in the layout schema | Removed from the LocalBusiness schema | Profile URLs you own, which can then be added back | removed |
| 16 | Blog hero images hotlinked from Unsplash | `posts/blog-data.ts` | Unchanged. Credits are stored in `unsplashCredit` | Confirm licensing, then self-host them in `/public/image` | verify |
| 17 | Official source links (DTSC, CalRecycle, NIST, California statutes) | Resources page, two blog posts | Added, but the build sandbox has no web access, so none could be opened | Click each link once before deploy (list below) | verify |
| 18 | Breach examples in the data-security blog post | `posts/blog-data.ts` | Replaced unverifiable examples with the 2010 CBS photocopier report and the 2022 Morgan Stanley SEC settlement | Confirm you're comfortable citing them, or remove them | verify |
| 19 | Mail settings `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | `lib/mail.ts` | Recipient and sender are now environment variables. They fall back to the previously hard-coded addresses | Set all three in Vercel. Without `RESEND_API_KEY`, both forms return a clear error rather than a false success | config |
| 20 | Pickup-request rate limit | `lib/mail.ts` | In-memory: 5 requests per 10 minutes per IP, per server instance. Best effort only | Accept as is, or add Vercel KV / Upstash later if spam appears | config |
| 21 | `framer-motion` dependency | `package.json` | No longer imported anywhere. Animations are now CSS only | OK to remove it in a follow-up (`npm uninstall framer-motion`) | config |
| 22 | Third-party chat widget (`niro-ai-platform.vercel.app`) | Layout | Unchanged. Couldn't be loaded in the sandbox | Confirm it should stay, and that it collects no data before consent | verify |
| 23 | Phone (949) 287-3056 and `info@ocelectronicrecycling.com` | Sitewide and in the schema | Unchanged | Confirm both are current | verify |

### Source links to click once (item 17)

- https://dtsc.ca.gov/electronic-hazardous-waste/
- https://calrecycle.ca.gov/electronics/
- https://csrc.nist.gov/pubs/sp/800/88/r1/final
- https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1798.81. (Civil Code §1798.81)
- The `leginfo.legislature.ca.gov` and `dtsc.ca.gov` links inside the two blog posts' Sources sections

## What was not done

- No certifications, licenses, regulatory or facility IDs, addresses, staff, clients, reviews, awards, processing totals or environmental statistics were invented.
- No competitor's credentials or wording were used.
- Blog articles that explain NIST SP 800-88 or DoD 5220.22-M do so as education, not as a claim of certification.

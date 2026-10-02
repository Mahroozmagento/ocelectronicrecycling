# Owner Verification Required

These items are **business facts or claims** that could not be verified from the repository. Copy has been written conservatively (or the claim removed) so nothing unsupported is published. **Before deployment, the owner should confirm each item.** If a claim is supportable with evidence, we can restore stronger wording; if not, keep the conservative version.

Legend — **Status**: `qualified` (softened, safe to ship) · `removed` (deleted, safe to ship) · `verify` (kept but needs confirmation).

| # | Claim / fact | Where it was | Action taken | What we need from the owner | Status |
|---|---|---|---|---|---|
| 1 | "2,500+ clients served" | `app/about` stat card | Replaced with process fact ("NIST 800-88 guidelines followed") | Real client count + how it's measured, if you want a number restored | qualified |
| 2 | "500T e-waste diverted annually" | `app/about` stat card | Replaced with "Certificate of destruction per device" | Weight/manifest records for a stated period | qualified |
| 3 | "100% Data destruction verified" | `app/about` stat card | Replaced with "Chain of custody documented" | Per-job verification records if "100%" is to return | qualified |
| 4 | "346K+ Anaheim Residents Served" | `lib/cities.ts` (anaheim hero) | Replaced with "Local · Orange County Team" | Actual served figures per city, if any | removed |
| 5 | "5,000+ Irvine Businesses Served" | `lib/cities.ts` (irvine hero) | Replaced with "NIST · 800-88 Data Handling" | Actual served figures, if any | removed |
| 6 | "Data Destruction Guaranteed" / "100%" | `lib/cities.ts` (lake-forest, fullerton, la-habra, san-clemente, huntington-beach, laguna-beach) | Replaced with "NIST 800-88 Data Handling" / "CA Compliant Recycling" | Confirm whether any guarantee is offered contractually | qualified |
| 7 | "Zero landfill" / "Nothing goes to landfill" (absolute) | home, how-it-works, about, itad, recycling, services, city pages | Reworded to "landfill diversion via vetted downstream processors" | Downstream processor audit / zero-landfill contracts to support an absolute claim | qualified |
| 8 | "Zero data liability — guaranteed" | `app/services/itad` | Reworded to "documented sanitization to reduce data-security risk" | N/A — legal guarantee not recommended without counsel | qualified |
| 9 | "legally defensible documentation" | `app/services/data-destruction` | Reworded to "audit-ready documentation" | Counsel opinion if legal framing is desired | qualified |
| 10 | "Certified Data Destruction" (self-label) | layout schema, home, footer, city pages + schema, blog | Renamed to "Secure Data Destruction"; kept "certificate of destruction" (the document issued) | Copies of any current certifications (NAID AAA, R2, e-Stewards, ISO, etc.) — with these we can state them accurately | verify |
| 11 | "DoD-grade software" | city page FAQ | Reworded to "verified sanitization software (NIST 800-88)" | Name of wiping software used, if you want it cited | qualified |
| 12 | "no liability for you" | city page why-card | Reworded to "helps reduce your data-security and compliance risk" | N/A — legal conclusion avoided | qualified |
| 13 | "certificate within 48 hours" | `app/how-it-works` | Reworded to "typically within a few business days" | Real turnaround SLA if a specific window should be stated | verify |
| 14 | "cost thousands in fines" | `app/page.tsx` | Reworded to "can put your business at risk" | Specific statute/penalty citation if a figure is wanted | qualified |
| 15 | "premier" / "most trusted" | root metadata, home | Removed superlatives | N/A | removed |
| 16 | "Est. 2012" | `app/page.tsx` hero | **Kept as-is** | Confirm founding year (business registration) | verify |
| 17 | "Free business pickup (qualifying volumes)" | sitewide | **Kept** with "qualifying volumes" qualifier | Confirm current pickup policy & any minimums | verify |
| 18 | Phone `(949) 287-3056`, email `info@…`, hours Mon–Fri 8–6 | sitewide + schema | **Kept unchanged** (not modified per rules) | Confirm still accurate | verify |
| 19 | `sameAs` Facebook & LinkedIn URLs | `app/layout.tsx` schema | **Kept unchanged** | Confirm these profiles exist and are owned | verify |
| 20 | Blog Unsplash images (hotlinked) | `posts/blog-data.ts` / blog pages | **Kept** (not self-hosted) | Confirm licensing before self-hosting; credits stored in `unsplashCredit` | verify |
| 21 | "34 cities in Orange County" | service-areas, layout schema | **Kept** | Note: the list includes some unincorporated communities (El Toro, Coto de Caza, Foothill Ranch, Ladera Ranch, Trabuco Canyon). Confirm framing or relabel as "cities & communities" | verify |

## Notes
- No certifications, addresses, customer names, reviews, tonnage, or served-counts were invented anywhere.
- Educational references to NIST 800-88, DoD 5220.22-M, and California statutes inside blog articles were left intact — they are used to explain concepts, not to claim the company is certified.

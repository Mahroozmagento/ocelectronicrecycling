# SEO Audit — Baseline (BEFORE)

**Site:** https://www.ocelectronicrecycling.com
**Framework:** Next.js 16.2.7 (App Router, React 19), Tailwind v4, TypeScript
**Audit date:** 2026-09-21
**Scope:** Repository source of truth (`/app`, `/components`, `/lib`, `/posts`, `/public`). Production HTML was not crawled from this environment; differences from the live site are noted as *unverified* and are not treated as regressions.

> This file was created **before** any edits, per the operating rules. Corrections and results are tracked in `SEO-AUDIT-AFTER.md`.

---

## 1. Route inventory

All routes are statically generated (App Router). Metadata is exported server-side on every route (no client-only SEO content).

| Route | Source | Indexable | Canonical (host) | H1 | JSON-LD | In sitemap |
|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | yes | `/` (rel, resolves to www via `metadataBase`) | 1 | LocalBusiness + WebSite (in root layout) | yes |
| `/services` | `app/services/page.tsx` | yes | www absolute | 1 (PageHero) | none | yes |
| `/services/itad` | `app/services/itad/page.tsx` | yes | www absolute | 1 | none | yes |
| `/services/data-destruction` | `app/services/data-destruction/page.tsx` | yes | www absolute | 1 | none | yes |
| `/services/recycling` | `app/services/recycling/page.tsx` | yes | www absolute | 1 | none | yes |
| `/how-it-works` | `app/how-it-works/page.tsx` | yes | www absolute | 1 | none | yes |
| `/about` | `app/about/page.tsx` | yes | www absolute | 1 | none | yes |
| `/blog` | `app/blog/page.tsx` | yes | (see note) | 1 | none | yes |
| `/blog/{slug}` ×23 | `app/blog/[slug]/page.tsx` | yes | www absolute (dynamic) | 1 | Article | yes |
| `/resources` | `app/resources/page.tsx` | yes | www absolute | 1 | none | yes |
| `/contact` | `app/contact/{layout,page}.tsx` | yes | www absolute | 1 | none | yes |
| `/service-areas` | `app/service-areas/page.tsx` | yes | www absolute | 1 | none | yes |
| `/e-waste-recycling/{city}` ×34 | `app/(cities)/.../page.tsx` | yes | www absolute (dynamic) | 1 | LocalBusiness (per city) | yes |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | yes | www absolute | 1 | none | yes |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | yes | www absolute | 1 | none | yes |
| `/api/contact` | `app/api/contact/route.ts` | n/a (POST) | n/a | n/a | n/a | no (disallowed) |
| `/robots.txt` | `app/robots.ts` | n/a | n/a | n/a | n/a | n/a |
| `/sitemap.xml` | `app/sitemap.ts` | n/a | n/a | n/a | n/a | n/a |

**Totals:** 13 static content routes + 34 city pages + 23 blog posts = **70 indexable URLs**.

## 2. Crawlability / indexing findings

- **robots.ts** — Allows `/`, disallows `/api/`, declares canonical sitemap. Correct. (No important routes are `noindex`.)
- **sitemap.ts** — All entries are canonical 200 URLs. **Problem:** every entry uses `lastModified: new Date()`, i.e. the build timestamp, so every deployment falsely signals that all 70 URLs changed. Should reflect genuine content dates. Also a stale code comment says "15 blog posts" (actually 23).
- **Canonical host** — Consistent `https://www.ocelectronicrecycling.com`. `metadataBase` set in root layout. Home uses relative `/` (resolves correctly). No page canonicalizes to the homepage incorrectly.
- **Search Console verification** — `public/googlea9f5a16800a4feaa.html` present and preserved; `verification.google` also set in root metadata. OK.
- `/how-it-works` is self-canonical — **left unchanged** per instruction.

## 3. Metadata / SERP quality findings

- Titles/descriptions are unique per route via the `%s | OC Electronic Recycling` template. City and blog descriptions are unique per record.
- Root default description contains **"premier"** and **"Certified data destruction"** (unsupported superlative + certification implication). Repeated on the home page OG/Twitter.
- Several service/city descriptions carry **"Certified data destruction"** and **"Zero landfill commitment"** (see claims table).

## 4. Structured data findings

- Root layout: `LocalBusiness` + `WebSite` graph. LocalBusiness `address` uses only region/locality "Orange County" (no street) — acceptable but the offer catalog names **"Certified Data Destruction"**.
- City pages: `LocalBusiness` schema includes a **`PostalAddress` with `addressLocality` = city name + ZIP** for every one of 34 cities. This implies a physical office in each city — **misleading for service areas** and contrary to local-SEO best practice.
- Service pages: **no `Service` schema**.
- Blog posts: `Article` (should be `BlogPosting`); **no `dateModified`, no `mainEntityOfPage`**.
- Visible FAQs on city pages have **no `FAQPage` schema**. Visible breadcrumbs on city/blog pages have **no `BreadcrumbList` schema**.

## 5. Accessibility findings

- **Nested `<main>` landmark:** root `app/layout.tsx` wraps children in `<main>`; `app/(cities)/.../layout.tsx` adds a second `<main>`. Two `main` landmarks on every city page — a11y violation.
- Consent banner, form labels, `role=status`/`role=alert` on form messages, `prefers-reduced-motion` handling on scroll — all present and good.

## 6. Images / media findings

- Blog posts **hotlink Unsplash** (`images.unsplash.com`, `unoptimized`) for hero, related, and card images. No locally-hosted licensed copies; license/attribution stored only as `unsplashCredit` string. (Phase 10 — owner must confirm licensing before self-hosting.)
- `public/image/resources-oc-electronic-recycling.we` — a **truncated/broken duplicate** image file exists alongside the valid `.webp`.
- Home/city hero use `next/image` with `priority`; below-fold blog images lazy by default. OG images reference local `/image/*.webp` (resolve to absolute via `metadataBase`).

## 7. Analytics / conversion findings

- Consent-first: GA4 + Clarity load only after `accepted` (`AnalyticsScripts`), events gated by `getConsent()` in `lib/analytics.ts`. Good.
- **Event naming is ad-hoc** and not aligned to the required privacy-safe set: `phone_number_clicked` (transmits the **actual phone number** as payload), `quote_form_submitted`, `lead_captured`, `service_page_viewed`, `chat_widget_opened`. No `contact_form_start`, `contact_form_submit_error`. Phone-number payload is unnecessary PII-adjacent data.

## 8. Internal-link graph (summary)

- Home → services (6 cards), contact. City pages → the 3 service pages + 5 "nearby" cities + service-areas hub. Service-areas → all 34 cities. Blog posts → 4 service links + related posts.
- **Gaps:** service pages do **not** link out to guides or city pages (dead-end hubs); `/services` sub-pages omit cross-links between siblings; the 3 core service pages are thin (see §9).

## 9. Thin / low-differentiation pages

- `/services/itad`, `/services/data-destruction`, `/services/recycling` are **short feature-card pages** (no FAQs, no accepted-asset list, no process, no service-area section, no scope in/out). Phase 5 targets.
- City pages share a common template; differentiation comes from `lib/cities.ts` copy. Fabricated per-city "served" counts weaken trust (see claims table).

## 10. Claim-risk table (evidence-based)

| # | Statement | File / URL | Risk | Required evidence | Safe alternative | Owner sign-off |
|---|---|---|---|---|---|---|
| 1 | "2,500+ clients served" | `app/about` | Fabricated volume | Client records | Remove or replace with qualitative trust factor | required |
| 2 | "500T e-waste diverted annually" | `app/about` | Fabricated tonnage | Weight/manifest records | Remove; use process-based statement | required |
| 3 | "100% Data destruction verified" | `app/about` | Absolute claim | Per-job verification audit | "Verification on data-bearing devices" | required |
| 4 | "346K+ Anaheim Residents Served" | `lib/cities.ts` (anaheim) | Fabricated served count | Records | Non-count service attribute | required |
| 5 | "5,000+ Irvine Businesses Served" | `lib/cities.ts` (irvine) | Fabricated served count | Records | Non-count service attribute | required |
| 6 | "100% Data Destruction Guaranteed" | `lib/cities.ts` (lake-forest) | Guarantee | — | "NIST 800-88 data handling" | required |
| 7 | "0 Pounds (Sent) to Landfill" | `lib/cities.ts` (huntington-beach, laguna-beach) | Zero-landfill absolute | Downstream audit | "CA-compliant recycling" | required |
| 8 | "100% Responsible / Eco-Responsible" | `lib/cities.ts` (fullerton, la-habra, san-clemente) | Absolute % | — | "CA-compliant recycling" | required |
| 9 | "Zero data liability — guaranteed and documented" | `app/services/itad` | Legal guarantee | — | "Documented sanitization to reduce data-security risk" | required |
| 10 | "Zero landfill policy on all ITAD clients" | `app/services/itad` | Absolute | Downstream audit | "Landfill-diversion commitment via vetted processors" | required |
| 11 | "Zero landfill commitment" | `app/services/recycling`, `/services`, `/`, meta | Absolute | Downstream audit | "Landfill-diversion commitment" | required |
| 12 | "legally defensible documentation" | `app/services/data-destruction` | Legal conclusion | Counsel opinion | "audit-ready documentation" | required |
| 13 | "Our process eliminates that risk completely" | `app/page.tsx` | Absolute risk claim | — | "helps reduce that risk" | required |
| 14 | "cost thousands in fines" | `app/page.tsx` | Specific legal/financial claim | Statute citation | Softened, cite CA law generally | required |
| 15 | "most trusted e-waste and ITAD partner" | `app/page.tsx` | Superlative | — | Remove superlative | required |
| 16 | "premier … company" | root metadata, `app/page.tsx` | Superlative | — | Descriptive wording | required |
| 17 | "Certified Data Destruction" (service self-label) | layout schema, home, footer, city page + schema, blog | Certification implication | NAID/R2/e-Stewards cert docs | "Secure Data Destruction" (+ "certificate of destruction" for the document) | required |
| 18 | "DoD-grade software" | city page FAQ | Standard implication | — | "NIST 800-88 methods" | required |
| 19 | "no liability for you" | city page why-card | Legal conclusion | — | "reduce your data-security risk" | required |
| 20 | "Nothing goes to landfill" | city page process | Absolute | Downstream audit | "diverted from landfill via vetted processors" | required |
| 21 | "certificate emailed within 48 hours" | `app/how-it-works` (×2) | Fixed turnaround promise | Ops SLA | "typically within a few business days" | required |
| 22 | "What We Guarantee / Every Time, Without Exception" | `app/how-it-works` | Guarantee framing | — | "What We Provide / On Every Job" | required |
| 23 | "Est. 2012" | `app/page.tsx` | Foundational fact | Registration date | Keep only if owner confirms | verify |
| 24 | "Free business pickup" (qualifying volumes) | sitewide | Pricing/policy | Owner policy | Keep, keep "qualifying volumes" qualifier | verify |

> Legitimate, correctly-qualified references retained: educational NIST 800-88 / DoD 5220.22-M / California statute references inside blog articles (used definitionally, not as company certifications), "certificate of destruction" (a document the company issues), and "compliance with California e-waste regulations".

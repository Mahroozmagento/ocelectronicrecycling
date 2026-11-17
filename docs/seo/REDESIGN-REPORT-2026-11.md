# Circular Technology Operations: Redesign & Business Pickup Report

**Date:** 2026-11-16
**Branch:** `claude/master-seo-prompt-hehkci`. Committed locally, **not pushed, merged or deployed**.
**Stack:** Next.js 16.2.7 (App Router, Turbopack), React 19, TypeScript, hand-written CSS on Tailwind v4.

## 1. Initial findings

The baseline was commit `c34abad`, which already contained the claim cleanup and the service-page rebuild. It still had these problems:

**Homepage**
- A fake "Active Shredding Session" panel with live-looking counters.
- "Est. 2012", which nothing verifies.
- A custom cursor that hid the system pointer (`cursor: none`).
- Emoji icons and framer-motion animations on every section.

**Pickup policy**
- No page explained the 5-item minimum, which items don't count, the $39 TV fee, or that a request is not a booking.
- Pickup CTAs went to `/contact`.

**City pages**
- Copy was hand-written separately for each of the 34 cities.
- Some pages still had joined words ("Irvine.Call"), population or ZIP lists, and "located in" phrasing that implied a branch.
- There were no breadcrumbs, and schema and visible content had drifted apart.

**Resources and blog**
- Resources linked to downloads that don't exist and showed invented statistics.
- The blog still said "free" pickup, "(2025)", "certified", "same week", "all 34 cities", "zero landfill", quoted statutory penalty figures, and gave breach examples that couldn't be verified.

**Accessibility**
- The mobile menu had no focus trap and didn't close with Escape.
- Contact-form labels weren't tied to their inputs.
- The FAQ accordion used click-only divs.

**Infrastructure**
- The contact API reported success even when the email failed to send.
- Nothing checked rendered HTML for regressions.

## 2. Design concept: "Circular Technology Operations"

The look is an operations console for retiring equipment. It is calm, precise and documentary, not a stock "green recycling" site.

- **Palette:**
  - Deep ink (`#0b1220`) heroes.
  - Mineral-grey and white working sections.
  - One signal green (`--ct-accent`) for actions.
  - A secure blue for data-destruction content.
  - A warm amber used only for "ask first" or caution content.
  - Colours are tokens in `app/styles/ct-core.css`.
- **Type:**
  - Variable heading face for headings.
  - Body sans for text.
  - Mono for eyebrows and record labels, which gives the "manifest" feel.
- **Motifs:**
  - Thin gridlines.
  - Numbered process rails.
  - Three-column triage: counts, does not count, confirmed individually.
  - A custody manifest card and a custody loop diagram. Both are explicitly labelled **"Example workflow · Illustrative · not live data"**.
- **Components:** inline SVG icon set (`components/Icon.tsx`), fact strip, path cards, project list, documentation table (stacks on mobile), native `<details>` FAQ, CTA band, and a sticky mobile action bar.
- **Motion:** CSS only (`.ct-rise`, `.ct-in`), and turned off under `prefers-reduced-motion`.

## 3. Routes

There are 79 build routes.

**New**
- `/business-pickup`
- `/api/pickup-request` (POST)
- `/manifest.webmanifest`
- A noindex 404 page.

**Rebuilt**
- `/`, `/services`, `/how-it-works`, `/about`, `/contact`, `/resources`, `/service-areas`.
- The 34 `/e-waste-recycling/[city]` pages, all through one template.

**Targeted fixes**
- `/services/data-destruction`, `/services/itad`, `/services/recycling`.
- `/blog/[slug]` (21 posts).
- `/privacy-policy`, `/terms-of-service`.

The sitemap has 71 URLs and includes `/business-pickup`.

## 4. Files

54 files changed: 23 added, 29 modified, 2 deleted (+6,983 / −3,080 lines).

**Added**
- **Policy and helpers:** `lib/pickup.ts`, `lib/site.ts`, `lib/schema.ts`, `lib/mail.ts`.
- **Shared components:** `components/{Icon,JsonLd,Faq,Breadcrumbs,CustodyVisuals}.tsx`.
- **Pickup components:** `components/pickup/{PickupContext,QuantityStepper,EligibilityEstimator,PickupForm}.tsx`.
- **Pages and routes:** `app/business-pickup/page.tsx`, `app/api/pickup-request/route.ts`, `app/not-found.tsx`, `app/manifest.ts`.
- **Styles:** `app/styles/ct-core.css`, `app/styles/ct-pickup.css`.
- **Scripts and tests:** `scripts/seo-rules.mjs`, `scripts/seo-crawl.mjs`, `tests/pickup.test.mjs`, `tests/seo-rules.test.mjs`.
- **Docs:** this report.

**Modified**
- **Shared shell:** layout, header, footer, `AnimateIn`, `AnalyticsEvents`, `ServiceStructuredData`, `globals.css`.
- **Pages:** all pages listed under "Rebuilt" and "Targeted fixes" in section 3, plus the city layout and the contact API.
- **Content and data:** `lib/cities.ts`, `posts/blog-data.ts`, `app/sitemap.ts`.
- **Tooling and docs:** `scripts/seo-check.mjs`, `package.json` (scripts only), `docs/seo/OWNER-VERIFICATION-REQUIRED.md`.

**Deleted**
- `components/Cursor.tsx`, `components/FaqAccordion.tsx`.

## 5. Business Pickup functionality

**Page sections, in order**
1. Hero with the eligibility facts.
2. Estimator.
3. Triage: qualifying / courtesy / confirm-first.
4. Four-step form with a sidebar.
5. Process rail.
6. Documentation table and service paths.
7. Coverage chips.
8. 11 FAQs with matching FAQPage schema.
9. CTA.

**Estimator** (`estimatePickup` in `lib/pickup.ts`)
- 10 equipment categories. Eight count as major items, televisions included. Loose storage media and "other" are `review` items.
- Possible results: empty, meets minimum, below minimum (shows how many items are missing), or review needed.
- When TVs are added it shows the fee: "N × $39 = $X".
- It always shows "Final eligibility, fees and timing will be confirmed by our team."
- Results are announced through an `aria-live` region.
- Quantities carry into the form through shared context.

**Form**
- Four steps:
  1. Equipment: quantities, item list, photos.
  2. Location: address, city, ZIP, timeframe, access.
  3. Data and documents.
  4. Contact and consent.
- Each step is validated on the client.
- An error summary links to each invalid field, and focus moves to it.
- Entered data is kept after any error.
- **ZIP guidance:**
  - Orange County ZIPs get a "yes".
  - LA County ZIPs 900–918 get "we'll confirm".
  - Anything else is marked outside the area.
- **Photos:**
  - Up to 5 images.
  - Resized in the browser to JPEG (≤800 KB each, 3.5 MB total).
- **Duplicate-submit protection:** a sending ref, plus a 500 ms guard after each step change.
- The success screen says **"This is not a confirmed appointment."**

**API (`/api/pickup-request`)**
- Rejects oversized requests with 413.
- Rate limit: 5 requests per 10 minutes per IP, best effort.
- Honeypot: answers with a fake success and sends nothing.
- 4-second time gate.
- Validates on the server and returns 400 with field errors.
- Checks image magic bytes, discards client filenames and generates safe ones.
- Escapes HTML in the notification email.
- Returns success **only after** the email provider accepts the message.
- Without `RESEND_API_KEY` it returns 500 and the form shows the error state.

**Analytics** (consent-gated, no personal data sent)
- `pickup_cta_click`, `form_start`, `form_step_complete`, `eligibility_estimate`, `form_submit_success`, `form_submit_error`.

## 6. Homepage

**Before**
- Fake "Active Shredding Session" console with moving counters.
- "Est. 2012".
- Emoji feature grid.
- A custom cursor.
- Generic "free pickup" messaging.
- Pickup CTAs pointing to the contact page.

**After** (10 sections)
1. Hero with an outcome headline, two CTAs, phone and hours, and the illustrative custody-loop diagram (hidden under 600 px, where its labels become unreadable).
2. Policy fact strip: 5+ items, $39 per TV, confirmed before scheduling.
3. Three service paths.
4. Example chain-of-custody rail, labelled illustrative.
5. Eligibility explainer with an estimator CTA.
6. Wipe-or-destroy comparison table.
7. "Where equipment goes" section. It explicitly says the business does not publish a landfill-diversion figure it can't document.
8. Coverage chips.
9. FAQ.
10. Final CTA.

## 7. City template

**Before**
- 34 hand-written page bodies.
- Joined words such as "Irvine.Call".
- Population and ZIP figures, and "located in" phrasing.
- Schema that didn't always match the visible content.

**After**
- **Data:** `lib/cities.ts` holds only per-city facts: name, region, kind (city or community), meta, intro, local context, scenarios, nearby places, and an optional FAQ.
- **Template copy:** every sentence that uses the city name is built from template strings in one object (`t`), so a fix applies to all 34 pages at once.
- **Sections:**
  - Breadcrumbs.
  - Hero that says "a service area, not a branch location".
  - Fact strip.
  - Local context with scenarios.
  - Service summary.
  - Eligibility triage.
  - Data-destruction options.
  - Process.
  - FAQs (shared plus city-specific).
  - Nearby areas.
  - CTA.
- **Schema:** Service with `areaServed` City or Place, plus Breadcrumb and FAQPage nodes built from the same arrays as the visible content. No address.
- **Late fix:** "How a Irvine pickup works" became "How pickup works in {city}", which fixes a/an for city names that start with a vowel.

## 8. Resources

- Removed the fake downloads and the invented statistics.
- The page now has:
  - Topic groups that link only to blog posts that exist.
  - A pickup preparation checklist.
  - Official sources: DTSC, CalRecycle, NIST SP 800-88, Civil Code §1798.81.
  - A "Hub reviewed November 2026" stamp.
- Blog changes:
  - 20 posts now carry `dateModified: 2026-11-15`.
  - Pickup links point to `/business-pickup`.
  - Two posts gained a Sources section.
  - The certificate post was retitled "Data Destruction Certificates in California: What They Actually Prove".

## 9. Claims

**Removed or corrected across the site**
- Served-count statistics. ("Est. 2012" was removed at first; the owner later confirmed the year, and it now appears as "Since 2012".)
- "Free" pickup without conditions.
- Same-day and same-week promises.
- "Zero landfill" and "nothing goes to landfill".
- Self-applied "certified" labels.
- "NIST certified", which became "guided by" or "with reference to" NIST SP 800-88 guidelines.
- Automatic serial-number reporting, which became "when in scope".
- Automatic data destruction, which became "a selected service".
- Saturday hours and the same-day reply claim on the contact page.
- Statutory penalty figures, and the unverifiable breach examples in the blog.

**Enforced automatically:** `npm run seo:check` (source files) and `npm run seo:crawl` (rendered HTML) fail if any of these return.

## 10. Owner-verification items

See `docs/seo/OWNER-VERIFICATION-REQUIRED.md` (23 items). The most important:

- Your own DTSC or regulatory authorization, and any certifications. Nothing is claimed today.
- Whether witnessed or on-site shredding is offered.
- Which of the five documents you actually issue.
- The exact South LA coverage boundaries.
- Turnaround times.
- Whether a drop-off location exists.
- Hours.
- Unsplash licensing for blog images.
- Clicking the official source links once (the sandbox couldn't reach them).
- Setting `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` in Vercel.

## 11. Metadata and schema

**Metadata**
- Unique, non-empty titles and descriptions on every page. The crawler fails on duplicates and warns when a description is over 170 characters.
- The ` | OC Electronic Recycling` suffix comes from the root template, so page titles no longer repeat it.
- Canonicals on every indexable page; Open Graph and Twitter tags on the main pages; the 404 page is noindex.

**Schema**
- **Root:** an `@graph` with LocalBusiness and WebSite. LocalBusiness has region and country only, no street address, and uses `areaServed` for the OC cities plus South LA.
- **Pages:** Service, BreadcrumbList and FAQPage nodes, built from the same arrays as the visible content.
- **Blog:** BlogPosting with `datePublished` and `dateModified`.
- **Safety:** `JsonLd` escapes `<`.

**Sitemap:** stable content dates (`2026-11-15` for redesigned pages; blog uses `dateModified ?? publishDate`).

## 12. Internal linking

- Header navigation includes Business Pickup, with `aria-current` on the active item.
- The footer links to services, company pages and the featured service areas.
- Every page has a primary CTA to `/business-pickup` and a `tel:` link.
- City pages link to the three services, eligibility, the data-destruction comparison and 4–6 nearby areas.
- Service pages link to each other and to the pickup page.
- Resources link to every blog topic group.
- Breadcrumbs appear on all inner pages.
- The crawler found every internal link resolving, and no sitemap page that isn't linked from another page (71 URLs).

## 13. Accessibility

**Structure and navigation**
- A skip link to `<main id="main">`, with one main landmark per page.
- Exactly one H1 per page (checked by the crawler). Heading order was reviewed by hand.

**Mobile menu**
- Modal dialog with a focus trap, Escape to close, scroll lock, and focus returned to the toggle. Verified with Playwright.

**Forms**
- Visible labels tied to their inputs, `aria-describedby` hints, and `aria-invalid`.
- An error summary with role alert that receives focus.
- Focus moves on each step change and on success.
- Status messages are announced through live regions.
- Steppers have 44 px touch targets.

**Other**
- FAQ uses native `<details>`, which works with the keyboard.
- The decorative SVGs are `aria-hidden`, and the illustrative visuals have text labels.
- The custom cursor is removed and motion respects reduced-motion settings.
- Contrast: ink/white and accent-on-ink pairs were chosen at or above AA. An automated contrast audit was not run (no Lighthouse or axe in the sandbox).

## 14. Performance

- Server components by default. Only the header, estimator, form, analytics and the contact form ship client JavaScript.
- framer-motion is no longer imported (the package is still listed; see owner item 21).
- City pages are statically generated (`dynamicParams = false`).
- No new images were added. Icons are inline SVG. Fonts are variable `next/font` faces.
- Photos are resized in the browser before upload, which keeps requests under 3.5 MB.
- Lighthouse couldn't be run in the sandbox. Run it on the Vercel preview before deploy.

## 15. Tests and results

All results are from 2026-11-16, on the final source.

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Clean |
| `npx eslint .` | 0 problems |
| `npm test` (node --test) | **20 / 20 pass**: 14 pickup-policy tests, 6 SEO-rule tests |
| `npm run seo:check` | Pass: 50 source files, 34 cities, 5-item minimum / $39 per TV |
| `next build` | Pass: 79 routes |
| `npm run seo:crawl -- --url http://localhost:3200` | **Pass: 71 / 71 pages, 0 warnings** |
| API with curl | Missing fields → 400 with field errors. Honeypot → silent fake success. Under 4 s → 400. Fake JPEG → 400 "not a supported image". 5 MB body → 413. 6th request from one IP → 429. Valid request without mail key → 500 "could not send" |
| Playwright flow (20 checks) | **20 / 20 pass**: empty-step error summary is focused and linked; estimator carries into the form; server failure shows the error state, keeps the data and shows no fake success; mocked success shows "Request received" with focus and "not a confirmed appointment"; double submit sends 1 POST; mobile menu keyboard open, focus trap, scroll lock, Escape, focus return; no page errors |
| Overflow at 360 / 390 / 768 / 1024 / 1440 | 0 px horizontal overflow on 13 pages × 5 widths |

## 16. Screenshots

The screenshots are in the session scratchpad. That folder is temporary, so download anything you want to keep.

- **Viewport shots** of 13 pages at all 5 widths: `/tmp/claude-0/-home-user-ocelectronicrecycling/1a8f2617-df75-592a-9f30-5d8faa10021a/scratchpad/shots/final/`
- **Full-page 390 px contact sheets:**
  - `/tmp/claude-0/-home-user-ocelectronicrecycling/1a8f2617-df75-592a-9f30-5d8faa10021a/scratchpad/shots/sheet-home-390.png`
  - `/tmp/claude-0/-home-user-ocelectronicrecycling/1a8f2617-df75-592a-9f30-5d8faa10021a/scratchpad/shots/sheet-pickup-390.png`
  - `/tmp/claude-0/-home-user-ocelectronicrecycling/1a8f2617-df75-592a-9f30-5d8faa10021a/scratchpad/shots/sheet-irvine-390.png`
- **1440 px grid:** `/tmp/claude-0/-home-user-ocelectronicrecycling/1a8f2617-df75-592a-9f30-5d8faa10021a/scratchpad/shots/grid-1440.png`
- **Form states:**
  - `/tmp/claude-0/-home-user-ocelectronicrecycling/1a8f2617-df75-592a-9f30-5d8faa10021a/scratchpad/shots/flow-error-390.png`
  - `/tmp/claude-0/-home-user-ocelectronicrecycling/1a8f2617-df75-592a-9f30-5d8faa10021a/scratchpad/shots/flow-success-1024.png`

Issues found and fixed during visual review:
- The documentation-table caption collapsed into a narrow column on phones.
- The custody-loop labels were unreadable under 600 px.
- "How a Irvine pickup works" used the wrong article.

## 17. Remaining warnings

- **Email:** nothing is delivered until `RESEND_API_KEY` is set. The forms then show an honest error, never a fake success.
- **Rate limiting** is in memory and per instance. Behind Vercel the IP comes from `x-forwarded-for`.
- **Blog images** are hotlinked from Unsplash and were blocked in the sandbox, so screenshots show alt text. The chat widget was blocked too. Neither is a code error.
- **Not run:** Lighthouse and an automated contrast audit.
- **Data-destruction H1:** the preserved H1 "Secure Data Destruction with Certificate" was kept, per the "targeted fixes only" rule. It's accurate only if certificates are issued for that service (owner item 5).
- **Dependency:** `framer-motion` is unused but still in `package.json`.

## 18. Search Console steps (after deploy)

1. Deploy the Vercel preview. Click through `/business-pickup` and send one real request with the mail variables set.
2. Run Lighthouse (mobile) on `/`, `/business-pickup` and one city page.
3. After production deploy, in Search Console:
   - Resubmit `https://www.ocelectronicrecycling.com/sitemap.xml`.
   - Use URL Inspection → Request Indexing for `/`, `/business-pickup`, `/services`, `/service-areas` and `/resources`.
4. Check the Rich Results Test on `/business-pickup` (FAQ, Breadcrumb) and one city page (Service, Breadcrumb).
5. Watch **Pages → Not indexed** for two weeks. The city pages changed substantially, so expect them to be recrawled.
6. Make sure the Google Business Profile matches: service-area business, no public address, the same phone number and hours.
7. Compare impressions and clicks for "business electronics pickup", "e-waste pickup Orange County" and the city-name queries against the 28 days before deploy.

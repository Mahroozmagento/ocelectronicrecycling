# Off-Site & Local SEO Checklist

Work that **cannot be completed in code** and must be done by the owner/marketer in external tools. Nothing here should use invented data — only verified business facts.

## Google Business Profile (GBP)
- [ ] Claim/verify the profile for OC Electronic Recycling.
- [ ] **Primary category:** choose the most accurate (e.g. "Electronics recycling company" / "Recycling center"); add relevant secondary categories (e.g. "Computer support and services" for ITAD).
- [ ] **Service areas:** list the Orange County cities actually served (matches `/service-areas`). Do **not** set a fake street address if there is no public office — use a service-area business (SAB) configuration.
- [ ] **Services:** add Secure Data Destruction, ITAD, E-Waste Recycling, Business Pickup, Server Decommissioning with the same conservative descriptions used on the site.
- [ ] **Description, hours, phone `(949) 287-3056`, website URL** with a UTM (e.g. `?utm_source=google&utm_medium=organic&utm_campaign=gbp`).
- [ ] **Photos:** only real operational photos (no stock implying a facility/fleet you don't have).
- [ ] **Posts / Q&A:** seed genuine FAQs; answer real questions.
- [ ] **Reviews:** ethical acquisition (ask satisfied clients); reply to all. Never buy/fake reviews.
- [ ] **NAP consistency:** name, phone, and service-area wording match the website exactly.

## Citations & directories
- [ ] Ensure consistent NAP on major directories (Bing Places, Apple Business Connect, Yelp, industry/e-waste directories).
- [ ] Find and merge/remove duplicate listings.

## Google Search Console
- [ ] Confirm verification (repo already ships `public/googlea9f5a16800a4feaa.html` and a meta tag).
- [ ] Submit `https://www.ocelectronicrecycling.com/sitemap.xml`.
- [ ] Use URL Inspection on the 3 service pages, home, and 2–3 city pages after deploy.
- [ ] Monitor Indexing → Pages for "Discovered/Crawled – not indexed" reasons.
- [ ] Review Enhancements (Breadcrumb, FAQ) and Core Web Vitals (field/CrUX).
- [ ] Track query/page performance for service + city pages; refine titles/descriptions based on real CTR.

## Bing Webmaster Tools
- [ ] Add & verify site; submit sitemap; import from GSC if convenient.

## Structured-data validation (external)
- [ ] Validate representative URLs in the [Schema.org Validator](https://validator.schema.org/) and Google [Rich Results Test](https://search.google.com/test/rich-results): home, `/services/itad`, `/services/data-destruction`, `/services/recycling`, one city page, one blog post. (Local JSON-LD parsing already verified — see AFTER report.)

## Ethical digital PR / local outreach
- [ ] Local business associations, chambers of commerce, sustainability/e-waste event partners.
- [ ] Genuinely useful resource mentions (e.g. "where to recycle electronics in OC" municipal pages).
- [ ] **No** purchased links, PBNs, link exchanges, or spam.

## Analytics (verify in the live tools)
- [ ] Confirm GA4 + Microsoft Clarity load **only after consent** (see `AnalyticsScripts`).
- [ ] Confirm the privacy-safe events fire and carry no PII: `quote_cta_click`, `phone_click`, `contact_form_start`, `contact_form_submit_success`, `contact_form_submit_error`.
- [ ] Set `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_CLARITY_ID` in the production environment.

# Company Photography Inventory

Updated 2026-11-16 for the hybrid homepage. Each photo was checked by eye; nothing here is inferred from filenames alone. The `origin/main` homepage was built and rendered locally to confirm where each photo appeared.

All files are in `public/image/`. None were deleted. Dimensions and alt text live in `lib/photos.ts`. `npm run seo:check` fails if:
- a page drops a required photo;
- the homepage hero loses the circle or the warehouse photo;
- a background band disappears;
- a declared size stops matching its file.

## The photos that matter for the homepage

| Photo (verified by eye) | File | On the old homepage (`origin/main`) | Redesign before this commit | Now |
|---|---|---|---|---|
| **Warehouse / facility:** processing floor with bins labelled laptops and phones, two staff in safety vests, logo on the back wall | `hero-facility-oc-electronic-recycling.webp` (1800×2200) | Hero, right half, at 75% opacity behind floating cards | Homepage hero photo (no circle) | **Homepage hero stage.** Uncropped, with the circular custody loop overlapping only its left edge. Phones stack copy → circle → photo. Loads eagerly with high fetch priority. Also the default social-share image |
| **Trucks:** two OC box trucks inside the warehouse beside bins labelled laptops, phones, tablets, hard drives and circuit boards | `hero-overview-oc-electronic-recycling.webp` (2056×765; a JPEG with a `.webp` name) | "FACILITY OVERVIEW" band (CSS background, 260px tall) right after the hero; also the CTA background on About, How It Works, Services and the three service pages | Inline photo in the chain-of-custody section | **Homepage "Business electronics pickup" band.** Full-width CSS background; the text sits on an ink card at the right, so both trucks and the bins stay clear. Links to `/business-pickup` |
| **Sorting floor:** staff in OC shirts at a long sorting line, logo sign above, bins labelled laptops, phones, circuit boards and tablets | `cta-bottom-oc-electronic-recycling.webp` (1967×799) | Bottom "Ready to start?" CTA background (75% dark overlay) | Inline photo in the processing section | **Homepage closing CTA.** The photo fills the right half; the text sits on solid ink at the left, never over the photo |

Only `hero-overview` shows trucks clearly. `cta-bottom` was the old homepage's other background photo; the only vehicle in it is a trailer seen through a dock door.

## Other company photos (not on the old homepage)

| File | Shows | Where it is now |
|---|---|---|
| `about-oc-electronic-recycling.webp` | Team in the warehouse beside a box truck | About hero |
| `about-team.webp` | Crew in front of two box trucks | About page, above the contact panel |
| `contact-oc-electronic-recycling.webp` | Building with OC signage at dusk, truck at the dock | Contact hero |
| `how-it-works-oc-electronic-recycling.webp` | Technician checking a laptop at a sorting bin | How It Works hero |
| `resources-oc-electronic-recycling.webp` | Staff member holding a tablet with a certificate-style document | Resources hero |
| `services-oc-electronic-recycling.webp` | Technicians at warehouse workbenches | Services hero |
| `data-destruction-…`, `itad-…`, `recycling-oc-electronic-recycling.webp` | Service-page heroes | Unchanged on the three service pages (never removed) |

## Intentionally not restored

| Item | Why |
|---|---|
| Truck photo as the CTA background on About, How It Works and Services | Each of those pages now has its own original photo in the hero, and the truck photo is the homepage's pickup band. Repeating it on three more pages would be decoration, not evidence. The three service pages still use it, unchanged. |
| `dd`, `dfd`, `gg`, `ggghh`, `jkj` | Near-identical variants of the dusk storefront already shown on Contact. They were unused on `main` too. |
| `dfdf`, `tyt` | Duplicates of the Resources photo; unused on `main` |
| `sss` | Duplicate of the Recycling photo; unused on `main` |
| `contact-hero` | A city skyline, not a company photo; unused on `main` |
| Unsplash images in blog posts | External stock images; unchanged, and not used anywhere else |

## How the images are delivered

- **Foreground photos** (`components/Photo.tsx`): `next/image` with real width and height (no layout shift), responsive `sizes` and quality 75. The hero photo uses `loading="eager"` with `fetchPriority="high"`; the others lazy-load. (`priority` is deprecated in Next 16.)
- **Background bands** (`components/PhotoBand.tsx`): CSS `image-set()` built with `getImageProps()`, as the Next 16 docs recommend, so backgrounds go through the image optimizer. There are separate sets for phones (1080px base) and desktops (1920px base). The photo layer has `role="img"` and the photo's alt text, and all information is also in the text. Bands use `content-visibility: auto`, so a band's image downloads only as it nears the viewport.
- **Measured on the homepage, before any scrolling:**

  | | Desktop 1440px | Phone 390px (3×) |
  |---|---|---|
  | Images downloaded | 176 KB | 156 KB |
  | Largest paint | Headline text, ~250ms | Headline text, ~250ms |
  | Layout shift | 0 | 0 |

  Without deferral the bands would have added about 145 KB on desktop and 325 KB on phones up front.

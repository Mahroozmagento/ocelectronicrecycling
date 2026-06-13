import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCityBySlug, getAllCitySlugs } from "@/lib/cities";

// ─── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ city: slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `https://ocelectronicrecycling.com/e-waste-recycling/${city.slug}`,
    },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `https://ocelectronicrecycling.com/e-waste-recycling/${city.slug}`,
      siteName: "OC Electronic Recycling",
      locale: "en_US",
      type: "website",
    },
  };
}

// ─── JSON-LD Schema ────────────────────────────────────────────────────────────
function CitySchema({ city }: { city: ReturnType<typeof getCityBySlug> }) {
  if (!city) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "OC Electronic Recycling",
    description: city.metaDescription,
    url: `https://ocelectronicrecycling.com/e-waste-recycling/${city.slug}`,
    telephone: "+19493450285",
    email: "info@ocelectronicrecycling.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "CA",
      postalCode: city.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Orange County",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "E-Waste Recycling Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business E-Waste Pickup",
            description: `Free scheduled pickup for businesses in ${city.name}`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Certified Data Destruction",
            description: "NIST 800-88 compliant data wiping and destruction",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "IT Asset Disposition (ITAD)",
            description: `Full ITAD services for ${city.name} businesses`,
          },
        },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Accepted Items List ───────────────────────────────────────────────────────
const acceptedItems = [
  { icon: "💻", label: "Laptops & Desktops" },
  { icon: "🖥️", label: "Monitors & Displays" },
  { icon: "📱", label: "Phones & Tablets" },
  { icon: "🖨️", label: "Printers & Copiers" },
  { icon: "📺", label: "TVs (all types)" },
  { icon: "🖥️", label: "Servers & Networking" },
  { icon: "🔋", label: "Batteries & UPS" },
  { icon: "⌨️", label: "Peripherals & Cables" },
  { icon: "📷", label: "Cameras & AV Equipment" },
  { icon: "🎮", label: "Game Consoles" },
  { icon: "📠", label: "Office Electronics" },
  { icon: "💾", label: "Hard Drives & Storage" },
];

// ─── Process Steps ─────────────────────────────────────────────────────────────
const processSteps = [
  {
    number: "01",
    title: "Schedule Pickup",
    description:
      "Call or fill out our form. We'll confirm a pickup time that works for you — same week availability for most locations.",
  },
  {
    number: "02",
    title: "We Come to You",
    description:
      "Our team arrives at your location, loads all electronics, and provides a pickup manifest listing every item collected.",
  },
  {
    number: "03",
    title: "Data Destruction",
    description:
      "All storage devices are wiped or shredded following NIST 800-88 standards. You receive a certificate of destruction.",
  },
  {
    number: "04",
    title: "Responsible Recycling",
    description:
      "Electronics are processed by California DTSC-compliant facilities. Nothing goes to landfill. You receive a recycling certificate.",
  },
];

// ─── FAQ Data (shared + optional city-specific) ────────────────────────────────
function getFAQs(city: NonNullable<ReturnType<typeof getCityBySlug>>) {
  const base = [
    {
      q: `Is e-waste recycling free in ${city.name}?`,
      a: `Business pickup is free for qualifying volumes in ${city.name}. Residential pickup is available — contact us for details based on your item count and location.`,
    },
    {
      q: "What electronics do you accept?",
      a: "We accept computers, laptops, monitors, TVs, phones, tablets, printers, servers, networking equipment, batteries, and most other electronics. Call us if you're unsure about a specific item.",
    },
    {
      q: "How do you handle data security?",
      a: "All storage media is processed following NIST 800-88 guidelines — either overwritten using DoD-grade software or physically shredded. You receive a certificate of data destruction for every job.",
    },
    {
      q: `Do you serve businesses in ${city.name}?`,
      a: `Yes — we provide IT Asset Disposition (ITAD), server decommissioning, and bulk electronics recycling for businesses of all sizes throughout ${city.name}. Free pickup for qualifying volumes.`,
    },
    {
      q: "Are you compliant with California regulations?",
      a: "Yes. We operate in compliance with California's Electronic Waste Recycling Act and California DTSC regulations. All materials are processed through certified downstream vendors.",
    },
  ];
  if (city.faqExtra) {
    base.splice(2, 0, city.faqExtra);
  }
  return base;
}

// ─── Page Component ────────────────────────────────────────────────────────────
export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const faqs = getFAQs(city);

  // Nearby cities for internal linking (pick 5 random others)
  const nearbyCities = cities
    .filter((c) => c.slug !== city.slug)
    .slice(0, 5);

  return (
    <>
      <CitySchema city={city} />

      {/* ── Hero ── */}
      <section className="city-hero">
        <div className="city-hero__eyebrow">
          <span className="badge">Orange County, CA</span>
          <span className="badge badge--outline">Free Business Pickup</span>
        </div>
        <h1 className="city-hero__title">
          E-Waste Recycling in{" "}
          <span className="city-hero__city-name">{city.name}</span>
        </h1>
        <p className="city-hero__subtitle">{city.tagline}</p>
        <p className="city-hero__description">{city.description}</p>

        <div className="city-hero__stats">
          <div className="stat-pill">
            <span className="stat-pill__value">{city.heroStat}</span>
            <span className="stat-pill__label">{city.heroStatLabel}</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill__value">NIST</span>
            <span className="stat-pill__label">800-88 Data Destruction</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill__value">CA</span>
            <span className="stat-pill__label">DTSC Compliant</span>
          </div>
        </div>

        <div className="city-hero__cta">
          <a href="tel:+19493450285" className="btn btn--primary btn--lg">
            📞 (949) 345-0285
          </a>
          <Link href="/contact" className="btn btn--outline btn--lg">
            Schedule Pickup →
          </Link>
        </div>
      </section>

      {/* ── Local Context ── */}
      <section className="city-local">
        <div className="city-local__inner">
          <div className="city-local__badge">📍 Serving {city.name}</div>
          <p className="city-local__text">{city.localDetail}</p>
          <p className="city-local__landmark">
            Near <strong>{city.nearbyLandmark}</strong> and throughout{" "}
            {city.name}
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="city-services">
        <div className="section-label">Our Services in {city.name}</div>
        <h2 className="section-title">
          Complete Electronics Recycling & ITAD
        </h2>
        <div className="services-grid">
          <div className="service-card service-card--green">
            <div className="service-card__icon">♻️</div>
            <h3>E-Waste Recycling</h3>
            <p>
              Drop-off or scheduled pickup for all electronics. Computers, TVs,
              phones, printers — we take it all.
            </p>
            <Link href="/services/recycling" className="service-card__link">
              Learn more →
            </Link>
          </div>
          <div className="service-card service-card--blue">
            <div className="service-card__icon">🔒</div>
            <h3>Certified Data Destruction</h3>
            <p>
              NIST 800-88 compliant data wiping and physical destruction for
              hard drives and storage media. Certificate provided.
            </p>
            <Link href="/services/data-destruction" className="service-card__link">
              Learn more →
            </Link>
          </div>
          <div className="service-card service-card--dark">
            <div className="service-card__icon">🏢</div>
            <h3>IT Asset Disposition</h3>
            <p>
              Full ITAD services for {city.name}&apos;s{" "}
              {city.businessFocus}. Pickups, manifests, and certified
              downstream processing.
            </p>
            <Link href="/services/itad" className="service-card__link">
              Learn more →
            </Link>
          </div>
          <div className="service-card service-card--dark">
            <div className="service-card__icon">🖥️</div>
            <h3>Server Decommissioning</h3>
            <p>
              End-to-end server room and data center teardown with full chain of
              custody documentation.
            </p>
            <Link href="/services" className="service-card__link">
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Accepted Items ── */}
      <section className="city-items">
        <div className="section-label">What We Accept</div>
        <h2 className="section-title">
          We Recycle All Electronics in {city.name}
        </h2>
        <div className="items-grid">
          {acceptedItems.map((item) => (
            <div key={item.label} className="item-chip">
              <span className="item-chip__icon">{item.icon}</span>
              <span className="item-chip__label">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="items-note">
          Don&apos;t see your item?{" "}
          <a href="tel:+19493450285">Call us at (949) 345-0285</a> — we likely
          accept it.
        </p>
      </section>

      {/* ── Process ── */}
      <section className="city-process">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Simple 4-Step Process</h2>
        <div className="process-grid">
          {processSteps.map((step) => (
            <div key={step.number} className="process-step">
              <div className="process-step__number">{step.number}</div>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__desc">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="city-why">
        <div className="section-label">Why OC Electronic Recycling</div>
        <h2 className="section-title">
          {city.name}&apos;s Trusted E-Waste Partner
        </h2>
        <div className="why-grid">
          {[
            {
              icon: "🛡️",
              title: "Data Security First",
              desc: "Every storage device is destroyed or wiped to NIST 800-88 standards. You receive a certificate of destruction.",
            },
            {
              icon: "✅",
              title: "California Compliant",
              desc: "We operate under California's Electronic Waste Recycling Act and DTSC regulations — no shortcuts, no liability for you.",
            },
            {
              icon: "🚛",
              title: "Free Business Pickup",
              desc: "We come to your office, warehouse, or facility in " + city.name + " — no fees for qualifying business volumes.",
            },
            {
              icon: "📄",
              title: "Full Documentation",
              desc: "Every job includes a pickup manifest, data destruction certificate, and recycling certificate for your records.",
            },
            {
              icon: "🌱",
              title: "Zero Landfill Policy",
              desc: "Nothing we collect goes to landfill. All materials are processed through certified responsible recycling facilities.",
            },
            {
              icon: "📞",
              title: "Local OC Team",
              desc: "We're based in Orange County and know " + city.name + " well. Fast response, real people, no call centers.",
            },
          ].map((item) => (
            <div key={item.title} className="why-card">
              <div className="why-card__icon">{item.icon}</div>
              <h3 className="why-card__title">{item.title}</h3>
              <p className="why-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="city-faq">
        <div className="section-label">FAQ</div>
        <h2 className="section-title">
          E-Waste Recycling Questions for {city.name}
        </h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-item__question">{faq.q}</summary>
              <p className="faq-item__answer">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Internal Links ── */}
      <section className="city-nearby">
        <p className="city-nearby__label">Also Serving Nearby Cities</p>
        <div className="city-nearby__links">
          {nearbyCities.map((c) => (
            <Link
              key={c.slug}
              href={`/e-waste-recycling/${c.slug}`}
              className="city-nearby__link"
            >
              {c.name}
            </Link>
          ))}
          <Link href="/service-areas" className="city-nearby__link city-nearby__link--all">
            View All 34 Cities →
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="city-cta">
        <h2 className="city-cta__title">
          Ready to Recycle Electronics in {city.name}?
        </h2>
        <p className="city-cta__sub">
          Call us or schedule a pickup online. Same-week availability for most
          {city.name} locations.
        </p>
        <div className="city-cta__buttons">
          <a href="tel:+19493450285" className="btn btn--primary btn--xl">
            Call (949) 345-0285
          </a>
          <Link href="/contact" className="btn btn--ghost btn--xl">
            Schedule Online →
          </Link>
        </div>
        <p className="city-cta__fine">
          Serving all of {city.name} and Orange County •{" "}
          <a href="mailto:info@ocelectronicrecycling.com">
            info@ocelectronicrecycling.com
          </a>
        </p>
      </section>
    </>
  );
}

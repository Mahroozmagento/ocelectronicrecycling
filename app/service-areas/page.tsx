import { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "E-Waste Recycling Service Areas | All 34 Orange County Cities | OC Electronic Recycling",
  description:
    "OC Electronic Recycling serves all 34 cities in Orange County, CA. Free business pickup, certified data destruction, and responsible electronics disposal. Find your city.",
  alternates: {
    canonical: "https://ocelectronicrecycling.com/service-areas",
  },
};

// Sort cities alphabetically for the hub page
const sortedCities = [...cities].sort((a, b) => a.name.localeCompare(b.name));

export default function ServiceAreasPage() {
  return (
    <div className="areas-page">
      {/* Hero */}
      <section className="areas-hero">
        <div className="section-label">Service Coverage</div>
        <h1 className="areas-hero__title">
          Serving All of <span className="text-accent">Orange County</span>
        </h1>
        <p className="areas-hero__sub">
          OC Electronic Recycling provides certified e-waste recycling, ITAD,
          and data destruction throughout all 34 cities in Orange County,
          California. Free business pickup. Same-week scheduling.
        </p>
        <div className="areas-hero__cta">
          <a href="tel:+19493450285" className="btn btn--primary btn--lg">
            📞 (949) 345-0285
          </a>
          <Link href="/contact" className="btn btn--outline btn--lg">
            Schedule Pickup →
          </Link>
        </div>
      </section>

      {/* City Grid */}
      <section className="areas-grid-section">
        <div className="section-label">All Cities We Serve</div>
        <h2 className="section-title">34 Orange County Cities</h2>
        <div className="areas-city-grid">
          {sortedCities.map((city) => (
            <Link
              key={city.slug}
              href={`/e-waste-recycling/${city.slug}`}
              className="city-tile"
            >
              <div className="city-tile__name">{city.name}</div>
              <div className="city-tile__zip">{city.zip}</div>
              <div className="city-tile__focus">{city.businessFocus.split(",")[0]}</div>
              <div className="city-tile__arrow">→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coverage Map Note */}
      <section className="areas-coverage">
        <div className="areas-coverage__inner">
          <h2>Full Orange County Coverage</h2>
          <p>
            From Anaheim in the north to San Clemente in the south, from the
            coast at Laguna Beach and Newport Beach to the inland communities of
            Yorba Linda and Placentia — OC Electronic Recycling covers all of
            Orange County with the same certified, compliant service.
          </p>
          <p>
            Don&apos;t see your city? Call us at{" "}
            <a href="tel:+19493450285">(949) 345-0285</a> — we likely service
            your area.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="city-cta">
        <h2 className="city-cta__title">Ready to Schedule a Pickup?</h2>
        <p className="city-cta__sub">
          Free business pickup throughout Orange County. Same-week availability.
        </p>
        <div className="city-cta__buttons">
          <a href="tel:+19493450285" className="btn btn--primary btn--xl">
            Call (949) 345-0285
          </a>
          <Link href="/contact" className="btn btn--ghost btn--xl">
            Contact Us Online →
          </Link>
        </div>
      </section>
    </div>
  );
}

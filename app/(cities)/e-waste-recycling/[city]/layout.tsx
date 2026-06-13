import Link from "next/link";

export default function CityPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="city-page-wrapper">
      {/* Breadcrumb */}
      <nav className="city-breadcrumb" aria-label="Breadcrumb">
        <ol className="city-breadcrumb__list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/service-areas">Service Areas</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page">E-Waste Recycling</li>
        </ol>
      </nav>

      <main className="city-page-main">{children}</main>
    </div>
  );
}

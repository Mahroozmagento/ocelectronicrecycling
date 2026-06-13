'use client'
// components/BlogHeroClient.tsx
// Animated hero content for blog pages — must be client component
import AnimateIn from "@/components/AnimateIn";

interface BlogIndexHeroProps {
  colorMap: Record<string, { label: string; bg: string; border: string; text: string; dot: string }>;
}

export function BlogIndexHero({ colorMap }: BlogIndexHeroProps) {
  return (
    <section className="blog-hero">
      <AnimateIn from="fade" delay={0} duration={0.5}>
        <div className="section-label">Resources & Insights</div>
      </AnimateIn>
      <AnimateIn from="up" delay={0.1} duration={0.7}>
        <h1 className="blog-hero__title">
          The OC Electronics Recycling{" "}
          <span style={{ color: "#00e676" }}>Blog</span>
        </h1>
      </AnimateIn>
      <AnimateIn from="up" delay={0.2} duration={0.65}>
        <p className="blog-hero__sub">
          Guides, compliance advice, and local tips for Orange County businesses
          and residents navigating e-waste recycling and data security.
        </p>
      </AnimateIn>
      <AnimateIn from="up" delay={0.3} duration={0.6}>
        <div className="blog-legend">
          {(["green", "blue", "red"] as const).map((color) => {
            const c = colorMap[color];
            return (
              <div
                key={color}
                className="blog-legend__item"
                style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
              >
                <span className="blog-legend__dot" style={{ background: c.dot }} />
                {c.label}
              </div>
            );
          })}
        </div>
      </AnimateIn>
    </section>
  );
}

interface BlogSlugHeroProps {
  title: string;
  category: string;
  keyword: string;
  publishDate: string;
  readTime: string;
  excerpt: string;
  c: { text: string; bg: string; border: string; dot: string };
}

export function BlogSlugHeroContent({
  title, category, keyword, publishDate, readTime, c,
}: BlogSlugHeroProps) {
  return (
    <div className="blog-post-hero__content">
      <AnimateIn from="fade" delay={0} duration={0.4}>
        <nav className="blog-post-hero__breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/blog">Blog</a>
          <span>/</span>
          <span>{category}</span>
        </nav>
      </AnimateIn>
      <AnimateIn from="fade" delay={0.1} duration={0.4}>
        <div
          className="blog-post-hero__badge"
          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.dot }}
        >
          <span className="blog-post-hero__badge-dot" style={{ background: c.dot }} />
          {category}
        </div>
      </AnimateIn>
      <AnimateIn from="up" delay={0.15} duration={0.7}>
        <h1 className="blog-post-hero__title">{title}</h1>
      </AnimateIn>
      <AnimateIn from="up" delay={0.28} duration={0.6}>
        <div className="blog-post-hero__meta">
          <span className="blog-post-hero__date">
            {new Date(publishDate).toLocaleDateString("en-US", {
              month: "long", day: "numeric", year: "numeric",
            })}
          </span>
          <span className="blog-post-hero__divider">·</span>
          <span className="blog-post-hero__read-time">{readTime}</span>
          <span className="blog-post-hero__divider">·</span>
          <span style={{ color: c.dot, fontSize: "0.82rem" }}>{keyword}</span>
        </div>
      </AnimateIn>
    </div>
  );
}

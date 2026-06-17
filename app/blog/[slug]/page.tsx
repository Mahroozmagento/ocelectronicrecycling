import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/posts/blog-data";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://ocelectronicrecycling.com/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishDate,
      images: [`https://images.unsplash.com/${post.unsplashId}?auto=format&fit=crop&w=1200&q=80`],
    },
  };
}

const colorMap = {
  green: { text: "#00c853", bg: "rgba(0,230,118,0.08)", border: "rgba(0,230,118,0.25)", dot: "#00e676" },
  blue:  { text: "#0288d1", bg: "rgba(41,182,246,0.08)", border: "rgba(41,182,246,0.25)", dot: "#29b6f6" },
  red:   { text: "#e53935", bg: "rgba(239,83,80,0.08)", border: "rgba(239,83,80,0.25)", dot: "#ef5350" },
};

function ArticleSchema({ post }: { post: (typeof blogPosts)[0] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    image: `https://images.unsplash.com/${post.unsplashId}?auto=format&fit=crop&w=1200&q=80`,
    author: { "@type": "Organization", name: "OC Electronic Recycling" },
    publisher: { "@type": "Organization", name: "OC Electronic Recycling", url: "https://ocelectronicrecycling.com" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function renderMarkdown(raw: string): string {
  const lines = raw.split("\n");
  const out: string[] = [];
  let inUl = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Inline formatting first
    line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    line = line.replace(/\*(.+?)\*/g, "<em>$1</em>");
    line = line.replace(/`([^`]+)`/g, "<code>$1</code>");
    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Headings
    if (line.startsWith("## ")) {
      if (inUl) { out.push("</ul>"); inUl = false; }
      out.push(`<h2>${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      if (inUl) { out.push("</ul>"); inUl = false; }
      out.push(`<h3>${line.slice(4)}</h3>`);
      continue;
    }

    // List items
    if (line.startsWith("- ")) {
      if (!inUl) { out.push("<ul>"); inUl = true; }
      out.push(`<li>${line.slice(2)}</li>`);
      continue;
    }

    // Table rows (skip — tables are rare, treat as paragraphs)
    if (line.startsWith("|")) {
      if (inUl) { out.push("</ul>"); inUl = false; }
      // Simple: wrap entire table line in a div
      out.push(`<p style="font-family:monospace;font-size:0.85em">${line}</p>`);
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      if (inUl) { out.push("</ul>"); inUl = false; }
      continue;
    }

    // Regular paragraph line
    if (inUl) { out.push("</ul>"); inUl = false; }
    out.push(`<p>${line}</p>`);
  }

  if (inUl) out.push("</ul>");
  return out.join("\n");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const c = colorMap[post.keywordColor];
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.keywordColor === post.keywordColor).slice(0, 3);
  const moreArticles = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const htmlContent = renderMarkdown(post.content);

  return (
    <>
      <ArticleSchema post={post} />

      {/* ── HERO ── */}
      <div className="blog-post-hero">
        <Image
          src={`https://images.unsplash.com/${post.unsplashId}?auto=format&fit=crop&w=1600&q=80`}
          alt={post.unsplashAlt}
          fill
          unoptimized
          priority
          className="blog-post-hero__img"
          sizes="100vw"
        />
        <div className="blog-post-hero__overlay" />
        <div className="blog-post-hero__content">
          <nav className="blog-post-hero__breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span>{post.category}</span>
          </nav>
          <div className="blog-post-hero__badge"
            style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.dot }}>
            <span className="blog-post-hero__badge-dot" style={{ background: c.dot }} />
            {post.category}
          </div>
          <h1 className="blog-post-hero__title">{post.title}</h1>
          <div className="blog-post-hero__meta">
            <span className="blog-post-hero__date">
              {new Date(post.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="blog-post-hero__divider">·</span>
            <span className="blog-post-hero__read-time">{post.readTime}</span>
            <span className="blog-post-hero__divider">·</span>
            <span style={{ color: c.dot, fontSize: "0.82rem" }}>{post.keyword}</span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="blog-post-layout">
        <div className="blog-post-container" style={{ width: '100%' }}>

          {/* Article */}
          <article className="blog-post-article">
            <p className="blog-post-lead">{post.excerpt}</p>
            <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

            {/* CTA */}
            <div className="blog-post-cta" style={{ borderColor: c.dot }}>
              <div className="blog-post-cta__icon">♻️</div>
              <div className="blog-post-cta__body">
                <h3 className="blog-post-cta__title">Ready to Recycle Your Electronics in Orange County?</h3>
                <p className="blog-post-cta__text">
                  OC Electronic Recycling provides free business pickup, certified data destruction,
                  and same-week scheduling across all Orange County cities.
                </p>
                <div className="blog-post-cta__actions">
                  <Link href="/contact" className="blog-post-cta__btn blog-post-cta__btn--primary"
                    style={{ background: c.dot, color: "#07080f" }}>
                    Schedule Free Pickup
                  </Link>
                  <a href="tel:9493450285" className="blog-post-cta__btn blog-post-cta__btn--secondary">
                    (949) 345-0285
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="blog-post-sidebar">
            <div className="blog-sidebar__tag"
              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
              <span className="blog-sidebar__tag-dot" style={{ background: c.dot }} />
              {post.keyword}
            </div>

            <div className="blog-sidebar__contact">
              <div className="blog-sidebar__contact-title">Free Pickup Available</div>
              <p className="blog-sidebar__contact-text">
                Schedule your Orange County electronics pickup today. No minimum quantity for data destruction.
              </p>
              <a href="tel:9493450285" className="blog-sidebar__contact-phone">(949) 345-0285</a>
              <Link href="/contact" className="blog-sidebar__contact-btn">Get a Free Quote</Link>
            </div>

            <div className="blog-sidebar__services">
              <div className="blog-sidebar__services-title">Our Services</div>
              <ul className="blog-sidebar__services-list">
                {[
                  { href: "/data-destruction", label: "🔒 Certified Data Destruction" },
                  { href: "/itad", label: "📦 IT Asset Disposition" },
                  { href: "/recycling", label: "♻️ Electronics Recycling" },
                  { href: "/contact", label: "🖥️ Business Pickup" },
                ].map((s) => (
                  <li key={s.href}><Link href={s.href}>{s.label}</Link></li>
                ))}
              </ul>
            </div>

            {related.length > 0 && (
              <div className="blog-sidebar__related">
                <div className="blog-sidebar__related-title">Related Articles</div>
                <ul className="blog-sidebar__related-list">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="blog-sidebar__related-item">
                        <div className="blog-sidebar__related-thumb">
                          <Image
                            src={`https://images.unsplash.com/${r.unsplashId}?auto=format&fit=crop&w=120&q=60`}
                            alt={r.unsplashAlt}
                            width={70}
                            height={52}
                            unoptimized
                            className="blog-sidebar__related-img"
                          />
                        </div>
                        <div className="blog-sidebar__related-text">
                          <span className="blog-sidebar__related-post-title">{r.title}</span>
                          <span className="blog-sidebar__related-read-time">{r.readTime}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ── MORE ARTICLES ── */}
      <section className="blog-post-more">
        <div className="blog-post-more__inner">
          <h2 className="blog-post-more__title">More Articles</h2>
          <div className="blog-post-more__grid">
            {moreArticles.map((p) => {
              const mc = colorMap[p.keywordColor];
              return (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-more-card">
                  <div className="blog-more-card__img-wrap">
                    <Image
                      src={`https://images.unsplash.com/${p.unsplashId}?auto=format&fit=crop&w=400&q=70`}
                      alt={p.unsplashAlt}
                      fill
                      unoptimized
                      className="blog-more-card__img"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="blog-more-card__body">
                    <span className="blog-more-card__cat" style={{ color: mc.dot }}>{p.category}</span>
                    <h3 className="blog-more-card__title">{p.title}</h3>
                    <span className="blog-more-card__time">{p.readTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="blog-post-more__cta">
            <Link href="/blog" className="blog-post-more__btn">View All Articles</Link>
          </div>
        </div>
      </section>
    </>
  );
}

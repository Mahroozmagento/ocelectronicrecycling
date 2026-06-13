import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/posts/blog-data";
import { BlogIndexHero } from "@/components/BlogHeroClient";
import AnimateIn from "@/components/AnimateIn";

export const metadata = {
  title: "Blog | OC Electronic Recycling",
  description:
    "Guides, compliance advice, and local tips for Orange County businesses and residents navigating e-waste recycling and data security.",
};

const colorMap = {
  green: {
    label: "Local / Conversion",
    text: "#00c853",
    bg: "rgba(0,230,118,0.08)",
    border: "rgba(0,230,118,0.25)",
    dot: "#00e676",
  },
  blue: {
    label: "Educational",
    text: "#0288d1",
    bg: "rgba(41,182,246,0.08)",
    border: "rgba(41,182,246,0.25)",
    dot: "#29b6f6",
  },
  red: {
    label: "B2B / Commercial",
    text: "#e53935",
    bg: "rgba(239,83,80,0.08)",
    border: "rgba(239,83,80,0.25)",
    dot: "#ef5350",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <BlogIndexHero colorMap={colorMap} />

      <section className="blog-grid-section">
        <div className="blog-grid">
          {blogPosts.map((post, i) => {
            const c = colorMap[post.keywordColor];
            return (
              <AnimateIn key={post.slug} from="up" delay={(i % 4) * 0.05} duration={0.5}>
                <Link href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card__img-wrap">
                    <Image
                      src={`https://images.unsplash.com/${post.unsplashId}?auto=format&fit=crop&w=600&q=70`}
                      alt={post.unsplashAlt}
                      fill
                      unoptimized
                      className="blog-card__img"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <span className="blog-card__category">{post.category}</span>
                  </div>
                  <div className="blog-card__body">
                    <div
                      className="blog-card__tag"
                      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                    >
                      <span className="blog-card__tag-dot" style={{ background: c.dot }} />
                      {post.keyword}
                    </div>
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <div className="blog-card__meta">
                      <span>
                        {new Date(post.publishDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="blog-card__divider">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <span className="blog-card__readmore">Read Article →</span>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>
      </section>
    </>
  );
}

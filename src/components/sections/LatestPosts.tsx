import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { blogService, type BlogPost } from "@/lib/blogService";

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";

const LatestPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    blogService
      .fetchPublished()
      .then((all) => setPosts(all.slice(0, 3)))
      .catch((e) => console.error("Failed to load latest posts:", e))
      .finally(() => setLoaded(true));
  }, []);

  // Don't render the section until we know there's something to show.
  if (!loaded || posts.length === 0) return null;

  return (
    <section className="bg-brand-cream py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-brand-copper text-xs tracking-[0.3em] uppercase block mb-2">The Journal</span>
            <h2 className="text-brand-espresso font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
              Latest from the blog
            </h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-brand-copper font-medium text-sm hover:gap-2.5 transition-all shrink-0">
            View all posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-xl overflow-hidden border border-brand-border hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[16/10] bg-brand-sand overflow-hidden">
                {post.cover_image_url ? (
                  <img src={post.cover_image_url} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-muted/40" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem" }}>D&amp;S</div>
                )}
              </div>
              <div className="flex flex-col flex-grow p-5">
                <div className="flex items-center gap-2 text-xs text-brand-muted mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.published_at)}
                  {post.author && <span>· {post.author}</span>}
                </div>
                <h3 className="text-lg font-semibold text-brand-espresso leading-snug" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {post.title}
                </h3>
                {post.excerpt && <p className="text-sm text-brand-muted mt-2 line-clamp-2 flex-grow">{post.excerpt}</p>}
                <span className="inline-flex items-center gap-1.5 mt-4 text-brand-copper text-sm font-medium group-hover:gap-2.5 transition-all">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;

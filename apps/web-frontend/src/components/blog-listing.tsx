import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import {
  RiArrowRightLine,
  RiCalendarLine,
  RiSearchLine,
  RiUser3Line,
  RiCloseLine,
} from "@remixicon/react";

const topicLabels: Record<string, string> = {
  "general": "General",
  "server/minigames": "Minigames",
  "server/modded-creative": "Modded Creative",
  "server/survival": "Survival",
};

export interface BlogPost {
  id: string;
  title: string;
  description?: string;
  date: string;
  authors: string[];
  topics: string[];
  tags?: string[];
}

interface BlogListingProps {
  posts: BlogPost[];
  className?: string;
}

const BlogListing = ({ posts, className }: BlogListingProps) => {
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Derive all unique topics and tags from posts
  const allTopics = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.topics.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return posts
      .filter((p) => {
        if (activeTopic && !p.topics.includes(activeTopic)) return false;
        if (activeTag && !(p.tags ?? []).includes(activeTag)) return false;
        if (q) {
          return (
            p.title.toLowerCase().includes(q) ||
            (p.description ?? "").toLowerCase().includes(q) ||
            (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts, search, activeTopic, activeTag]);

  const hasActiveFilters = !!activeTopic || !!activeTag || !!search;

  const clearFilters = () => {
    setSearch("");
    setActiveTopic(null);
    setActiveTag(null);
  };

  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="space-y-10">
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight lg:text-5xl">Blog</h1>
            <p className="text-muted-foreground lg:text-lg">
              Updates, announcements, and stories from the Miners Online team.
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-sm">
              <RiSearchLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Topic filters */}
            {allTopics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {allTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() =>
                      setActiveTopic((prev) => (prev === topic ? null : topic))
                    }
                    className={cn(
                      "inline-flex items-center rounded-4xl border px-3 py-1 text-xs font-medium transition-colors",
                      activeTopic === topic
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:bg-muted"
                    )}
                  >
                    {topicLabels[topic] ?? topic}
                  </button>
                ))}
              </div>
            )}

            {/* Tag filters */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setActiveTag((prev) => (prev === tag ? null : tag))
                    }
                    className={cn(
                      "inline-flex items-center rounded-4xl border px-3 py-1 text-xs font-medium transition-colors",
                      activeTag === tag
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:bg-muted"
                    )}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <RiCloseLine className="size-4" />
                Clear filters
              </button>
            )}
          </div>

          {/* Post list */}
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">No posts match your filters.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const resolvedAuthors = post.authors.map((key) => {
    const author = siteConfig.blog.authors[key];
    return author ? author.name : key;
  });

  const href = `/blog/${post.id}`;

  return (
    <article className="flex h-full flex-col rounded-md border border-border bg-card p-6">
      {/* Topics */}
      {post.topics.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {post.topics.map((topic) => (
            <Badge key={topic} variant="secondary">
              {topicLabels[topic] ?? topic}
            </Badge>
          ))}
        </div>
      )}

      {/* Title */}
      <h2 className="text-lg font-semibold tracking-tight leading-snug text-pretty">
        <a href={href} className="hover:text-primary transition-colors">
          {post.title}
        </a>
      </h2>

      {/* Description */}
      {post.description && (
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.description}
        </p>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Metadata */}
      <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <RiCalendarLine className="size-4 shrink-0" />
          <time dateTime={post.date}>{formattedDate}</time>
        </div>
        <div className="flex items-center gap-1.5">
          <RiUser3Line className="size-4 shrink-0" />
          <span>{resolvedAuthors.join(", ")}</span>
        </div>
      </div>

      {/* Read more */}
      <div className="mt-4">
        <Button asChild variant="default" size="sm">
          <a href={href}>
            Read more
            <RiArrowRightLine className="size-4" />
          </a>
        </Button>
      </div>
    </article>
  );
};

export { BlogListing, BlogPostCard };

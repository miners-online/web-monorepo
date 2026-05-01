import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import { RiArrowRightLine, RiCalendarLine, RiUser3Line } from "@remixicon/react";
import type { BlogPost } from "@/components/blog-listing";

const topicLabels: Record<string, string> = {
  "general": "General",
  "server/minigames": "Minigames",
  "server/modded-creative": "Modded Creative",
  "server/survival": "Survival",
};

interface BlogListingMinimalProps {
  posts: BlogPost[];
  className?: string;
}

const BlogListingMinimal = ({ posts, className }: BlogListingMinimalProps) => {
  const recent = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <section className={cn("py-24", className)}>
      <div className="container mx-auto">
        <div className="space-y-8">
          {/* Heading row */}
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold tracking-tight lg:text-5xl">
                Latest from the blog
              </h2>
              <p className="text-muted-foreground">
                Catch up on the most recent posts from the Miners Online team.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden shrink-0 sm:inline-flex">
              <a href="/blog">
                All posts
                <RiArrowRightLine className="size-4" />
              </a>
            </Button>
          </div>

          {/* Card grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <MinimalPostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Mobile "All posts" button */}
          <div className="sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <a href="/blog">
                All posts
                <RiArrowRightLine className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const MinimalPostCard = ({ post }: { post: BlogPost }) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const resolvedAuthors = post.authors.map((key) => {
    const author = siteConfig.blog.authors[key];
    return author ? author.name : key;
  });

  const href = `/${post.id}`;

  return (
    <article className="group flex h-full flex-col rounded-md border border-border bg-card p-6 transition-colors hover:border-primary/40">
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
      <h3 className="text-base font-semibold tracking-tight leading-snug text-pretty">
        <a href={href} className="hover:text-primary transition-colors">
          {post.title}
        </a>
      </h3>

      {/* Description */}
      {post.description && (
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.description}
        </p>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Metadata */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <RiCalendarLine className="size-3.5" />
          <time dateTime={post.date}>{formattedDate}</time>
        </span>
        <span className="flex items-center gap-1">
          <RiUser3Line className="size-3.5" />
          {resolvedAuthors.join(", ")}
        </span>
      </div>
    </article>
  );
};

export { BlogListingMinimal };
export type { BlogListingMinimalProps };

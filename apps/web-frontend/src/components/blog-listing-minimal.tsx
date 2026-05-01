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

          {/* Post list */}
          <div className="divide-y divide-border">
            {recent.map((post) => (
              <MinimalPostRow key={post.id} post={post} />
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

const MinimalPostRow = ({ post }: { post: BlogPost }) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const resolvedAuthors = post.authors.map((key) => {
    const author = siteConfig.blog.authors[key];
    return author ? author.name : key;
  });

  const href = `/blog/${post.id}`;

  return (
    <article className="group flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
      {/* Topic badge — always visible, left-aligned or top on mobile */}
      <div className="flex shrink-0 gap-1.5">
        {post.topics.map((topic) => (
          <Badge key={topic} variant="secondary">
            {topicLabels[topic] ?? topic}
          </Badge>
        ))}
      </div>

      {/* Title + meta */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <a
          href={href}
          className="font-semibold leading-snug text-pretty transition-colors hover:text-primary line-clamp-2"
        >
          {post.title}
        </a>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <RiCalendarLine className="size-3.5" />
            <time dateTime={post.date}>{formattedDate}</time>
          </span>
          <span className="flex items-center gap-1">
            <RiUser3Line className="size-3.5" />
            {resolvedAuthors.join(", ")}
          </span>
        </div>
      </div>

      {/* Arrow link */}
      <a
        href={href}
        aria-label={`Read ${post.title}`}
        className="hidden shrink-0 text-muted-foreground transition-colors hover:text-foreground sm:block"
      >
        <RiArrowRightLine className="size-5" />
      </a>
    </article>
  );
};

export { BlogListingMinimal };
export type { BlogListingMinimalProps };

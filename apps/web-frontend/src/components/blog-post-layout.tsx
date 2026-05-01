import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import { RiArrowLeftLine, RiCalendarLine, RiPriceTag3Line, RiUser3Line } from "@remixicon/react";

const topicLabels: Record<string, string> = {
  "general": "General",
  "server/minigames": "Minigames",
  "server/modded-creative": "Modded Creative",
  "server/survival": "Survival",
};

interface BlogPostLayoutProps {
  title: string;
  description?: string;
  date: string;
  authors: string[];
  topics: string[];
  tags?: string[];
  children: React.ReactNode;
  className?: string;
}

const BlogPostLayout = ({
  title,
  description,
  date,
  authors,
  topics,
  tags,
  children,
  className,
}: BlogPostLayoutProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const resolvedAuthors = authors.map((key) => {
    const author = siteConfig.blog.authors[key];
    return author ?? { name: key, url: undefined };
  });

  return (
    <main className={cn("py-12 lg:py-16", className)}>
      <div className="container mx-auto max-w-3xl px-4">
        {/* Back link */}
        <a
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <RiArrowLeftLine className="size-4" />
          All posts
        </a>

        {/* Header */}
        <header className="mt-4 space-y-4">
          {/* Topics */}
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topicLabels[topic] ?? topic}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">
            {title}
          </h1>

          {description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <RiCalendarLine className="size-4" />
              <time dateTime={date}>{formattedDate}</time>
            </span>

            <span className="flex items-center gap-1.5">
              <RiUser3Line className="size-4" />
              <span>
                {resolvedAuthors.map((author, idx) => (
                  <span key={author.name}>
                    {author.url ? (
                      <a
                        href={author.url}
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {author.name}
                      </a>
                    ) : (
                      <span className="font-medium text-foreground">{author.name}</span>
                    )}
                    {idx < resolvedAuthors.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </span>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <RiPriceTag3Line className="size-4 text-muted-foreground" />
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <Separator className="my-8" />

        {/* Body */}
        <article className="prose-neutral text-neutral-800 dark:text-neutral-300">
          {children}
        </article>
      </div>
    </main>
  );
};

export { BlogPostLayout };
export type { BlogPostLayoutProps };

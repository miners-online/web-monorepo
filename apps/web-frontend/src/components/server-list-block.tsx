import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiArrowRightLine, RiServerLine } from "@remixicon/react";

interface ServerListItem {
  name: string;
  href: string;
  summary: string;
  version: string;
  editions: string;
  status?: string;
}

interface ServerListBlockProps {
  heading: string;
  headingId: string;
  description?: string;
  servers: ServerListItem[];
  className?: string;
}

const ServerListBlock = ({
  heading,
  headingId,
  description,
  servers,
  className,
}: ServerListBlockProps) => {
  return (
    <section className={cn("py-24", className)}>
      <div className="container mx-auto">
        <div className="space-y-10">
          <div className="space-y-3">
            <h2 id={headingId} className="text-3xl font-semibold tracking-tight lg:text-5xl">
              {heading}
            </h2>
            {description && (
              <p className="max-w-2xl text-muted-foreground lg:text-xl">
                {description}
              </p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {servers.map((server) => (
              <article
                key={server.href}
                className="flex h-full flex-col rounded-md border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <RiServerLine className="size-5 text-muted-foreground" />
                    <h3 className="text-xl font-semibold">{server.name}</h3>
                  </div>

                  {server.status && (
                    <span className="text-sm text-muted-foreground">{server.status}</span>
                  )}
                </div>

                <p className="mt-4 text-muted-foreground">{server.summary}</p>

                <dl className="mt-6 grid gap-4 border-t pt-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">Version</dt>
                    <dd className="font-medium">{server.version}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm text-muted-foreground">Editions</dt>
                    <dd className="font-medium">{server.editions}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <Button asChild variant="default">
                    <a href={server.href}>
                      Join today
                      <RiArrowRightLine className="size-4" />
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { ServerListBlock };
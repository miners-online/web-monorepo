import { cn } from "@/lib/utils";
import { RiAlertLine, RiServerLine } from "@remixicon/react";

interface ServerJoinProps {
  heading: string;
  headingId: string;
  description: string;
  ip: string;
  version: string;
  editions: string;
  note?: string;
  className?: string;
}

const ServerJoin = ({
  heading,
  headingId,
  description,
  ip,
  version,
  editions,
  note,
  className,
}: ServerJoinProps) => {
  return (
    <section className={cn("py-24", className)}>
      <div className="container mx-auto">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-5">
            <h2 id={headingId} className="text-3xl font-semibold tracking-tight text-pretty lg:text-5xl">
              {heading}
            </h2>
            <p className="max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
          </div>

          <div className="rounded-md border border-border bg-card p-6">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <RiServerLine className="size-5 text-muted-foreground" />
              <span className="font-medium">Connection details</span>
            </div>

            <dl className="mt-4 space-y-4">
              <div className="flex flex-col gap-1">
                <dt className="text-sm text-muted-foreground">IP</dt>
                <dd className="font-medium">{ip}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm text-muted-foreground">Version</dt>
                <dd className="font-medium">{version}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm text-muted-foreground">Editions</dt>
                <dd className="font-medium">{editions}</dd>
              </div>
            </dl>

            {note && (
              <div className="mt-6 flex gap-3 rounded-md border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                <RiAlertLine className="mt-0.5 size-4 shrink-0" />
                <p>{note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { ServerJoin };
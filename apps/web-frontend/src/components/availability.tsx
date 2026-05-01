import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RiAlertLine, RiCheckboxCircleLine, RiCloseCircleLine } from "@remixicon/react";

interface AvailabilityProps {
  heading: string;
  headingID: string;
  description: string;
  IP: string;
  className?: string;
}

type AvailabilityStatus = {
  state: "online" | "offline" | "warning";
  label: string;
  reason?: string;
};

function getServerAvailability(IP: string): AvailabilityStatus {
  // Simulated API response
  const mockResponses: Record<string, AvailabilityStatus> = {
    "play.minersonline.uk": {
      state: "warning",
      label: "In Development",
      reason: "This server is currently in development and is not available to play.",
    },
    "survival.mc.minersonline.uk": {
      state: "offline",
      label: "Offline",
      reason: "This server does not operate 24/7 and may be unavailable outside scheduled uptime.",
    },
    "modded-creative.mc.minersonline.uk": {
      state: "offline",
      label: "Offline",
      reason: "This server does not operate 24/7 and may be unavailable outside scheduled uptime.",
    },
  };

  return (
    mockResponses[IP] ?? {
      state: "online",
      label: "Online",
    }
  );
}

const badgeStyles: Record<AvailabilityStatus["state"], string> = {
  online:
    "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400",
  offline:
    "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
  warning:
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
};

const statusIcons = {
  online: RiCheckboxCircleLine,
  offline: RiCloseCircleLine,
  warning: RiAlertLine,
};

const Availability = ({
  heading,
  headingID,
  description,
  IP,
  className,
}: AvailabilityProps) => {
  const status = getServerAvailability(IP);
  const StatusIcon = statusIcons[status.state];

  return (
  <section className={cn("py-12", className)}>
    <div className="container mx-auto">
      <div className="rounded-md p-6 lg:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 space-y-3">
            <h2
              id={headingID}
              className="text-3xl font-semibold tracking-tight text-pretty lg:text-4xl"
            >
              {heading}
            </h2>
            <p className="max-w-2xl text-muted-foreground lg:text-lg">
              {description}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-md border border-border bg-muted/30 px-6 py-8 w-full">
            <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Current status
            </span>

            <Badge
              variant="outline"
              className={cn(
                "min-h-12 rounded-full px-5 py-2 text-base font-semibold gap-2",
                badgeStyles[status.state],
              )}
            >
              <StatusIcon className="size-5" />
              {status.label}
            </Badge>

            {status.state !== "online" && status.reason && (
              <div className="mt-2 flex max-w-xl gap-3 rounded-md border border-border bg-background/80 p-4 text-sm text-muted-foreground text-left">
                <RiAlertLine className="mt-0.5 size-4 shrink-0" />
                <p>{status.reason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export { Availability };
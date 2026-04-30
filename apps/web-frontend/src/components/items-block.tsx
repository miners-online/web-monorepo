import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

interface ItemFeature {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

interface ItemsBlockProps {
  heading: string;
  headingId: string;
  items: ItemFeature[];
  className?: string;
}

const ItemsBlock = ({ heading, headingId, items, className }: ItemsBlockProps) => {
  return (
    <section className={cn("py-24", className)}>
      <div className="container mx-auto">
        <div className="space-y-10">
          <h2 id={headingId} className="text-3xl font-semibold tracking-tight lg:text-5xl">
            {heading}
          </h2>

          <div className="space-y-6">
            {items.map((item, index) => {
              const isRight = index % 2 === 1;
              const Icon = item.icon;

              return (
                <article key={item.title} className="border-t pt-6">
                  <div
                    className={cn(
                      "flex items-center gap-3 text-xl font-semibold",
                      isRight ? "justify-end text-right" : "justify-start text-left",
                    )}
                  >
                    {!isRight && <Icon className="size-5 shrink-0" />}
                    <span>{item.title}</span>
                    {isRight && <Icon className="size-5 shrink-0" />}
                  </div>

                  <p className={cn("mt-3 text-muted-foreground", isRight ? "text-right" : "text-left")}>
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { ItemsBlock };
import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeFeaturedInventory() {
  return (
    <SectionShell>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-steel">Inventory</p>
          <h2 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
            Featured bikes
          </h2>
        </div>
        <Link
          href="/inventory"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-fit")}
        >
          View inventory
        </Link>
      </div>

      <div className="mt-10 border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
        <p className="font-display text-2xl tracking-wide text-foreground">No bikes listed yet</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Live inventory will appear here when Joe adds real units. We do not show sample or fake
          motorcycles.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact" className={cn(buttonVariants(), "joe-cta-hover")}>
            Ask Joe what&apos;s available
          </Link>
          <Link href="/inventory" className={cn(buttonVariants({ variant: "outline" }))}>
            Go to inventory
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

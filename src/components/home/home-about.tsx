import Link from "next/link";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { SectionShell } from "@/components/home/section-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeAbout() {
  return (
    <SectionShell>
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-steel">About Joe</p>
          <h2 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
            A person you can text—not a ticket number.
          </h2>
        </div>
        <div className="space-y-6 text-muted-foreground">
          <p>
            Joe helps people buy used Harley-Davidson motorcycles with clear explanations and
            follow-through. This site is his personal sales engine—built for trust first, inventory
            second.
          </p>
          <PlaceholderNotice title="[PLACEHOLDER — Joe to provide]">
            Photo of Joe, short bio, years in the business, and any dealership affiliation he is
            allowed to publish. Do not invent awards, titles, or numbers.
          </PlaceholderNotice>
          <PlaceholderNotice title="[PLACEHOLDER — Joe to provide]">
            Experience highlights (events, marketing, floor experience) in Joe&apos;s own words.
          </PlaceholderNotice>
          <Link href="/about" className={cn(buttonVariants({ variant: "outline" }), "joe-cta-hover")}>
            More about Joe
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

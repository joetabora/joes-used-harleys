import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeHarleyMatchCta() {
  return (
    <SectionShell id="harley-match" tone="asphalt">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-signal">Harley Match</p>
        <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
          Not sure which bike fits you yet?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          Harley Match will help you narrow style, budget, and experience into a clear starting
          point. The guided quiz ships in a later phase—for now, tell Joe what you want and he&apos;ll
          help you match.
        </p>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ size: "lg" }),
            "joe-cta-hover mt-8 h-12 bg-signal text-signal-foreground hover:bg-signal/90",
          )}
        >
          Tell Joe what you want
        </Link>
      </div>
    </SectionShell>
  );
}

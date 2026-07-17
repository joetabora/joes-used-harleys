import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[min(100svh,52rem)] overflow-hidden">
      <div className="joe-hero-atmosphere absolute inset-0" aria-hidden />
      <div className="joe-hero-grain absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent md:bg-gradient-to-r md:from-asphalt md:via-asphalt/85 md:to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(100svh,52rem)] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:justify-center md:pb-24 md:pt-24">
        <p className="joe-fade-up font-display text-3xl tracking-[0.08em] text-signal sm:text-4xl md:text-5xl">
          {siteConfig.name}
        </p>
        <h1 className="joe-fade-up joe-fade-up-delay-1 mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Your used Harley, with a salesperson who rides with you through the deal.
        </h1>
        <p className="joe-fade-up joe-fade-up-delay-2 mt-5 max-w-lg text-base text-white/75 sm:text-lg">
          Personal guidance for buying a used Harley-Davidson motorcycle—honest answers, no
          dealership runaround.
        </p>
        <div className="joe-fade-up joe-fade-up-delay-3 mt-8 flex w-full flex-col gap-3 sm:max-w-md sm:flex-row">
          <a
            href="#harley-match"
            className={cn(
              buttonVariants({ size: "lg" }),
              "joe-cta-hover h-12 w-full justify-center bg-signal text-signal-foreground hover:bg-signal/90 sm:flex-1",
            )}
          >
            Find My Harley
          </a>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "joe-cta-hover h-12 w-full justify-center border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white sm:flex-1",
            )}
          >
            Contact Joe
          </Link>
        </div>
      </div>
    </section>
  );
}

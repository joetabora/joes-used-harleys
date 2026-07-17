import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[min(100svh,52rem)] overflow-hidden">
      <div className="joe-hero-atmosphere absolute inset-0" aria-hidden />
      <div className="joe-hero-grain absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/50 to-transparent md:bg-gradient-to-r md:from-asphalt md:via-asphalt/80 md:to-asphalt/20"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(100svh,52rem)] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:justify-center md:pb-28 md:pt-24">
        <p className="joe-fade-up font-display text-5xl leading-none text-lamp sm:text-6xl md:text-7xl">
          {siteConfig.name}
        </p>
        <h1 className="joe-fade-up joe-fade-up-delay-1 mt-6 max-w-xl font-display text-3xl leading-[1.1] text-[oklch(0.94_0.01_85)] sm:text-4xl md:text-5xl">
          Your used Harley, with a salesperson who rides with you through the deal.
        </h1>
        <p className="joe-fade-up joe-fade-up-delay-2 mt-5 max-w-md text-[1.0625rem] leading-[1.65] text-[oklch(0.94_0.01_85_/0.72)]">
          Personal guidance for buying a used Harley-Davidson motorcycle—honest answers, no
          dealership runaround.
        </p>
        <div className="joe-fade-up joe-fade-up-delay-3 mt-10 flex w-full flex-col gap-3 sm:max-w-md sm:flex-row">
          <a href="#harley-match" className="joe-btn-primary w-full sm:flex-1">
            Find My Harley
          </a>
          <Link href="/contact" className="joe-btn-secondary-dark w-full sm:flex-1">
            Contact Joe
          </Link>
        </div>
      </div>
    </section>
  );
}

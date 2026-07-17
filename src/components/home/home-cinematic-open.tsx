import Link from "next/link";
import { MediaFrame } from "@/components/home/media-frame";
import { siteConfig } from "@/lib/site";

export function HomeCinematicOpen() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="joe-hero-atmosphere absolute inset-0" aria-hidden />
      <div className="joe-hero-grain absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/70 to-asphalt/25"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(92svh,48rem)] max-w-6xl flex-col justify-end px-4 pb-10 pt-28 md:pb-14 md:pt-32">
        <p className="joe-fade-up font-poster text-lamp">{siteConfig.name}</p>
        <h1 className="joe-fade-up joe-fade-up-delay-1 mt-8 max-w-2xl font-story text-3xl text-ink sm:text-4xl md:text-5xl">
          Pull up a stool. Let&apos;s talk motorcycles.
        </h1>
        <div className="joe-fade-up joe-fade-up-delay-2 mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link href="/contact" className="joe-btn-primary">
            Talk to Joe
          </Link>
          <a
            href="#find-your-fit"
            className="font-label text-steel underline-offset-4 transition-colors hover:text-lamp hover:underline"
          >
            Find my Harley ↓
          </a>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <MediaFrame
          variant="hero"
          label="[PLACEHOLDER — garage / road atmosphere when Joe provides a photo]"
          className="border-white/15 bg-asphalt/50"
        />
      </div>
    </section>
  );
}

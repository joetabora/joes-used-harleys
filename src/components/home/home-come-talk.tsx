import Link from "next/link";
import { hasContactPhone, siteConfig } from "@/lib/site";

export function HomeComeTalk() {
  const phoneReady = hasContactPhone();

  return (
    <section className="joe-asphalt-bay relative overflow-hidden">
      <div className="joe-hero-grain absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-28 text-center md:px-8 md:py-40">
        <p className="joe-kicker justify-center">Come talk</p>
        <h2 className="joe-mega mt-8 text-[clamp(2.75rem,9.5vw,9.5rem)] text-ink">
          Let&apos;s find
          <span className="block text-lamp">your Harley.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-[1.7] text-ink/75">
          A model you&apos;re curious about, a budget you&apos;re working with, or a bike you saw
          somewhere else — start there. No pressure pitch.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="joe-btn-primary h-14 px-10 text-[0.95rem]">
            Talk to Joe
          </Link>
          {phoneReady ? (
            <>
              <a href={siteConfig.smsLink} className="joe-btn-secondary h-14 px-10 text-[0.95rem]">
                Text Joe
              </a>
              <a href={`tel:${siteConfig.phone}`} className="joe-btn-secondary h-14 px-10 text-[0.95rem]">
                Call Joe
              </a>
            </>
          ) : (
            <Link href="/inventory" className="joe-btn-secondary h-14 px-10 text-[0.95rem]">
              See the floor
            </Link>
          )}
        </div>

        <p className="font-story mt-14 text-2xl italic text-ink/60">— Joe</p>
      </div>
    </section>
  );
}

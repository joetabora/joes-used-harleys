import Image from "next/image";
import Link from "next/link";

export function HomeHero({ liveCount }: { liveCount: number }) {
  return (
    <section className="relative isolate -mt-16 flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <Image
        src="/top.png"
        alt="Harley-Davidson tank badge on a used Harley"
        fill
        priority
        sizes="100vw"
        className="joe-hero-image -z-20 object-cover object-[62%_center]"
      />
      <div className="joe-hero-veil absolute inset-0 -z-10" aria-hidden />
      <div className="joe-hero-grain absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-32 md:px-8 md:pb-20">
        <p className="joe-kicker joe-fade-up">Joe&apos;s Used Harleys · Milwaukee, WI</p>
        <h1 className="joe-mega joe-fade-up joe-fade-up-delay-1 mt-6 max-w-5xl text-[clamp(2.75rem,9.5vw,9.5rem)] text-ink">
          Pull up a stool.
          <span className="block text-lamp">Let&apos;s talk motorcycles.</span>
        </h1>
        <p className="joe-fade-up joe-fade-up-delay-2 mt-8 max-w-xl text-lg leading-[1.65] text-ink/80 md:text-xl">
          One salesman. Used Harley-Davidsons. No ticket numbers. Joe helps Milwaukee and
          Southeastern Wisconsin riders find the right bike — and keeps it straight the whole way.
        </p>
        <div className="joe-fade-up joe-fade-up-delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/inventory" className="joe-btn-primary h-14 px-8 text-[0.95rem]">
            Browse the floor
          </Link>
          <Link href="/contact" className="joe-btn-secondary h-14 px-8 text-[0.95rem]">
            Talk to Joe
          </Link>
        </div>
      </div>

      <div className="border-t border-chrome/10 bg-asphalt/75 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-7xl grid-cols-1 divide-chrome/10 px-4 sm:grid-cols-3 sm:divide-x md:px-8">
          <div className="py-5 sm:pr-6">
            <dt className="font-label text-[0.62rem] text-steel">On the floor now</dt>
            <dd className="mt-1 font-display text-xl tracking-[0.04em] text-ink">
              {liveCount > 0 ? `${liveCount} used Harleys` : "Live inventory"}
            </dd>
          </div>
          <div className="py-5 sm:px-6">
            <dt className="font-label text-[0.62rem] text-steel">Where</dt>
            <dd className="mt-1 font-display text-xl tracking-[0.04em] text-ink">
              Milwaukee · SE Wisconsin
            </dd>
          </div>
          <div className="py-5 sm:pl-6">
            <dt className="font-label text-[0.62rem] text-steel">The deal</dt>
            <dd className="mt-1 font-display text-xl tracking-[0.04em] text-ink">
              Real bikes. Real photos.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

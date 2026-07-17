import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";
import { hasContactPhone, siteConfig } from "@/lib/site";

/**
 * Personal invitation from Joe — not a centered SaaS CTA band.
 */
export function HomeComeTalk() {
  const phoneReady = hasContactPhone();

  return (
    <SectionShell className="py-8 md:py-12">
      <div className="max-w-2xl py-8 md:py-16">
        <p className="font-label text-steel">08 — Come talk</p>

        <h2 className="joe-headline-xl mt-10">
          Pull up a stool.
          <br />
          Let&apos;s talk bikes.
        </h2>

        <p className="mt-8 max-w-md text-[1.125rem] leading-[1.7] text-ink/75">
          A model you&apos;re curious about, a budget you&apos;re working with, or a bike you saw
          somewhere else—start there. No pressure pitch.
        </p>

        <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link href="/contact" className="joe-btn-primary">
            Talk to Joe
          </Link>
          {phoneReady ? (
            <>
              <a href={siteConfig.smsLink} className="joe-btn-secondary">
                Text Joe
              </a>
              <a href={`tel:${siteConfig.phone}`} className="joe-btn-secondary">
                Call Joe
              </a>
            </>
          ) : null}
        </div>

        {!phoneReady ? (
          <p className="mt-6 font-label text-steel">
            [PLACEHOLDER — set NEXT_PUBLIC_JOE_PHONE to enable Text / Call]
          </p>
        ) : null}

        <p className="mt-16 font-label text-steel">— Joe</p>
      </div>
    </SectionShell>
  );
}

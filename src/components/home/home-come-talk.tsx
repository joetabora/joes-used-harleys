import Link from "next/link";
import { EditorialMeasure } from "@/components/home/editorial-measure";
import { SectionShell } from "@/components/home/section-shell";
import { hasContactPhone, siteConfig } from "@/lib/site";

export function HomeComeTalk() {
  const phoneReady = hasContactPhone();

  return (
    <SectionShell>
      <EditorialMeasure className="text-center md:mx-auto">
        <p className="font-label text-steel">08 — Come talk</p>
        <h2 className="mt-4 font-story text-3xl text-ink md:text-4xl">
          Ready when you are.
        </h2>
        <p className="mt-5 text-[1.125rem] leading-[1.7] text-ink/80">
          A model you&apos;re curious about, a budget you&apos;re working with, or a bike you saw
          somewhere else—start there. No pressure pitch.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
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
      </EditorialMeasure>
    </SectionShell>
  );
}

import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";
import { hasContactPhone, siteConfig } from "@/lib/site";

export function HomeContactCta() {
  const phoneReady = hasContactPhone();

  return (
    <SectionShell>
      <div className="joe-asphalt-bay px-6 py-16 text-center md:px-12 md:py-20">
        <h2 className="font-display text-4xl leading-none text-[oklch(0.94_0.01_85)] md:text-5xl">
          Ready to talk bikes?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[1.0625rem] leading-[1.65] text-[oklch(0.94_0.01_85_/0.7)]">
          Ask about a model, a budget, or a bike you saw somewhere else. Joe will help you sort the
          next step—no pressure pitch.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link href="/contact" className="joe-btn-primary">
            Contact Joe
          </Link>
          {phoneReady ? (
            <>
              <a href={siteConfig.smsLink} className="joe-btn-secondary-dark">
                Text Joe
              </a>
              <a href={`tel:${siteConfig.phone}`} className="joe-btn-secondary-dark">
                Call Joe
              </a>
            </>
          ) : null}
        </div>
        {!phoneReady ? (
          <p className="mt-5 font-label text-[oklch(0.94_0.01_85_/0.45)]">
            [PLACEHOLDER — set NEXT_PUBLIC_JOE_PHONE to enable Text / Call]
          </p>
        ) : null}
      </div>
    </SectionShell>
  );
}

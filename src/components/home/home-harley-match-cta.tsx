import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";

export function HomeHarleyMatchCta() {
  return (
    <SectionShell id="harley-match" tone="asphalt">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-label text-lamp">Harley Match</p>
        <h2 className="mt-4 font-display text-4xl leading-none text-[oklch(0.94_0.01_85)] md:text-5xl">
          Not sure which bike fits you yet?
        </h2>
        <p className="mt-5 text-[1.0625rem] leading-[1.65] text-[oklch(0.94_0.01_85_/0.7)]">
          Harley Match will help you narrow style, budget, and experience into a clear starting
          point. The guided quiz ships in a later phase—for now, tell Joe what you want and he&apos;ll
          help you match.
        </p>
        <Link href="/contact" className="joe-btn-primary mt-10 inline-flex">
          Tell Joe what you want
        </Link>
      </div>
    </SectionShell>
  );
}

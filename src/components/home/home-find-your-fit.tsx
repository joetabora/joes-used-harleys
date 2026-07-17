import Link from "next/link";
import { EditorialMeasure } from "@/components/home/editorial-measure";
import { SectionShell } from "@/components/home/section-shell";

export function HomeFindYourFit() {
  return (
    <SectionShell id="find-your-fit" tone="bay">
      <EditorialMeasure className="md:mx-0">
        <p className="font-label text-steel">07 — Find your fit</p>
        <h2 className="mt-4 font-story text-3xl text-ink md:text-4xl">
          Not sure which Harley fits yet?
        </h2>
        <p className="mt-5 text-[1.125rem] leading-[1.7] text-ink/80">
          Harley Match will eventually walk you through style, budget, and experience. Until that
          quiz ships, the best match is a real conversation—tell Joe what you want and he&apos;ll
          help you sort it.
        </p>
        <Link href="/contact" className="joe-btn-asphalt mt-8 inline-flex">
          Tell Joe what you want
        </Link>
      </EditorialMeasure>
    </SectionShell>
  );
}

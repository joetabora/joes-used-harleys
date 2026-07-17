import Link from "next/link";
import { MediaFrame } from "@/components/home/media-frame";
import { SectionShell } from "@/components/home/section-shell";
import { PlaceholderNotice } from "@/components/placeholder-notice";

export function HomeMeetJoe() {
  return (
    <SectionShell tone="bay">
      <p className="font-label text-steel">03 — Meet Joe</p>
      <div className="mt-8 grid gap-12 md:grid-cols-[minmax(0,16rem)_1fr] md:items-start md:gap-16">
        <MediaFrame variant="portrait" label="[PLACEHOLDER — Joe photo]" />

        <div className="max-w-xl space-y-6">
          <h2 className="font-story text-3xl text-ink md:text-4xl">
            A salesperson you can text—not a ticket number.
          </h2>
          <p className="text-[1.0625rem] leading-[1.7] text-ink/80">
            Joe helps people buy used Harley-Davidson motorcycles with clear explanations and
            follow-through. This site is personal on purpose: trust first, inventory second.
          </p>
          <PlaceholderNotice title="[PLACEHOLDER — Joe to provide]">
            Bio, background, and how Joe introduces himself—fill docs/joe-profile.md, then move
            copy here. No awards, sales counts, or dealership claims unless Joe confirms them.
          </PlaceholderNotice>
          <Link href="/about" className="joe-btn-secondary">
            Full story
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

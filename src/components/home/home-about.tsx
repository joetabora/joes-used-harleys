import Link from "next/link";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { SectionShell } from "@/components/home/section-shell";

export function HomeAbout() {
  return (
    <SectionShell>
      <div className="grid gap-12 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-16">
        <div className="joe-frame flex aspect-[3/4] max-w-xs items-center justify-center p-6 md:max-w-none">
          <p className="text-center font-label text-steel">
            [PLACEHOLDER — Joe photo]
          </p>
        </div>

        <div className="max-w-xl space-y-6">
          <div>
            <p className="font-label text-steel">About Joe</p>
            <h2 className="joe-rule mt-4 pt-4 font-display text-4xl leading-none text-ink md:text-5xl">
              A person you can text—not a ticket number.
            </h2>
          </div>
          <p className="text-ink/80">
            Joe helps people buy used Harley-Davidson motorcycles with clear explanations and
            follow-through. This site is his personal sales engine—built for trust first, inventory
            second.
          </p>
          <PlaceholderNotice title="[PLACEHOLDER — Joe to provide]">
            Short bio, years in the business, and any dealership affiliation he is allowed to
            publish. Do not invent awards, titles, or numbers.
          </PlaceholderNotice>
          <PlaceholderNotice title="[PLACEHOLDER — Joe to provide]">
            Experience highlights in Joe&apos;s own words (from docs/joe-profile.md when filled).
          </PlaceholderNotice>
          <Link href="/about" className="joe-btn-secondary">
            More about Joe
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

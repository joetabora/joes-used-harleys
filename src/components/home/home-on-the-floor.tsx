import Link from "next/link";
import { MediaFrame } from "@/components/home/media-frame";
import { SectionShell } from "@/components/home/section-shell";

/**
 * Garage/showroom invitation — not a SaaS empty state.
 * Real inventory lives on /inventory; we never invent bikes here.
 */
export function HomeOnTheFloor() {
  return (
    <SectionShell tone="bay" width="full">
      <div className="relative mx-auto grid max-w-7xl items-end gap-10 md:grid-cols-12 md:gap-0">
        <div className="relative z-10 md:col-span-5 md:pr-8 lg:pr-12">
          <p className="font-label text-steel">05 — On the floor</p>
          <h2 className="joe-headline-xl mt-6">The floor</h2>
          <p className="mt-6 max-w-sm text-[1.0625rem] leading-[1.7] text-ink/75">
            Step into the garage. When Joe lists a motorcycle, it shows up with real photos—not
            samples. Ask him what&apos;s on the floor today.
          </p>
          <Link href="/inventory" className="joe-btn-secondary mt-10 inline-flex">
            See the garage
          </Link>
        </div>

        <div className="relative md:col-span-7 md:-ml-8 md:mt-8 lg:-ml-16">
          <MediaFrame
            variant="tall"
            label="[PLACEHOLDER — garage / showroom when Joe provides a photo]"
            className="w-full border-white/10 md:min-h-[28rem]"
          />
        </div>
      </div>
    </SectionShell>
  );
}

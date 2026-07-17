import Link from "next/link";
import { MediaFrame } from "@/components/home/media-frame";
import { SectionShell } from "@/components/home/section-shell";

export function HomeOnTheFloor() {
  return (
    <SectionShell tone="bay">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="font-label text-steel">05 — On the floor</p>
          <h2 className="mt-4 font-story text-3xl text-ink md:text-4xl">
            What&apos;s here when it&apos;s real.
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-ink/80">
            An empty bay means honesty. When Joe lists a motorcycle, it will show up here—with real
            photos, not samples.
          </p>
        </div>
        <Link href="/inventory" className="joe-btn-secondary w-fit">
          View inventory
        </Link>
      </div>

      <div className="mt-12">
        <MediaFrame variant="bay" label="[PLACEHOLDER — bike photo when listed]" />
        <div className="joe-frame border-t-0 px-6 py-12 text-center md:px-10">
          <p className="font-story text-2xl text-ink">No bikes listed yet</p>
          <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-[1.7] text-ink/75">
            Ask Joe what&apos;s available or what he&apos;s watching for. We never invent inventory.
          </p>
          <Link href="/contact" className="joe-btn-primary mt-8 inline-flex">
            Ask Joe what&apos;s available
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

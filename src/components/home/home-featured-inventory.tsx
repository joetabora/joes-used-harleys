import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";

export function HomeFeaturedInventory() {
  return (
    <SectionShell>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-label text-steel">Inventory</p>
          <h2 className="joe-rule mt-4 pt-4 font-display text-4xl leading-none text-ink md:text-5xl">
            Featured bikes
          </h2>
        </div>
        <Link href="/inventory" className="joe-btn-secondary w-fit">
          View inventory
        </Link>
      </div>

      <div className="joe-frame mt-12 overflow-hidden">
        <div className="flex aspect-[16/9] items-center justify-center border-b border-chrome/40 bg-bay/40 px-6">
          <p className="font-label text-center text-steel">
            [PLACEHOLDER — bike photo when listed]
          </p>
        </div>
        <div className="px-6 py-12 text-center md:px-10">
          <p className="font-display text-3xl leading-none text-ink">No bikes listed yet</p>
          <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-[1.65] text-ink/75">
            Live inventory will appear here when Joe adds real units. We do not show sample or fake
            motorcycles.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="joe-btn-primary">
              Ask Joe what&apos;s available
            </Link>
            <Link href="/inventory" className="joe-btn-secondary">
              Go to inventory
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

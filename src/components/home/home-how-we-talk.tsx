import { ChapterBlock } from "@/components/home/chapter-block";
import { SectionShell } from "@/components/home/section-shell";

export function HomeHowWeTalkBikes() {
  return (
    <SectionShell>
      <div className="max-w-2xl">
        <p className="font-label text-steel">04 — How we talk bikes</p>
        <h2 className="mt-4 font-story text-3xl text-ink md:text-4xl">
          The conversation before the paperwork.
        </h2>
      </div>

      <div className="mt-6">
        <ChapterBlock number="01 —" title="Relationship first">
          <p>
            What you ride for, who you ride with, and what a good month looks like financially—before
            anyone rushes a signature. Couples, first-timers, and lifelong riders all get the same
            patience.
          </p>
        </ChapterBlock>
        <ChapterBlock number="02 —" title="Education without the pitch">
          <p>
            Model differences, used-bike checks, and out-of-state buying explained in plain English.
            You decide with a clear head—not a pressure clock.
          </p>
        </ChapterBlock>
        <ChapterBlock number="03 —" title="Guidance that fits you">
          <p>
            Whether you know the exact bike or you&apos;re still sorting style and budget, Joe helps
            you narrow options and take one clear next step.
          </p>
        </ChapterBlock>
      </div>
    </SectionShell>
  );
}

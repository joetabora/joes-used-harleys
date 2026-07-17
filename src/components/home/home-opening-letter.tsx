import { EditorialMeasure } from "@/components/home/editorial-measure";
import { PullQuote } from "@/components/home/pull-quote";
import { SectionShell } from "@/components/home/section-shell";
import { PlaceholderNotice } from "@/components/placeholder-notice";

/**
 * Editorial invitation. PullQuote stays hidden until joe-profile supplies a real quote.
 * Do not invent Joe's voice here.
 */
export function HomeOpeningLetter() {
  return (
    <SectionShell spread>
      <EditorialMeasure>
        <p className="font-label text-steel">02 — Opening</p>
        <h2 className="mt-4 font-story text-3xl text-ink md:text-4xl">
          This isn&apos;t a dealership brochure. It&apos;s a conversation.
        </h2>
        <div className="mt-8 space-y-5 text-[1.125rem] leading-[1.7] text-ink/85">
          <p>
            You&apos;re looking for a used Harley-Davidson motorcycle—or you&apos;re figuring out
            whether you are. Either way, you deserve a human who will slow down, answer the awkward
            questions, and help you choose what actually fits.
          </p>
          <p>
            Joe built this place so you can meet him before you meet the paperwork. Pull up a stool.
            Tell him what you ride for, what you can spend, and what you&apos;re hoping the next bike
            feels like.
          </p>
        </div>

        {/* Renders null until a real quote is passed — no invented voice */}
        <PullQuote />

        <div className="mt-10">
          <PlaceholderNotice title="[PLACEHOLDER — Joe to provide]">
            Opening letter in Joe&apos;s own words (from docs/joe-profile.md — Why I sell / Who I
            am). Replace the paragraphs above when ready.
          </PlaceholderNotice>
        </div>
      </EditorialMeasure>
    </SectionShell>
  );
}

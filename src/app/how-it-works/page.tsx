import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "How buying from Joe works",
  description:
    "A simple process: talk, learn, find the right bike, handle paperwork without the pressure.",
  path: "/how-it-works",
});

const steps = [
  {
    title: "1. Tell Joe what you want",
    body: "Model, budget, trade-in, timeline — or just that you're exploring. No wrong answers.",
  },
  {
    title: "2. Get educated, not pitched",
    body: "Use the guides, compare baggers, and ask questions. Joe's job is clarity, not pressure.",
  },
  {
    title: "3. Watch inventory or set alerts",
    body: "When the right bike lands, you'll know. Stale listings destroy trust — we only show what's maintained.",
  },
  {
    title: "4. Inspect and decide",
    body: "In person, FaceTime walkaround, or detailed photos. Remote buyers get the same honesty.",
  },
  {
    title: "5. Paperwork and next steps",
    body: "Financing conversations, trade numbers, and delivery/shipping plans — spelled out before you commit.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <div className="space-y-3">
        <p className="font-label text-lamp">Process</p>
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">
          How buying from Joe works
        </h1>
        <p className="text-steel">
          A transparent process designed for trust. Exact dealership policies and fees are never
          invented here — Joe will confirm those with you directly.
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.title} className="joe-panel p-5">
            <h2 className="font-display text-lg tracking-[0.04em]">{step.title}</h2>
            <p className="mt-2 text-sm text-ink/70">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/contact" className="joe-btn-primary">
          Start a conversation
        </Link>
        <Link href="/inventory" className="joe-btn-secondary">
          See inventory
        </Link>
      </div>
    </div>
  );
}

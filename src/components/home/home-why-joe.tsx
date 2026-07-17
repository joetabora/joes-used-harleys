import { SectionShell } from "@/components/home/section-shell";

const points = [
  {
    title: "Relationship selling",
    body: "You get a real conversation—what you ride for, what you can spend, and what actually fits—before anyone rushes a signature.",
  },
  {
    title: "Education first",
    body: "Model differences, used-bike checks, and out-of-state buying tips explained in plain English so you decide with confidence.",
  },
  {
    title: "Personalized guidance",
    body: "Whether you know the exact bike or you’re still figuring it out, Joe helps you narrow options and take the next clear step.",
  },
];

export function HomeWhyJoe() {
  return (
    <SectionShell tone="bay">
      <div className="max-w-2xl">
        <p className="font-label text-steel">Why work with Joe</p>
        <h2 className="joe-rule mt-4 pt-4 font-display text-4xl leading-none text-ink md:text-5xl">
          Built for riders who want a human in the deal.
        </h2>
      </div>
      <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
        {points.map((point) => (
          <li key={point.title} className="joe-rule pt-5">
            <h3 className="font-display text-2xl leading-none text-ink">{point.title}</h3>
            <p className="mt-4 text-[0.95rem] leading-[1.65] text-ink/75">{point.body}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

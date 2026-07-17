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
    <SectionShell tone="muted">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-steel">Why work with Joe</p>
        <h2 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
          Built for riders who want a human in the deal.
        </h2>
      </div>
      <ul className="mt-12 grid gap-10 md:grid-cols-3">
        {points.map((point) => (
          <li key={point.title} className="space-y-3 border-t border-border pt-6">
            <h3 className="font-display text-2xl tracking-wide text-foreground">{point.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{point.body}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

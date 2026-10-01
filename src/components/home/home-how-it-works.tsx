import Link from "next/link";

const steps = [
  {
    title: "Tell Joe how you ride",
    body: "Commute, weekend back roads, two-up trips, or your very first bike. Budget comfort zone too. Text, call, or send a message — whatever's easiest.",
  },
  {
    title: "Walk the floor together",
    body: "Joe narrows the live inventory to bikes that actually fit, walks you through what to check, and answers the awkward questions honestly.",
  },
  {
    title: "Ride out right",
    body: "Payments, trade-in, paperwork — explained in plain English at a human pace, with no invented rates or approvals.",
  },
];

export function HomeHowItWorks() {
  return (
    <section className="relative overflow-hidden bg-concrete">
      <div className="joe-stripe pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="joe-kicker">Buying with Joe</p>
            <h2 className="joe-display mt-5 text-ink">
              The conversation
              <span className="block text-lamp">before the paperwork.</span>
            </h2>
          </div>
          <Link
            href="/how-it-works"
            className="font-label text-lamp underline-offset-4 hover:underline"
          >
            How it works →
          </Link>
        </div>

        <ol className="mt-16 grid gap-px bg-chrome/10 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="relative bg-concrete p-8 md:p-10">
              <span className="joe-mega joe-outline block text-[clamp(4rem,7vw,6rem)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-6 text-2xl tracking-[0.03em] text-ink">
                {step.title}
              </h3>
              <p className="mt-4 text-[0.98rem] leading-[1.7] text-ink/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

const rules = [
  {
    title: "Real bikes, real photos",
    body: "Every listing is mirrored from actual dealership stock. If it's not on the floor, it's not on the site.",
  },
  {
    title: "No pressure clock",
    body: "Couples, first-timers, lifelong riders — same patience. You decide with a clear head.",
  },
  {
    title: "Straight talk on money",
    body: "Payments and trade-ins explained in plain English. No invented rates, approvals, or values.",
  },
];

export function HomeMeetJoe() {
  return (
    <section className="relative overflow-hidden bg-concrete">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[28rem] lg:col-span-6 lg:min-h-[44rem]">
          <Image
            src="/me.jpg"
            alt="Joe on his Harley-Davidson Road King"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[30%_center]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-concrete via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-concrete"
            aria-hidden
          />
          <p
            className="joe-mega joe-outline absolute bottom-6 left-6 hidden select-none text-[clamp(4rem,9vw,8rem)] lg:block"
            aria-hidden
          >
            Joe
          </p>
        </div>

        <div className="joe-glow relative flex flex-col justify-center px-4 py-20 md:px-12 lg:col-span-6 lg:py-28 xl:px-20">
          <p className="joe-kicker">The salesman</p>
          <h2 className="joe-display mt-5 text-ink">
            One guy.
            <span className="block">One handshake.</span>
            <span className="block text-lamp">No ticket number.</span>
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-[1.7] text-ink/80">
            Joe helps Milwaukee-area riders find and purchase used Harley-Davidson motorcycles.
            He rides, he listens, and he&apos;d rather talk you out of the wrong bike than into
            a bad deal. This site is personal on purpose — meet him before you meet the
            paperwork.
          </p>

          <ul className="mt-10 space-y-6">
            {rules.map((rule, i) => (
              <li key={rule.title} className="flex gap-5">
                <span className="font-display pt-0.5 text-lg text-lamp">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-lg tracking-[0.04em] text-ink">{rule.title}</p>
                  <p className="mt-1 text-[0.98rem] leading-[1.65] text-ink/65">{rule.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link href="/about" className="joe-btn-secondary">
              Joe&apos;s full story
            </Link>
            <p className="font-story text-2xl italic text-ink/70">— Joe</p>
          </div>
        </div>
      </div>
    </section>
  );
}

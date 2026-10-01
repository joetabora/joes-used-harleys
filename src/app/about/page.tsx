import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { createMetadata } from "@/lib/seo";
import { hasContactEmail, hasContactPhone, siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "About Joe",
  description:
    "Meet Joe — a Harley-Davidson salesperson helping Milwaukee and Southeastern Wisconsin riders buy used motorcycles with trust, education, and real inventory.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <div className="space-y-3">
        <p className="font-label text-lamp">The person behind the site</p>
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">About Joe</h1>
        <p className="text-steel">
          This site is a personal sales engine for a Harley-Davidson salesperson — not a corporate
          dealership brochure. The advantage is human relationship selling plus modern tools.
        </p>
      </div>

      <div className="space-y-4 text-[1.0625rem] leading-[1.7] text-ink/80">
        <p>
          Joe helps Milwaukee and Southeastern Wisconsin riders find and purchase used
          Harley-Davidson motorcycles. He slows the process down on purpose: fit, budget comfort,
          service history, and what you will actually ride — before chrome takes over the
          conversation.
        </p>
        <p>
          Inventory on this site is mirrored from real dealership stock. Joe will not invent bikes,
          reviews, financing approvals, or a fake storefront. When you are ready, he helps you
          compare units, ask the awkward questions, and take the next step at a human pace.
        </p>
        <p>
          Learn more about{" "}
          <Link
            href="/used-harleys/milwaukee"
            className="text-lamp underline-offset-4 hover:underline"
          >
            used Harley motorcycles near Milwaukee
          </Link>
          ,{" "}
          <Link href="/inventory" className="text-lamp underline-offset-4 hover:underline">
            browse current inventory
          </Link>
          , or{" "}
          <Link href="/guides" className="text-lamp underline-offset-4 hover:underline">
            read the buying guides
          </Link>
          .
        </p>
      </div>

      <div className="joe-panel p-5">
        <p className="font-label mb-4 text-lamp">What Joe brings</p>
        <ul className="space-y-2 text-sm text-ink/75">
          <li>Relationship selling for used Harley buyers — not a ticket number</li>
          <li>Clear explanations of models, fit, and what to inspect</li>
          <li>Help talking through payments and trade-ins without inventing rates or values</li>
          <li>Live mirrored inventory with honest empty states when nothing matches</li>
        </ul>
      </div>

      <div className="joe-panel p-5 space-y-4">
        <p className="font-label text-lamp">Reach Joe</p>
        {hasContactPhone() ? (
          <p className="text-sm">
            Phone / text:{" "}
            <a className="text-lamp underline-offset-4 hover:underline" href={siteConfig.smsLink}>
              {siteConfig.phone}
            </a>
          </p>
        ) : null}
        {hasContactEmail() ? (
          <p className="text-sm">
            Email:{" "}
            <a
              className="text-lamp underline-offset-4 hover:underline"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
          </p>
        ) : null}
        {!hasContactPhone() && !hasContactEmail() ? (
          <p className="text-sm text-steel">
            Reach Joe through the form below — it lands in his lead inbox when the site is
            connected.
          </p>
        ) : (
          <p className="text-sm text-steel">Or send a message here.</p>
        )}
        <LeadForm source="/about" />
      </div>
    </div>
  );
}

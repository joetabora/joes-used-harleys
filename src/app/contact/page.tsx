import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { createMetadata } from "@/lib/seo";
import { hasContactEmail, hasContactPhone, siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact Joe",
  description:
    "Contact Joe about used Harley-Davidson motorcycles in the Milwaukee area — text, call, or send a message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2">
      <div className="space-y-4">
        <p className="font-label text-lamp">Reach out</p>
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">Contact Joe</h1>
        <p className="text-steel">
          Joe helps Milwaukee and Southeastern Wisconsin riders buy used Harley-Davidson
          motorcycles. Ask about a bike on the floor, a model you are considering, financing
          questions, or a trade-in — without pressure.
        </p>
        <p className="text-sm text-steel">
          Prefer to browse first?{" "}
          <Link
            href="/inventory"
            className="text-lamp underline-offset-4 hover:underline"
          >
            See current inventory
          </Link>
          {" · "}
          <Link
            href="/used-harleys/milwaukee"
            className="text-lamp underline-offset-4 hover:underline"
          >
            Milwaukee used Harley guide
          </Link>
        </p>
        {hasContactPhone() ? (
          <p className="font-label text-ink">
            Text / call:{" "}
            <a className="text-lamp underline-offset-4 hover:underline" href={siteConfig.smsLink}>
              {siteConfig.phone}
            </a>
          </p>
        ) : (
          <p className="text-sm text-steel">
            Use the form to reach Joe — it lands in his lead inbox when the site is connected.
          </p>
        )}
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
      </div>

      <div className="joe-panel p-5">
        <p className="font-label mb-4 text-lamp">Send a message</p>
        <LeadForm source="/contact" />
      </div>
    </div>
  );
}

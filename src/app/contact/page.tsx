import { LeadForm } from "@/components/lead-form";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { createMetadata } from "@/lib/seo";
import { hasContactPhone, siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact Joe",
  description: "Text, call, or send a message. Every page leads here for a reason.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2">
      <div className="space-y-4">
        <p className="font-label text-lamp">Reach out</p>
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">Contact Joe</h1>
        <p className="text-steel">
          Prefer text? Use the number below when it&apos;s configured. Prefer a form? Send it here
          and it lands in Joe&apos;s lead inbox when the database is connected.
        </p>
        {hasContactPhone() ? (
          <p className="font-label text-ink">
            Text / call:{" "}
            <a className="text-lamp underline-offset-4 hover:underline" href={siteConfig.smsLink}>
              {siteConfig.phone}
            </a>
          </p>
        ) : (
          <PlaceholderNotice title="Phone not configured">
            Set NEXT_PUBLIC_JOE_PHONE and NEXT_PUBLIC_JOE_SMS_LINK in your environment to enable
            click-to-text.
          </PlaceholderNotice>
        )}
      </div>

      <div className="joe-panel p-5">
        <p className="font-label mb-4 text-lamp">Send a message</p>
        <LeadForm source="/contact" />
      </div>
    </div>
  );
}

import { PlaceholderNotice } from "@/components/placeholder-notice";
import { LeadForm } from "@/components/lead-form";
import { createMetadata } from "@/lib/seo";
import { hasContactEmail, hasContactPhone, siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "About Joe",
  description:
    "Meet Joe — a Harley salesperson building trust through relationship selling, education, and technology.",
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

      <PlaceholderNotice title="Bio details are placeholders">
        Specific dealership affiliation, years of experience claims, awards, and personal photos
        will be added only with Joe&apos;s real content. Do not invent them.
      </PlaceholderNotice>

      <div className="joe-panel p-5">
        <p className="font-label mb-4 text-lamp">What Joe brings</p>
        <ul className="space-y-2 text-sm text-ink/75">
          <li>Marketing and events experience</li>
          <li>Social media and web development skills</li>
          <li>Dealership operations knowledge</li>
          <li>Comfort with AI tools — used carefully, never to invent inventory or reviews</li>
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
        ) : (
          <p className="text-sm text-steel">Phone: PLACEHOLDER — set NEXT_PUBLIC_JOE_PHONE</p>
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
        ) : (
          <p className="text-sm text-steel">Email: PLACEHOLDER — set NEXT_PUBLIC_JOE_EMAIL</p>
        )}
        <LeadForm source="/about" />
      </div>
    </div>
  );
}

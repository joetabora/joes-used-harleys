import { PlaceholderNotice } from "@/components/placeholder-notice";
import { LeadForm } from "@/components/lead-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <h1 className="text-3xl font-semibold tracking-tight">About Joe</h1>
        <p className="text-muted-foreground">
          This site is a personal sales engine for a Harley-Davidson salesperson — not a corporate
          dealership brochure. The advantage is human relationship selling plus modern tools.
        </p>
      </div>

      <PlaceholderNotice title="Bio details are placeholders">
        Specific dealership affiliation, years of experience claims, awards, and personal photos
        will be added only with Joe&apos;s real content. Do not invent them.
      </PlaceholderNotice>

      <Card>
        <CardHeader>
          <CardTitle>What Joe brings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Marketing and events experience</p>
          <p>Social media and web development skills</p>
          <p>Dealership operations knowledge</p>
          <p>Comfort with AI tools — used carefully, never to invent inventory or reviews</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reach Joe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {hasContactPhone() ? (
            <p>
              Phone / text:{" "}
              <a className="underline" href={siteConfig.smsLink}>
                {siteConfig.phone}
              </a>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Phone: PLACEHOLDER — set NEXT_PUBLIC_JOE_PHONE
            </p>
          )}
          {hasContactEmail() ? (
            <p>
              Email:{" "}
              <a className="underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Email: PLACEHOLDER — set NEXT_PUBLIC_JOE_EMAIL
            </p>
          )}
          <LeadForm source="/about" />
        </CardContent>
      </Card>
    </div>
  );
}

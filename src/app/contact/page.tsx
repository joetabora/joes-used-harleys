import { LeadForm } from "@/components/lead-form";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <h1 className="text-3xl font-semibold tracking-tight">Contact Joe</h1>
        <p className="text-muted-foreground">
          Prefer text? Use the number below when it&apos;s configured. Prefer a form? Send it here
          and it lands in Joe&apos;s lead inbox when the database is connected.
        </p>
        {hasContactPhone() ? (
          <p>
            Text / call:{" "}
            <a className="font-medium underline" href={siteConfig.smsLink}>
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

      <Card>
        <CardHeader>
          <CardTitle>Send a message</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadForm sourcePage="/contact" />
        </CardContent>
      </Card>
    </div>
  );
}

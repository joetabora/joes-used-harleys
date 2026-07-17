import Link from "next/link";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
import { hasContactPhone, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <div>
      <section className="border-b bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Personal Harley sales engine
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Buy a used Harley with a salesperson who actually has your back.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              {siteConfig.name} is not a traditional dealership website. It is built to help you
              trust Joe, learn the bikes, get alerts, and buy with confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/inventory" className={cn(buttonVariants({ size: "lg" }))}>
                Browse inventory
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                Talk to Joe
              </Link>
              {hasContactPhone() ? (
                <a
                  href={siteConfig.smsLink}
                  className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}
                >
                  Text Joe
                </a>
              ) : null}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>What you get here</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Straight answers on models, payments, and process.</p>
              <p>Inventory Joe can actually help you buy — when configured.</p>
              <p>Alerts when the right bike shows up.</p>
              <p>An AI assistant grounded in our guides (optional, Phase 4).</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-14">
        <h2 className="text-2xl font-semibold">Start where you are</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "First-time buyer",
              body: "Read the buying guide, then ask Joe the awkward questions.",
              href: "/guides/first-time-harley-buyer-guide",
            },
            {
              title: "Know what you want",
              body: "Check inventory or set an alert for your model and budget.",
              href: "/inventory",
            },
            {
              title: "Buying remote",
              body: "Learn how out-of-state deals can work with video and trust.",
              href: "/guides/buying-a-harley-out-of-state",
            },
          ].map((item) => (
            <Card key={item.href}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>{item.body}</p>
                <Link href={item.href} className="font-medium text-foreground underline">
                  Go →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl space-y-4 px-4 py-14">
          <h2 className="text-2xl font-semibold">Social proof</h2>
          <PlaceholderNotice title="No fake reviews">
            Real testimonials will appear here only after Joe provides approved customer quotes
            (Google reviews, texts, etc.). Until then this section stays empty on purpose.
          </PlaceholderNotice>
        </div>
      </section>
    </div>
  );
}

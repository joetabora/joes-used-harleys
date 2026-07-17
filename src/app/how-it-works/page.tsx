import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "How buying from Joe works",
  description:
    "A simple process: talk, learn, find the right bike, handle paperwork without the pressure.",
  path: "/how-it-works",
});

const steps = [
  {
    title: "1. Tell Joe what you want",
    body: "Model, budget, trade-in, timeline — or just that you're exploring. No wrong answers.",
  },
  {
    title: "2. Get educated, not pitched",
    body: "Use the guides, compare baggers, and ask questions. Joe's job is clarity, not pressure.",
  },
  {
    title: "3. Watch inventory or set alerts",
    body: "When the right bike lands, you'll know. Stale listings destroy trust — we only show what's maintained.",
  },
  {
    title: "4. Inspect and decide",
    body: "In person, FaceTime walkaround, or detailed photos. Remote buyers get the same honesty.",
  },
  {
    title: "5. Paperwork and next steps",
    body: "Financing conversations, trade numbers, and delivery/shipping plans — spelled out before you commit.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">How buying from Joe works</h1>
        <p className="text-muted-foreground">
          A transparent process designed for trust. Exact dealership policies and fees are never
          invented here — Joe will confirm those with you directly.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.title}>
            <CardHeader>
              <CardTitle className="text-lg">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{step.body}</CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/contact" className={cn(buttonVariants())}>
          Start a conversation
        </Link>
        <Link href="/inventory" className={cn(buttonVariants({ variant: "outline" }))}>
          See inventory
        </Link>
      </div>
    </div>
  );
}

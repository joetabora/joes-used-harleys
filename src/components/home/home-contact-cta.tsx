import Link from "next/link";
import { SectionShell } from "@/components/home/section-shell";
import { buttonVariants } from "@/components/ui/button";
import { hasContactPhone, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HomeContactCta() {
  const phoneReady = hasContactPhone();

  return (
    <SectionShell>
      <div className="border border-border bg-asphalt px-6 py-14 text-center text-primary-foreground md:px-12">
        <h2 className="font-display text-4xl text-white md:text-5xl">Ready to talk bikes?</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">
          Ask about a model, a budget, or a bike you saw somewhere else. Joe will help you sort the
          next step—no pressure pitch.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "joe-cta-hover h-12 bg-signal text-signal-foreground hover:bg-signal/90",
            )}
          >
            Contact Joe
          </Link>
          {phoneReady ? (
            <>
              <a
                href={siteConfig.smsLink}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "joe-cta-hover h-12 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white",
                )}
              >
                Text Joe
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "joe-cta-hover h-12 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white",
                )}
              >
                Call Joe
              </a>
            </>
          ) : null}
        </div>
        {!phoneReady ? (
          <p className="mt-4 text-xs text-white/50">
            [PLACEHOLDER — set NEXT_PUBLIC_JOE_PHONE to enable Text / Call]
          </p>
        ) : null}
      </div>
    </SectionShell>
  );
}

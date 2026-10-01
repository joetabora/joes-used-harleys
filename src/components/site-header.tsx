import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { AnalyticsContactLink } from "@/components/analytics/analytics-contact-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { hasContactPhone, siteConfig } from "@/lib/site";

const links = [
  { href: "/inventory", label: "Inventory" },
  { href: "/harleys", label: "Models" },
  { href: "/guides", label: "Guides" },
  { href: "/used-harleys/milwaukee", label: "Milwaukee" },
  { href: "/about", label: "About Joe" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-chrome/10 bg-asphalt/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            className="size-11 object-contain drop-shadow-[0_2px_8px_rgba(244,81,30,0.25)]"
            priority
          />
          <span className="font-display whitespace-nowrap text-base leading-none tracking-[0.12em] text-ink transition-colors group-hover:text-lamp md:text-lg">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label text-[0.72rem] text-chrome/80 transition-colors hover:text-lamp"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            {hasContactPhone() ? (
              <a
                href={siteConfig.smsLink}
                data-analytics="contact"
                className="joe-btn-primary h-10 whitespace-nowrap px-4"
              >
                Text Joe
              </a>
            ) : (
              <AnalyticsContactLink
                href="/contact"
                className="joe-btn-primary h-10 whitespace-nowrap px-4"
              >
                Talk to Joe
              </AnalyticsContactLink>
            )}
          </div>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-none border-chrome/25 bg-transparent lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="rounded-none border-l border-chrome/20 bg-asphalt px-6"
            >
              <SheetHeader className="px-0">
                <SheetTitle className="flex items-center gap-3 text-left">
                  <Image src="/logo.png" alt="" width={40} height={40} className="size-10" />
                  <span className="font-display tracking-[0.1em] text-ink">
                    {siteConfig.name}
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-display border-b border-chrome/10 py-4 text-2xl tracking-[0.04em] text-ink transition-colors hover:text-lamp"
                  >
                    {link.label}
                  </Link>
                ))}
                {hasContactPhone() ? (
                  <a
                    href={siteConfig.smsLink}
                    data-analytics="contact"
                    className="joe-btn-primary mt-8 w-full"
                  >
                    Text Joe
                  </a>
                ) : (
                  <AnalyticsContactLink href="/contact" className="joe-btn-primary mt-8 w-full">
                    Talk to Joe
                  </AnalyticsContactLink>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

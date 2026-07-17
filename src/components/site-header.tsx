import Link from "next/link";
import { Menu } from "lucide-react";
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
  { href: "/guides", label: "Guides" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About Joe" },
  { href: "/assistant", label: "Ask AI" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-asphalt/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="font-display text-lg leading-none text-ink transition-colors hover:text-lamp"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label text-steel transition-colors hover:text-lamp"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {hasContactPhone() ? (
            <a href={siteConfig.smsLink} className="joe-btn-primary hidden h-9 px-3 sm:inline-flex">
              Text Joe
            </a>
          ) : (
            <Link href="/contact" className="joe-btn-secondary hidden h-9 px-3 sm:inline-flex">
              Contact
            </Link>
          )}

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-concrete px-4">
              <SheetHeader>
                <SheetTitle className="font-display text-left text-ink">
                  {siteConfig.name}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-display text-xl text-ink transition-colors hover:text-lamp"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

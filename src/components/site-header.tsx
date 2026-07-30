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
  { href: "/harleys", label: "Models" },
  { href: "/guides", label: "Guides" },
  { href: "/used-harleys", label: "Local" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About Joe" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-chrome/20 bg-asphalt/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="font-display text-lg leading-none tracking-[0.08em] text-lamp transition-colors hover:text-ink"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label text-steel transition-colors hover:text-ink"
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
                  className="rounded-none border-chrome/25 bg-transparent md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="rounded-none border-l border-chrome/20 bg-concrete px-4"
            >
              <SheetHeader>
                <SheetTitle className="font-display text-left tracking-[0.08em] text-lamp">
                  {siteConfig.name}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-l-2 border-transparent px-3 py-3 font-label text-steel transition-colors hover:border-lamp hover:bg-bay hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
                {hasContactPhone() ? (
                  <a
                    href={siteConfig.smsLink}
                    className="joe-btn-primary mt-4 w-full"
                  >
                    Text Joe
                  </a>
                ) : (
                  <Link href="/contact" className="joe-btn-primary mt-4 w-full">
                    Contact
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

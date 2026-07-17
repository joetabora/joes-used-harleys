import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { hasContactPhone, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

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
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {hasContactPhone() ? (
            <a
              href={siteConfig.smsLink}
              className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
            >
              Text Joe
            </a>
          ) : (
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "sm", variant: "secondary" }),
                "hidden sm:inline-flex",
              )}
            >
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
            <SheetContent side="right" className="px-4">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg">
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

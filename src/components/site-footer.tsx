import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{siteConfig.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="font-medium">Explore</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>
              <Link href="/inventory">Inventory</Link>
            </li>
            <li>
              <Link href="/guides">Guides</Link>
            </li>
            <li>
              <Link href="/how-it-works">How it works</Link>
            </li>
            <li>
              <Link href="/assistant">Buying assistant</Link>
            </li>
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Personal sales — not a dealership site</p>
          <p className="mt-2">
            Inventory and contact details are only shown when configured. We do not publish fake
            reviews, bikes, or dealership claims.
          </p>
          <p className="mt-4 text-xs">© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}

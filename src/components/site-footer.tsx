import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-chrome/50 bg-bay">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl text-ink">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-[1.65] text-ink/70">{siteConfig.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="font-label text-steel">Explore</p>
          <ul className="mt-4 space-y-2 text-ink/75">
            <li>
              <Link href="/inventory" className="hover:text-leather">
                Inventory
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-leather">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="hover:text-leather">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/assistant" className="hover:text-leather">
                Buying assistant
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm leading-[1.65] text-ink/70">
          <p className="font-label text-ink">Personal sales — not a dealership site</p>
          <p className="mt-3">
            Inventory and contact details are only shown when configured. We do not publish fake
            reviews, bikes, or dealership claims.
          </p>
          <p className="mt-6 font-label text-steel">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

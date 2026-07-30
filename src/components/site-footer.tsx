import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-chrome/20 bg-asphalt">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl tracking-[0.08em] text-lamp">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-[1.65] text-ink/65">{siteConfig.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="font-label text-steel">Explore</p>
          <ul className="mt-4 space-y-2 text-ink/70">
            <li>
              <Link href="/inventory" className="font-label text-[0.65rem] transition-colors hover:text-lamp">
                Inventory
              </Link>
            </li>
            <li>
              <Link href="/harleys" className="font-label text-[0.65rem] transition-colors hover:text-lamp">
                Models
              </Link>
            </li>
            <li>
              <Link href="/guides" className="font-label text-[0.65rem] transition-colors hover:text-lamp">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/used-harleys" className="font-label text-[0.65rem] transition-colors hover:text-lamp">
                Local
              </Link>
            </li>
            <li>
              <Link href="/compare" className="font-label text-[0.65rem] transition-colors hover:text-lamp">
                Compare
              </Link>
            </li>
            <li>
              <Link href="/routes" className="font-label text-[0.65rem] transition-colors hover:text-lamp">
                Routes
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="font-label text-[0.65rem] transition-colors hover:text-lamp">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/about" className="font-label text-[0.65rem] transition-colors hover:text-lamp">
                About Joe
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-label text-[0.65rem] transition-colors hover:text-lamp">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm leading-[1.65] text-ink/65">
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

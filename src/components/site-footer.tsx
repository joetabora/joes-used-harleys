import Image from "next/image";
import Link from "next/link";
import { hasContactEmail, hasContactPhone, siteConfig } from "@/lib/site";

const shop = [
  { href: "/inventory", label: "Current inventory" },
  { href: "/harleys", label: "Harley models" },
  { href: "/harleys/family/touring", label: "Touring" },
  { href: "/harleys/family/softail", label: "Softail" },
  { href: "/harleys/family/sportster", label: "Sportster" },
  { href: "/compare", label: "Compare models" },
];

const learn = [
  { href: "/guides", label: "Buying guides" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/routes", label: "Ride routes" },
  { href: "/used-harleys/milwaukee", label: "Used Harleys near Milwaukee" },
  { href: "/used-harleys", label: "Southeastern Wisconsin" },
];

const joe = [
  { href: "/about", label: "About Joe" },
  { href: "/contact", label: "Contact" },
];

function Column({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="font-label text-lamp">{title}</p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-ink/70 transition-colors hover:text-lamp"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-chrome/10 bg-asphalt">
      <div className="joe-stripe pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-20 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt={`${siteConfig.name} logo`} width={88} height={88} className="size-22" />
              <div>
                <p className="font-display text-2xl tracking-[0.08em] text-ink">{siteConfig.name}</p>
                <p className="font-label mt-1 text-steel">Milwaukee · Southeastern Wisconsin</p>
              </div>
            </div>
            <p className="mt-8 max-w-sm text-sm leading-[1.7] text-ink/65">
              One salesman helping riders find and buy used Harley-Davidson motorcycles. Real
              bikes, real photos, straight answers — no fake reviews, no invented stock.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {hasContactPhone() ? (
                <a href={siteConfig.smsLink} className="joe-btn-primary">
                  Text Joe
                </a>
              ) : (
                <Link href="/contact" className="joe-btn-primary">
                  Talk to Joe
                </Link>
              )}
              <Link href="/inventory" className="joe-btn-secondary">
                See the floor
              </Link>
            </div>
            {hasContactEmail() ? (
              <p className="mt-6 text-sm text-ink/65">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-lamp">
                  {siteConfig.email}
                </a>
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <Column title="Shop" items={shop} />
            <Column title="Learn" items={learn} />
            <Column title="Joe" items={joe} />
          </div>
        </div>

        <p
          className="joe-mega joe-outline mt-20 select-none whitespace-nowrap text-center text-[clamp(3rem,13vw,12rem)]"
          aria-hidden
        >
          Ride on
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-chrome/10 pt-6 text-xs text-steel md:flex-row md:items-center md:justify-between">
          <p className="font-label">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="max-w-xl md:text-right">
            Personal sales site — not a separate dealership. Inventory is mirrored from real
            dealership stock.
          </p>
        </div>
      </div>
    </footer>
  );
}

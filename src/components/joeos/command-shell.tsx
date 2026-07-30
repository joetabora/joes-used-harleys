"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Crosshair,
  Bike,
  Radio,
  RefreshCw,
  ExternalLink,
  LogOut,
  LogIn,
  MoreHorizontal,
  Network,
} from "lucide-react";
import { navItems } from "@/design-system/components";
import { JosIcon } from "@/components/joeos/ui/jos-icon";

const icons = {
  command: Crosshair,
  floor: Bike,
  pipeline: Radio,
  knowledge: Network,
  feed: RefreshCw,
} as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function CommandShell({
  email,
  children,
}: {
  email?: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const isLogin = pathname === "/admin/login";
  const [moreOpen, setMoreOpen] = useState(false);
  const [pathForMore, setPathForMore] = useState(pathname);

  if (pathname !== pathForMore) {
    setPathForMore(pathname);
    setMoreOpen(false);
  }

  if (isLogin) {
    return (
      <div className="jos">
        <div className="jos-stage">
          <div className="jos-stage-inner">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="jos">
      <div className="jos-shell">
        <aside className="jos-rail" aria-label="JoeOS">
          <Link href="/admin" className="jos-brand jos-rail-brand">
            Joe OS
          </Link>
          {navItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Link
                key={item.href}
                href={item.href}
                className="jos-rail-link"
                data-active={isActive(pathname, item.href)}
                title={item.label}
              >
                <JosIcon icon={Icon} size={16} />
                {item.short}
              </Link>
            );
          })}
          <div className="jos-rail-footer">
            <Link href="/" className="jos-rail-link" target="_blank" title="Public site">
              <JosIcon icon={ExternalLink} size={16} />
              SITE
            </Link>
            {email ? (
              <form action="/api/admin/logout" method="POST" className="w-full">
                <button type="submit" className="jos-rail-link w-full" title="Sign out">
                  <JosIcon icon={LogOut} size={16} />
                  OUT
                </button>
              </form>
            ) : (
              <Link href="/admin/login" className="jos-rail-link" title="Sign in">
                <JosIcon icon={LogIn} size={16} />
                IN
              </Link>
            )}
          </div>
        </aside>

        <div className="jos-stage">
          <div className="jos-stage-inner jos-fade">{children}</div>
        </div>

        <nav className="jos-bottom-nav" aria-label="JoeOS">
          {navItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive(pathname, item.href)}
              >
                <JosIcon icon={Icon} size={16} />
                {item.short}
              </Link>
            );
          })}
          <button
            type="button"
            data-active={moreOpen}
            aria-expanded={moreOpen}
            aria-label="More"
            onClick={() => setMoreOpen((o) => !o)}
          >
            <JosIcon icon={MoreHorizontal} size={16} />
            MORE
          </button>
        </nav>

        {moreOpen ? (
          <div
            className="jos-more-sheet"
            role="dialog"
            aria-label="More"
            onClick={() => setMoreOpen(false)}
          >
            <div
              className="jos-more-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="jos-section mb-1">Utilities</p>
              <Link
                href="/"
                target="_blank"
                className="jos-btn jos-btn-ghost w-full"
                onClick={() => setMoreOpen(false)}
              >
                <JosIcon icon={ExternalLink} size={16} />
                Public site
              </Link>
              {email ? (
                <form action="/api/admin/logout" method="POST">
                  <button type="submit" className="jos-btn jos-btn-ghost w-full">
                    <JosIcon icon={LogOut} size={16} />
                    Sign out
                  </button>
                </form>
              ) : (
                <Link
                  href="/admin/login"
                  className="jos-btn jos-btn-ghost w-full"
                  onClick={() => setMoreOpen(false)}
                >
                  <JosIcon icon={LogIn} size={16} />
                  Sign in
                </Link>
              )}
              <button
                type="button"
                className="jos-btn jos-btn-primary w-full"
                onClick={() => setMoreOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

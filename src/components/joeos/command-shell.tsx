"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Crosshair,
  Bike,
  Radio,
  RefreshCw,
  ExternalLink,
  LogOut,
  LogIn,
} from "lucide-react";
import { navItems } from "@/design-system/components";

const icons = {
  command: Crosshair,
  floor: Bike,
  pipeline: Radio,
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
                <Icon className="size-4" aria-hidden />
                {item.short}
              </Link>
            );
          })}
          <div className="jos-rail-footer">
            <Link href="/" className="jos-rail-link" target="_blank" title="Public site">
              <ExternalLink className="size-3.5" aria-hidden />
              SITE
            </Link>
            {email ? (
              <form action="/api/admin/logout" method="POST" className="w-full">
                <button type="submit" className="jos-rail-link w-full" title="Sign out">
                  <LogOut className="size-3.5" aria-hidden />
                  OUT
                </button>
              </form>
            ) : (
              <Link href="/admin/login" className="jos-rail-link" title="Sign in">
                <LogIn className="size-3.5" aria-hidden />
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
                <Icon className="size-4" aria-hidden />
                {item.short}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

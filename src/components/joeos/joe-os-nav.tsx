"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bike,
  ClipboardList,
  Radio,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { navItems } from "@/design-system/components";
import { cn } from "@/lib/utils";

const icons = {
  briefing: ClipboardList,
  inventory: Bike,
  leads: Radio,
  sync: RefreshCw,
} as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function JoeOsNav({
  email,
  variant,
}: {
  email?: string | null;
  variant: "sidebar" | "mobile";
}) {
  const pathname = usePathname() ?? "";

  if (variant === "mobile") {
    return (
      <nav className="joeos-mobile-nav" aria-label="JoeOS">
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive(pathname, item.href)}
            >
              <Icon className="size-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <aside className="joeos-sidebar">
      <Link href="/admin" className="joeos-brand joeos-sidebar-brand">
        Joe OS
      </Link>
      <nav className="flex flex-col gap-0.5" aria-label="JoeOS">
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              className="joeos-nav-link"
              data-active={isActive(pathname, item.href)}
            >
              <Icon className="size-3.5 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="joeos-sidebar-footer">
        <Link href="/" className="joeos-nav-link" target="_blank">
          <ExternalLink className="size-3.5 shrink-0" aria-hidden />
          Site
        </Link>
        {email ? (
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className={cn("joeos-nav-link w-full text-left")}>
              Sign out
            </button>
          </form>
        ) : (
          <Link href="/admin/login" className="joeos-nav-link">
            Sign in
          </Link>
        )}
        {email ? (
          <p className="joeos-data truncate px-3 pt-2" title={email}>
            {email}
          </p>
        ) : null}
      </div>
    </aside>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Hides Joe marketing chrome on JoeOS (/admin) and ScanBike (/v) routes. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isJoeOs = pathname === "/admin" || pathname?.startsWith("/admin/");
  const isScanBike = pathname === "/v" || pathname?.startsWith("/v/");

  if (isJoeOs || isScanBike) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}

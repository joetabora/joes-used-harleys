"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackContactClick } from "@/lib/analytics/client";

/** Contact navigation that records CONTACT_CLICK (no bikeId). */
export function AnalyticsContactLink({
  bikeId,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { bikeId?: string }) {
  return (
    <Link
      {...props}
      data-analytics="contact"
      onClick={(e) => {
        trackContactClick(bikeId);
        onClick?.(e);
      }}
    />
  );
}

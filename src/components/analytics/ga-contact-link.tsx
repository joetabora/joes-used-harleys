"use client";

import type { ComponentProps } from "react";
import { trackGaConversion } from "@/components/analytics/ga-track";
import type { GaClickEvent, GaLinkLocation } from "@/lib/analytics/ga";

/** Phone, text, or email link. The href is not sent to GA4. */
export function GaContactLink({
  event,
  linkLocation,
  onClick,
  ...props
}: ComponentProps<"a"> & { event: GaClickEvent; linkLocation: GaLinkLocation }) {
  return (
    <a
      {...props}
      onClick={(click) => {
        trackGaConversion({ event, linkLocation });
        onClick?.(click);
      }}
    />
  );
}

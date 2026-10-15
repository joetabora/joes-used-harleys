"use client";

import {
  gaConversionParams,
  normalizeGaMeasurementId,
  type GaConversionInput,
} from "@/lib/analytics/ga";

const MEASUREMENT_ID = normalizeGaMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

type GaWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function gtagReady(ga: GaWindow): ga is GaWindow & { gtag: (...args: unknown[]) => void } {
  ga.dataLayer = ga.dataLayer || [];
  if (typeof ga.gtag !== "function") {
    ga.gtag = function gtag() {
      ga.dataLayer?.push(arguments);
    };
  }
  return typeof ga.gtag === "function";
}

/** Queue one lead event. No-ops without a measurement ID or on an excluded path. */
export function trackGaConversion(input: GaConversionInput): void {
  if (!MEASUREMENT_ID || typeof window === "undefined") return;
  const params = gaConversionParams(window.location.pathname, input);
  if (!params) return;
  const ga = window as GaWindow;
  if (!gtagReady(ga)) return;
  ga.gtag("event", input.event, {
    send_to: MEASUREMENT_ID,
    ...params,
    page_location: `${window.location.origin}${params.page_path}`,
  });
}

"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { claimPageView, isGaTrackedPath, normalizeGaMeasurementId } from "@/lib/analytics/ga";

const MEASUREMENT_ID = normalizeGaMeasurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

type GaWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __juhGaConfigured?: boolean;
};

/** Survives React Strict Mode remounts so one URL is sent once. */
let lastTrackedKey: string | null = null;

function sendPageView(measurementId: string, pagePath: string) {
  const ga = window as GaWindow;
  ga.gtag?.("event", "page_view", {
    send_to: measurementId,
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
  });
}

function GoogleAnalyticsRouteTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname() || "/";
  const search = useSearchParams().toString();
  const [tagMounted, setTagMounted] = useState(() => isGaTrackedPath(pathname));

  useEffect(() => {
    if (isGaTrackedPath(pathname)) setTagMounted(true);
  }, [pathname]);

  useEffect(() => {
    const key = claimPageView(lastTrackedKey, pathname, search);
    if (!key) return;
    const pagePath: string = key;

    let cancelled = false;
    let attempts = 0;

    function tick() {
      if (cancelled || lastTrackedKey === pagePath) return;
      const ga = window as GaWindow;
      if (!ga.__juhGaConfigured || typeof ga.gtag !== "function") {
        if (attempts < 100) {
          attempts += 1;
          window.setTimeout(tick, 50);
        }
        return;
      }
      if (lastTrackedKey === pagePath) return;
      lastTrackedKey = pagePath;
      sendPageView(measurementId, pagePath);
    }

    tick();
    return () => {
      cancelled = true;
    };
  }, [measurementId, pathname, search]);

  if (!tagMounted) return null;
  return <GoogleAnalytics gaId={measurementId} />;
}

/** Loads GA4 only when a measurement ID is configured. Renders nothing otherwise. */
export function GoogleAnalyticsRoot() {
  if (!MEASUREMENT_ID) return null;
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsRouteTracker measurementId={MEASUREMENT_ID} />
    </Suspense>
  );
}

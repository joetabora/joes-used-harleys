"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics/client";

/** Public bike detail: detail view + time on page. */
export function BikeDetailAnalytics({ bikeId }: { bikeId: string }) {
  const start = useRef(Date.now());

  useEffect(() => {
    track({ type: "PAGE_VIEW", bikeId, path: `/inventory/${bikeId}` });
    track({ type: "BIKE_DETAIL_VIEW", bikeId, path: `/inventory/${bikeId}` });

    function flush() {
      const durationMs = Date.now() - start.current;
      if (durationMs < 1000) return;
      track({
        type: "TIME_ON_PAGE",
        bikeId,
        path: `/inventory/${bikeId}`,
        meta: { durationMs },
      });
    }

    function onVis() {
      if (document.visibilityState === "hidden") flush();
    }

    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      flush();
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [bikeId]);

  return null;
}

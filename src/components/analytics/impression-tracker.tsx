"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics/client";

/** Fires INVENTORY_IMPRESSION once per session when card enters viewport. */
export function ImpressionTracker({
  bikeId,
  children,
  className,
}: {
  bikeId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const sent = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || sent.current) return;

    const key = `imp_${bikeId}`;
    try {
      if (sessionStorage.getItem(key)) {
        sent.current = true;
        return;
      }
    } catch {
      /* ignore */
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (sent.current) return;
        if (entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.4)) {
          sent.current = true;
          try {
            sessionStorage.setItem(key, "1");
          } catch {
            /* ignore */
          }
          track({ type: "INVENTORY_IMPRESSION", bikeId });
          obs.disconnect();
        }
      },
      { threshold: [0.4] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [bikeId]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

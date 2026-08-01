"use client";

import { useEffect } from "react";

type Props = {
  bikeId: string;
  path: string;
};

function sessionId(): string {
  const key = "sb_sid";
  let id = window.sessionStorage.getItem(key);
  if (!id) {
    id = `sb_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    window.sessionStorage.setItem(key, id);
  }
  return id;
}

export function VehicleAnalytics({ bikeId, path }: Props) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQr = params.get("src") === "qr" || document.referrer === "";
    const started = Date.now();

    void fetch("/api/analytics/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "SCAN_QR_OPEN",
        bikeId,
        sessionId: sessionId(),
        path,
        meta: { fromQr, assoc: params.get("assoc") },
        product: "SCANBIKE",
      }),
    }).catch(() => {});

    const onLeave = () => {
      const ms = Date.now() - started;
      const body = JSON.stringify({
        type: "SCAN_TIME_ON_PAGE",
        bikeId,
        sessionId: sessionId(),
        path,
        meta: { ms },
        product: "SCANBIKE",
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics/collect", new Blob([body], { type: "application/json" }));
      }
    };

    window.addEventListener("pagehide", onLeave);
    return () => window.removeEventListener("pagehide", onLeave);
  }, [bikeId, path]);

  return null;
}

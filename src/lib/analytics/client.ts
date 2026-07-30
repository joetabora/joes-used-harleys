"use client";

import type { AnalyticsEventTypeName } from "@/lib/analytics/types";

const SESSION_KEY = "joe_analytics_sid";

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getAnalyticsSessionId(): string {
  if (typeof window === "undefined") return "server";
  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing && existing.length >= 8) return existing;
    const id = uuid();
    window.localStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return uuid();
  }
}

export type TrackPayload = {
  type: AnalyticsEventTypeName;
  bikeId?: string | null;
  path?: string | null;
  query?: string | null;
  filters?: Record<string, unknown> | null;
  meta?: Record<string, unknown> | null;
};

/** Fire-and-forget first-party analytics. Skips on /admin. */
export function track(payload: TrackPayload): void {
  if (typeof window === "undefined") return;
  const path = payload.path ?? window.location.pathname;
  if (path.startsWith("/admin")) return;

  const body = {
    ...payload,
    path,
    sessionId: getAnalyticsSessionId(),
  };

  try {
    const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/collect", blob);
      return;
    }
  } catch {
    /* fall through */
  }

  void fetch("/api/analytics/collect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => undefined);
}

export function trackFinancingOpen(bikeId?: string) {
  track({ type: "FINANCING_OPEN", bikeId: bikeId ?? null });
}

export function trackFavorite(bikeId: string) {
  track({ type: "FAVORITE", bikeId });
}

export function trackAppointmentRequest(bikeId?: string) {
  track({ type: "APPOINTMENT_REQUEST", bikeId: bikeId ?? null });
}

export function trackShare(bikeId?: string) {
  track({ type: "SHARE_CLICK", bikeId: bikeId ?? null });
}

export function trackContactClick(bikeId?: string) {
  track({ type: "CONTACT_CLICK", bikeId: bikeId ?? null });
}

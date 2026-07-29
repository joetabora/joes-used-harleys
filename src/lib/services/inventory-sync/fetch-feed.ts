import { createHash } from "node:crypto";
import { FEED_FETCH_TIMEOUT_MS, getFeedUrl } from "./config";

export type FetchFeedResult =
  | { ok: true; body: string; bytes: number; feedUrl: string; feedVersion: string }
  | { ok: false; feedUrl: string; message: string };

export function hashFeedBody(body: string): string {
  return createHash("sha256").update(body, "utf8").digest("hex");
}

export async function fetchFeed(xmlBody?: string): Promise<FetchFeedResult> {
  const feedUrl = getFeedUrl();

  if (xmlBody !== undefined) {
    return {
      ok: true,
      body: xmlBody,
      bytes: Buffer.byteLength(xmlBody, "utf8"),
      feedUrl,
      feedVersion: hashFeedBody(xmlBody),
    };
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FEED_FETCH_TIMEOUT_MS);
    const res = await fetch(feedUrl, {
      signal: controller.signal,
      headers: { Accept: "application/xml,text/xml,*/*" },
      cache: "no-store",
    });
    clearTimeout(timer);

    if (!res.ok) {
      return {
        ok: false,
        feedUrl,
        message: `Feed HTTP ${res.status}`,
      };
    }

    const body = await res.text();
    if (!body.trim()) {
      return { ok: false, feedUrl, message: "Feed body empty" };
    }

    return {
      ok: true,
      body,
      bytes: Buffer.byteLength(body, "utf8"),
      feedUrl,
      feedVersion: hashFeedBody(body),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Feed fetch failed";
    return { ok: false, feedUrl, message };
  }
}

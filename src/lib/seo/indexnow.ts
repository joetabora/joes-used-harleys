import { siteConfig } from "@/lib/site";

/**
 * IndexNow ping. Requires INDEXNOW_KEY and public/{key}.txt.
 * No-ops (returns skipped) when key is unset — never fabricates success.
 */
export async function pingIndexNow(paths: string[]): Promise<{
  ok: boolean;
  skipped?: boolean;
  status?: number;
  body?: string;
}> {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key || paths.length === 0) {
    return { ok: false, skipped: true };
  }

  const host = new URL(siteConfig.url).host;
  const urlList = paths.map((p) => {
    const path = p.startsWith("/") ? p : `/${p}`;
    return `${siteConfig.url.replace(/\/+$/, "")}${path}`;
  });

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `${siteConfig.url.replace(/\/+$/, "")}/${key}.txt`,
        urlList,
      }),
    });
    const body = await res.text().catch(() => "");
    return { ok: res.ok || res.status === 202, status: res.status, body };
  } catch (e) {
    return {
      ok: false,
      body: e instanceof Error ? e.message : "IndexNow network error",
    };
  }
}

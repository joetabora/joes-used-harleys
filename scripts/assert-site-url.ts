/**
 * Fail production / Vercel builds when NEXT_PUBLIC_SITE_URL is missing or localhost.
 * Usage: npm run build — pass --production to enforce even in local builds.
 *
 * Loads .env.local / .env before importing site config (static imports hoist).
 */
import { config as loadEnv } from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

for (const name of [".env.local", ".env"]) {
  const path = resolve(process.cwd(), name);
  if (existsSync(path)) loadEnv({ path, override: false });
}

async function main() {
  const {
    assertSafeSiteUrl,
    isLocalhostSiteUrl,
    mustUsePublicSiteUrl,
  } = await import("../src/lib/site");

  const forcePublic =
    process.argv.includes("--production") || mustUsePublicSiteUrl();
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();

  if (forcePublic) {
    const url = assertSafeSiteUrl(raw, { requirePublic: true });
    console.log(`assert-site-url: ok (${url})`);
    return;
  }

  if (raw && isLocalhostSiteUrl(raw)) {
    console.log(`assert-site-url: local dev URL allowed (${raw})`);
    return;
  }

  if (raw) {
    console.log(
      `assert-site-url: ok (${assertSafeSiteUrl(raw, { requirePublic: false })})`,
    );
    return;
  }

  console.log("assert-site-url: unset; local fallback http://localhost:3000");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

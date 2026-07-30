/**
 * Public site config.
 * Values come from env. PLACEHOLDER_* means "not configured yet" — do not invent real numbers.
 *
 * Canonical public URL source: NEXT_PUBLIC_SITE_URL → siteConfig.url.
 * Build-time gate: `npm run assert:site-url` (fails on localhost).
 * Runtime never throws on import — a bad env must not take the site down.
 */

/** Documented production origin (sitemap / robots / metadata fallback). */
export const CANONICAL_SITE_URL = "https://www.joesusedharleys.com";

function env(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

/** True when builds or deploys should prefer a public HTTPS site URL. */
export function mustUsePublicSiteUrl(): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    Boolean(process.env.VERCEL) ||
    process.env.VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "preview"
  );
}

export function isLocalhostSiteUrl(url: string): boolean {
  const raw = url.trim().toLowerCase();
  if (!raw) return true;
  try {
    const host = new URL(raw).hostname;
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host.endsWith(".local")
    );
  } catch {
    return /localhost|127\.0\.0\.1/.test(raw);
  }
}

/**
 * Validate and normalize a site origin.
 * @throws when requirePublic and URL is missing / localhost / non-https
 */
export function assertSafeSiteUrl(
  url: string,
  opts?: { requirePublic?: boolean },
): string {
  const requirePublic = opts?.requirePublic ?? mustUsePublicSiteUrl();
  const trimmed = url.trim().replace(/\/+$/, "");

  if (!trimmed) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL is required. Example: ${CANONICAL_SITE_URL}`,
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid URL: ${url}`);
  }

  if (requirePublic) {
    if (isLocalhostSiteUrl(trimmed)) {
      throw new Error(
        `NEXT_PUBLIC_SITE_URL must not be localhost in production (got "${trimmed}"). Set ${CANONICAL_SITE_URL} on Vercel.`,
      );
    }
    if (parsed.protocol !== "https:") {
      throw new Error(
        `NEXT_PUBLIC_SITE_URL must use https in production (got "${trimmed}").`,
      );
    }
  }

  return trimmed;
}

/**
 * Resolve the public site origin for runtime use.
 * Never throws — production misconfig falls back to CANONICAL_SITE_URL.
 */
export function resolveSiteUrl(): string {
  const fromEnv = env("NEXT_PUBLIC_SITE_URL").trim();

  if (mustUsePublicSiteUrl()) {
    try {
      return assertSafeSiteUrl(fromEnv, { requirePublic: true });
    } catch (err) {
      console.error(
        "[site] Invalid NEXT_PUBLIC_SITE_URL in production; using canonical fallback.",
        err instanceof Error ? err.message : err,
      );
      return CANONICAL_SITE_URL;
    }
  }

  if (!fromEnv) return "http://localhost:3000";
  try {
    return assertSafeSiteUrl(fromEnv, { requirePublic: false });
  } catch {
    return "http://localhost:3000";
  }
}

export const siteConfig = {
  name: "Joe's Used Harleys",
  domain: "www.joesusedharleys.com",
  url: resolveSiteUrl(),
  tagline: "A personal Harley sales engine — trust first, bikes second.",
  description:
    "Buy a used Harley-Davidson with a salesperson who treats you like a person, not a ticket number. Education, alerts, and real help from Joe.",
  phone: env("NEXT_PUBLIC_JOE_PHONE", "PLACEHOLDER_PHONE_E164"),
  email: env("NEXT_PUBLIC_JOE_EMAIL", "PLACEHOLDER_JOE_EMAIL@example.com"),
  smsLink: env("NEXT_PUBLIC_JOE_SMS_LINK", "sms:PLACEHOLDER_PHONE_E164"),
  /** Single real NAP — never invent. Used for LocalBusiness + GBP consistency. */
  business: {
    streetAddress: env("NEXT_PUBLIC_BUSINESS_STREET", ""),
    addressLocality: env("NEXT_PUBLIC_BUSINESS_CITY", ""),
    addressRegion: env("NEXT_PUBLIC_BUSINESS_REGION", "WI"),
    postalCode: env("NEXT_PUBLIC_BUSINESS_POSTAL", ""),
    addressCountry: env("NEXT_PUBLIC_BUSINESS_COUNTRY", "US"),
    latitude: env("NEXT_PUBLIC_BUSINESS_LAT", ""),
    longitude: env("NEXT_PUBLIC_BUSINESS_LNG", ""),
    googleBusinessUrl: env("NEXT_PUBLIC_GOOGLE_BUSINESS_URL", ""),
  },
} as const;

export function isPlaceholder(value: string): boolean {
  return value.includes("PLACEHOLDER") || value.length === 0;
}

export function hasContactPhone(): boolean {
  return !isPlaceholder(siteConfig.phone);
}

export function hasContactEmail(): boolean {
  return !isPlaceholder(siteConfig.email);
}

/** Street + city + postal required for LocalBusiness address. */
export function hasBusinessNap(): boolean {
  const b = siteConfig.business;
  return Boolean(
    b.streetAddress.trim() &&
      b.addressLocality.trim() &&
      b.postalCode.trim() &&
      !isPlaceholder(b.streetAddress),
  );
}

export function hasBusinessGeo(): boolean {
  const lat = Number(siteConfig.business.latitude);
  const lng = Number(siteConfig.business.longitude);
  return Number.isFinite(lat) && Number.isFinite(lng);
}

export function businessSameAs(): string[] {
  const out: string[] = [];
  const gbp = siteConfig.business.googleBusinessUrl.trim();
  if (gbp && !isPlaceholder(gbp)) out.push(gbp);
  return out;
}

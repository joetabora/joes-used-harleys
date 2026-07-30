/**
 * Public site config.
 * Values come from env. PLACEHOLDER_* means "not configured yet" — do not invent real numbers.
 */

function env(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

export const siteConfig = {
  name: "Joe's Used Harleys",
  domain: "joesusedharleys.com",
  url: env("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
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

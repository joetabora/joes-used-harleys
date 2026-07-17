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

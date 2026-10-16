/**
 * Server-only Google reporting config.
 * Reads process env. Never logs credentials or returns the private key to a view.
 */

export type ServiceAccountCredentials = {
  clientEmail: string;
  privateKey: string;
};

export type GoogleReportingConfig = {
  propertyId: string | null;
  propertyProblem: string | null;
  siteUrl: string | null;
  siteProblem: string | null;
  credentials: ServiceAccountCredentials | null;
  credentialProblem: string | null;
};

const PROPERTY_ID = /^\d{4,20}$/;

export function readGoogleReportingConfig(env: NodeJS.ProcessEnv): GoogleReportingConfig {
  const propertyRaw = env.GA4_PROPERTY_ID?.trim() ?? "";
  const siteRaw = env.SEARCH_CONSOLE_SITE_URL?.trim() ?? "";
  const jsonRaw = env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim() ?? "";

  let propertyId: string | null = null;
  let propertyProblem: string | null = null;
  if (!propertyRaw) {
    propertyProblem = "Not configured. GA4_PROPERTY_ID is not set.";
  } else if (!PROPERTY_ID.test(propertyRaw)) {
    propertyProblem = "Not configured. GA4_PROPERTY_ID must be the numeric property id.";
  } else {
    propertyId = propertyRaw;
  }

  let siteUrl: string | null = null;
  let siteProblem: string | null = null;
  if (!siteRaw) {
    siteProblem = "Not configured. SEARCH_CONSOLE_SITE_URL is not set.";
  } else if (!isSearchConsoleSiteUrl(siteRaw)) {
    siteProblem =
      "Not configured. SEARCH_CONSOLE_SITE_URL must be the exact property, such as https://www.example.com/ or sc-domain:example.com.";
  } else {
    siteUrl = siteRaw;
  }

  let credentials: ServiceAccountCredentials | null = null;
  let credentialProblem: string | null = null;
  if (!jsonRaw) {
    credentialProblem = "Not configured. GOOGLE_SERVICE_ACCOUNT_JSON is not set.";
  } else {
    credentials = parseServiceAccount(jsonRaw);
    if (!credentials) {
      credentialProblem = "Service account JSON could not be read.";
    }
  }

  return { propertyId, propertyProblem, siteUrl, siteProblem, credentials, credentialProblem };
}

export function isSearchConsoleSiteUrl(value: string): boolean {
  if (value.startsWith("sc-domain:")) {
    const host = value.slice("sc-domain:".length);
    return host.length > 0 && !host.includes("/") && !host.includes(" ");
  }
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.username === "" && url.password === "" && url.search === "";
  } catch {
    return false;
  }
}

function parseServiceAccount(raw: string): ServiceAccountCredentials | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const record = parsed as Record<string, unknown>;
  if (record.type !== "service_account") return null;
  if (typeof record.client_email !== "string" || !record.client_email.endsWith(".iam.gserviceaccount.com")) {
    return null;
  }
  if (typeof record.private_key !== "string" || !record.private_key.includes("BEGIN PRIVATE KEY")) {
    return null;
  }
  return { clientEmail: record.client_email, privateKey: record.private_key };
}

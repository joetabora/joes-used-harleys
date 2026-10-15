/**
 * GA4 page views and lead events.
 * The Measurement ID is public (gtag.js). Never put a secret, form value, or query string in this module.
 */

const MEASUREMENT_ID = /^G-[A-Za-z0-9]+$/;
const VIN_LIKE = /^[A-HJ-NPR-Z0-9]{17}$/i;
const SAFE_INVENTORY_ID = /^[a-zA-Z0-9_-]{1,64}$/;

export const gaLinkLocations = ["home", "header", "footer", "contact", "about"] as const;
export type GaLinkLocation = (typeof gaLinkLocations)[number];

export const gaClickEvents = ["click_to_call", "click_to_text", "click_to_email"] as const;
export type GaClickEvent = (typeof gaClickEvents)[number];

export type GaConversionInput =
  | { event: GaClickEvent; linkLocation: GaLinkLocation }
  | { event: "form_start" | "generate_lead" };

/** Returns a GA4 measurement ID, or null when analytics should stay off. */
export function normalizeGaMeasurementId(raw: string | null | undefined): string | null {
  const id = (raw ?? "").trim();
  if (!MEASUREMENT_ID.test(id)) return null;
  return id;
}

/**
 * Public pages we will report.
 * `/admin` is staff-only. `/v/{vin}` puts a VIN in the URL, so those hits stay out of GA4.
 * Stock ScanBike URLs (`/v/s/{stock}`) do not include a VIN.
 */
function hasVinSegment(pathname: string): boolean {
  return pathname.split("/").some((part) => VIN_LIKE.test(part));
}

export function isGaTrackedPath(pathname: string): boolean {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "";
  if (!path.startsWith("/")) return false;
  if (path === "/admin" || path.startsWith("/admin/")) return false;
  if (path === "/v" || (path.startsWith("/v/") && !path.startsWith("/v/s/"))) return false;
  if (hasVinSegment(path)) return false;
  return true;
}

/** Pathname only. Query strings and hashes are never sent. */
export function pageViewPath(pathname: string, _search?: string): string | null {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "";
  if (!isGaTrackedPath(path)) return null;
  return path;
}

/** Inventory id from a bike detail path. VIN-shaped ids are rejected. */
export function inventoryBikeId(pathname: string): string | null {
  const path = pageViewPath(pathname);
  if (!path) return null;
  const match = path.match(/^\/inventory\/([^/]+)$/);
  const id = match?.[1] ?? "";
  if (!SAFE_INVENTORY_ID.test(id) || VIN_LIKE.test(id)) return null;
  return id;
}

/**
 * Params for a lead event. Null on admin, VIN URLs, and other excluded paths.
 * Never includes form fields, contact details, or the query string.
 */
export function gaConversionParams(
  pathname: string,
  input: GaConversionInput,
): Record<string, string> | null {
  const page_path = pageViewPath(pathname);
  if (!page_path) return null;
  const params: Record<string, string> = { page_path };
  const bikeId = inventoryBikeId(page_path);
  if (bikeId) params.bike_id = bikeId;
  if ("linkLocation" in input) params.link_location = input.linkLocation;
  return params;
}

/** Next key to send, or null when this URL was already sent or is excluded. */
export function claimPageView(lastKey: string | null, pathname: string, search: string): string | null {
  const next = pageViewPath(pathname, search);
  if (!next || next === lastKey) return null;
  return next;
}

/**
 * Runs before `@next/third-parties` GoogleAnalytics.
 * That component always calls `gtag('config', id)`, which sends a page_view and
 * cannot skip `/admin`. Rewriting the queued config forces `send_page_view: false`
 * so only our route tracker emits page views.
 */
export function gaDataLayerGuardScript(): string {
  return `(function(){window.dataLayer=window.dataLayer||[];var push=window.dataLayer.push.bind(window.dataLayer);window.dataLayer.push=function(item){if(item&&item[0]==="config"){var opts=item[2]&&typeof item[2]==="object"?item[2]:{};item[2]=Object.assign({},opts,{send_page_view:false});window.__juhGaConfigured=true;}return push(item);};})();`;
}

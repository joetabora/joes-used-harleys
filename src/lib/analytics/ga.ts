/**
 * Phase 1 GA4 page views only.
 * The Measurement ID is public (gtag.js). Never put a secret in this module.
 */

const MEASUREMENT_ID = /^G-[A-Za-z0-9]+$/;

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
export function isGaTrackedPath(pathname: string): boolean {
  if (!pathname.startsWith("/")) return false;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return false;
  if (pathname === "/v" || (pathname.startsWith("/v/") && !pathname.startsWith("/v/s/"))) {
    return false;
  }
  return true;
}

/** Path plus query, without a hash. Null when the URL must not be sent. */
export function pageViewPath(pathname: string, search: string): string | null {
  if (!isGaTrackedPath(pathname)) return null;
  const qs = search.replace(/^\?/, "").trim();
  return qs ? `${pathname}?${qs}` : pathname;
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

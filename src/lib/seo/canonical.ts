import { siteConfig } from "@/lib/site";

/** Normalize path to leading slash, no trailing slash (except root). */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/+$/, "");
  const p = normalizePath(path);
  return p === "/" ? base : `${base}${p}`;
}

/** Strip query/hash — inventory filters stay on /inventory canonical. */
export function stripQuery(pathOrUrl: string): string {
  try {
    if (pathOrUrl.startsWith("http")) {
      const u = new URL(pathOrUrl);
      return normalizePath(u.pathname);
    }
  } catch {
    /* fall through */
  }
  return normalizePath(pathOrUrl.split("?")[0]?.split("#")[0] ?? "/");
}

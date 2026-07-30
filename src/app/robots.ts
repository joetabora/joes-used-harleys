import type { MetadataRoute } from "next";
import { assertSafeSiteUrl, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = assertSafeSiteUrl(siteConfig.url, {
    requirePublic: process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL),
  });
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}

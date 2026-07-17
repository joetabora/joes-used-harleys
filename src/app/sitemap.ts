import { cityPages } from "@/lib/cities";
import { guides } from "@/lib/guides";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";

export default async function sitemap() {
  const base = siteConfig.url;

  const staticRoutes = [
    "",
    "/about",
    "/how-it-works",
    "/contact",
    "/inventory",
    "/guides",
    "/assistant",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const guideRoutes = guides.map((guide) => ({
    url: `${base}/guides/${guide.slug}`,
    lastModified: new Date(),
  }));

  const cityRoutes = cityPages.map((city) => ({
    url: `${base}/used-harleys/${city.slug}`,
    lastModified: new Date(),
  }));

  let bikeRoutes: { url: string; lastModified: Date }[] = [];
  if (isDatabaseConfigured() && prisma) {
    const bikes = await prisma.bike.findMany({
      where: { status: { in: ["AVAILABLE", "PENDING"] } },
      select: { slug: true, updatedAt: true },
    });
    bikeRoutes = bikes.map((bike) => ({
      url: `${base}/inventory/${bike.slug}`,
      lastModified: bike.updatedAt,
    }));
  }

  return [...staticRoutes, ...guideRoutes, ...cityRoutes, ...bikeRoutes];
}

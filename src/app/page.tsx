import type { BikeCardData } from "@/components/bike-card";
import { HomeComeTalk } from "@/components/home/home-come-talk";
import { HomeFreshFloor } from "@/components/home/home-fresh-floor";
import { HomeFromTheBench } from "@/components/home/home-from-the-bench";
import { HomeHero } from "@/components/home/home-hero";
import { HomeHowItWorks } from "@/components/home/home-how-it-works";
import { HomeMeetJoe } from "@/components/home/home-meet-joe";
import { HomeModelTicker } from "@/components/home/home-model-ticker";
import { HomeRideStyles } from "@/components/home/home-ride-styles";
import { HomeTheFloor } from "@/components/home/home-the-floor";
import { publicBikeOrderBy, publicBikeWhere } from "@/lib/inventory-public";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Used Harley-Davidson Motorcycles Near Milwaukee",
  description:
    "Joe helps Milwaukee and Southeastern Wisconsin riders find and buy used Harley-Davidson motorcycles — honest guidance, live inventory, and a salesperson you can actually talk to.",
  path: "/",
});

export const revalidate = 300;

async function loadFloor(): Promise<{ bikes: BikeCardData[]; total: number }> {
  if (!isDatabaseConfigured() || !prisma) return { bikes: [], total: 0 };
  try {
    const [rows, total] = await Promise.all([
      prisma.bike.findMany({
        where: publicBikeWhere,
        orderBy: publicBikeOrderBy,
        take: 6,
        select: {
          id: true,
          year: true,
          make: true,
          model: true,
          mileage: true,
          price: true,
          status: true,
          stockNumber: true,
          photos: true,
          personalHeroImageUrl: true,
        },
      }),
      prisma.bike.count({ where: publicBikeWhere }),
    ]);
    return {
      total,
      bikes: rows.map((b) => ({
        id: b.id,
        year: b.year,
        make: b.make,
        model: b.model,
        mileage: b.mileage,
        price: b.price,
        status: b.status,
        stockNumber: b.stockNumber,
        photoUrl: b.personalHeroImageUrl || b.photos[0] || null,
      })),
    };
  } catch {
    return { bikes: [], total: 0 };
  }
}

export default async function HomePage() {
  const { bikes, total } = await loadFloor();
  return (
    <>
      <HomeHero liveCount={total} />
      <HomeModelTicker />
      <HomeFreshFloor bikes={bikes} total={total} />
      <HomeMeetJoe />
      <HomeRideStyles />
      <HomeHowItWorks />
      <HomeTheFloor />
      <HomeFromTheBench />
      <HomeComeTalk />
    </>
  );
}

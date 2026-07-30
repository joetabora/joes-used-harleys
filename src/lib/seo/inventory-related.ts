import { publicBikeWhere } from "@/lib/inventory-public";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export type RelatedBikeCard = {
  id: string;
  year: number;
  make: string;
  model: string;
  price: number | null;
  mileage: number | null;
  status: string;
  photoUrl: string | null;
};

export async function fetchRelatedInventory(hint?: {
  model?: string;
  year?: number;
  family?: string;
  color?: string;
  excludeId?: string;
  take?: number;
}): Promise<RelatedBikeCard[]> {
  if (!isDatabaseConfigured() || !prisma) return [];

  const take = hint?.take ?? 6;
  const and: Record<string, unknown>[] = [];

  if (hint?.model) {
    and.push({ model: { contains: hint.model.replace(/-/g, " "), mode: "insensitive" } });
  }
  if (hint?.year) and.push({ year: hint.year });
  if (hint?.color) {
    and.push({ color: { contains: hint.color.replace(/-/g, " "), mode: "insensitive" } });
  }
  if (hint?.excludeId) and.push({ id: { not: hint.excludeId } });

  const bikes = await prisma.bike.findMany({
    where: {
      ...publicBikeWhere,
      ...(and.length ? { AND: and } : {}),
    },
    orderBy: [{ featuredRank: "desc" }, { firstSeenAt: "desc" }],
    take,
  });

  return bikes.map((b) => ({
    id: b.id,
    year: b.year,
    make: b.make,
    model: b.model,
    price: b.price,
    mileage: b.mileage,
    status: b.status,
    photoUrl: b.personalHeroImageUrl || b.photos[0] || null,
  }));
}

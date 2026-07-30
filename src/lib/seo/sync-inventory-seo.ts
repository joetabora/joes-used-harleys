import { pingIndexNow } from "@/lib/seo/indexnow";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

/** Upsert inventory SeoUrl rows and ping IndexNow for changed paths. */
export async function syncInventorySeoUrls(bikeIds: string[]): Promise<void> {
  if (!isDatabaseConfigured() || !prisma || bikeIds.length === 0) return;

  const paths: string[] = [];
  for (const id of bikeIds) {
    const path = `/inventory/${id}`;
    paths.push(path);
    try {
      await prisma.seoUrl.upsert({
        where: { path },
        create: {
          path,
          type: "INVENTORY",
          status: "INDEX",
          score: 85,
          payload: { bikeId: id },
        },
        update: {
          status: "INDEX",
          score: 85,
          payload: { bikeId: id },
        },
      });
    } catch {
      /* SeoUrl table may not be migrated yet */
      return;
    }
  }

  const result = await pingIndexNow(paths.slice(0, 100));
  if (result.skipped) return;

  try {
    for (const path of paths.slice(0, 100)) {
      await prisma.seoIndexPing.create({
        data: {
          path,
          provider: "indexnow",
          ok: result.ok,
          response: result.body?.slice(0, 500) ?? String(result.status ?? ""),
        },
      });
      if (result.ok) {
        await prisma.seoUrl.updateMany({
          where: { path },
          data: { indexNowAt: new Date(), lastIndexedAt: new Date() },
        });
      }
    }
  } catch {
    /* ignore ping log failures */
  }
}

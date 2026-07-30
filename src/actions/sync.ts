"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { syncInventory } from "@/lib/services/inventory-sync";
import type { SyncResult } from "@/lib/services/inventory-sync";

export type SyncActionResult = {
  ok: boolean;
  message: string;
  result?: SyncResult;
};

export async function runInventorySync(dryRun = false): Promise<SyncActionResult> {
  await requireAdmin();

  if (!isDatabaseConfigured() || !prisma) {
    return { ok: false, message: "Database not configured." };
  }

  const result = await syncInventory(prisma, {
    trigger: dryRun ? "DRY_RUN" : "MANUAL",
    dryRun,
  });

  if (!dryRun && result.ok) {
    revalidatePath("/inventory");
    revalidatePath("/admin/bikes");
    revalidatePath("/admin/sync");
    revalidatePath("/");
    try {
      const { syncInventorySeoUrls } = await import("@/lib/seo/sync-inventory-seo");
      const { pingIndexNow } = await import("@/lib/seo/indexnow");
      const recent = await prisma.bike.findMany({
        where: { status: { in: ["AVAILABLE", "PENDING"] }, hidden: false },
        select: { id: true },
        orderBy: { updatedAt: "desc" },
        take: 50,
      });
      await syncInventorySeoUrls(recent.map((b) => b.id));
      await pingIndexNow(["/inventory", "/sitemap.xml"]);
    } catch {
      /* SEO indexing is best-effort */
    }
  } else {
    revalidatePath("/admin/sync");
  }

  return {
    ok: result.ok,
    message: result.message,
    result,
  };
}

import { syncInventory } from "@/lib/services/inventory-sync";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * JoeOS daily inventory sync (Vercel Cron).
 * Hobby plan: once per day. Manual Sync / Dry Run reuse the same engine.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || secret.includes("PLACEHOLDER")) {
    return Response.json({ ok: false, message: "CRON_SECRET not configured" }, { status: 503 });
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured() || !prisma) {
    return Response.json({ ok: false, message: "Database not configured" }, { status: 503 });
  }

  const result = await syncInventory(prisma, { trigger: "CRON", dryRun: false });

  return Response.json(result, { status: result.ok ? 200 : 502 });
}

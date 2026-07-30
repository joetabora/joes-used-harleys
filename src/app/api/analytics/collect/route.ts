import { NextResponse } from "next/server";
import { collectAnalyticsSchema } from "@/lib/analytics/types";
import { recordAnalyticsEvent } from "@/lib/analytics/record";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = collectAnalyticsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Invalid payload", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const result = await recordAnalyticsEvent(parsed.data);
  if (!result.ok && result.message === "Unknown bikeId") {
    return NextResponse.json(result, { status: 404 });
  }
  if (!result.ok && result.message === "Database not configured") {
    return NextResponse.json(result, { status: 503 });
  }
  return NextResponse.json(result);
}

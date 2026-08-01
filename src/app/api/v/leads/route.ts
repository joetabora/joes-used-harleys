import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyScanBikeLead } from "@/lib/email";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  bikeId: z.string().min(1).max(64),
  vin: z.string().nullable().optional(),
  stockNumber: z.string().nullable().optional(),
  title: z.string().max(200).optional(),
  kind: z.enum(["test_ride", "ask_associate"]),
  assoc: z.string().max(64).nullable().optional(),
});

const recent = new Map<string, number>();

function allow(ip: string): boolean {
  const now = Date.now();
  const last = recent.get(ip) ?? 0;
  if (now - last < 4000) return false;
  recent.set(ip, now);
  if (recent.size > 2000) {
    for (const [k, t] of recent) {
      if (now - t > 60_000) recent.delete(k);
    }
  }
  return true;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!allow(ip)) {
    return NextResponse.json(
      { ok: false, message: "Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid form" },
      { status: 400 },
    );
  }

  if (!isDatabaseConfigured() || !prisma) {
    return NextResponse.json(
      { ok: false, message: "Service unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const data = parsed.data;
  const email = data.email || null;
  const phone = data.phone || null;
  if (!email && !phone) {
    return NextResponse.json(
      { ok: false, message: "Please provide an email or phone number." },
      { status: 400 },
    );
  }

  const bike = await prisma.bike.findUnique({
    where: { id: data.bikeId },
    select: { id: true, vin: true, stockNumber: true },
  });
  if (!bike) {
    return NextResponse.json({ ok: false, message: "Vehicle not found." }, { status: 404 });
  }

  const source = `scanbike:/v/${bike.vin ?? `s/${bike.stockNumber ?? bike.id}`}${
    data.assoc ? `?assoc=${data.assoc}` : ""
  }`;

  const notes = [
    data.kind === "test_ride" ? "Request: test ride" : "Request: ask associate",
    data.title ? `Vehicle: ${data.title}` : null,
    bike.vin ? `VIN: ${bike.vin}` : null,
    bike.stockNumber ? `Stock: ${bike.stockNumber}` : null,
    data.assoc ? `Assoc token: ${data.assoc}` : null,
    data.notes || null,
  ]
    .filter(Boolean)
    .join("\n");

  await prisma.lead.create({
    data: {
      name: data.name,
      email,
      phone,
      notes,
      source,
      product: "SCANBIKE",
    },
  });

  const notify = await notifyScanBikeLead({
    name: data.name,
    email,
    phone,
    notes,
    source,
  });

  return NextResponse.json({
    ok: true,
    message: notify.sent
      ? "Thanks — a sales associate will follow up."
      : "Thanks — your request was saved.",
  });
}

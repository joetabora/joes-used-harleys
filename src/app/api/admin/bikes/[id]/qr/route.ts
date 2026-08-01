import QRCode from "qrcode";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { qrPayloadForBike } from "@/lib/vehicle/qr";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

/**
 * JoeOS QR download — PNG encodes absolute ScanBike URL only (no Joe branding).
 * Query: ?print=1 for print-sheet sized PNG; ?assoc=opaque token appended to URL.
 */
export async function GET(req: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured() || !prisma) {
    return NextResponse.json({ ok: false, message: "DB unavailable" }, { status: 503 });
  }

  const { id } = await params;
  const bike = await prisma.bike.findUnique({
    where: { id },
    select: {
      vin: true,
      stockNumber: true,
      year: true,
      make: true,
      model: true,
      scanSlugVin: true,
      scanSlugStock: true,
    },
  });
  if (!bike) {
    return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
  }

  const url = new URL(req.url);
  const assoc = url.searchParams.get("assoc")?.trim();
  const print = url.searchParams.get("print") === "1";

  let payload = qrPayloadForBike(bike);
  if (!payload) {
    return NextResponse.json(
      { ok: false, message: "No VIN or stock number — cannot generate QR" },
      { status: 400 },
    );
  }

  const u = new URL(payload);
  u.searchParams.set("src", "qr");
  if (assoc) u.searchParams.set("assoc", assoc);
  payload = u.toString();

  const png = await QRCode.toBuffer(payload, {
    type: "png",
    width: print ? 1024 : 512,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#000000", light: "#FFFFFF" },
  });

  const label = [bike.year, bike.make, bike.model].filter(Boolean).join("-").replace(/\s+/g, "_");
  const filename = `scanbike-qr-${label || id}.png`;

  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

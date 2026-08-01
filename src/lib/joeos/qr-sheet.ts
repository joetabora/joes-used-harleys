import { qrPayloadForBike } from "@/lib/vehicle/qr";

export const QR_SHEET_COLS = 4 as const;
export type QrSheetRows = 5 | 6;

export type QrSheetBike = {
  id: string;
  year: number;
  make: string;
  model: string;
  vin: string | null;
  stockNumber: string | null;
};

export type QrSheetCellLabel = {
  /** Primary label under QR — stock number when available. */
  primary: string;
  /** Secondary line: year + model, or VIN hint when no stock. */
  secondary: string;
};

/** Stock first for lot pairing; VIN last-6 fallback when stock missing. */
export function buildQrCellLabel(bike: QrSheetBike): QrSheetCellLabel {
  const stock = bike.stockNumber?.trim() || null;
  const vin = bike.vin?.trim() || null;
  const secondary = `${bike.year} ${bike.model}`.replace(/\s+/g, " ").trim();

  if (stock) {
    return { primary: stock, secondary };
  }
  if (vin) {
    const tail = vin.slice(-6);
    return { primary: `VIN …${tail}`, secondary };
  }
  return { primary: "No ID", secondary };
}

/** Canonical ScanBike URL with src=qr (same as single QR API). */
export function buildQrSheetPayload(bike: {
  vin: string | null;
  stockNumber: string | null;
}): string | null {
  const base = qrPayloadForBike(bike);
  if (!base) return null;
  const u = new URL(base);
  u.searchParams.set("src", "qr");
  return u.toString();
}

export function parseQrSheetRows(raw: string | string[] | undefined): QrSheetRows {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "6" ? 6 : 5;
}

/** Chunk bikes into letter pages of cols × rows cells. */
export function chunkForQrSheet<T>(items: T[], cols: number, rows: number): T[][] {
  const size = Math.max(1, cols * rows);
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

export function sortBikesForQrSheet(bikes: QrSheetBike[]): QrSheetBike[] {
  return [...bikes].sort((a, b) => {
    const sa = (a.stockNumber ?? "").trim().toLowerCase();
    const sb = (b.stockNumber ?? "").trim().toLowerCase();
    if (sa && sb && sa !== sb) return sa.localeCompare(sb, undefined, { numeric: true });
    if (sa && !sb) return -1;
    if (!sa && sb) return 1;
    const ma = `${a.make} ${a.model}`.toLowerCase();
    const mb = `${b.make} ${b.model}`.toLowerCase();
    if (ma !== mb) return ma.localeCompare(mb);
    return a.year - b.year;
  });
}

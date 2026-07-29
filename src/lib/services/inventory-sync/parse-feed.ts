import { XMLParser } from "fast-xml-parser";
import type { ParsedFeedItem } from "./types";

function asString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object" && value !== null && "#text" in value) {
    return asString((value as { "#text": unknown })["#text"]);
  }
  if (typeof value === "string") {
    const t = value.trim();
    return t.length ? t : null;
  }
  return null;
}

function asInt(value: unknown): number | null {
  const s = asString(value);
  if (!s) return null;
  const n = Number.parseInt(s.replace(/[^\d-]/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

function asPriceDollars(value: unknown): number | null {
  const s = asString(value);
  if (!s) return null;
  const n = Number.parseFloat(s.replace(/[$,]/g, ""));
  if (!Number.isFinite(n)) return null;
  return Math.round(n);
}

function textFromNode(node: unknown): string | null {
  if (node === null || node === undefined) return null;
  if (typeof node === "object" && node !== null && "#text" in node) {
    return asString((node as { "#text": unknown })["#text"]);
  }
  return asString(node);
}

function collectPhotos(item: Record<string, unknown>): string[] {
  const photos: string[] = [];
  for (let i = 1; i <= 50; i++) {
    const key = `image${i}`;
    if (!(key in item)) continue;
    const url = textFromNode(item[key]);
    if (url) photos.push(url);
  }
  return photos;
}

function parseOneItem(raw: unknown): ParsedFeedItem | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;

  const feedId = asString(item.id);
  const year = asInt(item.year);
  const make = asString(item.make);
  const model = asString(item.model);

  if (!feedId || year === null || !make || !model) return null;

  return {
    feedId,
    year,
    make,
    model,
    title: asString(item.title),
    price: asPriceDollars(item.price),
    mileage: asInt(item.miles),
    color: asString(item.color),
    description: asString(item.description),
    condition: asString(item.condition),
    category: asString(item.category),
    transmission: asString(item.transmission),
    certified: asString(item.certified),
    vrm: asString(item.vrm),
    listPriceRaw: asString(item.list),
    inventoryUrl: asString(item.url),
    locationId: asString(item.location_id),
    locationName: asString(item.location),
    city: asString(item.city),
    state: asString(item.state),
    zipcode: asString(item.zipcode),
    dealerPhone: asString(item.telephone),
    dealerEmail: asString(item.email),
    stockNumber: asString(item.stocknumber),
    vin: asString(item.vin),
    photos: collectPhotos(item),
  };
}

export type ParseFeedResult =
  | { ok: true; items: ParsedFeedItem[]; parsedCount: number }
  | { ok: false; message: string };

/**
 * Parse dealership inventory XML. Uses only observed tags from the live feed.
 */
export function parseFeed(xml: string): ParseFeedResult {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
      trimValues: true,
      isArray: (name) => name === "item",
    });

    const doc = parser.parse(xml) as Record<string, unknown>;
    const inventory = doc.inventory;
    if (!inventory || typeof inventory !== "object") {
      return { ok: false, message: "Malformed XML: missing inventory root" };
    }

    const rawItems = (inventory as { item?: unknown }).item;
    const list = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

    const items: ParsedFeedItem[] = [];
    for (const raw of list) {
      const parsed = parseOneItem(raw);
      if (parsed) items.push(parsed);
    }

    return { ok: true, items, parsedCount: list.length };
  } catch (err) {
    const message = err instanceof Error ? err.message : "XML parse failed";
    return { ok: false, message: `Malformed XML: ${message}` };
  }
}

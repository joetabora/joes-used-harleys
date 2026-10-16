import { advertisedTotalPrice } from "@/lib/format";

/** Strip HTML / decode common entities for meta descriptions and schema text. */
export function stripHtmlForMeta(input: string, maxLen = 155): string {
  const withoutTags = input
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (withoutTags.length <= maxLen) return withoutTags;
  const sliced = withoutTags.slice(0, maxLen - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${(lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced).trim()}…`;
}

export function inventoryMetaDescription(input: {
  seoDescription?: string | null;
  description?: string | null;
  year: number;
  make: string;
  model: string;
  mileage?: number | null;
  price?: number | null;
}): string {
  const name = `${input.year} ${input.make} ${input.model}`.replace(/\s+/g, " ").trim();
  const facts = [name || "Used Harley-Davidson"];
  if (input.mileage != null && Number.isFinite(input.mileage) && input.mileage >= 0) {
    facts.push(`${input.mileage.toLocaleString("en-US")} miles`);
  }
  const shown = advertisedTotalPrice(input.price);
  if (shown != null) {
    facts.push(`advertised at $${Math.round(shown).toLocaleString("en-US")}`);
  }
  return stripHtmlForMeta(`${facts.join(", ")}. Milwaukee-area used Harley help from Joe.`);
}

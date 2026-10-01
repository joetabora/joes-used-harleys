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
  if (input.seoDescription?.trim()) {
    return stripHtmlForMeta(input.seoDescription);
  }
  if (input.description?.trim()) {
    const cleaned = stripHtmlForMeta(input.description);
    if (cleaned.length >= 40) return cleaned;
  }
  const bits = [`${input.year} ${input.make} ${input.model}`.trim()];
  if (input.mileage != null && Number.isFinite(input.mileage)) {
    bits.push(`${input.mileage.toLocaleString("en-US")} miles`);
  }
  if (input.price != null && Number.isFinite(input.price)) {
    bits.push(`$${Math.round(input.price).toLocaleString("en-US")}`);
  }
  bits.push("Milwaukee-area used Harley help from Joe");
  return stripHtmlForMeta(bits.join(" — "));
}

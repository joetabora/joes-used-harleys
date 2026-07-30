export type InventoryFamily =
  | "Sportster"
  | "Softail"
  | "Touring"
  | "Trike"
  | "Other";

export const INVENTORY_FAMILIES: InventoryFamily[] = [
  "Sportster",
  "Softail",
  "Touring",
  "Trike",
  "Other",
];

export function classifyFamily(bike: {
  model: string;
  category: string | null;
}): InventoryFamily {
  const hay = `${bike.category ?? ""} ${bike.model}`.toLowerCase();
  if (/tri\s?glide|trike|freewheeler/.test(hay)) return "Trike";
  if (
    /sportster|iron\s?883|forty[- ]?eight|nightster|xl1200|xl883/.test(hay) &&
    !/softail/.test(hay)
  ) {
    return "Sportster";
  }
  if (
    /road\s?glide|street\s?glide|ultra|electra|touring|cvo.*glide/.test(hay)
  ) {
    return "Touring";
  }
  if (
    /softail|fat\s?boy|low\s?rider|heritage|breakout|street\s?bob|deluxe|fat\s?bob/.test(
      hay,
    )
  ) {
    return "Softail";
  }
  return "Other";
}

import type {
  LocationKnowledgePack,
  LocationTopic,
} from "@/lib/content/location-pack-types";

function nonEmpty(items: string[] | undefined, min = 1): boolean {
  return Boolean(items && items.filter((s) => s.trim().length > 0).length >= min);
}

export function locationTopicAvailable(
  pack: LocationKnowledgePack,
  topic: LocationTopic,
): boolean {
  switch (topic) {
    case "hub":
      return (
        nonEmpty(pack.localContext, 2) &&
        nonEmpty(pack.buyingAngles, 2) &&
        pack.faqs.length >= 3
      );
    case "inventory":
      return nonEmpty(pack.inventoryFraming, 2);
    case "buying":
      return nonEmpty(pack.buyingAngles, 3);
    case "trade-in":
      return nonEmpty(pack.tradeInNotes, 2);
    case "financing":
      return nonEmpty(pack.financingNotes, 2);
    case "events":
      return nonEmpty(pack.eventNotes, 2);
    case "service":
      return nonEmpty(pack.serviceEducation, 2);
    case "routes":
      return nonEmpty(pack.ridingCulture, 2) || pack.nearbyRouteSlugs.length > 0;
    case "faq":
      return pack.faqs.length >= 3;
    default:
      return false;
  }
}

export function packMeetsLocationHubFloor(pack: LocationKnowledgePack): boolean {
  return locationTopicAvailable(pack, "hub");
}

/** Forbidden service-shop claims in education copy. */
export function serviceEducationIsHonest(text: string): boolean {
  return !/our service (department|department hours|menu)|shop hours|we service your bike here/i.test(
    text,
  );
}

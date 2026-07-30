import { getLocationPack } from "@/content/location-packs";
import {
  locationTopicAvailable,
  serviceEducationIsHonest,
} from "@/lib/content/location-pack-completeness";
import {
  LOCATION_TOPICS,
  TOPIC_PATH,
  type LocationKnowledgePack,
  type LocationTopic,
} from "@/lib/content/location-pack-types";
import { getEventGuide, getRouteGuide } from "@/lib/content/guides";
import { getGeo, getModel, listGeo } from "@/lib/content/taxonomy";
import { composeSeoDocument, section } from "@/lib/seo/compose-page";
import {
  cityNeighborLinks,
  cityTopicLinks,
  comparisonLinksFor,
  relatedGuidesFor,
  relatedModelsFor,
} from "@/lib/seo/linking";
import { localBusinessJsonLd } from "@/lib/seo/schema";
import type { SeoPageDocument, SeoSection } from "@/lib/seo/types";
import { hasBusinessGeo, hasBusinessNap, siteConfig } from "@/lib/site";

function joinBullets(items: string[]): string {
  return items.map((s) => `• ${s}`).join("\n");
}

function haversineMiles(
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number,
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const lat1 = toRad(aLat);
  const lat2 = toRad(bLat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.asin(Math.min(1, Math.sqrt(h))));
}

function travelSection(pack: LocationKnowledgePack): SeoSection | null {
  const lines = [...pack.travelNotes];
  if (
    hasBusinessGeo() &&
    pack.lat != null &&
    pack.lng != null &&
    Number.isFinite(pack.lat) &&
    Number.isFinite(pack.lng)
  ) {
    const miles = haversineMiles(
      pack.lat,
      pack.lng,
      Number(siteConfig.business.latitude),
      Number(siteConfig.business.longitude),
    );
    lines.push(
      `Approximate straight-line distance to the published business location: about ${miles} miles (not drive time — traffic and routing vary).`,
    );
  }
  if (!lines.length) return null;
  return section("Travel & visit planning", joinBullets(lines));
}

function gbpNote(): SeoSection | null {
  if (!hasBusinessNap()) return null;
  const gbp = siteConfig.business.googleBusinessUrl.trim();
  return section(
    "Same NAP as Google Business",
    [
      `Use the published business address (${siteConfig.business.streetAddress}, ${siteConfig.business.addressLocality}, ${siteConfig.business.addressRegion} ${siteConfig.business.postalCode}) — the same NAP we use for LocalBusiness markup${gbp ? " and our Google Business Profile" : ""}.`,
      "City pages describe service areas for Southeast Wisconsin buyers. They are not separate storefronts.",
    ].join("\n"),
  );
}

function buildHubSections(pack: LocationKnowledgePack): SeoSection[] {
  const sections: SeoSection[] = [];
  sections.push(
    section("Local context", joinBullets(pack.localContext)),
  );
  const travel = travelSection(pack);
  if (travel) sections.push(travel);
  sections.push(section("Riding around here", joinBullets(pack.ridingCulture)));
  sections.push(section("Buying advice", joinBullets(pack.buyingAngles)));
  sections.push(section("Trade-in guidance", joinBullets(pack.tradeInNotes)));
  sections.push(
    section("Financing discussion", joinBullets(pack.financingNotes)),
  );
  sections.push(
    section(
      "Service information (buyer education)",
      joinBullets(pack.serviceEducation),
    ),
  );
  sections.push(
    section("Reading live inventory", joinBullets(pack.inventoryFraming)),
  );
  sections.push(section("Events near you", joinBullets(pack.eventNotes)));
  const gbp = gbpNote();
  if (gbp) sections.push(gbp);
  return sections;
}

function buildTopicSections(
  pack: LocationKnowledgePack,
  topic: Exclude<LocationTopic, "hub">,
  cityName: string,
): SeoSection[] {
  switch (topic) {
    case "inventory":
      return [
        section(`Inventory for ${cityName} buyers`, joinBullets(pack.inventoryFraming)),
        section("Buying context", joinBullets(pack.buyingAngles.slice(0, 2))),
      ];
    case "buying":
      return [
        section(`Buying a used Harley from ${cityName}`, joinBullets(pack.buyingAngles)),
        section("Local context", joinBullets(pack.localContext)),
        section("Trade-in angle", joinBullets(pack.tradeInNotes.slice(0, 2))),
      ];
    case "trade-in":
      return [
        section(`Trade-in guidance for ${cityName}`, joinBullets(pack.tradeInNotes)),
        section("Related buying notes", joinBullets(pack.buyingAngles.slice(0, 2))),
      ];
    case "financing":
      return [
        section(`Financing discussion for ${cityName} buyers`, joinBullets(pack.financingNotes)),
        section("Visit planning", joinBullets(pack.travelNotes.slice(0, 2))),
      ];
    case "events":
      return [
        section(`Events for ${cityName} riders`, joinBullets(pack.eventNotes)),
        section("Riding culture", joinBullets(pack.ridingCulture)),
      ];
    case "service":
      return [
        section(
          `Service information for ${cityName} buyers`,
          joinBullets(pack.serviceEducation),
        ),
        section(
          "What this page is not",
          "This is buyer education only. We do not publish a service menu, shop hours, or claim to operate a service department from this city page.",
        ),
      ];
    case "routes":
      return [
        section(`Riding near ${cityName}`, joinBullets(pack.ridingCulture)),
        section("Travel corridors", joinBullets(pack.travelNotes)),
      ];
    case "faq":
      return [
        section(
          `FAQ for ${cityName} Harley buyers`,
          "Answers below are written for local buyers. Inventory stays mirrored from the live feed — never invented.",
        ),
        section("Local context", joinBullets(pack.localContext)),
      ];
    default:
      return [];
  }
}

function relatedFromPack(pack: LocationKnowledgePack) {
  const links = [
    ...relatedGuidesFor({
      topics: pack.relatedGuideTopics,
      modelSlugs: pack.relatedModelSlugs,
      limit: 6,
    }),
    ...pack.relatedModelSlugs.flatMap((slug) => relatedModelsFor(slug, 1)),
    ...pack.nearbyRouteSlugs.map((slug) => {
      const r = getRouteGuide(slug);
      return r
        ? { href: `/routes/${r.slug}`, title: r.title, excerpt: r.excerpt }
        : null;
    }),
    ...[{ href: "/events", title: "Motorcycle events guidance" }],
  ].filter(Boolean) as { href: string; title: string; excerpt?: string }[];

  // comparisons via first related model
  const model = pack.relatedModelSlugs[0] ? getModel(pack.relatedModelSlugs[0]) : null;
  if (model?.comparisonIds?.length) {
    links.push(...comparisonLinksFor(model.comparisonIds));
  }

  // event guide if exists
  const ev = getEventGuide("how-to-use-motorcycle-events");
  if (ev) {
    links.push({ href: `/events/${ev.slug}`, title: ev.title, excerpt: ev.excerpt });
  }

  return links;
}

export function composeLocationHub(citySlug: string) {
  const city = getGeo(citySlug);
  const pack = getLocationPack(citySlug);
  if (!city) return null;

  // Secondary / unpackaged cities: keep thin but honest fallback
  if (!pack || !locationTopicAvailable(pack, "hub")) {
    return composeSeoDocument({
      path: `/used-harleys/${city.slug}`,
      title: city.headline,
      description: city.intro,
      h1: city.headline,
      type: "local",
      sections: [
        section("Buying with Joe", city.intro),
        section(
          "Inventory honesty",
          "We never invent local stock counts. Related inventory below is mirrored from the live feed when connected.",
        ),
      ],
      faqs: [
        {
          question: `Do you invent ${city.name} inventory?`,
          answer:
            "No. Inventory is mirrored from real dealership feed stock when connected.",
        },
        {
          question: `Is there a Joe's Used Harleys storefront in ${city.name}?`,
          answer:
            "City pages are service-area guides for Southeast Wisconsin buyers. We publish one real business address when configured — never fake branches.",
        },
      ],
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Local", path: "/used-harleys" },
        { name: city.name, path: `/used-harleys/${city.slug}` },
      ],
      relatedLinks: [],
      relatedInventoryHint: {},
      // SE WI primary hubs require packs to index; secondary markets keep thin pages.
      indexable: !(city.region === "southeast-wi" && city.tier === "primary"),
      schemaExtra: [localBusinessJsonLd()].filter(Boolean) as Record<
        string,
        unknown
      >[],
    });
  }

  for (const line of pack.serviceEducation) {
    if (!serviceEducationIsHonest(line)) {
      throw new Error(`Dishonest service education in pack ${pack.slug}`);
    }
  }

  const sections = buildHubSections(pack);
  const relatedLinks = [
    ...cityTopicLinks(city.slug),
    ...cityNeighborLinks(pack.neighborCitySlugs),
    ...relatedFromPack(pack),
  ];

  return composeSeoDocument({
    path: `/used-harleys/${city.slug}`,
    title: city.headline,
    description: pack.localContext[0]?.slice(0, 160) ?? city.intro,
    h1: `Used Harleys for ${city.name} buyers`,
    type: "article",
    ogType: "article",
    sections,
    faqs: pack.faqs,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Local", path: "/used-harleys" },
      { name: city.name, path: `/used-harleys/${city.slug}` },
    ],
    relatedLinks,
    relatedInventoryHint: {},
    schemaExtra: [localBusinessJsonLd()].filter(Boolean) as Record<string, unknown>[],
  });
}

export function composeLocationTopic(
  citySlug: string,
  topic: Exclude<LocationTopic, "hub">,
) {
  const city = getGeo(citySlug);
  const pack = getLocationPack(citySlug);
  if (!city || !pack) return null;
  if (!locationTopicAvailable(pack, topic)) return null;

  const pathSeg = TOPIC_PATH[topic];
  const titles: Record<typeof topic, string> = {
    inventory: `Used Harley inventory notes for ${city.name} buyers`,
    buying: `Buying a used Harley from ${city.name}`,
    "trade-in": `Harley trade-in guidance for ${city.name}`,
    financing: `Harley financing discussion for ${city.name} buyers`,
    events: `Motorcycle events for ${city.name} riders`,
    service: `Harley service information for ${city.name} buyers`,
    routes: `Riding routes near ${city.name}`,
    faq: `Used Harley FAQ for ${city.name}`,
  };

  const sections = buildTopicSections(pack, topic, city.name);
  const relatedLinks = [
    { href: `/used-harleys/${city.slug}`, title: `${city.name} Harley hub` },
    ...cityTopicLinks(city.slug).filter((l) => !l.href.endsWith(`/${pathSeg}`)),
    ...cityNeighborLinks(pack.neighborCitySlugs),
    ...relatedFromPack(pack),
  ];

  return composeSeoDocument({
    path: `/used-harleys/${city.slug}/${pathSeg}`,
    title: titles[topic],
    description: `${titles[topic]}. Local guidance for Southeast Wisconsin — mirrored inventory only.`,
    h1: titles[topic],
    type: "article",
    ogType: "article",
    sections,
    faqs: pack.faqs,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Local", path: "/used-harleys" },
      { name: city.name, path: `/used-harleys/${city.slug}` },
      { name: pathSeg, path: `/used-harleys/${city.slug}/${pathSeg}` },
    ],
    relatedLinks,
    relatedInventoryHint: topic === "inventory" ? {} : undefined,
    schemaExtra: [localBusinessJsonLd()].filter(Boolean) as Record<string, unknown>[],
  });
}

export function listPackagedSoutheastCities() {
  return listGeo().filter(
    (c) =>
      c.region === "southeast-wi" &&
      c.tier === "primary" &&
      getLocationPack(c.slug) &&
      locationTopicAvailable(getLocationPack(c.slug)!, "hub"),
  );
}

export { LOCATION_TOPICS };

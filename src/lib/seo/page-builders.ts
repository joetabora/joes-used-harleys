import { composeSeoDocument, defaultFaqs, section } from "@/lib/seo/compose-page";
import {
  FAMILIES,
  getColor,
  getComparison,
  getEngine,
  getGeo,
  getModel,
  listModels,
} from "@/lib/content/taxonomy";
import { getEventGuide, getGuide, getRouteGuide } from "@/lib/content/guides";

export function buildModelPage(slug: string) {
  const m = getModel(slug);
  if (!m) return null;
  const years = m.yearsInProduction.slice(-12);
  return composeSeoDocument({
    path: `/harleys/${m.slug}`,
    title: `Used ${m.displayName} Harley buying guide`,
    description: m.summary,
    h1: `Used ${m.displayName}`,
    type: "model",
    sections: [
      section("Overview", m.summary),
      section("Who it's for", m.whoItsFor),
      section(
        "Years to know",
        `Years covered in this guide: ${years.join(", ")}. Confirm options and condition on any live unit.`,
      ),
      section(
        "Related models",
        m.relatedModels.length
          ? `Also consider: ${m.relatedModels.map((s) => getModel(s)?.displayName ?? s).join(", ")}.`
          : "Browse the full model index for more options.",
      ),
    ],
    faqs: defaultFaqs("model", m.displayName),
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Harleys", path: "/harleys" },
      { name: m.displayName, path: `/harleys/${m.slug}` },
    ],
    relatedLinks: years.slice(-5).map((y) => ({
      href: `/harleys/${m.slug}/${y}`,
      title: `${y} ${m.displayName}`,
    })),
    relatedInventoryHint: { model: m.displayName, family: m.family },
  });
}

export function buildModelYearPage(slug: string, year: number) {
  const m = getModel(slug);
  if (!m || !m.yearsInProduction.includes(year)) return null;
  return composeSeoDocument({
    path: `/harleys/${m.slug}/${year}`,
    title: `${year} ${m.displayName} used buying notes`,
    description: `What to check on a ${year} ${m.displayName} — educational notes plus live inventory when available.`,
    h1: `${year} ${m.displayName}`,
    type: "model",
    sections: [
      section(
        "Year focus",
        `You're looking at ${year} ${m.displayName} examples. Specs and options vary — verify on the VIN.`,
      ),
      section("Who it's for", m.whoItsFor),
      section("Overview", m.summary),
    ],
    faqs: defaultFaqs("year", `${year} ${m.displayName}`),
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Harleys", path: "/harleys" },
      { name: m.displayName, path: `/harleys/${m.slug}` },
      { name: String(year), path: `/harleys/${m.slug}/${year}` },
    ],
    relatedLinks: [],
    relatedInventoryHint: { model: m.displayName, year },
  });
}

export function buildFamilyPage(familyRaw: string) {
  const family = FAMILIES.find((f) => f.toLowerCase() === familyRaw.toLowerCase());
  if (!family) return null;
  const models = listModels().filter((m) => m.family === family);
  return composeSeoDocument({
    path: `/harleys/family/${family.toLowerCase()}`,
    title: `Used Harley ${family} bikes`,
    description: `How the ${family} family fits different riders — with links to models and live inventory.`,
    h1: `${family} Harleys`,
    type: "model",
    sections: [
      section(
        "Family overview",
        `${family} is a practical way to narrow used Harley shopping. Sit on multiple models before you decide.`,
      ),
      section(
        "Models in this family",
        models.map((m) => m.displayName).join(", ") || "See the model index.",
      ),
    ],
    faqs: defaultFaqs("family", family),
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Harleys", path: "/harleys" },
      { name: family, path: `/harleys/family/${family.toLowerCase()}` },
    ],
    relatedLinks: models.slice(0, 8).map((m) => ({
      href: `/harleys/${m.slug}`,
      title: m.displayName,
      excerpt: m.summary,
    })),
    relatedInventoryHint: { family },
  });
}

export function buildColorPage(slug: string) {
  const c = getColor(slug);
  if (!c) return null;
  return composeSeoDocument({
    path: `/harleys/colors/${c.slug}`,
    title: `${c.name} used Harley paint notes`,
    description: `Shopping used Harleys in ${c.name} — inspect paint honestly, ignore rarity myths.`,
    h1: c.name,
    type: "website",
    sections: [
      section(
        "Paint on used bikes",
        `${c.name} shows up across many years. Inspect fading, chips, and resprays in daylight.`,
      ),
      section("Color is preference", "Buy the bike that fits. Paint is secondary to mechanical condition."),
    ],
    faqs: defaultFaqs("color", c.name),
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Harleys", path: "/harleys" },
      { name: "Colors", path: "/harleys/colors" },
      { name: c.name, path: `/harleys/colors/${c.slug}` },
    ],
    relatedLinks: [],
    relatedInventoryHint: { color: c.name },
  });
}

export function buildEnginePage(slug: string) {
  const e = getEngine(slug);
  if (!e) return null;
  return composeSeoDocument({
    path: `/harleys/engines/${e.slug}`,
    title: `${e.name} engine overview`,
    description: e.notes,
    h1: e.name,
    type: "website",
    sections: [
      section("Era", e.era),
      section("Notes", e.notes),
      section(
        "Confirm on the bike",
        "Displacement, tune, and options vary by year and model. Use the VIN and service records.",
      ),
    ],
    faqs: defaultFaqs("engine", e.name),
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Harleys", path: "/harleys" },
      { name: "Engines", path: "/harleys/engines" },
      { name: e.name, path: `/harleys/engines/${e.slug}` },
    ],
    relatedLinks: [],
    relatedInventoryHint: {},
  });
}

export function buildComparePage(slug: string) {
  const cmp = getComparison(slug);
  if (!cmp) return null;
  const a = getModel(cmp.a);
  return composeSeoDocument({
    path: `/compare/${cmp.slug}`,
    title: cmp.title,
    description: cmp.excerpt,
    h1: cmp.title,
    type: "compare",
    sections: cmp.sections,
    faqs: cmp.faqs,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Compare", path: "/compare" },
      { name: cmp.title, path: `/compare/${cmp.slug}` },
    ],
    relatedLinks: [
      { href: `/harleys/${cmp.a}`, title: a?.displayName ?? cmp.a },
      { href: `/harleys/${cmp.b}`, title: getModel(cmp.b)?.displayName ?? cmp.b },
    ],
    relatedInventoryHint: { model: a?.displayName },
  });
}

export function buildCityPage(slug: string) {
  const city = getGeo(slug);
  if (!city) return null;
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
    faqs: defaultFaqs("city", city.name),
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Local", path: "/used-harleys" },
      { name: city.name, path: `/used-harleys/${city.slug}` },
    ],
    relatedLinks: listModels()
      .slice(0, 6)
      .map((m) => ({
        href: `/used-harleys/${city.slug}/${m.slug}`,
        title: `${m.displayName} in ${city.name}`,
      })),
    relatedInventoryHint: {},
  });
}

export function buildCityModelPage(citySlug: string, modelSlug: string) {
  const city = getGeo(citySlug);
  const m = getModel(modelSlug);
  if (!city || !m) return null;
  return composeSeoDocument({
    path: `/used-harleys/${city.slug}/${m.slug}`,
    title: `Used ${m.displayName} for ${city.name} buyers`,
    description: `${city.name}, ${city.state} riders shopping a used ${m.displayName}. Education first — live inventory when available.`,
    h1: `${m.displayName} in ${city.name}`,
    type: "local",
    sections: [
      section("Local framing", city.intro),
      section("Model notes", m.summary),
      section("Who it's for", m.whoItsFor),
    ],
    faqs: defaultFaqs("city-model", `${m.displayName} near ${city.name}`),
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Local", path: "/used-harleys" },
      { name: city.name, path: `/used-harleys/${city.slug}` },
      { name: m.displayName, path: `/used-harleys/${city.slug}/${m.slug}` },
    ],
    relatedLinks: [],
    relatedInventoryHint: { model: m.displayName, family: m.family },
  });
}

export function buildCityModelYearPage(
  citySlug: string,
  modelSlug: string,
  year: number,
) {
  const city = getGeo(citySlug);
  const m = getModel(modelSlug);
  if (!city || !m || !m.yearsInProduction.includes(year)) return null;
  return composeSeoDocument({
    path: `/used-harleys/${city.slug}/${m.slug}/${year}`,
    title: `${year} ${m.displayName} for ${city.name} buyers`,
    description: `Shopping a ${year} ${m.displayName} from ${city.name}, ${city.state} — educational landing with live inventory when available.`,
    h1: `${year} ${m.displayName} · ${city.name}`,
    type: "local",
    sections: [
      section(
        "Intent",
        `Riders near ${city.name} often compare ${year} ${m.displayName} examples. Confirm options on the actual bike.`,
      ),
      section("Model context", m.summary),
      section("Next step", "Review live inventory or contact Joe — we do not invent stock."),
    ],
    faqs: defaultFaqs("local-year", `${year} ${m.displayName}`),
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: city.name, path: `/used-harleys/${city.slug}` },
      { name: m.displayName, path: `/used-harleys/${city.slug}/${m.slug}` },
      { name: String(year), path: `/used-harleys/${city.slug}/${m.slug}/${year}` },
    ],
    relatedLinks: [],
    relatedInventoryHint: { model: m.displayName, year },
  });
}

export function buildGuidePage(topic: string, slug: string) {
  const g = getGuide(topic, slug);
  if (!g) return null;
  return composeSeoDocument({
    path: `/guides/${g.topic}/${g.slug}`,
    title: g.title,
    description: g.excerpt,
    h1: g.title,
    type: "guide",
    ogType: "article",
    sections: g.sections,
    faqs: g.faqs,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: g.topic, path: `/guides/${g.topic}` },
      { name: g.title, path: `/guides/${g.topic}/${g.slug}` },
    ],
    relatedLinks: [],
    relatedInventoryHint: g.models?.[0] ? { model: getModel(g.models[0])?.displayName ?? g.models[0] } : {},
  });
}

export function buildRoutePage(slug: string) {
  const r = getRouteGuide(slug);
  if (!r) return null;
  return composeSeoDocument({
    path: `/routes/${r.slug}`,
    title: r.title,
    description: r.excerpt,
    h1: r.title,
    type: "guide",
    ogType: "article",
    sections: r.sections,
    faqs: r.faqs,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Routes", path: "/routes" },
      { name: r.title, path: `/routes/${r.slug}` },
    ],
    relatedLinks: [],
    relatedInventoryHint: {},
  });
}

export function buildEventPage(slug: string) {
  const e = getEventGuide(slug);
  if (!e) return null;
  return composeSeoDocument({
    path: `/events/${e.slug}`,
    title: e.title,
    description: e.excerpt,
    h1: e.title,
    type: "event",
    sections: e.sections,
    faqs: e.faqs,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Events", path: "/events" },
      { name: e.title, path: `/events/${e.slug}` },
    ],
    relatedLinks: [],
    relatedInventoryHint: {},
  });
}

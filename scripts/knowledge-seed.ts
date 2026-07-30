/**
 * Idempotent seed: taxonomy + packs + guides → Knowledge graph.
 * Usage: npm run knowledge:seed
 */
import "dotenv/config";
import { PrismaClient, type KnowledgeEntityType, type KnowledgeRelationKind, type Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { listKnowledgePacks } from "../src/content/knowledge-packs";
import { listLocationPacks } from "../src/content/location-packs";
import { getPublishedGuides, listEventGuides, listRouteGuides } from "../src/lib/content/guides";
import {
  FAMILIES,
  listColors,
  listComparisons,
  listEngines,
  listGeo,
  listModels,
  listTopics,
} from "../src/lib/content/taxonomy";

function client(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url || url.includes("PLACEHOLDER")) {
    throw new Error("DATABASE_URL required for knowledge:seed");
  }
  return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
}

async function upsertEntity(
  prisma: PrismaClient,
  input: {
    type: KnowledgeEntityType;
    slug: string;
    title: string;
    summary: string;
    facts: Record<string, unknown>;
    status?: "DRAFT" | "PUBLISHED";
  },
) {
  const status = input.status ?? "PUBLISHED";
  const facts = input.facts as Prisma.InputJsonValue;
  return prisma.knowledgeEntity.upsert({
    where: { type_slug: { type: input.type, slug: input.slug } },
    create: {
      type: input.type,
      slug: input.slug,
      title: input.title,
      summary: input.summary,
      facts,
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
    update: {
      title: input.title,
      summary: input.summary,
      facts,
      // Do not clobber console edits that moved status away from seed default
    },
  });
}

async function link(
  prisma: PrismaClient,
  fromType: KnowledgeEntityType,
  fromSlug: string,
  toType: KnowledgeEntityType,
  toSlug: string,
  kind: KnowledgeRelationKind,
  label?: string,
) {
  const from = await prisma.knowledgeEntity.findUnique({
    where: { type_slug: { type: fromType, slug: fromSlug } },
  });
  const to = await prisma.knowledgeEntity.findUnique({
    where: { type_slug: { type: toType, slug: toSlug } },
  });
  if (!from || !to) return;
  await prisma.knowledgeRelation.upsert({
    where: {
      fromId_toId_kind: { fromId: from.id, toId: to.id, kind },
    },
    create: { fromId: from.id, toId: to.id, kind, label: label ?? null },
    update: { label: label ?? null },
  });
}

async function main() {
  const prisma = client();
  console.log("Seeding knowledge graph…");

  // Families including Dyna + CVO
  for (const family of FAMILIES) {
    const slug = family.toLowerCase();
    await upsertEntity(prisma, {
      type: "FAMILY",
      slug,
      title: `${family} Harleys`,
      summary: `How the ${family} family fits different riders — sit on multiple models before you decide.`,
      facts: {
        body: `${family} is a practical way to narrow used Harley shopping in Southeast Wisconsin. Confirm fit and condition on the actual bike, not a brochure photo. Specs, options, and comfort vary by year and prior owner setup. Inventory related to this family is mirrored from the live dealership feed when connected — never invented for SEO. Empty related inventory simply means nothing matching is available right now. Sit on multiple models in the family before you decide, and ask Joe clear questions about title, service records, and next steps.`,
        bullets: [
          `Browse ${family} models on this site for educational context.`,
          "Compare live units with Joe — education first, pressure never.",
          "Empty related inventory means nothing matching is available right now.",
          "Verify options and condition on the VIN and the bike in front of you.",
        ],
        faqs: [
          {
            question: `What does the ${family} family mean for a used buyer?`,
            answer: `It is a practical grouping to narrow options. Always confirm fit, mileage, and paperwork on the actual bike.`,
          },
          {
            question: "Do you invent stock for this family?",
            answer: "No. Related inventory is mirrored from the live feed when connected.",
          },
        ],
      },
    });
  }

  for (const e of listEngines()) {
    await upsertEntity(prisma, {
      type: "ENGINE",
      slug: e.slug,
      title: e.name,
      summary: `${e.name} (${e.era}). ${e.notes}`,
      facts: { body: e.notes, era: e.era, bullets: [e.notes, `Era: ${e.era}`] },
    });
  }

  for (const c of listColors()) {
    await upsertEntity(prisma, {
      type: "COLOR",
      slug: c.slug,
      title: c.name,
      summary: `${c.name} paint notes for used Harley shoppers — inspect finish honestly.`,
      facts: {
        body: `Shopping used Harleys in ${c.name}. Paint condition and respray history matter more than rarity myths.`,
        bullets: [
          `Inspect ${c.name} panels in daylight for blend lines.`,
          "Ask about prior damage and insurance work.",
          `Eras often associated: ${(c.eras ?? []).join(", ") || "varies"}.`,
        ],
        eras: c.eras,
      },
    });
  }

  const packs = listKnowledgePacks();
  for (const m of listModels()) {
    const pack = packs.find((p) => p.slug === m.slug);
    await upsertEntity(prisma, {
      type: "MODEL",
      slug: m.slug,
      title: m.displayName,
      summary: m.summary,
      facts: pack
        ? { ...pack, whoItsFor: m.whoItsFor, aliases: m.aliases }
        : {
            overview: [m.summary, m.whoItsFor],
            strengths: [m.summary],
            buyingChecks: [
              "Service records and title status",
              "Tire age and brake condition",
              "Verify options on the VIN",
            ],
            faqs: [
              {
                question: `Is the ${m.displayName} still made?`,
                answer: "Confirm year and trim on the actual unit — generations change.",
              },
              {
                question: "Do you invent local stock?",
                answer: "No. Inventory is mirrored from the live feed when connected.",
              },
            ],
          },
    });
    await link(prisma, "MODEL", m.slug, "FAMILY", m.family.toLowerCase(), "IN_FAMILY");
    for (const eid of m.engineIds) {
      await link(prisma, "MODEL", m.slug, "ENGINE", eid, "USES_ENGINE");
    }
    for (const related of m.relatedModels) {
      await link(prisma, "MODEL", m.slug, "MODEL", related, "RELATED_TO");
    }
  }

  // Street Glide Special as TRIM linked to street-glide
  await upsertEntity(prisma, {
    type: "TRIM",
    slug: "street-glide-special",
    title: "Street Glide Special",
    summary:
      "Street Glide Special trims typically package more touring features than base batwing baggers of the same era — verify equipment on the unit.",
    facts: {
      body: "Special is a trim story, not a different platform. Confirm audio, security, and comfort options against the bike in front of you. Price should reflect condition and miles, not the badge alone. Related inventory is mirrored from the live feed when connected — never invented. Ask Joe for clear next steps after you sit on the bike.",
      bullets: [
        "Compare advertised Special features to what is bolted on",
        "Same batwing Touring manners as Street Glide family",
        "Price should reflect condition and miles, not the badge alone",
        "Confirm paperwork and options on the VIN",
      ],
      parentModelSlug: "street-glide",
      faqs: [
        {
          question: "Is Special a different motorcycle than Street Glide?",
          answer:
            "It is typically a trim package on the Street Glide platform — verify year and options on the actual unit.",
        },
        {
          question: "Do you invent Special inventory?",
          answer: "No. Related inventory is mirrored from the live feed when connected.",
        },
      ],
    },
  });
  await link(prisma, "MODEL", "street-glide", "TRIM", "street-glide-special", "HAS_TRIM");
  await link(prisma, "TRIM", "street-glide-special", "MODEL", "street-glide", "RELATED_TO");

  // Generations
  const generations = [
    {
      slug: "milwaukee-eight-touring",
      title: "Milwaukee-Eight Touring generation",
      summary: "Later Touring platforms powered by Milwaukee-Eight engines — confirm displacement by VIN.",
      engine: "milwaukee-eight",
      models: ["street-glide", "road-glide", "street-glide-special", "electra-glide", "road-king"],
    },
    {
      slug: "twin-cam-touring",
      title: "Twin Cam Touring generation",
      summary: "Earlier Touring bikes with Twin Cam power — service history matters on higher-mile examples.",
      engine: "twin-cam",
      models: ["street-glide", "road-glide", "road-king", "electra-glide"],
    },
    {
      slug: "evolution-sportster",
      title: "Evolution Sportster generation",
      summary: "Air-cooled Sportster era covering Iron 883 and Forty-Eight class bikes.",
      engine: "evolution-sportster",
      models: ["iron-883", "forty-eight"],
    },
    {
      slug: "revolution-max",
      title: "Revolution Max generation",
      summary: "Liquid-cooled modern platform for Sportster S, Nightster, and Pan America.",
      engine: "revolution-max",
      models: ["sportster-s", "nightster", "pan-america"],
    },
  ];
  for (const g of generations) {
    await upsertEntity(prisma, {
      type: "GENERATION",
      slug: g.slug,
      title: g.title,
      summary: g.summary,
      facts: {
        body: `${g.summary} Confirm exact year, displacement, and calibration on the VIN — generation labels are educational groupings, not a substitute for paperwork. Prior owner modifications, tunes, and options vary widely. Related inventory is mirrored from the live dealership feed when connected and never invented for SEO. Sit on the actual bike and ask Joe clear questions before you buy.`,
        bullets: [
          g.summary,
          "Confirm exact year and calibration on the VIN",
          "Do not assume one map or displacement across the generation",
          "Empty related inventory means nothing matching is available right now",
        ],
        faqs: [
          {
            question: `What bikes fall under ${g.title}?`,
            answer:
              "Use this page as a starting map, then verify year and platform on the VIN of any unit you consider.",
          },
          {
            question: "Do you invent stock for this generation?",
            answer: "No. Inventory is mirrored from the live feed when connected.",
          },
        ],
      },
    });
    await link(prisma, "GENERATION", g.slug, "ENGINE", g.engine, "USES_ENGINE");
    for (const ms of g.models) {
      await link(prisma, "MODEL", ms, "GENERATION", g.slug, "HAS_GENERATION");
    }
  }

  for (const cmp of listComparisons()) {
    await upsertEntity(prisma, {
      type: "COMPARISON",
      slug: cmp.slug,
      title: cmp.title,
      summary: cmp.excerpt,
      facts: { sections: cmp.sections, faqs: cmp.faqs, a: cmp.a, b: cmp.b },
    });
    await link(prisma, "COMPARISON", cmp.slug, "MODEL", cmp.a, "COMPARES");
    await link(prisma, "COMPARISON", cmp.slug, "MODEL", cmp.b, "COMPARES");
  }

  for (const city of listGeo()) {
    const pack = listLocationPacks().find((p) => p.slug === city.slug);
    await upsertEntity(prisma, {
      type: "CITY",
      slug: city.slug,
      title: city.name,
      summary: city.intro,
      facts: pack
        ? { ...pack, headline: city.headline, state: city.state, tier: city.tier }
        : {
            localContext: [city.intro, city.headline],
            bullets: [city.intro],
          },
      status: city.region === "southeast-wi" && city.tier === "primary" ? "PUBLISHED" : "DRAFT",
    });
  }

  // Guide topics as hub entities + articles
  const topicType = (slug: string): KnowledgeEntityType => {
    if (slug === "maintenance") return "MAINTENANCE_TOPIC";
    if (slug === "financing") return "FINANCING_TOPIC";
    if (slug === "insurance") return "INSURANCE_TOPIC";
    if (slug === "buying" || slug === "trade-in" || slug === "dealer") return "BUYING_TOPIC";
    if (slug === "upgrade") return "UPGRADE_TOPIC";
    if (slug === "ownership" || slug === "storage" || slug === "winter") return "OWNERSHIP_TOPIC";
    return "BUYING_TOPIC";
  };

  for (const t of listTopics()) {
    await upsertEntity(prisma, {
      type: topicType(t.slug),
      slug: `${t.slug}-hub`,
      title: t.label,
      summary: t.description,
      facts: {
        guideTopic: t.slug,
        body: t.description,
        bullets: [t.description, "Educational guidance only — confirm on the actual bike.", "Live inventory is mirrored, never invented."],
        sections: [
          { heading: "Overview", body: t.description },
          {
            heading: "How Joe helps",
            body: "Ask clear questions, compare live units, and move at a human pace.",
          },
        ],
      },
    });
  }

  // New topic hubs: upgrade, ownership, riding
  for (const t of [
    {
      slug: "upgrade",
      label: "Upgrade guides",
      description: "Stage-style and accessory thinking for used Harleys — no invented dyno numbers.",
      type: "UPGRADE_TOPIC" as const,
    },
    {
      slug: "ownership",
      label: "Ownership guides",
      description: "Living with a used Harley — storage, expectations, and honest next steps.",
      type: "OWNERSHIP_TOPIC" as const,
    },
    {
      slug: "riding",
      label: "Riding guides",
      description: "Southeast Wisconsin riding context — planning notes, not GPS products.",
      type: "OWNERSHIP_TOPIC" as const,
    },
  ]) {
    await upsertEntity(prisma, {
      type: t.type,
      slug: `${t.slug}-hub`,
      title: t.label,
      summary: t.description,
      facts: {
        guideTopic: t.slug,
        body: t.description,
        bullets: [t.description, "Confirm modifications with paperwork.", "Ask Joe before buying someone else's stage kit story."],
        sections: [
          { heading: "Overview", body: t.description },
          {
            heading: "Honesty",
            body: "We do not invent horsepower claims or guarantee outcomes from upgrades.",
          },
        ],
      },
    });
  }

  // Seed upgrade article
  await upsertEntity(prisma, {
    type: "UPGRADE_TOPIC",
    slug: "stage-1-questions",
    title: "Stage 1 questions for used Harley buyers",
    summary:
      "What to ask when a used Harley is advertised with Stage 1 work — paperwork over promises.",
    facts: {
      guideTopic: "upgrade",
      sections: [
        {
          heading: "Ask for the paper trail",
          body: "Intake, exhaust, and calibration should have documentation. Untuned combinations are a buying risk.",
        },
        {
          heading: "No invented numbers",
          body: "Ignore horsepower bragging without a trustworthy dyno sheet tied to this VIN.",
        },
        {
          heading: "Talk with Joe",
          body: "Bring the bike's story to Joe — he helps you ask clear questions, not invent market claims.",
        },
      ],
      faqs: [
        {
          question: "Does Stage 1 always add power?",
          answer: "Not without proper calibration. Treat undocumented kits as a risk, not a feature.",
        },
        {
          question: "Should I undo a prior Stage 1?",
          answer: "Depends on condition and your goals — inspect first and get a clear plan in writing.",
        },
      ],
      bullets: [
        "Demand paperwork for tunes",
        "Inspect exhaust and intake quality",
        "Do not pay a premium for undocumented claims",
      ],
    },
  });

  await upsertEntity(prisma, {
    type: "OWNERSHIP_TOPIC",
    slug: "first-30-days",
    title: "First 30 days with a used Harley",
    summary: "Break-in mindset, inspection habits, and Wisconsin storage questions after you buy.",
    facts: {
      guideTopic: "ownership",
      sections: [
        {
          heading: "Learn the machine",
          body: "Note fluids, tire pressures, and odd noises early. Small issues are easier before a long trip.",
        },
        {
          heading: "Midwest weather",
          body: "Plan battery care and dry storage if winter is coming — ask Joe what to prioritize.",
        },
      ],
      faqs: [
        {
          question: "Do I need an immediate service?",
          answer: "Depends on records and condition. Fresh fluids and rubber matter more than chrome.",
        },
        {
          question: "Can Joe help after the sale?",
          answer: "Yes — ask honest questions. He will not invent a service department that is not there.",
        },
      ],
      bullets: [
        "Check tires and brakes early",
        "Keep service records with the bike",
        "Plan storage before the first freeze",
      ],
    },
  });

  await upsertEntity(prisma, {
    type: "OWNERSHIP_TOPIC",
    slug: "se-wi-day-ride-planning",
    title: "Southeast Wisconsin day-ride planning",
    summary: "How to plan a useful day ride near Milwaukee without treating blogs as GPS.",
    facts: {
      guideTopic: "riding",
      sections: [
        {
          heading: "Match miles to experience",
          body: "Lake loops and county roads are different days. Build in fuel, food, and daylight.",
        },
        {
          heading: "Bike prep",
          body: "Tires, lights, and weather gear matter more than chrome. Ask Joe what to check.",
        },
      ],
      faqs: [
        {
          question: "Is this a GPS route?",
          answer: "No — planning inspiration only. Check construction and weather yourself.",
        },
        {
          question: "Which bike is best?",
          answer: "The one that fits your skill and the day's miles — sit before you buy.",
        },
      ],
      bullets: [
        "Plan fuel and daylight",
        "Respect lake wind",
        "Verify event dates with organizers",
      ],
    },
  });

  for (const g of getPublishedGuides()) {
    await upsertEntity(prisma, {
      type: topicType(g.topic),
      slug: g.slug,
      title: g.title,
      summary: g.excerpt,
      facts: {
        guideTopic: g.topic,
        sections: g.sections,
        faqs: g.faqs,
        keywords: g.keywords,
        bullets: g.sections.slice(0, 3).map((s) => s.heading),
      },
    });
  }

  for (const r of listRouteGuides()) {
    await upsertEntity(prisma, {
      type: "ROUTE",
      slug: r.slug,
      title: r.title,
      summary: r.excerpt,
      facts: { sections: r.sections, faqs: r.faqs, cities: r.cities ?? [] },
    });
  }
  for (const e of listEventGuides()) {
    await upsertEntity(prisma, {
      type: "EVENT",
      slug: e.slug,
      title: e.title,
      summary: e.excerpt,
      facts: { sections: e.sections, faqs: e.faqs },
    });
  }

  // Riding styles / personas
  await upsertEntity(prisma, {
    type: "RIDING_STYLE",
    slug: "passenger",
    title: "Passenger / two-up riding",
    summary: "Two-up comfort considerations when shopping used Harleys.",
    facts: {
      body: "Passenger pegs, seat shape, and luggage matter. Sit with your passenger before you buy.",
      bullets: [
        "Verify rear seat and pegs",
        "Touring platforms often suit longer two-up days",
        "Talk honestly about distance and breaks",
      ],
    },
  });
  await link(prisma, "MODEL", "street-glide", "RIDING_STYLE", "passenger", "SUITS_STYLE");
  await link(prisma, "MODEL", "road-glide", "RIDING_STYLE", "passenger", "SUITS_STYLE");
  await link(prisma, "MODEL", "road-glide", "UPGRADE_TOPIC", "stage-1-questions", "RELATED_GUIDE");
  await link(prisma, "MODEL", "road-glide", "COMPARISON", "street-glide-vs-road-glide", "COMPARES");
  await link(prisma, "MODEL", "road-glide", "ROUTE", "lake-michigan-day-loop", "RELATED_TO");

  console.log("Knowledge seed complete.");
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});

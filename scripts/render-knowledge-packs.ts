/**
 * Optional prose-only LLM transform for knowledge packs.
 * Usage: npm run content:render
 * Requires OPENAI_API_KEY. Never invents facts — rewrites pack JSON only.
 */
import fs from "node:fs";
import path from "node:path";
import { listKnowledgePacks } from "../src/content/knowledge-packs";
import { sectionAvailable } from "../src/lib/content/knowledge-pack-completeness";
import type { HubSectionKey, KnowledgePack } from "../src/lib/content/knowledge-pack-types";
import {
  deterministicSectionBody,
  hashKnowledgePack,
  type GeneratedHubProse,
} from "../src/lib/content/hub-prose";
import { getModel } from "../src/lib/content/taxonomy";

const OUT_DIR = path.join(process.cwd(), "src/content/generated/model-hubs");

const SECTION_KEYS: HubSectionKey[] = [
  "description",
  "buying",
  "ownership",
  "maintenance",
  "pros",
  "cons",
  "idealRider",
  "competitors",
  "financing",
  "insurance",
  "accessories",
  "upgrades",
  "stage1",
  "roadTrip",
  "passenger",
  "beginner",
];

function isAiConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY;
  return Boolean(key && !key.includes("PLACEHOLDER"));
}

function sectionFacts(pack: KnowledgePack, key: HubSectionKey): unknown {
  switch (key) {
    case "description":
      return {
        overview: pack.overview,
        engines: pack.engines,
        rideCharacteristics: pack.rideCharacteristics,
        comfort: pack.comfort,
      };
    case "buying":
      return { buyingChecks: pack.buyingChecks };
    case "ownership":
      return { ownership: pack.ownership };
    case "maintenance":
      return { maintenance: pack.maintenance };
    case "pros":
      return { strengths: pack.strengths };
    case "cons":
      return { tradeOffs: pack.tradeOffs };
    case "idealRider":
      return { idealRider: pack.idealRider };
    case "competitors": {
      const model = getModel(pack.slug);
      return {
        relatedModels: model?.relatedModels ?? [],
        comparisonIds: model?.comparisonIds ?? [],
      };
    }
    case "financing":
      return { financingNotes: pack.financingNotes };
    case "insurance":
      return { insuranceNotes: pack.insuranceNotes };
    case "accessories":
      return { accessories: pack.accessories };
    case "upgrades":
      return { upgrades: pack.upgrades };
    case "stage1":
      return { stage1: pack.stage1 };
    case "roadTrip":
      return { roadTrip: pack.roadTrip };
    case "passenger":
      return { passenger: pack.passenger };
    case "beginner":
      return { beginner: pack.beginner };
    default:
      return {};
  }
}

async function rewriteSection(facts: unknown, fallback: string): Promise<string> {
  const model = process.env.AI_MODEL || "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "Rewrite the provided structured Harley facts into clear, helpful prose for a used-bike buying guide. Do not add facts, numbers, prices, horsepower claims, approvals, dealer rankings, or links that are not present in the input. Do not invent market data. Keep Southeast Wisconsin honesty: inventory must be verified live. Return plain text only.",
        },
        {
          role: "user",
          content: JSON.stringify(facts),
        },
      ],
    }),
  });

  if (!response.ok) {
    console.warn("LLM failed", response.status, await response.text());
    return fallback;
  }
  const json = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return json.choices?.[0]?.message?.content?.trim() || fallback;
}

async function renderPack(pack: KnowledgePack): Promise<GeneratedHubProse> {
  const model = getModel(pack.slug);
  const comps =
    model?.relatedModels.map((s) => {
      const m = getModel(s);
      return m ? `${m.displayName} (/harleys/${m.slug})` : s;
    }) ?? [];
  const hasCompetitors = Boolean(
    (model?.relatedModels.length ?? 0) + (model?.comparisonIds.length ?? 0),
  );

  const sections: Partial<Record<HubSectionKey, string>> = {};
  for (const key of SECTION_KEYS) {
    if (!sectionAvailable(pack, key, { hasCompetitors })) continue;
    const fallback =
      deterministicSectionBody(pack, key, { competitorLines: comps }) ?? "";
    if (!fallback) continue;
    if (isAiConfigured()) {
      sections[key] = await rewriteSection(sectionFacts(pack, key), fallback);
    } else {
      sections[key] = fallback;
    }
  }

  return {
    slug: pack.slug,
    packHash: hashKnowledgePack(pack),
    generatedAt: new Date().toISOString(),
    sections,
  };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!isAiConfigured()) {
    console.log(
      "OPENAI_API_KEY not set — writing deterministic prose cache only (no LLM).",
    );
  }

  for (const pack of listKnowledgePacks()) {
    const out = await renderPack(pack);
    const file = path.join(OUT_DIR, `${pack.slug}.json`);
    fs.writeFileSync(file, `${JSON.stringify(out, null, 2)}\n`);
    console.log("wrote", file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

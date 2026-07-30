import Link from "next/link";
import { getKnowledgePack } from "@/content/knowledge-packs";
import { HUB_SECTION_ANCHORS } from "@/lib/content/knowledge-pack-types";
import { hubPathForPack, packDisplayName } from "@/lib/content/match-bike-to-pack";
import { relatedGuidesFor, relatedModelsFor } from "@/lib/seo/linking";
import { RelatedArticles } from "@/components/seo/related-articles";

function levelLabel(level: string): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

/**
 * Thin bridge from a live inventory unit to its canonical model hub.
 * Does not duplicate ownership/maintenance essays.
 */
export function ModelHubBridge({ packSlug }: { packSlug: string }) {
  const pack = getKnowledgePack(packSlug);
  if (!pack) return null;

  const name = packDisplayName(packSlug);
  const blurb = pack.overview[0] ?? null;
  const related = [
    ...relatedModelsFor(packSlug, 3),
    ...relatedGuidesFor({
      modelSlugs: [packSlug],
      topics: pack.relatedGuideTopics,
      limit: 4,
    }),
  ];

  return (
    <aside className="joe-panel space-y-4 p-5">
      <div>
        <p className="font-label text-lamp">Model guide</p>
        <h2 className="font-display mt-1 text-xl tracking-[0.04em]">
          Learn more about the {name}
        </h2>
        {blurb ? <p className="mt-2 text-sm text-steel">{blurb}</p> : null}
        <p className="mt-2 text-sm text-steel">
          Full buying, ownership, and maintenance detail lives on the canonical{" "}
          <Link
            href={hubPathForPack(packSlug)}
            className="text-lamp underline-offset-4 hover:underline"
          >
            {name} guide
          </Link>
          — this listing stays unique to this unit.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["beginner", pack.beginner.level],
            ["passenger", pack.passenger.level],
            ["road-trip", pack.roadTrip.level],
          ] as const
        ).map(([key, level]) => (
          <Link
            key={key}
            href={hubPathForPack(packSlug, HUB_SECTION_ANCHORS[
              key === "road-trip" ? "roadTrip" : key === "beginner" ? "beginner" : "passenger"
            ])}
            className="joe-badge"
          >
            {key}: {levelLabel(level)}
          </Link>
        ))}
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-2 font-label text-[0.7rem] text-steel">
        {(
          [
            ["Buying checks", HUB_SECTION_ANCHORS.buying],
            ["Maintenance", HUB_SECTION_ANCHORS.maintenance],
            ["Upgrades", HUB_SECTION_ANCHORS.upgrades],
            ["Pros & cons", HUB_SECTION_ANCHORS.pros],
          ] as const
        ).map(([label, anchor]) => (
          <li key={anchor}>
            <Link
              href={hubPathForPack(packSlug, anchor)}
              className="underline-offset-4 hover:text-lamp hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {related.length > 0 ? <RelatedArticles links={related} /> : null}
    </aside>
  );
}

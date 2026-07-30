"use client";

import { useMemo, useState } from "react";
import { BikeAssetTile } from "@/components/joeos/bike-asset-tile";
import { EmptyState } from "@/components/joeos/ui";
import type { FloorScorePills } from "@/lib/assets/load-scorecard";
import type { FloorBike, Severity } from "@/lib/joeos/briefing";

const filters: { id: "all" | Severity; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hot", label: "Hot" },
  { id: "watch", label: "Watch" },
  { id: "ok", label: "Clear" },
];

export function FloorShowroom({
  bikes,
  scorePills = {},
}: {
  bikes: FloorBike[];
  scorePills?: Record<string, FloorScorePills>;
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | Severity>("all");

  const visible = useMemo(() => {
    const query = q.trim().toLowerCase();
    return bikes
      .filter((b) => (filter === "all" ? true : b.severity === filter))
      .filter((b) => {
        if (!query) return true;
        return `${b.year} ${b.make} ${b.model}`.toLowerCase().includes(query);
      })
      .sort((a, b) => {
        const oa = scorePills[a.id]?.opportunity ?? a.urgency;
        const ob = scorePills[b.id]?.opportunity ?? b.urgency;
        return ob - oa;
      });
  }, [bikes, filter, q, scorePills]);

  return (
    <div>
      <div className="jos-search-bar jos-stack-dense">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search year, model…"
          className="jos-field"
          aria-label="Search floor inventory"
        />
        <div className="jos-chip-row" role="group" aria-label="Severity filter">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="jos-chip"
              data-active={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState label="No match">No machines match this filter.</EmptyState>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((bike) => (
            <BikeAssetTile
              key={bike.id}
              bike={bike}
              pills={scorePills[bike.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

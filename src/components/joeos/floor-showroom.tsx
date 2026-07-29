"use client";

import { useMemo, useState } from "react";
import { BikeAssetTile } from "@/components/joeos/bike-asset-tile";
import type { FloorBike, Severity } from "@/lib/joeos/briefing";

const filters: { id: "all" | Severity; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hot", label: "Hot" },
  { id: "watch", label: "Watch" },
  { id: "ok", label: "Clear" },
];

export function FloorShowroom({ bikes }: { bikes: FloorBike[] }) {
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
      .sort((a, b) => b.urgency - a.urgency);
  }, [bikes, filter, q]);

  return (
    <div>
      <div className="jos-search-bar space-y-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search year, model…"
          className="jos-field"
          aria-label="Search floor inventory"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={
                filter === f.id ? "jos-btn jos-btn-primary" : "jos-btn jos-btn-ghost"
              }
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="jos-panel p-4">
          <p className="jos-body">No machines match this filter.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((bike) => (
            <BikeAssetTile key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
}

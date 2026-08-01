"use client";

import { useMemo, useState } from "react";
import { BikeAssetTile } from "@/components/joeos/bike-asset-tile";
import { EmptyState } from "@/components/joeos/ui";
import type { FloorScorePills } from "@/lib/assets/load-scorecard";
import type { FloorBike, FloorInventoryClass, Severity } from "@/lib/joeos/briefing";

type ClassFilter = "all" | FloorInventoryClass | "no_qr";

const severityFilters: { id: "all" | Severity; label: string }[] = [
  { id: "all", label: "All ages" },
  { id: "hot", label: "Hot" },
  { id: "watch", label: "Watch" },
  { id: "ok", label: "Clear" },
];

const classFilters: { id: ClassFilter; label: string }[] = [
  { id: "all", label: "All lot" },
  { id: "used_harley", label: "Used HD" },
  { id: "new_harley", label: "New HD" },
  { id: "non_harley", label: "Non-Harley" },
  { id: "no_qr", label: "No VIN/stock" },
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
  const [classFilter, setClassFilter] = useState<ClassFilter>("all");

  const counts = useMemo(() => {
    return {
      all: bikes.length,
      used_harley: bikes.filter((b) => b.inventoryClass === "used_harley").length,
      new_harley: bikes.filter((b) => b.inventoryClass === "new_harley").length,
      non_harley: bikes.filter((b) => b.inventoryClass === "non_harley").length,
      no_qr: bikes.filter((b) => !b.hasQrIdentity).length,
    };
  }, [bikes]);

  const visible = useMemo(() => {
    const query = q.trim().toLowerCase();
    return bikes
      .filter((b) => (filter === "all" ? true : b.severity === filter))
      .filter((b) => {
        if (classFilter === "all") return true;
        if (classFilter === "no_qr") return !b.hasQrIdentity;
        return b.inventoryClass === classFilter;
      })
      .filter((b) => {
        if (!query) return true;
        return `${b.year} ${b.make} ${b.model} ${b.stockNumber ?? ""} ${b.vin ?? ""} ${b.condition ?? ""}`
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        const oa = scorePills[a.id]?.opportunity ?? a.urgency;
        const ob = scorePills[b.id]?.opportunity ?? b.urgency;
        return ob - oa;
      });
  }, [bikes, filter, classFilter, q, scorePills]);

  return (
    <div>
      <div className="jos-search-bar jos-stack-dense">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search year, make, model, stock, VIN…"
          className="jos-field"
          aria-label="Search floor inventory"
        />
        <div className="jos-chip-row" role="group" aria-label="Inventory class">
          {classFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="jos-chip"
              data-active={classFilter === f.id}
              onClick={() => setClassFilter(f.id)}
            >
              {f.label}
              {f.id !== "all" ? ` (${counts[f.id]})` : ` (${counts.all})`}
            </button>
          ))}
        </div>
        <div className="jos-chip-row" role="group" aria-label="Severity filter">
          {severityFilters.map((f) => (
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

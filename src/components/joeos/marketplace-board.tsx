"use client";

import { useMemo, useState } from "react";
import {
  composeMarketplaceListing,
  type MarketplaceBikeInput,
} from "@/lib/marketplace/compose-listing";
import { formatMiles, formatPrice } from "@/lib/format";
import {
  JosBody,
  JosButton,
  JosData,
  JosField,
  JosInput,
  JosItem,
  JosPanel,
  JosSectionHeader,
  JosSelect,
  JosTextarea,
} from "@/components/joeos/ui";

export type MarketplaceBikeCard = MarketplaceBikeInput & {
  id: string;
  photos: string[];
  firstSeenAt: string;
  status: string;
};

type PostStatus = "NOT_POSTED" | "POSTED";
type StatusFilter = "all" | "not_posted" | "posted";
type SortMode = "newest" | "price_asc" | "price_desc" | "miles_asc";

const DEFAULT_PHOTO_COUNT = 8;

function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url.trim());
}

function validPhotos(photos: string[]): string[] {
  return photos.map((p) => p.trim()).filter((p) => p.length > 0 && isHttpUrl(p));
}

function defaultSelected(photos: string[]): Set<string> {
  return new Set(validPhotos(photos).slice(0, DEFAULT_PHOTO_COUNT));
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      prompt("Copy this text", text);
      return true;
    } catch {
      return false;
    }
  }
}

function BikeMarketplaceCard({
  bike,
  posted,
  onMarkPosted,
  onMarkNotPosted,
}: {
  bike: MarketplaceBikeCard;
  posted: boolean;
  onMarkPosted: () => void;
  onMarkNotPosted: () => void;
}) {
  const listing = useMemo(() => composeMarketplaceListing(bike), [bike]);
  const photos = useMemo(() => validPhotos(bike.photos), [bike.photos]);
  const [selected, setSelected] = useState<Set<string>>(() => defaultSelected(bike.photos));
  const [copied, setCopied] = useState<string | null>(null);

  const missingPrice = bike.price == null;
  const missingMileage = bike.mileage == null;
  const missingPhotos = photos.length === 0;

  async function handleCopy(key: string, text: string) {
    if (!text) return;
    const ok = await copyText(text);
    if (ok) {
      setCopied(key);
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
    }
  }

  function togglePhoto(url: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }

  function openSelected() {
    const urls = photos.filter((u) => selected.has(u));
    for (const url of urls) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  const hero = photos[0] ?? null;
  const label = `${bike.year} ${bike.make} ${bike.model}`;

  return (
    <JosPanel className="jos-stack-dense">
      <div className="flex flex-wrap gap-3">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded bg-[var(--jos-void-deep)]">
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero} alt={label} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center jos-label text-[10px]">
              No photo
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 jos-stack-dense">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <JosItem className="text-base leading-tight">{label}</JosItem>
              <JosData className="mt-1">
                {formatPrice(bike.price)} · {formatMiles(bike.mileage)}
                {bike.stockNumber ? ` · Stock ${bike.stockNumber}` : ""}
              </JosData>
            </div>
            <span
              className="jos-chip"
              data-active={posted ? "true" : "false"}
            >
              {posted ? "POSTED" : "NOT POSTED"}
            </span>
          </div>
          {(missingPrice || missingMileage || missingPhotos) && (
            <div className="flex flex-wrap gap-2 text-xs text-[var(--jos-warn)]">
              {missingPrice ? <span>⚠ MISSING PRICE</span> : null}
              {missingMileage ? <span>⚠ MISSING MILEAGE</span> : null}
              {missingPhotos ? <span>⚠ NO PHOTOS</span> : null}
            </div>
          )}
        </div>
      </div>

      <JosField label="Title" htmlFor={`title-${bike.id}`}>
        <JosInput id={`title-${bike.id}`} readOnly value={listing.title} />
      </JosField>
      <div className="flex flex-wrap gap-2">
        <JosButton
          variant="primary"
          onClick={() => void handleCopy("title", listing.title)}
        >
          {copied === "title" ? "Copied" : "COPY TITLE"}
        </JosButton>
      </div>

      <JosField label="Price" htmlFor={`price-${bike.id}`}>
        <JosInput
          id={`price-${bike.id}`}
          readOnly
          value={listing.priceLine || "(no price)"}
        />
      </JosField>
      <div className="flex flex-wrap gap-2">
        <JosButton
          variant="primary"
          disabled={!listing.priceLine}
          onClick={() => void handleCopy("price", listing.priceLine)}
        >
          {copied === "price" ? "Copied" : "COPY PRICE"}
        </JosButton>
      </div>

      <JosField label="Description" htmlFor={`desc-${bike.id}`}>
        <JosTextarea
          id={`desc-${bike.id}`}
          readOnly
          rows={12}
          value={listing.description}
          className="font-mono text-xs"
        />
      </JosField>
      <div className="flex flex-wrap gap-2">
        <JosButton
          variant="primary"
          onClick={() => void handleCopy("desc", listing.description)}
        >
          {copied === "desc" ? "Copied" : "COPY DESCRIPTION"}
        </JosButton>
        <JosButton
          variant="ghost"
          onClick={() => void handleCopy("all", listing.combined)}
        >
          {copied === "all" ? "Copied" : "COPY ALL"}
        </JosButton>
        {posted ? (
          <JosButton variant="ghost" onClick={onMarkNotPosted}>
            MARK AS NOT POSTED
          </JosButton>
        ) : (
          <JosButton variant="ghost" onClick={onMarkPosted}>
            MARK AS POSTED
          </JosButton>
        )}
      </div>

      <div className="jos-stack-dense">
        <JosData>Photos ({selected.size}/{photos.length} selected)</JosData>
        {photos.length === 0 ? (
          <JosBody className="text-sm">No inventory photos on this bike.</JosBody>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {photos.map((url, i) => {
              const id = `photo-${bike.id}-${i}`;
              const checked = selected.has(url);
              return (
                <label
                  key={url}
                  htmlFor={id}
                  className="relative shrink-0 cursor-pointer"
                >
                  <input
                    id={id}
                    type="checkbox"
                    className="absolute left-1 top-1 z-10"
                    checked={checked}
                    onChange={() => togglePhoto(url)}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Photo ${i + 1}`}
                    className={`h-16 w-20 rounded object-cover ring-2 ${
                      checked
                        ? "ring-[var(--jos-orange)]"
                        : "ring-transparent opacity-60"
                    }`}
                  />
                </label>
              );
            })}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <JosButton
            variant="ghost"
            disabled={photos.length === 0}
            onClick={() => setSelected(new Set(photos))}
          >
            SELECT ALL
          </JosButton>
          <JosButton
            variant="ghost"
            disabled={selected.size === 0}
            onClick={() => setSelected(new Set())}
          >
            CLEAR ALL
          </JosButton>
          <JosButton
            variant="primary"
            disabled={selected.size === 0}
            onClick={openSelected}
          >
            OPEN SELECTED PHOTOS
          </JosButton>
        </div>
      </div>
    </JosPanel>
  );
}

export function MarketplaceBoard({ bikes }: { bikes: MarketplaceBikeCard[] }) {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortMode>("newest");
  const [postedIds, setPostedIds] = useState<Record<string, PostStatus>>({});

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = bikes.filter((b) => {
      const status: PostStatus = postedIds[b.id] ?? "NOT_POSTED";
      if (statusFilter === "posted" && status !== "POSTED") return false;
      if (statusFilter === "not_posted" && status !== "NOT_POSTED") return false;
      if (!needle) return true;
      const hay = [
        String(b.year),
        b.make,
        b.model,
        b.stockNumber ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });

    list = [...list].sort((a, b) => {
      if (sort === "newest") {
        return (
          new Date(b.firstSeenAt).getTime() - new Date(a.firstSeenAt).getTime()
        );
      }
      if (sort === "price_asc" || sort === "price_desc") {
        const ap = a.price;
        const bp = b.price;
        if (ap == null && bp == null) return 0;
        if (ap == null) return 1;
        if (bp == null) return -1;
        return sort === "price_asc" ? ap - bp : bp - ap;
      }
      // miles_asc
      const am = a.mileage;
      const bm = b.mileage;
      if (am == null && bm == null) return 0;
      if (am == null) return 1;
      if (bm == null) return -1;
      return am - bm;
    });

    return list;
  }, [bikes, q, statusFilter, sort, postedIds]);

  return (
    <div className="jos-stack-section">
      <JosSectionHeader
        section="Marketplace"
        title="Facebook Marketplace"
        action={
          <JosData>
            {filtered.length} of {bikes.length} bikes
          </JosData>
        }
      />
      <JosBody className="max-w-xl text-sm -mt-2">
        Used Harley-Davidson inventory ready for manual Marketplace posting.
      </JosBody>

      <div className="flex flex-wrap gap-3">
        <JosField label="Search" htmlFor="mkt-q" className="min-w-[12rem] flex-1">
          <JosInput
            id="mkt-q"
            placeholder="Year, make, model, stock…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </JosField>
        <JosField label="Status" htmlFor="mkt-status">
          <JosSelect
            id="mkt-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="all">All</option>
            <option value="not_posted">Not Posted</option>
            <option value="posted">Posted</option>
          </JosSelect>
        </JosField>
        <JosField label="Sort" htmlFor="mkt-sort">
          <JosSelect
            id="mkt-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price low → high</option>
            <option value="price_desc">Price high → low</option>
            <option value="miles_asc">Mileage low → high</option>
          </JosSelect>
        </JosField>
      </div>

      {filtered.length === 0 ? (
        <JosBody className="text-sm">No bikes match these filters.</JosBody>
      ) : (
        <div className="jos-stack-section">
          {filtered.map((bike) => (
            <BikeMarketplaceCard
              key={bike.id}
              bike={bike}
              posted={(postedIds[bike.id] ?? "NOT_POSTED") === "POSTED"}
              onMarkPosted={() =>
                setPostedIds((prev) => ({ ...prev, [bike.id]: "POSTED" }))
              }
              onMarkNotPosted={() =>
                setPostedIds((prev) => ({ ...prev, [bike.id]: "NOT_POSTED" }))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

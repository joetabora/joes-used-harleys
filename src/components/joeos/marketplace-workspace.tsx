"use client";

import { useEffect, useMemo, useState } from "react";
import {
  composeMarketplaceListing,
  MARKETPLACE_LISTING_STYLES,
  type MarketplaceListingStyle,
} from "@/lib/marketplace/compose-listing";
import { formatMiles, formatPrice } from "@/lib/format";
import {
  JosBody,
  JosButton,
  JosData,
  JosField,
  JosInput,
  JosItem,
  JosSelect,
  JosTextarea,
} from "@/components/joeos/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MarketplaceBikeInput } from "@/lib/marketplace/compose-listing";

export type MarketplaceBikeCard = MarketplaceBikeInput & {
  id: string;
  photos: string[];
  firstSeenAt: string;
  status: string;
};

const DEFAULT_PHOTO_COUNT = 5;

function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url.trim());
}

export function validMarketplacePhotos(photos: string[]): string[] {
  return photos.map((p) => p.trim()).filter((p) => p.length > 0 && isHttpUrl(p));
}

function defaultSelected(photos: string[]): Set<string> {
  return new Set(validMarketplacePhotos(photos).slice(0, DEFAULT_PHOTO_COUNT));
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

const STYLE_LABELS: Record<MarketplaceListingStyle, string> = {
  standard: "Standard",
  enthusiast: "Enthusiast",
  value: "Value",
  attention: "Attention",
  premium: "Premium",
};

export function MarketplaceWorkspace({
  bike,
  open,
  posted,
  onOpenChange,
  onMarkPosted,
  onMarkNotPosted,
  onNextBike,
}: {
  bike: MarketplaceBikeCard | null;
  open: boolean;
  posted: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkPosted: () => void;
  onMarkNotPosted: () => void;
  onNextBike: () => void;
}) {
  const [style, setStyle] = useState<MarketplaceListingStyle>("standard");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);
  const [heroOverride, setHeroOverride] = useState<string | null>(null);

  useEffect(() => {
    if (!bike) return;
    setStyle("standard");
    setSelected(defaultSelected(bike.photos));
    setHeroOverride(null);
    setCopied(null);
  }, [bike?.id]);

  const photos = useMemo(
    () => (bike ? validMarketplacePhotos(bike.photos) : []),
    [bike],
  );

  const listing = useMemo(() => {
    if (!bike) return null;
    return composeMarketplaceListing(bike, style);
  }, [bike, style]);

  if (!bike || !listing) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl" />
      </Dialog>
    );
  }

  const label = `${bike.year} ${bike.make} ${bike.model}`;
  const hero = heroOverride ?? photos[0] ?? null;
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="jos max-h-[92vh] w-full overflow-y-auto !bg-[#151515] p-4 text-[#f5f5f3] sm:max-w-5xl lg:max-w-6xl"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle className="jos-title text-xl">{label}</DialogTitle>
        </DialogHeader>

        {(missingPrice || missingMileage || missingPhotos) && (
          <div className="flex flex-wrap gap-2 text-xs text-[var(--jos-warn)]">
            {missingPrice ? <span>⚠ MISSING PRICE</span> : null}
            {missingMileage ? <span>⚠ MISSING MILEAGE</span> : null}
            {missingPhotos ? <span>⚠ NO PHOTOS</span> : null}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          {/* LEFT — photos */}
          <div className="jos-stack-dense">
            <div className="aspect-[4/3] overflow-hidden rounded bg-[var(--jos-void-deep)]">
              {hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={hero} alt={label} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center jos-label">
                  No photo
                </div>
              )}
            </div>

            <JosData>
              Photos ({selected.size}/{photos.length} selected)
            </JosData>

            {photos.length === 0 ? (
              <JosBody className="text-sm">No inventory photos on this bike.</JosBody>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photos.map((url, i) => {
                  const id = `mkt-photo-${bike.id}-${i}`;
                  const checked = selected.has(url);
                  return (
                    <label
                      key={url}
                      htmlFor={id}
                      className="relative cursor-pointer"
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
                        className={`aspect-square w-full rounded object-cover ring-2 ${
                          checked
                            ? "ring-[var(--jos-orange)]"
                            : "ring-transparent opacity-60"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setHeroOverride(url);
                        }}
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

          {/* RIGHT — copy workspace */}
          <div className="jos-stack-dense">
            <div>
              <JosItem className="text-lg leading-tight">{label}</JosItem>
              <JosData className="mt-1">
                {formatPrice(bike.price)} · {formatMiles(bike.mileage)}
                {bike.stockNumber ? ` · Stock ${bike.stockNumber}` : ""}
              </JosData>
              <span
                className="jos-chip mt-2 inline-flex"
                data-active={posted ? "true" : "false"}
              >
                {posted ? "POSTED" : "NOT POSTED"}
              </span>
            </div>

            <JosField label="Listing style" htmlFor={`style-${bike.id}`}>
              <JosSelect
                id={`style-${bike.id}`}
                value={style}
                onChange={(e) =>
                  setStyle(e.target.value as MarketplaceListingStyle)
                }
              >
                {MARKETPLACE_LISTING_STYLES.map((s) => (
                  <option key={s} value={s}>
                    {STYLE_LABELS[s]}
                  </option>
                ))}
              </JosSelect>
            </JosField>

            <JosField label="Title" htmlFor={`title-${bike.id}`}>
              <JosInput id={`title-${bike.id}`} readOnly value={listing.title} />
            </JosField>

            <JosField label="Price" htmlFor={`price-${bike.id}`}>
              <JosInput
                id={`price-${bike.id}`}
                readOnly
                value={listing.priceLine || "(no price)"}
              />
            </JosField>

            <JosField label="Description" htmlFor={`desc-${bike.id}`}>
              <JosTextarea
                id={`desc-${bike.id}`}
                readOnly
                rows={14}
                value={listing.description}
                className="font-mono text-xs"
              />
            </JosField>

            <div className="flex flex-wrap gap-2">
              <JosButton
                variant="primary"
                onClick={() => void handleCopy("title", listing.title)}
              >
                {copied === "title" ? "Copied" : "COPY TITLE"}
              </JosButton>
              <JosButton
                variant="primary"
                disabled={!listing.priceLine}
                onClick={() => void handleCopy("price", listing.priceLine)}
              >
                {copied === "price" ? "Copied" : "COPY PRICE"}
              </JosButton>
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
            </div>

            <div className="flex flex-wrap gap-2">
              {posted ? (
                <JosButton variant="ghost" onClick={onMarkNotPosted}>
                  MARK AS NOT POSTED
                </JosButton>
              ) : (
                <JosButton variant="ghost" onClick={onMarkPosted}>
                  MARK AS POSTED
                </JosButton>
              )}
              <JosButton variant="primary" onClick={onNextBike}>
                NEXT BIKE
              </JosButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import type { SyncStatus, SyncTrigger } from "@/generated/prisma/client";

/** Parsed dealership item from XML (only known tags). */
export type ParsedFeedItem = {
  feedId: string;
  year: number;
  make: string;
  model: string;
  title: string | null;
  price: number | null;
  mileage: number | null;
  color: string | null;
  description: string | null;
  condition: string | null;
  category: string | null;
  transmission: string | null;
  certified: string | null;
  vrm: string | null;
  listPriceRaw: string | null;
  inventoryUrl: string | null;
  locationId: string | null;
  locationName: string | null;
  city: string | null;
  state: string | null;
  zipcode: string | null;
  dealerPhone: string | null;
  dealerEmail: string | null;
  stockNumber: string | null;
  vin: string | null;
  photos: string[];
};

export type SyncErrorEntry = {
  message: string;
  vin?: string;
  stockNumber?: string;
  feedId?: string;
};

export type SyncOptions = {
  trigger: SyncTrigger;
  dryRun?: boolean;
  /** Inject XML body for tests (skips network). */
  xmlBody?: string;
};

export type SyncResult = {
  ok: boolean;
  syncLogId: string | null;
  status: SyncStatus;
  dryRun: boolean;
  feedUrl: string;
  feedVersion: string | null;
  fetchedBytes: number | null;
  parsedCount: number;
  usedHarleyCount: number;
  createdCount: number;
  updatedCount: number;
  soldCount: number;
  unchangedCount: number;
  priceChangeCount: number;
  errorCount: number;
  errors: SyncErrorEntry[];
  durationMs: number;
  message: string;
};

/** Dealership fields written by sync (never Joe fields). */
export type DealerBikePayload = {
  source: "FEED";
  feedId: string | null;
  vin: string | null;
  stockNumber: string | null;
  year: number;
  make: string;
  model: string;
  title: string | null;
  price: number | null;
  mileage: number | null;
  color: string | null;
  description: string | null;
  condition: string | null;
  category: string | null;
  transmission: string | null;
  certified: string | null;
  vrm: string | null;
  listPriceRaw: string | null;
  inventoryUrl: string | null;
  locationId: string | null;
  locationName: string | null;
  city: string | null;
  state: string | null;
  zipcode: string | null;
  dealerPhone: string | null;
  dealerEmail: string | null;
  photos: string[];
  dealerHash: string;
};

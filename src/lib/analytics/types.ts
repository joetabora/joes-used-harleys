import { z } from "zod";

export const analyticsEventTypes = [
  "PAGE_VIEW",
  "BIKE_DETAIL_VIEW",
  "INVENTORY_IMPRESSION",
  "SEARCH_QUERY",
  "FILTER_USAGE",
  "TIME_ON_PAGE",
  "CONTACT_CLICK",
  "FINANCING_OPEN",
  "FAVORITE",
  "SHARE_CLICK",
  "APPOINTMENT_REQUEST",
  "SCAN_QR_OPEN",
  "SCAN_TIME_ON_PAGE",
  "SCAN_GALLERY_INTERACTION",
  "SCAN_VIDEO_PLAY",
  "SCAN_SHARE",
  "SCAN_TEST_RIDE_REQUEST",
  "SCAN_ASK_ASSOCIATE",
  "SCAN_FAVORITE",
  "SCAN_COMPARE",
  "SCAN_ESTIMATOR_OPEN",
] as const;

export type AnalyticsEventTypeName = (typeof analyticsEventTypes)[number];

export const collectAnalyticsSchema = z.object({
  type: z.enum(analyticsEventTypes),
  bikeId: z.string().min(1).max(64).optional().nullable(),
  sessionId: z.string().min(8).max(128),
  path: z.string().max(512).optional().nullable(),
  query: z.string().max(200).optional().nullable(),
  filters: z.record(z.string(), z.unknown()).optional().nullable(),
  meta: z.record(z.string(), z.unknown()).optional().nullable(),
  product: z.enum(["JOE_SITE", "SCANBIKE"]).optional().nullable(),
  noTrack: z.boolean().optional(),
});

export type CollectAnalyticsInput = z.infer<typeof collectAnalyticsSchema>;

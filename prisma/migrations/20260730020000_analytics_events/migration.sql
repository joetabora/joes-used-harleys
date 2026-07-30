-- First-party analytics events + BikeAnalytics rollup columns

ALTER TABLE "BikeAnalytics" ADD COLUMN IF NOT EXISTS "uniqueVisitors" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "BikeAnalytics" ADD COLUMN IF NOT EXISTS "impressions" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "BikeAnalytics" ADD COLUMN IF NOT EXISTS "contactClicks" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "BikeAnalytics" ADD COLUMN IF NOT EXISTS "financingOpens" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "BikeAnalytics" ADD COLUMN IF NOT EXISTS "searchHits" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "BikeAnalytics" ADD COLUMN IF NOT EXISTS "avgTimeOnPageMs" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "BikeAnalytics" ADD COLUMN IF NOT EXISTS "timeOnPageSamples" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "BikeAnalytics" ADD COLUMN IF NOT EXISTS "lastDetailViewAt" TIMESTAMP(3);

CREATE TYPE "AnalyticsEventType" AS ENUM (
  'PAGE_VIEW',
  'BIKE_DETAIL_VIEW',
  'INVENTORY_IMPRESSION',
  'SEARCH_QUERY',
  'FILTER_USAGE',
  'TIME_ON_PAGE',
  'CONTACT_CLICK',
  'FINANCING_OPEN',
  'FAVORITE',
  'SHARE_CLICK',
  'APPOINTMENT_REQUEST'
);

CREATE TABLE "AnalyticsEvent" (
  "id" TEXT NOT NULL,
  "type" "AnalyticsEventType" NOT NULL,
  "bikeId" TEXT,
  "sessionId" TEXT NOT NULL,
  "path" TEXT,
  "query" TEXT,
  "filters" JSONB,
  "meta" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AnalyticsEvent_type_createdAt_idx" ON "AnalyticsEvent"("type", "createdAt");
CREATE INDEX "AnalyticsEvent_bikeId_type_createdAt_idx" ON "AnalyticsEvent"("bikeId", "type", "createdAt");
CREATE INDEX "AnalyticsEvent_sessionId_createdAt_idx" ON "AnalyticsEvent"("sessionId", "createdAt");

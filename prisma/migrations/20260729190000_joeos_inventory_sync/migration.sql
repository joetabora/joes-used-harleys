-- JoeOS inventory sync schema expansion
-- Additive: expand Bike, add SyncLog, BikePriceHistory, BikeAnalytics

CREATE TYPE "BikeSource" AS ENUM ('FEED', 'MANUAL');
CREATE TYPE "SyncTrigger" AS ENUM ('CRON', 'MANUAL', 'DRY_RUN');
CREATE TYPE "SyncStatus" AS ENUM ('SUCCESS', 'PARTIAL', 'FAILED');

-- Expand Bike with dealer + Joe fields
ALTER TABLE "Bike" ADD COLUMN "source" "BikeSource" NOT NULL DEFAULT 'MANUAL';
ALTER TABLE "Bike" ADD COLUMN "feedId" TEXT;
ALTER TABLE "Bike" ADD COLUMN "vin" TEXT;
ALTER TABLE "Bike" ADD COLUMN "stockNumber" TEXT;
ALTER TABLE "Bike" ADD COLUMN "title" TEXT;
ALTER TABLE "Bike" ADD COLUMN "color" TEXT;
ALTER TABLE "Bike" ADD COLUMN "condition" TEXT;
ALTER TABLE "Bike" ADD COLUMN "category" TEXT;
ALTER TABLE "Bike" ADD COLUMN "transmission" TEXT;
ALTER TABLE "Bike" ADD COLUMN "certified" TEXT;
ALTER TABLE "Bike" ADD COLUMN "vrm" TEXT;
ALTER TABLE "Bike" ADD COLUMN "listPriceRaw" TEXT;
ALTER TABLE "Bike" ADD COLUMN "inventoryUrl" TEXT;
ALTER TABLE "Bike" ADD COLUMN "locationId" TEXT;
ALTER TABLE "Bike" ADD COLUMN "locationName" TEXT;
ALTER TABLE "Bike" ADD COLUMN "city" TEXT;
ALTER TABLE "Bike" ADD COLUMN "state" TEXT;
ALTER TABLE "Bike" ADD COLUMN "zipcode" TEXT;
ALTER TABLE "Bike" ADD COLUMN "dealerPhone" TEXT;
ALTER TABLE "Bike" ADD COLUMN "dealerEmail" TEXT;
ALTER TABLE "Bike" ADD COLUMN "dealerHash" TEXT;
ALTER TABLE "Bike" ADD COLUMN "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Bike" ADD COLUMN "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Bike" ADD COLUMN "soldAt" TIMESTAMP(3);
ALTER TABLE "Bike" ADD COLUMN "syncedAt" TIMESTAMP(3);
ALTER TABLE "Bike" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Bike" ADD COLUMN "featuredRank" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Bike" ADD COLUMN "hidden" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Bike" ADD COLUMN "joeRating" INTEGER;
ALTER TABLE "Bike" ADD COLUMN "perfectFor" TEXT;
ALTER TABLE "Bike" ADD COLUMN "favoriteFeature" TEXT;
ALTER TABLE "Bike" ADD COLUMN "idealRider" TEXT;
ALTER TABLE "Bike" ADD COLUMN "thingsToMention" TEXT;
ALTER TABLE "Bike" ADD COLUMN "thingsToCheck" TEXT;
ALTER TABLE "Bike" ADD COLUMN "whyIDLikeIt" TEXT;
ALTER TABLE "Bike" ADD COLUMN "whoShouldSkipIt" TEXT;
ALTER TABLE "Bike" ADD COLUMN "conversationStarter" TEXT;
ALTER TABLE "Bike" ADD COLUMN "walkaroundVideoUrl" TEXT;
ALTER TABLE "Bike" ADD COLUMN "faq" JSONB;
ALTER TABLE "Bike" ADD COLUMN "buyingTips" TEXT;
ALTER TABLE "Bike" ADD COLUMN "seoHeadline" TEXT;
ALTER TABLE "Bike" ADD COLUMN "seoDescription" TEXT;
ALTER TABLE "Bike" ADD COLUMN "personalPhotos" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Bike" ADD COLUMN "personalHeroImageUrl" TEXT;
ALTER TABLE "Bike" ADD COLUMN "internalNotes" TEXT;

CREATE UNIQUE INDEX "Bike_vin_key" ON "Bike"("vin");
CREATE INDEX "Bike_stockNumber_idx" ON "Bike"("stockNumber");
CREATE INDEX "Bike_status_hidden_idx" ON "Bike"("status", "hidden");
CREATE INDEX "Bike_lastSeenAt_idx" ON "Bike"("lastSeenAt");
CREATE INDEX "Bike_featuredRank_status_idx" ON "Bike"("featuredRank", "status");
CREATE INDEX "Bike_firstSeenAt_idx" ON "Bike"("firstSeenAt");
CREATE INDEX "Bike_soldAt_idx" ON "Bike"("soldAt");
CREATE INDEX "Bike_source_idx" ON "Bike"("source");

CREATE TABLE "SyncLog" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    "trigger" "SyncTrigger" NOT NULL,
    "status" "SyncStatus" NOT NULL,
    "feedUrl" TEXT NOT NULL,
    "feedVersion" TEXT,
    "fetchedBytes" INTEGER,
    "parsedCount" INTEGER,
    "usedHarleyCount" INTEGER,
    "createdCount" INTEGER NOT NULL DEFAULT 0,
    "updatedCount" INTEGER NOT NULL DEFAULT 0,
    "soldCount" INTEGER NOT NULL DEFAULT 0,
    "unchangedCount" INTEGER NOT NULL DEFAULT 0,
    "priceChangeCount" INTEGER NOT NULL DEFAULT 0,
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "errors" JSONB,
    "dryRun" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SyncLog_startedAt_idx" ON "SyncLog"("startedAt");
CREATE INDEX "SyncLog_status_idx" ON "SyncLog"("status");

CREATE TABLE "BikePriceHistory" (
    "id" TEXT NOT NULL,
    "bikeId" TEXT NOT NULL,
    "vin" TEXT,
    "previousPrice" INTEGER,
    "newPrice" INTEGER,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "syncLogId" TEXT,

    CONSTRAINT "BikePriceHistory_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "BikePriceHistory_bikeId_changedAt_idx" ON "BikePriceHistory"("bikeId", "changedAt");
CREATE INDEX "BikePriceHistory_vin_changedAt_idx" ON "BikePriceHistory"("vin", "changedAt");
CREATE INDEX "BikePriceHistory_changedAt_idx" ON "BikePriceHistory"("changedAt");

ALTER TABLE "BikePriceHistory" ADD CONSTRAINT "BikePriceHistory_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "BikePriceHistory" ADD CONSTRAINT "BikePriceHistory_syncLogId_fkey" FOREIGN KEY ("syncLogId") REFERENCES "SyncLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "BikeAnalytics" (
    "id" TEXT NOT NULL,
    "bikeId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "favorites" INTEGER NOT NULL DEFAULT 0,
    "emails" INTEGER NOT NULL DEFAULT 0,
    "texts" INTEGER NOT NULL DEFAULT 0,
    "calls" INTEGER NOT NULL DEFAULT 0,
    "shares" INTEGER NOT NULL DEFAULT 0,
    "walkaroundRequests" INTEGER NOT NULL DEFAULT 0,
    "testRideRequests" INTEGER NOT NULL DEFAULT 0,
    "lastViewedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BikeAnalytics_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "BikeAnalytics_bikeId_key" ON "BikeAnalytics"("bikeId");
ALTER TABLE "BikeAnalytics" ADD CONSTRAINT "BikeAnalytics_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

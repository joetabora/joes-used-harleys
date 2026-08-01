-- CreateEnum
CREATE TYPE "ScanVisibility" AS ENUM ('PUBLIC_INDEX', 'QR_ONLY', 'ARCHIVED', 'HIDDEN');

-- CreateEnum
CREATE TYPE "LeadProduct" AS ENUM ('JOE_SITE', 'SCANBIKE');

-- AlterTable Lead
ALTER TABLE "Lead" ADD COLUMN "product" "LeadProduct" NOT NULL DEFAULT 'JOE_SITE';

-- AlterTable Bike
ALTER TABLE "Bike" ADD COLUMN "scanVisibility" "ScanVisibility" NOT NULL DEFAULT 'QR_ONLY',
ADD COLUMN "scanSlugVin" TEXT,
ADD COLUMN "scanSlugStock" TEXT,
ADD COLUMN "archivedAt" TIMESTAMP(3);

-- AlterTable AnalyticsEvent
ALTER TABLE "AnalyticsEvent" ADD COLUMN "product" TEXT;

-- AlterEnum AnalyticsEventType
ALTER TYPE "AnalyticsEventType" ADD VALUE 'SCAN_QR_OPEN';
ALTER TYPE "AnalyticsEventType" ADD VALUE 'SCAN_TIME_ON_PAGE';
ALTER TYPE "AnalyticsEventType" ADD VALUE 'SCAN_GALLERY_INTERACTION';
ALTER TYPE "AnalyticsEventType" ADD VALUE 'SCAN_VIDEO_PLAY';
ALTER TYPE "AnalyticsEventType" ADD VALUE 'SCAN_SHARE';
ALTER TYPE "AnalyticsEventType" ADD VALUE 'SCAN_TEST_RIDE_REQUEST';
ALTER TYPE "AnalyticsEventType" ADD VALUE 'SCAN_ASK_ASSOCIATE';
ALTER TYPE "AnalyticsEventType" ADD VALUE 'SCAN_FAVORITE';
ALTER TYPE "AnalyticsEventType" ADD VALUE 'SCAN_COMPARE';
ALTER TYPE "AnalyticsEventType" ADD VALUE 'SCAN_ESTIMATOR_OPEN';

-- CreateIndex
CREATE UNIQUE INDEX "Bike_scanSlugVin_key" ON "Bike"("scanSlugVin");
CREATE UNIQUE INDEX "Bike_scanSlugStock_key" ON "Bike"("scanSlugStock");
CREATE INDEX "Bike_scanVisibility_status_idx" ON "Bike"("scanVisibility", "status");
CREATE INDEX "Lead_product_idx" ON "Lead"("product");
CREATE INDEX "AnalyticsEvent_product_type_createdAt_idx" ON "AnalyticsEvent"("product", "type", "createdAt");

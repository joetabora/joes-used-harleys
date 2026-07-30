-- SEO URL registry + IndexNow ping log
CREATE TYPE "SeoUrlType" AS ENUM (
  'STATIC',
  'GUIDE',
  'MODEL',
  'MODEL_YEAR',
  'FAMILY',
  'COLOR',
  'ENGINE',
  'COMPARE',
  'CITY',
  'CITY_MODEL',
  'CITY_MODEL_YEAR',
  'ROUTE',
  'EVENT',
  'INVENTORY',
  'HUB'
);

CREATE TYPE "SeoStatus" AS ENUM ('DRAFT', 'NOINDEX', 'INDEX');

CREATE TABLE "SeoUrl" (
  "id" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "type" "SeoUrlType" NOT NULL,
  "status" "SeoStatus" NOT NULL DEFAULT 'DRAFT',
  "score" INTEGER NOT NULL DEFAULT 0,
  "scoreDetail" JSONB,
  "lastModified" TIMESTAMP(3) NOT NULL,
  "lastIndexedAt" TIMESTAMP(3),
  "indexNowAt" TIMESTAMP(3),
  "payload" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SeoUrl_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SeoUrl_path_key" ON "SeoUrl"("path");
CREATE INDEX "SeoUrl_status_type_idx" ON "SeoUrl"("status", "type");
CREATE INDEX "SeoUrl_type_idx" ON "SeoUrl"("type");

CREATE TABLE "SeoIndexPing" (
  "id" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "ok" BOOLEAN NOT NULL,
  "response" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SeoIndexPing_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SeoIndexPing_createdAt_idx" ON "SeoIndexPing"("createdAt");
CREATE INDEX "SeoIndexPing_path_idx" ON "SeoIndexPing"("path");

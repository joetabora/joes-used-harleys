-- Harley Knowledge Graph SSOT

CREATE TYPE "KnowledgeEntityType" AS ENUM (
  'MODEL',
  'FAMILY',
  'GENERATION',
  'ENGINE',
  'TRIM',
  'COLOR',
  'RIDING_STYLE',
  'BUYER_PERSONA',
  'BUYING_TOPIC',
  'OWNERSHIP_TOPIC',
  'MAINTENANCE_TOPIC',
  'UPGRADE_TOPIC',
  'COMPARISON',
  'FINANCING_TOPIC',
  'INSURANCE_TOPIC',
  'ROUTE',
  'CITY',
  'EVENT'
);

CREATE TYPE "KnowledgeStatus" AS ENUM (
  'DRAFT',
  'IN_REVIEW',
  'PUBLISHED',
  'ARCHIVED'
);

CREATE TYPE "KnowledgeRelationKind" AS ENUM (
  'IN_FAMILY',
  'USES_ENGINE',
  'HAS_GENERATION',
  'HAS_TRIM',
  'SUITS_PERSONA',
  'SUITS_STYLE',
  'TOPIC_OF',
  'COMPARES',
  'NEAR_CITY',
  'RELATED_GUIDE',
  'SHOWS_INVENTORY_HINT',
  'RELATED_TO'
);

CREATE TABLE "KnowledgeEntity" (
  "id" TEXT NOT NULL,
  "type" "KnowledgeEntityType" NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "status" "KnowledgeStatus" NOT NULL DEFAULT 'DRAFT',
  "summary" TEXT NOT NULL DEFAULT '',
  "facts" JSONB NOT NULL DEFAULT '{}',
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "KnowledgeEntity_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "KnowledgeEntity_type_slug_key" ON "KnowledgeEntity"("type", "slug");
CREATE INDEX "KnowledgeEntity_type_status_idx" ON "KnowledgeEntity"("type", "status");
CREATE INDEX "KnowledgeEntity_status_idx" ON "KnowledgeEntity"("status");

CREATE TABLE "KnowledgeRelation" (
  "id" TEXT NOT NULL,
  "fromId" TEXT NOT NULL,
  "toId" TEXT NOT NULL,
  "kind" "KnowledgeRelationKind" NOT NULL,
  "label" TEXT,
  "weight" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "KnowledgeRelation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "KnowledgeRelation_fromId_toId_kind_key" ON "KnowledgeRelation"("fromId", "toId", "kind");
CREATE INDEX "KnowledgeRelation_fromId_kind_idx" ON "KnowledgeRelation"("fromId", "kind");
CREATE INDEX "KnowledgeRelation_toId_kind_idx" ON "KnowledgeRelation"("toId", "kind");

ALTER TABLE "KnowledgeRelation" ADD CONSTRAINT "KnowledgeRelation_fromId_fkey"
  FOREIGN KEY ("fromId") REFERENCES "KnowledgeEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "KnowledgeRelation" ADD CONSTRAINT "KnowledgeRelation_toId_fkey"
  FOREIGN KEY ("toId") REFERENCES "KnowledgeEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "KnowledgeRevision" (
  "id" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "snapshot" JSONB NOT NULL,
  "note" TEXT,
  "actorId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "KnowledgeRevision_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "KnowledgeRevision_entityId_createdAt_idx" ON "KnowledgeRevision"("entityId", "createdAt");

ALTER TABLE "KnowledgeRevision" ADD CONSTRAINT "KnowledgeRevision_entityId_fkey"
  FOREIGN KEY ("entityId") REFERENCES "KnowledgeEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

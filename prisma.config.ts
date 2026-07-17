import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma CLI config.
 * Use DIRECT_URL (session/direct, port 5432) for migrations.
 * Runtime app queries use the pooled DATABASE_URL via @prisma/adapter-pg.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});

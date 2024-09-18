import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/infrastructure/data/schemas/index.ts",
  out: "src/infrastructure/data/migrations",
  dialect: "postgresql",

  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
  verbose: true,
  strict: true
});

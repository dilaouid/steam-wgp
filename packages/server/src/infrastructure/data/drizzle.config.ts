import "dotenv/config";

import { defineConfig } from "drizzle-kit";

const { DATABASE_URL } = process.env;

export default defineConfig({
  schema: "src/infrastructure/data/schema/index.ts",
  out: "src/infrastructure/data/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL
  },
  verbose: true,
  strict: true,
});

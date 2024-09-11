import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

const { DATABASE_URL } = process.env;

async function main() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  const db: NodePgDatabase = drizzle(pool);

  console.info("Migrating database...");

  await migrate(db, {
    migrationsFolder: "src/infrastructure/data/migrations"
  });

  console.info("Database migrated successfully!");

  await pool.end();
}

main();

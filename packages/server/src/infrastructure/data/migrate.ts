import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

const { DATABASE_URL } = process.env;

// C'est dans cette fonction qu'on va appliquer la migration vers notre db
async function main() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  const db: NodePgDatabase = drizzle(pool);

  console.info("Migrating database...");

  await migrate(db, {
    migrationsFolder: "src/infrastructure/data/drizzle",
  });

  console.info("Database migrated successfully!");

  await pool.end();
}

main();

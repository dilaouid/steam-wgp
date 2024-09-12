import { pgTable, uuid, integer, bigint, boolean } from "drizzle-orm/pg-core";
import { players, games } from ".";

export const libraries = pgTable("libraries", {
  id: uuid("id").primaryKey().defaultRandom(),
  player_id: bigint("player_id", { mode: "bigint" }).references(() => players.id, { onDelete: "cascade" }),
  game_id: integer("game_id").references(() => games.id),
  hidden: boolean("hidden").default(false)
});
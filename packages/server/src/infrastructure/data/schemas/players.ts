import { pgTable, bigint, varchar } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  avatar_hash: varchar("avatar_hash", { length: 255 }).unique(),
  username: varchar("username", { length: 255 }),
  profileurl: varchar("profileurl", { length: 255 }).unique()
});
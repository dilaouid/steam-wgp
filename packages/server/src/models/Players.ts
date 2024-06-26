import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, bigint, varchar } from "drizzle-orm/pg-core";

export const model = pgTable("players", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  avatar_hash: varchar("avatar_hash", { length: 255 }),
  username: varchar("username", { length: 255 }),
  profileurl: varchar("profileurl", { length: 255 })
});

export type Player = InferSelectModel<typeof model>;
export type PlayerInsert = InferInsertModel<typeof model>;
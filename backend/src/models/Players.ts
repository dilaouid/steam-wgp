import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial } from "drizzle-orm/pg-core";

export const model = pgTable("players", {
    id: serial("id").primaryKey()
});

export type Player          = InferSelectModel<typeof model>;
export type PlayerInsert    = InferInsertModel<typeof model>;
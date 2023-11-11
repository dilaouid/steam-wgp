import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer } from "drizzle-orm/pg-core";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { model as players } from "./Players";
import { model as games } from "./Games";

export const model = pgTable("libraries", {
    id: uuid("id").primaryKey(),
    player_id: integer("player_id").references(() => players.id),
    game_id: integer("game_id").references(() => games.id)
});

export type Library         = InferSelectModel<typeof model>;
export type LibraryInsert   = InferInsertModel<typeof model>;
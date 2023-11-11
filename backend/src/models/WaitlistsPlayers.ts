import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { uuid, pgTable } from "drizzle-orm/pg-core";
import { model as players } from "./Players";
import { model as waitlists } from "./Waitlists";
import { primaryKey } from "drizzle-orm/pg-core";

export const model = pgTable('waitlists_players', {
  player_id: uuid('player_id').references(() => players.id),
  waitlist_id: uuid('waitlist_id').references(() => waitlists.id)
}, (waitlist_player) => {
  return {
    pk: primaryKey({columns: [waitlist_player.player_id, waitlist_player.waitlist_id]})
  }
});

export type WaitlistPlayer = InferSelectModel<typeof model>;
export type WaitlistPlayerInsert = InferInsertModel<typeof model>;
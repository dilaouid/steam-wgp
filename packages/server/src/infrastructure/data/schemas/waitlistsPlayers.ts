import { pgTable, primaryKey, bigint, varchar } from "drizzle-orm/pg-core";
import { players, waitlists } from ".";

export const waitlistsPlayers = pgTable('waitlists_players', {
  player_id: bigint('player_id', { mode: 'bigint'}).references(() => players.id, { onDelete: 'cascade' }),
  waitlist_id: varchar('waitlist_id', { length: 60 }).references(() => waitlists.id, { onDelete: 'cascade' })
}, (waitlist_player) => {
  return {
    pk: primaryKey({columns: [waitlist_player.player_id, waitlist_player.waitlist_id]})
  }
});
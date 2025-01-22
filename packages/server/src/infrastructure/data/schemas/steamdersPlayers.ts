import { pgTable, primaryKey, bigint, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { players, steamders } from ".";

export const steamdersPlayers = pgTable('steamders_players', {
  player_id: bigint('player_id', { mode: 'bigint'}).references(() => players.id, { onDelete: 'cascade' }),
  steamder_id: uuid('steamder_id').references(() => steamders.id, { onDelete: 'cascade' }),
  status: varchar('status', { enum: ['active', 'completed'] }).default('active'),
  joined_at: timestamp('joined_at').defaultNow(),
  completed_at: timestamp('completed_at')
}, (steamder_player) => {
  return {
    pk: primaryKey({columns: [steamder_player.player_id, steamder_player.steamder_id]})
  }
});

import { pgTable, primaryKey, bigint, uuid } from "drizzle-orm/pg-core";
import { players, steamders } from ".";

export const steamdersPlayers = pgTable('steamders_players', {
  player_id: bigint('player_id', { mode: 'bigint'}).references(() => players.id, { onDelete: 'cascade' }),
  steamder_id: uuid('steamder_id').references(() => steamders.id, { onDelete: 'cascade' })
}, (steamder_player) => [
  primaryKey({columns: [steamder_player.player_id, steamder_player.steamder_id]})
]);
import { relations } from "drizzle-orm";
import { players, libraries, games, steamders, steamdersPlayers, families } from "./";

export const librariesRelations = relations(libraries, ({ one }) => ({
  player: one(players, {
    fields: [libraries.player_id],
    references: [players.id],
  }),
  game: one(games, {
    fields: [libraries.game_id],
    references: [games.id],
  }),
}));

export const steamdersRelations = relations(steamders, ({ one, many }) => ({
  admin: one(players, {
    fields: [steamders.admin_id],
    references: [players.id],
  }),
  players: many(steamdersPlayers),
}));

export const steamdersPlayersRelations = relations(
  steamdersPlayers,
  ({ one }) => ({
    player: one(players, {
      fields: [steamdersPlayers.player_id],
      references: [players.id],
    }),
    steamder: one(steamders, {
      fields: [steamdersPlayers.steamder_id],
      references: [steamders.id],
    }),
  })
);

export const playersRelations = relations(players, ({ many }) => ({
  libraries: many(libraries),
  adminSteamders: many(steamders),
  steamdersParticipated: many(steamdersPlayers),
}));

export const gamesRelations = relations(games, ({ many }) => ({
  libraries: many(libraries),
}));

export const familyRelations = relations(families, ({ one }) => ({
  player: one(players, {
    fields: [families.family_admin],
    references: [players.id],
  }),
  familyMember: one(players, {
    fields: [families.family_member],
    references: [players.id],
  }),
}));
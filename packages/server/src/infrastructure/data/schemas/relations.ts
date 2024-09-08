import { relations } from "drizzle-orm";
import { players, libraries, games, waitlists, waitlistsPlayers } from "./";

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

export const waitlistsRelations = relations(waitlists, ({ one, many }) => ({
  admin: one(players, {
    fields: [waitlists.admin_id],
    references: [players.id],
  }),
  players: many(waitlistsPlayers),
}));

export const waitlistsPlayersRelations = relations(
  waitlistsPlayers,
  ({ one }) => ({
    player: one(players, {
      fields: [waitlistsPlayers.player_id],
      references: [players.id],
    }),
    waitlist: one(waitlists, {
      fields: [waitlistsPlayers.waitlist_id],
      references: [waitlists.id],
    }),
  })
);

export const playersRelations = relations(players, ({ many }) => ({
  libraries: many(libraries),
  adminWaitlists: many(waitlists),
  waitlistsParticipated: many(waitlistsPlayers),
}));

export const gamesRelations = relations(games, ({ many }) => ({
  libraries: many(libraries),
}));

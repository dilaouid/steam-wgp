import { FastifyInstance } from "fastify";
import { Libraries, Waitlists, WaitlistsPlayers } from "../../../models";
import { PlayerInfo, Waitlist } from "../types";
import { and, eq } from "drizzle-orm";
import { checkCommonGames } from "./checkCommonGames";
import { Game } from "../../../models/Games";
import { fillPlayerGamesList } from "./fillPlayerGamesList";

export const startWaitlist = async (fastify: FastifyInstance, waitlist: Waitlist, waitlistId: string, allGames: number[], waitlists: Map<any, any>): Promise<void> => {
  if (!waitlist || waitlist.players.length < 2) return;

  const playersAndGamesInfo = await fastify.db.select().from(WaitlistsPlayers.model)
    .leftJoin(
      Libraries.model,
      and(
        eq(WaitlistsPlayers.model.player_id, Libraries.model.player_id),
        eq(Libraries.model.hidden, false)
      )
    )
    .where(
      eq(WaitlistsPlayers.model.waitlist_id, waitlistId)
    )
    .execute();

  // check if all players are in the waitlist
  const allPlayersPresent = waitlist.players.every((player: PlayerInfo) =>
    playersAndGamesInfo.some((row: any) => row.waitlists_players.player_id !== BigInt(player?.player_id)));

  if (!allPlayersPresent) {
    fastify.log.error(`Mismatch in players present in the room ${waitlistId}`);
    return;
  }
  fillPlayerGamesList(waitlists);

  if (!waitlist.display_all_games) {
    const commonSelectableGames = await checkCommonGames(waitlist, waitlistId, fastify);
    if (!commonSelectableGames) return;
    waitlist.commonGames = commonSelectableGames.map((game: Game) => game.id)
  } else {
    waitlist.commonGames = allGames;
  }

  // update the waitlist in the database (start: true)
  await fastify.db.update(Waitlists.model)
    .set({ started: true })
    .where(eq(Waitlists.model.id, waitlistId))
    .execute();
  waitlist.started = true;
};
import { FastifyInstance } from "fastify";
import { PlayerInfo, Steamder } from "../types";
import { libraries, steamders, steamdersPlayers } from "../../../infrastructure/data/schemas";
import { and, eq } from "drizzle-orm";
import { checkCommonGames } from "./checkCommonGames";
import { fillPlayerGamesList } from "./fillPlayerGamesList";
import { Game } from "../../../domain/entities";

export const startWaitlist = async (fastify: FastifyInstance, waitlist: Steamder, waitlistId: string, allGames: number[], waitlists: Map<any, any>): Promise<void> => {
  if (!waitlist || waitlist.players.length < 2) return;

  const playersAndGamesInfo = await fastify.db.select().from(steamdersPlayers)
    .leftJoin(
      libraries,
      and(
        eq(steamdersPlayers.player_id, libraries.player_id),
        eq(libraries.hidden, false)
      )
    )
    .where(
      eq(steamdersPlayers.steamder_id, waitlistId)
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
  await fastify.db.update(steamders)
    .set({ started: true })
    .where(eq(steamders.id, waitlistId))
    .execute();
  waitlist.started = true;
};
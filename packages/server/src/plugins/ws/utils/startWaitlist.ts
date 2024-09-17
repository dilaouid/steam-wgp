import { FastifyInstance } from "fastify";
import { PlayerInfo, Steamder } from "../types";
import { libraries, steamders, steamdersPlayers } from "../../../infrastructure/data/schemas";
import { and, eq } from "drizzle-orm";
import { checkCommonGames } from "./checkCommonGames";
import { fillPlayerGamesList } from "./fillPlayerGamesList";
import { Game } from "../../../domain/entities";

export const startWaitlist = async (fastify: FastifyInstance, steamder: Steamder, steamderId: string, allGames: number[], steamdersMap: Map<any, any>): Promise<void> => {
  if (!steamder || steamder.players.length < 2) return;

  const playersAndGamesInfo = await fastify.db.select().from(steamdersPlayers)
    .leftJoin(
      libraries,
      and(
        eq(steamdersPlayers.player_id, libraries.player_id),
        eq(libraries.hidden, false)
      )
    )
    .where(
      eq(steamdersPlayers.steamder_id, steamderId)
    )
    .execute();

  // check if all players are in the steamder
  const allPlayersPresent = steamder.players.every((player: PlayerInfo) =>
    playersAndGamesInfo.some((row: any) => row.steamder_players.player_id !== BigInt(player?.player_id)));

  if (!allPlayersPresent) {
    fastify.log.error(`Mismatch in players present in the room ${steamderId}`);
    return;
  }
  fillPlayerGamesList(steamdersMap);

  if (!steamder.display_all_games) {
    const commonSelectableGames = await checkCommonGames(steamder, steamderId, fastify);
    if (!commonSelectableGames) return;
    steamder.commonGames = commonSelectableGames.map((game: Game) => game.id)
  } else {
    steamder.commonGames = allGames;
  }

  // update the steamder in the database (start: true)
  await fastify.db.update(steamders)
    .set({ started: true })
    .where(eq(steamders.id, steamderId))
    .execute();
  steamder.started = true;
};
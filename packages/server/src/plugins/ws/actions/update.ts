import { FastifyInstance } from "fastify";

import { eq } from "drizzle-orm";

import { steamders } from "@schemas";
import { Steamder } from "../types";
import { calculateAllGames, updateCommonGames } from "@plugins/ws/utils/";

export const update = async (fastify: FastifyInstance, steamder: Steamder, steamderId: string, publicGames: number[], playerId: string) => {
  try {
    if (steamder.started || steamder.ended) return;
    const playerGames = publicGames.map(Number);
    const steamderDecorate: any = fastify.steamders.get(steamderId);
    steamder.playerGames[playerId] = playerGames;

    updateCommonGames(steamder);
    const all_games = calculateAllGames(steamder);

    fastify.db
      .update(steamders)
      .set(
        {
          common_games: steamder.commonGames.length,
          all_games: all_games.length
        }
      ).where(
        eq(steamders.id, steamderId)
      ).execute();

    steamderDecorate.sockets.forEach((client: any) => {
      client.send(JSON.stringify({ action: 'update', player: { player_id: playerId, games: playerGames }, commonGames: steamder.commonGames }));
    });
  } catch (error) {
    fastify.log.error(`Error in 'update' action: ${error}`);
  }
}
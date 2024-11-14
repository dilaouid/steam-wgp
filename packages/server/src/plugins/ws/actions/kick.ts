import { FastifyInstance } from "fastify";

import { eq } from "drizzle-orm";

import { steamders } from "@schemas";
import { calculateAllGames, updateCommonGames } from "@plugins/ws/utils/";
import { PlayerInfo, Steamder } from "../types";

export const kick = (fastify: FastifyInstance, steamderId: string, playerId: string, playerToKick: string, steamder: Steamder) => {
  try {
    if (steamder.started || steamder.ended) return;
    if (playerId !== steamder.adminId) return;
    if (steamder) {
      steamder.players = steamder.players.filter((player: PlayerInfo) => player.player_id !== playerToKick);
      delete steamder.playerGames[playerToKick];
    }

    const steamderDecorate: any = fastify.steamders.get(steamderId);

    // update the steamderClients.commonGames now that a player has left
    // fillPlayerGamesList();
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

    // send message to all players
    steamderDecorate.sockets.forEach((client: any) => {
      client.send(JSON.stringify({ action: 'kicked', playerId: playerToKick }));
    });
  } catch (error) {
    fastify.log.error(`Error in 'kick' action: ${error}`);
  }
}
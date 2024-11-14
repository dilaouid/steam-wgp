import { FastifyInstance } from "fastify";

import { eq } from "drizzle-orm";
import { steamders } from "@schemas";
import { PlayerInfo, Steamder } from "../types";
import { calculateAllGames, updateCommonGames } from "@plugins/ws/utils/";

export const leave = async (fastify: FastifyInstance, steamderId: string, steamder: Steamder, playerId: string) => {
  const steamderDecorate: any = fastify.steamders.get(steamderId);

  if (steamder.started || steamder.ended || !steamderDecorate) return;
  if (steamder) {
    steamder.players = steamder.players.filter((player: PlayerInfo) => player.player_id !== playerId);
    delete steamder.playerGames[playerId];
  }

  // update the steamderClients.commonGames now that a player has left
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
    const data = playerId === steamder.adminId ? { action: 'end' } : { action: 'leave', playerId};
    client.send(JSON.stringify(data));
  });
}
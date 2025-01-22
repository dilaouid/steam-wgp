import { FastifyInstance } from "fastify";

import { calculateAllGames, updateCommonGames } from "@plugins/ws/utils/";
import { PlayerInfo, Steamder } from "../types";
import { updateSteamder } from "@repositories";

export const kick = async (fastify: FastifyInstance, steamderId: string, playerId: string, playerToKick: string, steamder: Steamder) => {
  try {
    // can kick only if the steamder is started and the player requesting the action is the admin
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

    await updateSteamder(fastify, steamderId, {
      common_games: steamder.commonGames.length,
      all_games: all_games.length
    });

    // send message to all players
    steamderDecorate.sockets.forEach((client: any) => {
      client.send(JSON.stringify({ action: 'kicked', playerId: playerToKick }));
    });
  } catch (error) {
    fastify.log.error(`Error in 'kick' action: ${error}`);
  }
}
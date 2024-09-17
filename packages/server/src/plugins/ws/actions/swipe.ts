import { FastifyInstance } from "fastify";
import { deleteWaitlist, checkGameEnd } from "../utils";
import { Steamder } from "../types";

export const swipe = async (fastify: FastifyInstance, steamders: Map<any, any>, steamderId: string, gameId: number, playerId: string) => {
  try {
    const steamderDecorate: any = fastify.steamders.get(steamderId);
    const steamder: Steamder = steamders.get(steamderId);

    if (steamder && steamder.started && !steamder.ended && steamder.commonGames.includes(gameId)) {
      if (steamder.swipedGames[gameId] && !steamder.swipedGames[gameId].includes(playerId)) {
        steamder.swipedGames[gameId].push(playerId);
      } else {
        steamder.swipedGames[gameId] = [playerId];
      }
    }

    if (checkGameEnd(steamderId, gameId, steamder)) {
      // get the game that is swiped by all the players
      steamderDecorate.sockets.forEach((client: any) => {
        client.send(JSON.stringify({ action: 'gameEnd', choosed_game: steamder.winner }));
      });
      deleteWaitlist(fastify, steamderId, steamder.winner);
    }

  } catch (error) {
    fastify.log.error(`Error in 'swipe' action: ${error}`);
  }
}
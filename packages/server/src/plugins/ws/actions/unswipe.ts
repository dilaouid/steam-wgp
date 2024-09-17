import { FastifyInstance } from "fastify";
import { Steamder } from "../types";

export const unswipe = async (fastify: FastifyInstance, steamder: Steamder, gameId: number) => {
  try {
    if (!steamder.started || steamder.ended) return;
    const swipedGames = steamder.swipedGames[gameId];
    if (swipedGames)
      steamder.swipedGames[gameId] = swipedGames.filter((playerId: string) => playerId !== playerId);
  } catch (error) {
    fastify.log.error(`Error in 'unswipe' action: ${error}`);
  }
}
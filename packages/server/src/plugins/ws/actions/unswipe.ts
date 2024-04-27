import { FastifyInstance } from "fastify";
import { Waitlist } from "../types";

export const unswipe = async (fastify: FastifyInstance, waitlist: Waitlist, gameId: number) => {
  try {
    if (!waitlist.started || waitlist.ended) return;
    const swipedGames = waitlist.swipedGames[gameId];
    if (swipedGames)
      waitlist.swipedGames[gameId] = swipedGames.filter((playerId: string) => playerId !== playerId);
  } catch (error) {
    fastify.log.error(`Error in 'unswipe' action: ${error}`);
  }
}
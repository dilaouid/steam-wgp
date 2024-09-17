import { FastifyInstance } from "fastify";
import { deleteWaitlist, checkGameEnd } from "../utils";
import { Steamder } from "../types";

export const swipe = async (fastify: FastifyInstance, waitlists: Map<any, any>, waitlistId: string, gameId: number, playerId: string) => {
  try {
    const waitlistDecorate: any = fastify.waitlists.get(waitlistId);
    const waitlist: Steamder = waitlists.get(waitlistId);

    if (waitlist && waitlist.started && !waitlist.ended && waitlist.commonGames.includes(gameId)) {
      if (waitlist.swipedGames[gameId] && !waitlist.swipedGames[gameId].includes(playerId)) {
        waitlist.swipedGames[gameId].push(playerId);
      } else {
        waitlist.swipedGames[gameId] = [playerId];
      }
    }

    if (checkGameEnd(waitlistId, gameId, waitlist)) {
      // get the game that is swiped by all the players
      waitlistDecorate.sockets.forEach((client: any) => {
        client.send(JSON.stringify({ action: 'gameEnd', choosed_game: waitlist.winner }));
      });
      deleteWaitlist(fastify, waitlistId, waitlist.winner);
    }

  } catch (error) {
    fastify.log.error(`Error in 'swipe' action: ${error}`);
  }
}
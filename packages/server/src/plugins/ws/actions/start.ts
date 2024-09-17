import { FastifyInstance } from "fastify";
import { Steamder } from "../types";
import { calculateAllGames, deleteWaitlist, startWaitlist } from "../utils";

export const start = async (fastify: FastifyInstance, waitlist: Steamder, waitlistId: string, playerId: string, waitlists: Map<any, any>) => {
  try {
    if (waitlist.players.length < 2) return;
    // cannot start if the waitlist is already started or ended
    if (waitlist.started || waitlist.ended) return;
    if (playerId !== waitlist.adminId) return;
    const waitlistEntry: any = fastify.waitlists.get(waitlistId);

    const allGames = waitlist.display_all_games ? calculateAllGames(waitlist) : [];
    await startWaitlist(fastify, waitlist, waitlistId, allGames, waitlists)

    // count 5 seconds per game
    const timing = (waitlist.display_all_games ? allGames.length : waitlist.commonGames.length) * 2000;

    const endTime = Date.now() + timing + 20000;
    waitlist.endTime = endTime;

    // send message to all players
    waitlistEntry.sockets.forEach((client: any) => {
      fastify.log.info(`Starting waitlist ${waitlistId}`);
      client.send(JSON.stringify({ action: 'start', endTime: waitlist.endTime }));
    });

    // wait for x minutes before ending the waitlist
    setTimeout(() => {
      if (!waitlist || !waitlist.started || waitlist.ended) return;
      waitlist.ended = true;

      const swipedGames = Object.keys(waitlist.swipedGames);
      // pick the most swiped game, if there is one
      if (swipedGames.length > 0) {
        const mostSwipedGame = swipedGames.reduce((a: any, b: any) => waitlist.swipedGames[a].length > waitlist.swipedGames[b].length ? a : b);
        waitlist.winner = parseInt(mostSwipedGame);
      } else {
        // check if display_all_games is true, the random game will be picked from all games otherwise from common games
        waitlist.winner =
        waitlist.display_all_games ?
          allGames[Math.floor(Math.random() * allGames.length)] :
          waitlist.commonGames[Math.floor(Math.random() * waitlist.commonGames.length)];
      }

      waitlistEntry.sockets.forEach((client: any) => {
        client.send(JSON.stringify({ action: 'gameEnd', choosed_game: waitlist.winner }));
      });
      deleteWaitlist(fastify, waitlistId, waitlist.winner);
    }, timing + 20000);

  } catch (error) {
    fastify.log.error(`Error in 'start' action: ${error}`);
  }
}
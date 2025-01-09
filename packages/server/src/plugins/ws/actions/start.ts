import { FastifyInstance } from "fastify";
import { Steamder } from "../types";
import { calculateAllGames, deleteSteamder, startSteamder } from "@plugins/ws/utils/";

export const start = async (fastify: FastifyInstance, steamder: Steamder, steamderId: string, playerId: string, steamders: Map<any, any>) => {
  try {
    // cannot start if there are less than 2 players
    if (steamder.players.length < 2) return;
    // cannot start if the steamder is already started or ended
    if (steamder.started || steamder.ended) return;
    if (playerId !== steamder.adminId) return;
    const steamderEntry: any = fastify.steamders.get(steamderId);

    const allGames = steamder.display_all_games ? calculateAllGames(steamder) : [];
    await startSteamder(fastify, steamder, steamderId, allGames, steamders)

    // count 5 seconds per game
    const timing = (steamder.display_all_games ? allGames.length : steamder.commonGames.length) * 2000;

    const endTime = Date.now() + timing + 20000;
    steamder.endTime = endTime;

    // send message to all players
    steamderEntry.sockets.forEach((client: any) => {
      fastify.log.info(`Starting steamder ${steamderId}`);
      client.send(JSON.stringify({ action: 'start', endTime: steamder.endTime }));
    });

    // wait for x minutes before ending the steamder
    setTimeout(() => {
      if (!steamder || !steamder.started || steamder.ended) return;
      steamder.ended = true;

      const swipedGames = Object.keys(steamder.swipedGames);
      // pick the most swiped game, if there is one
      if (swipedGames.length > 0) {
        const mostSwipedGame = swipedGames.reduce((a: any, b: any) => steamder.swipedGames[a].length > steamder.swipedGames[b].length ? a : b);
        steamder.winner = parseInt(mostSwipedGame);
      } else {
        // check if display_all_games is true, the random game will be picked from all games otherwise from common games
        steamder.winner =
        steamder.display_all_games ?
          allGames[Math.floor(Math.random() * allGames.length)] :
          steamder.commonGames[Math.floor(Math.random() * steamder.commonGames.length)];
      }

      steamderEntry.sockets.forEach((client: any) => {
        client.send(JSON.stringify({ action: 'gameEnd', choosed_game: steamder.winner }));
      });
      deleteSteamder(fastify, steamderId, steamder.winner);
    }, timing + 20000);

  } catch (error) {
    fastify.log.error(`Error in 'start' action: ${error}`);
  }
}
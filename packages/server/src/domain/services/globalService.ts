import { FastifyInstance } from "fastify";
import {
  countGames,
  countPlayers,
  countSteamders,
  getPopularGames,
} from "../../infrastructure/repositories";

/**
 * Retrieves statistics for the SteamWGP service: player count, game count, match count, waitlist count, and 3 most popular games.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @returns {Promise<Object>} The statistics object containing player count, game count, match count, waitlist count, and popular games.
 */
export const SteamWGPStats = async (fastify: FastifyInstance) => {
  const [ players ] = await countPlayers(fastify);
  const [ games ] = await countGames(fastify);
  const [ matches ] = await countSteamders(fastify, true);
  const [ steamders ] = await countSteamders(fastify, false);
  const podium = await getPopularGames(fastify);

  return {
    players: players.count,
    games: games.count,
    matches: matches.count,
    steamders: steamders.count,
    podium,
  };
};

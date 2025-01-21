/* eslint-disable no-multi-spaces */
import { FastifyInstance } from 'fastify';

import dashboardGamesRouter from '../options/dashboard/games/router';
import dashboardLibrariesRouter from '../options/dashboard/library/router';
import dashboardPlayersRouter from '../options/dashboard/players/router';
import dashboardSteamdersRouter from '../options/dashboard/steamders/router';

/**
 * Registers the admin dashboard router.
*
* @param fastify - The Fastify instance.
*/
export default async function dashboardRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.register(dashboardGamesRouter,      { prefix: "/games" });      // /dashboard/games
    fastify.register(dashboardLibrariesRouter,  { prefix: "/library" });    // /dashboard/library
    fastify.register(dashboardPlayersRouter,    { prefix: "/players" });    // /dashboard/players
    fastify.register(dashboardSteamdersRouter,  { prefix: "/steamders" });  // /dashboard/steamders
  });
}
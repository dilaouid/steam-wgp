/* eslint-disable no-multi-spaces */
import { FastifyInstance } from 'fastify';
import { getGamesOpts, createGameOpts, updateGameOpts } from '@options/dashboard';

/**
 * The router for the dashboard games.
 * @param fastify - The Fastify instance.
 */
export default async function dashboardGamesRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.route(getGamesOpts);      // :GET     /dashboard/games
    fastify.route(createGameOpts);    // :POST    /dashboard/games
    fastify.route(updateGameOpts);    // :PUT     /dashboard/games/:id
  });
}
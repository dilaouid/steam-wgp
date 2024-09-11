import { FastifyInstance } from 'fastify';
import { joinSteamderOpts, leaveSteamderOpts } from '../options/steamder.option';

export default async function steamderRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    // Route to join a steamder
    fastify.route(joinSteamderOpts); // :PATCH   /steamder/:id

    // Route to leave a steamder
    fastify.route(leaveSteamderOpts); // :DELETE  /steamder/:id
  });
}
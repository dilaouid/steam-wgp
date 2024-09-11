import { FastifyInstance } from 'fastify';
import { joinSteamderOpts } from '../options/steamder.option';

export default async function steamderRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    // Route to join a steamder
    fastify.route(joinSteamderOpts); // :PATCH   /steamder/:id
  });
}
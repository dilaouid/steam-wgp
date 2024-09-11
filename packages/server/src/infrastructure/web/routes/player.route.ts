import { FastifyInstance } from 'fastify';
import { deleteUserOpts } from '../options/player.option';

export default async function playerRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    // Route to delete a user account after authentication
    fastify.route(deleteUserOpts); // :DELETE /players
  });
}
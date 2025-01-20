/* eslint-disable no-multi-spaces */
import { FastifyInstance } from 'fastify';
import { getLibraryOpts, updateHiddenGamesOpts } from '@options/library';

export default async function playerRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.route(getLibraryOpts);          // :GET     /
    fastify.route(updateHiddenGamesOpts);   // :PATCH   /
  });
}
/* eslint-disable no-multi-spaces */
import { FastifyInstance } from 'fastify';
import { deleteUserOpts, getSteamLibraryOpts } from "@options/player"

export default async function playerRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.route(deleteUserOpts);      // :DELETE  /players
    fastify.route(getSteamLibraryOpts); // :GET     /library-checker
  });
}
/* eslint-disable no-multi-spaces */
import { FastifyInstance } from 'fastify';
import {
  joinSteamderOpts,
  kickFromSteamderOpts,
  leaveSteamderOpts,
  countSteamdersOpts,
  getSteamderWithPlayersOpts,
  getSteamdersOpts
} from "../options/steamder.option";

export default async function steamderRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify: FastifyInstance) {
    fastify.route(joinSteamderOpts);            // :PATCH   /steamder/:id
    fastify.route(leaveSteamderOpts);           // :DELETE  /steamder/:id
    fastify.route(kickFromSteamderOpts);        // :DELETE  /steamder/:steamderId/kick/:playerId
    fastify.route(getSteamdersOpts);            // :GET     /steamder
    fastify.route(countSteamdersOpts);          // :GET     /steamder/count
    fastify.route(getSteamderWithPlayersOpts);  // :GET     /steamder/:id
  });
}
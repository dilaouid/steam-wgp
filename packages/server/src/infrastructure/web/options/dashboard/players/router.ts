/* eslint-disable no-multi-spaces */
import { FastifyInstance } from "fastify";
import {
  getPlayerOpts,
  getPlayersOpts,
  updatePlayerOpts,
  deletePlayerOpts
} from "@options/dashboard";

/**
 * The router for the dashboard players management.
 * @param fastify - The Fastify instance.
 */
export default async function dashboardPlayersRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.route(getPlayersOpts);      // :GET     /dashboard/players
    fastify.route(getPlayerOpts);       // :GET     /dashboard/players/:playerId
    fastify.route(updatePlayerOpts);    // :PUT     /dashboard/players/:playerId
    fastify.route(deletePlayerOpts);    // :DELETE  /dashboard/players/:playerId
  });
}

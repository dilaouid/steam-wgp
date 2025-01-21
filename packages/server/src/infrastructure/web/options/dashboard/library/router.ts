/* eslint-disable no-multi-spaces */
import { FastifyInstance } from "fastify";
import {
  addGameToLibraryOpts,
  deleteGameFromLibraryOpts,
  updateLibraryOpts,
  refreshSteamLibraryOpts,
} from "@options/dashboard";

/**
 * The router for the dashboard libraries management.
 * @param fastify - The Fastify instance.
 */
export default async function dashboardLibrariesRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.route(addGameToLibraryOpts);        // :POST    /dashboard/library/:playerId
    fastify.route(deleteGameFromLibraryOpts);   // :DELETE  /dashboard/library/:playerId/:gameId
    fastify.route(refreshSteamLibraryOpts);     // :PUT     /dashboard/library/refresh/:playerId
    fastify.route(updateLibraryOpts);           // :PUT     /dashboard/library/:playerId
  });
}

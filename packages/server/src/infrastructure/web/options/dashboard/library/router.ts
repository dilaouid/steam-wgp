/* eslint-disable no-multi-spaces */
import { FastifyInstance } from "fastify";
import {
  dashboardLibraryOpts
} from "@options/dashboard";

/**
 * The router for the dashboard libraries management.
 * @param fastify - The Fastify instance.
 */
export default async function dashboardLibrariesRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.route(dashboardLibraryOpts.get);          // :GET     /dashboard/library/:playerId
    fastify.route(dashboardLibraryOpts.addGame);      // :POST    /dashboard/library/:playerId
    fastify.route(dashboardLibraryOpts.deleteGame);   // :DELETE  /dashboard/library/:playerId/:gameId
    fastify.route(dashboardLibraryOpts.refreshSteam); // :PUT     /dashboard/library/refresh/:playerId
    fastify.route(dashboardLibraryOpts.update);       // :PUT     /dashboard/library/:playerId
  });
}

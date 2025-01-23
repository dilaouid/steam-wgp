/* eslint-disable no-multi-spaces */
import { FastifyInstance } from "fastify";
import {
  dashboardSteamderOpts
} from "@options/dashboard";

/**
 * The router for the dashboard steamders management.
 * @param fastify - The Fastify instance.
 */
export default async function dashboardSteamdersRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    // Create a steamder
    fastify.route(dashboardSteamderOpts.list);    // :GET     /dashboard/steamders
    // Get a steamder
    fastify.route(dashboardSteamderOpts.get);     // :GET     /dashboard/steamders/:id
    // Delete a steamder
    fastify.route(dashboardSteamderOpts.delete);  // :DELETE  /dashboard/steamders/:id
    // Kick a player from a steamder
    fastify.route(dashboardSteamderOpts.kick);    // :DELETE  /dashboard/steamders/:id/kick/:playerId
    // Update a steamder
    fastify.route(dashboardSteamderOpts.update);  // :PUT     /dashboard/steamders/:id
    // Promote a player to admin
    fastify.route(dashboardSteamderOpts.promote); // :PUT     /dashboard/steamders/:id/promote/:playerId
  });
}

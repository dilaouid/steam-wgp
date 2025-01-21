/* eslint-disable no-multi-spaces */
import { FastifyInstance } from "fastify";
import {
  deleteSteamderOpts,
  getSteamderOpts,
  getAllSteamdersOpts,
  updateSteamderOpts,
  kickSteamderOpts
} from "@options/dashboard";

/**
 * The router for the dashboard steamders management.
 * @param fastify - The Fastify instance.
 */
export default async function dashboardSteamdersRouter(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.route(getAllSteamdersOpts); // :GET     /dashboard/steamders                    (Get all steamders)
    fastify.route(getSteamderOpts);     // :GET     /dashboard/steamders/:id                (Get a steamder)
    fastify.route(deleteSteamderOpts);  // :DELETE  /dashboard/steamders/:id                (Delete a steamder)
    fastify.route(kickSteamderOpts);    // :DELETE  /dashboard/steamders/:id/kick/:playerId (Kick a player from a steamder)
    fastify.route(updateSteamderOpts);  // :PUT     /dashboard/steamders/:id                (Update a steamder)
  });
}

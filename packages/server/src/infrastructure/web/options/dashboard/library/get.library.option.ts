import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { libraryController } from "@controllers/dashboard/library.controller";

/**
 * Options for getting a player's library.
 * Route: GET - /library/:playerId
 * @example fastify.route(updateLibraryOpts);
 */
export const getLibraryDashboardOpts = {
  method: "GET" as HTTPMethods,
  url: "/:playerId",
  handler: libraryController.getPlayer,
  preValidation: [isAdmin],
  schema: {
    params: {
      type: "object",
      required: ["playerId"],
      properties: {
        playerId: { type: "string" },
      },
    }
  },
};

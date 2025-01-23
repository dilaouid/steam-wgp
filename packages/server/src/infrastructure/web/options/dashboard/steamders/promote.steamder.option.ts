import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { steamderController } from "@controllers/dashboard/steamder.controller";

/**
 * Options for promoting a player to admin in a steamder.
 * Route: PUT - /steamders/:steamder_id/promote/:player_id
 * @example fastify.route(promoteSteamderOpts);
 */
export const promoteSteamderOpts = {
  method: "PUT" as HTTPMethods,
  url: "/:steamder_id/promote/:player_id",
  handler: steamderController.promote,
  preValidation: [isAdmin],
  schema: {
    params: {
      type: "object",
      required: ["steamder_id", "player_id"],
      properties: {
        steamder_id: { type: "string" },
        player_id: { type: "string" }
      },
    },
  },
};

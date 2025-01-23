import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { steamderController } from "@controllers/dashboard/steamder.controller";

/**
 * Options for kicking a player from a steamder
 * Route: DELETE - /steamders/:steamder_id/kick/:player_id
 * @example fastify.route(deleteSteamderOpts);
 */
export const kickSteamderOpts = {
  method: "DELETE" as HTTPMethods,
  url: "/:steamder_id/kick/:player_id",
  handler: steamderController.kick,
  preValidation: [isAdmin],
  schema: {
    params: {
      type: "object",
      required: ["steamder_id", "player_id"],
      properties: {
        steamder_id: { type: "string" },
        player_id: { type: "string" },
      },
    }
  },
};

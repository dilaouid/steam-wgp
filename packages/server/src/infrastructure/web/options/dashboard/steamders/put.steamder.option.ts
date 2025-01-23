import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { steamderController } from "@controllers/dashboard/steamder.controller";

/**
 * Options for updating an existing game.
 * Route: PUT - /steamders/:steamder_id
 * @example fastify.route(updateSteamderOpts);
 */
export const updateSteamderOpts = {
  method: "PUT" as HTTPMethods,
  url: "/:steamder_id",
  handler: steamderController.update,
  preValidation: [isAdmin],
  schema: {
    params: {
      type: "object",
      required: ["steamder_id"],
      properties: {
        steamder_id: { type: "string" },
      },
    },
    body: {
      type: "object",
      properties: {
        private_steamder: { type: "boolean" },
        complete: { type: "boolean" },
        selected: { type: "integer" },
        display_all_games: { type: "boolean" },
        name: { type: "string" }
      },
    },
  },
};

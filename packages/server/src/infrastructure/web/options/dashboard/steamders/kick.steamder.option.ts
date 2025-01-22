import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for deleting a Steamder.
 * Route: DELETE - /steamders/:id/kick/:playerId
 * @example fastify.route(deleteSteamderOpts);
 */
export const kickSteamderOpts = {
  method: "DELETE" as HTTPMethods,
  url: "/:id/kick/:playerId",
  handler: () => {},
  preValidation: [isAdmin],
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
        playerId: { type: "string" },
      },
    }
  },
};

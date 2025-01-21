import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for refreshing player's library from the Steam API.
 * Route: PUT - /library/refresh/:playerId
 * @example fastify.route(refreshSteamLibraryOpts);
 */
export const refreshSteamLibraryOpts = {
  method: "PUT" as HTTPMethods,
  url: "/refresh/:playerId",
  handler: () => {},
  preValidation: [isAdmin],
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    }
  },
};

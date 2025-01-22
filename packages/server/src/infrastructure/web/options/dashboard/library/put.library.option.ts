import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for updating a player's library.
 * Route: PUT - /library/:playerId
 * @example fastify.route(updateLibraryOpts);
 */
export const updateLibraryOpts = {
  method: "PUT" as HTTPMethods,
  url: "/:player_id",
  handler: () => {},
  preValidation: [isAdmin],
  schema: {
    params: {
      type: "object",
      required: ["player_id"],
      properties: {
        player_id: { type: "string" },
      },
    },
    body: {
      type: "object",
      required: ["games"],
      properties: {
        games: {
          type: "array",
          items: { type: "number" },
        },
      },
    },
  },
};

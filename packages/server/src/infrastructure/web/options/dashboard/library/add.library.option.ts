import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for adding a game to a player's library.
 * Route: POST - /library/:playerId
 * @example fastify.route(addGameToLibraryOpts);
 */
export const addGameToLibraryOpts = {
  method: "POST" as HTTPMethods,
  url: "/:playerId",
  handler: () => {},
  preValidation: [isAdmin],
  schema: {
    params: {
      type: "object",
      required: ["playerId"],
      properties: {
        playerId: { type: "string" },
      },
    },
    body: {
      type: "object",
      required: ["game_id", "hidden"],
      properties: {
        hidden: { type: "boolean" },
        game_id: { type: "integer" },
      },
    },
  },
};

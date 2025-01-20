import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for adding a game to a player's library.
 * Route: POST - /library/:playerId
 * @example fastify.route(addGameToLibraryOpts);
 */
export const addGameToLibraryOpts = {
  method: "POST" as HTTPMethods,
  url: "/library/:playerId",
  handler: () => {},
  preValidation: [isAdmin],
  schema: {
    param: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
    body: {
      type: "object",
      properties: {
        hidden: { type: "boolean" },
        game_id: { type: "int" },
      },
    },
  },
};

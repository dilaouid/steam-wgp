import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for deleting a game to a player's library.
 * Route: DELETE - /library/:playerId/:gameId
 * @example fastify.route(deleteGameFromLibraryOpts);
 */
export const deleteGameFromLibraryOpts = {
  method: "DELETE" as HTTPMethods,
  url: "/library/:playerId/:gameId",
  handler: () => {},
  preValidation: [isAdmin],
  schema: {
    param: {
      type: "object",
      required: ["id"],
      properties: {
        playerId: { type: "string" },
        gameId: { type: "int" }
      },
    }
  },
};

import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { libraryController } from "@controllers/dashboard/library.controller";

/**
 * Options for deleting a game to a player's library.
 * Route: DELETE - /library/:playerId/:gameId
 * @example fastify.route(deleteGameFromLibraryOpts);
 */
export const deleteGameFromLibraryOpts = {
  method: "DELETE" as HTTPMethods,
  url: "/:playerId/:gameId",
  handler: libraryController.deleteGame,
  preValidation: [isAdmin],
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        playerId: { type: "string" },
        gameId: { type: "string" }
      },
    }
  },
};

import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { libraryController } from "@controllers/dashboard/library.controller";

/**
 * Options for adding a game to a player's library.
 * Route: POST - /library/:playerId
 * @example fastify.route(addGameToLibraryOpts);
 */
export const addGameToLibraryOpts = {
  method: "POST" as HTTPMethods,
  url: "/:player_id",
  handler: libraryController.addGame,
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
      required: ["game_id", "hidden"],
      properties: {
        hidden: { type: "boolean" },
        game_id: { type: "integer" },
      },
    },
  },
};

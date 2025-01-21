import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { gamesController } from "@controllers/dashboard/game.controller";

/**
 * Options for creating a game manually.
 * Route: POST - /games
 * @example fastify.route(createGameOpts);
 */
export const createGameOpts = {
  method: "POST" as HTTPMethods,
  url: "/",
  handler: gamesController.createGame,
  preValidation: [isAdmin],
  schema: {
    body: {
      type: "object",
      required: ["id", "is_selectable"],
      properties: {
        id: { type: "integer" },
        is_selectable: { type: "boolean" }
      }
    }
  },
};

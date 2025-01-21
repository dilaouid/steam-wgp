import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { gamesController } from "@controllers/dashboard/game.controller";

/**
 * Options for updating an existing game.
 * Route: PUT - /games/:id
 * @example fastify.route(updateGameOpts);
 */
export const updateGameOpts = {
  method: "PUT" as HTTPMethods,
  url: "/:id",
  handler: gamesController.updateGame,
  preValidation: [isAdmin],
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
    body: {
      type: "object",
      required: ["is_selectable"],
      properties: {
        is_selectable: { type: "boolean" },
      },
    },
  },
};

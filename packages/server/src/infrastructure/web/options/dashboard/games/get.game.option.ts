import { HTTPMethods } from "fastify";
import { gamesController } from "@controllers/dashboard/game.controller";
import { isAdmin } from "@auth/middlewares";

export const getGameOpts = {
  method: "GET" as HTTPMethods,
  url: "/:id",
  handler: gamesController.getGame,
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "string" }
      },
    },
  },
  preValidation: [isAdmin],
};

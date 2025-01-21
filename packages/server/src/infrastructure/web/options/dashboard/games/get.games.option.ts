import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { gamesController } from "@controllers/dashboard/game.controller";

export const getGamesOpts = {
  method: "GET" as HTTPMethods,
  url: "/",
  handler: gamesController.getGames,
  schema: {
    querystring: {
      type: "object",
      properties: {
        offset: {
          type: "integer",
          minimum: 0,
          maximum: 1000
        },
        limit: {
          type: "integer",
          minimum: 1,
          maximum: 100
        },
        onlyIsSelectable: { type: "boolean" },
        onlyNotSelectable: { type: "boolean" },
        search: { type: "string" },
        sort: { type: "string", enum: ["asc", "desc"] },
        order: { type: "string" }
      }
    },
  },
  preValidation: [isAdmin],
};

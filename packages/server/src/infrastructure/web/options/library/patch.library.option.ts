import { HTTPMethods } from "fastify";
import { isAuthenticated } from "@auth/middlewares";
import { updateHiddenGames } from "@controllers/library";

export const updateHiddenGamesOpts = {
  method: "PATCH" as HTTPMethods,
  url: "/",
  handler: updateHiddenGames,
  schema: {
    body: {
      type: "object",
      required: ["games"],
      properties: {
        games: {
          type: "array",
          items: { type: "string" },
        },
      },
    },
  },
  preValidation: [isAuthenticated],
};

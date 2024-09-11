import { HTTPMethods } from "fastify";
import { isAuthenticated } from "../../../auth/mw";

export const getLibraryOpts = {
  method: "GET" as HTTPMethods,
  url: "/",
  handler: getLibrary,
  preValidation: [isAuthenticated],
};

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

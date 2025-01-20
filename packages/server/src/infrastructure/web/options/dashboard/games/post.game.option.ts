import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for creating a game manually.
 * Route: POST - /games
 * @example fastify.route(createGame);
 */
export const createGame = {
  method: "POST" as HTTPMethods,
  url: "/games",
  handler: () => {},
  preValidation: [isAdmin],
  schema: {
    body: {
      type: "object",
      properties: {
        id: {
          type: "bigint",
        },
        selectable: { type: "boolean" },
      },
    },
  },
};

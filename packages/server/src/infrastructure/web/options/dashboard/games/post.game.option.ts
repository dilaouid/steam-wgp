import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for creating a game manually.
 * Route: POST - /games
 * @example fastify.route(createGameOpts);
 */
export const createGameOpts = {
  method: "POST" as HTTPMethods,
  url: "/",
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

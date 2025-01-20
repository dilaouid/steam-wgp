import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for updating an existing game.
 * Route: PUT - /games/:id
 * @example fastify.route(updateGame);
 */
export const updateGame = {
  method: "PUT" as HTTPMethods,
  url: "/games/:id",
  handler: () => {},
  preValidation: [isAdmin],
  schema: {
    param: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
    body: {
      type: "object",
      properties: {
        selectable: { type: "boolean" },
      },
    },
  },
};

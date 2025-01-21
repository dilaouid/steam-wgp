import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for updating an existing game.
 * Route: PUT - /games/:id
 * @example fastify.route(updateGameOpts);
 */
export const updateGameOpts = {
  method: "PUT" as HTTPMethods,
  url: "/:id",
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

import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for updating a player's library.
 * Route: PUT - /library/:playerId
 * @example fastify.route(updateLibraryOpts);
 */
export const updateLibraryOpts = {
  method: "PUT" as HTTPMethods,
  url: "/:playerId",
  handler: () => {},
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
      properties: {
        hidden: { type: "boolean" },
        game_id: { type: "integer" },
      },
    },
  },
};

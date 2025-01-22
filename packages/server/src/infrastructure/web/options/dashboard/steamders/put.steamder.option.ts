import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for updating an existing game.
 * Route: PUT - /steamders/:id
 * @example fastify.route(updateSteamderOpts);
 */
export const updateSteamderOpts = {
  method: "PUT" as HTTPMethods,
  url: "/:id",
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
        selectable: { type: "boolean" },
        adminId: { type: "string" },
        started: { type: "boolean" },
        private: { type: "boolean" },
        complete: { type: "boolean" },
        selected: { type: "integer" },
        displayAllGames: { type: "boolean" },
        commonGames: { type: "integer" },
        allGames: { type: "integer" },
        name: { type: "string" }
      },
    },
  },
};

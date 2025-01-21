import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for updating an existing game.
 * Route: PUT - /steamders/:id
 * @example fastify.route(updateSteamderOpts);
 */
export const updateSteamderOpts = {
  method: "PUT" as HTTPMethods,
  url: "/steamders/:id",
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
        selected: { type: "number" },
        displayAllGames: { type: "boolean" },
        commonGames: { type: "number" },
        allGames: { type: "number" },
        name: { type: "string" }
      },
    },
  },
};

import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for deleting a Steamder.
 * Route: DELETE - /steamders/:id
 * @example fastify.route(deleteSteamderOpts);
 */
export const deleteSteamderOpts = {
  method: "DELETE" as HTTPMethods,
  url: "/steamders/:id",
  handler: () => {},
  preValidation: [isAdmin],
  schema: {
    param: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    }
  },
};

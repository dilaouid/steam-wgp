import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for deleting a Steamder.
 * Route: DELETE - /steamders/:id
 * @example fastify.route(deleteSteamderOpts);
 */
export const deleteSteamderOpts = {
  method: "DELETE" as HTTPMethods,
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
    }
  },
};

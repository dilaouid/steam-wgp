import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { steamderController } from "@controllers/dashboard/steamder.controller";

/**
 * Options for deleting a Steamder.
 * Route: DELETE - /steamders/:id
 * @example fastify.route(deleteSteamderOpts);
 */
export const deleteSteamderOpts = {
  method: "DELETE" as HTTPMethods,
  url: "/:id",
  handler: steamderController.delete,
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

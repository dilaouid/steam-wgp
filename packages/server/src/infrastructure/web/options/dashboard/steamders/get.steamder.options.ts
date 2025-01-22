import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";
import { steamderController } from "@controllers/dashboard/steamder.controller";

/**
 * Options for getting informations about a Steamder.
 * Route: GET - /steamders/:steamder_id
 * @example fastify.route(getSteamderOpts);
 */
export const getSteamderOpts = {
  method: "GET" as HTTPMethods,
  url: "/:steamder_id",
  handler: steamderController.get,
  schema: {
    params: {
      type: "object",
      properties: {
        steamder_id: { type: "string" },
      },
    },
  },
  preValidation: [isAdmin],
};

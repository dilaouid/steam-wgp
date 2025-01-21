import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for getting informations about a Steamder.
 * Route: GET - /steamders/:id
 * @example fastify.route(getSteamderOpts);
 */
export const getSteamderOpts = {
  method: "GET" as HTTPMethods,
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
  },
};

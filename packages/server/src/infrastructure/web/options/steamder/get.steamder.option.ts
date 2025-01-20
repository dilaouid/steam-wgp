import { HTTPMethods } from "fastify";
import { getSteamders } from "@controllers/steamder";
import { allowUnauthenticated } from "@auth/middlewares";

/**
 * Options for retrieving steamders.
 * Route: GET - /search
 * @example fastify.route(getSteamdersOpts);
 */
export const getSteamdersOpts = {
  method: "GET" as HTTPMethods,
  url: "/search",
  handler: getSteamders,
  preValidation: [allowUnauthenticated],
  schema: {
    querystring: {
      type: "object",
      required: ["offset", "limit"],
      properties: {
        offset: { type: "number" },
        limit: { type: "number" },
      },
    },
  },
};

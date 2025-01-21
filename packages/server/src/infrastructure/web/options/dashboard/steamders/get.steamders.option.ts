import { HTTPMethods } from "fastify";
import { isAdmin } from "@auth/middlewares";

/**
 * Options for listing all the Steamders existing.
 * Route: GET - /steamders
 * @example fastify.route(getAllSteamdersOpts);
 */
export const getAllSteamdersOpts = {
  method: "GET" as HTTPMethods,
  url: "/steamders",
  handler: () => {},
  schema: {
    querystring: {
      type: "object",
      properties: {
        page: { type: "integer" },
        limit: { type: "integer" },
        search: { type: "string" },
        sort: { type: "string" },
        order: { type: "string" },
      },
    },
  },
  preValidation: [isAdmin]
};

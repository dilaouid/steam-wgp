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
  preValidation: [isAdmin],
  schema: {
    query: {
      type: "object",
      properties: {
        page: { type: "number" },
        limit: { type: "number" },
        search: { type: "string" },
        sort: { type: "string" },
        order: { type: "string" },
      },
    },
  },
};

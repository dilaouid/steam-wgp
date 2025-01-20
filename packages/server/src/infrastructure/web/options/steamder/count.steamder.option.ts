import { HTTPMethods } from "fastify";
import { countSteamders } from "@controllers/steamder";

/**
 * Options for counting Steamders.
 * Route: GET - /count
 * @example fastify.route(countSteamdersOpts);
 */
export const countSteamdersOpts = {
  method: "GET" as HTTPMethods,
  url: "/count",
  handler: countSteamders,
};
import { HTTPMethods } from "fastify";
import { allowUnauthenticated, isAuthenticated } from "../../../auth/mw";
import { join } from "../controllers/steamder.controller";

/**
 * Options for creating a waitlist.
 * Route: POST - /
 * @example fastify.route(createWaitlistOpts);
 */
export const createSteamderOpts = {
  method: "POST" as HTTPMethods,
  url: "/",
  handler: createWaitlist,
  preValidation: [isAuthenticated],
  body: {
    type: "object",
    required: ["private"],
    properties: {
      name: {
        type: "string",
        default: "Steamder",
        minLength: 3,
        maxLength: 40,
      },
      isPrivate: { type: "boolean" },
    },
  },
};

/**
 * Options for retrieving waitlists.
 * Route: GET - /search
 * @example fastify.route(getWaitlistsOpts);
 */
export const getSteamdersOpts = {
  method: "GET" as HTTPMethods,
  url: "/search",
  handler: getWaitlists,
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

export const countSteamdersOpts = {
  method: "GET" as HTTPMethods,
  url: "/count",
  handler: countWaitlists,
};

export const joinSteamderOpts = {
  method: 'PATCH' as HTTPMethods,
  url: '/:id',
  handler: join,
  preValidation: [isAuthenticated],
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' }
      }
    }
  }
};
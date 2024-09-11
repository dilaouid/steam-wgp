import { HTTPMethods } from "fastify";
import { allowUnauthenticated, isAuthenticated } from "../../../auth/mw";
import { join, leave, kickSteamder } from "../controllers/steamder";

/**
 * Options for creating a steamder.
 * Route: POST - /
 * @example fastify.route(createSteamderOpts);
 */
export const createSteamderOpts = {
  method: "POST" as HTTPMethods,
  url: "/",
  handler: createSteamder,
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

export const countSteamdersOpts = {
  method: "GET" as HTTPMethods,
  url: "/count",
  handler: countSteamders,
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

export const leaveSteamderOpts = {
  method: 'DELETE' as HTTPMethods,
  url: '/:id',
  handler: leave,
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

export const kickFromSteamderOpts = {
  method: 'DELETE' as HTTPMethods,
  url: '/:steamderId/kick/:playerId',
  handler: kickSteamder,
  schema: {
    params: {
      type: 'object',
      required: ['steamderId', 'playerId'],
      properties: {
        steamderId: { type: 'string' },
        playerid: { type: 'string' }
      }
    }
  },
  preValidation: [isAuthenticated]
};
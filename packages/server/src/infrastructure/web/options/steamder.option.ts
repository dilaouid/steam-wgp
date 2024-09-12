import { HTTPMethods } from "fastify";
import { allowUnauthenticated, isAuthenticated } from "../../../auth/mw";
import { join, leave, kickSteamder, countSteamders, getSteamderWithPlayers, getSteamders, newSteamder } from "../controllers/steamder";

/**
 * Options for creating a steamder.
 * Route: POST - /
 * @example fastify.route(createSteamderOpts);
 */
export const createSteamderOpts = {
  method: "POST" as HTTPMethods,
  url: "/",
  handler: newSteamder,
  preValidation: [isAuthenticated],
  body: {
    type: "object",
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

/**
 * Options for getting Steamder with players.
 * Route: GET - /:id
 * @example fastify.route(getSteamderWithPlayersOpts);
 */
export const getSteamderWithPlayersOpts = {
  method: 'GET' as HTTPMethods,
  url: '/:id',
  handler: getSteamderWithPlayers,
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

/**
 * Options for joining Steamder.
 * Route: PATCH - /:id
 * @example fastify.route(joinSteamderOpts);
 */
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

/**
 * Options for leaving Steamder.
 * Route: DELETE - /:id
 * @example fastify.route(leaveSteamderOpts);
 */
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

/**
 * Options for kicking a player from Steamder.
 * Route: DELETE - /:steamderId/kick/:playerId
 * @example fastify.route(kickFromSteamderOpts);
 */
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
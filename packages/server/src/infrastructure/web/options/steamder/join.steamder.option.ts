import { HTTPMethods } from "fastify";
import { isAuthenticated } from "@auth/middlewares";
import { join } from "@controllers/steamder";

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
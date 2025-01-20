import { HTTPMethods } from "fastify";
import { isAuthenticated } from "@auth/middlewares";
import { leave } from "@controllers/steamder";

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
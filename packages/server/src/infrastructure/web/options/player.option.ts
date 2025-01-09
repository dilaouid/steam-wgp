import { HTTPMethods } from "fastify";
import { isAuthenticated } from "../../../auth/mw";
import { deleteAccount } from "@controllers/index";
import { loadLibrary } from "@controllers/player/loginLoad";

/**
 * Options for deleting a user, including the method, URL, handler, and preValidation.
 * Must be used in a router. Use the deleteAccount function from the controllers.
 * Route: DELETE - /
 * @example fastify.route(deleteUserOpts);
 */
export const deleteUserOpts = {
  method: "DELETE" as HTTPMethods,
  url: "/",
  handler: deleteAccount,
  preValidation: [isAuthenticated]
};

export const getSteamLibraryOpts = {
  method: 'GET' as HTTPMethods,
  url: '/library-checker',
  handler: loadLibrary,
  schema : {
    querystring: {
      type: "object",
      properties: {
        token: { type: 'string' }
      }
    }
  }
};
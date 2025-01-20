import { HTTPMethods } from "fastify";
import { isAuthenticated } from "@auth/middlewares";
import { deleteAccount } from "@controllers/index";

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
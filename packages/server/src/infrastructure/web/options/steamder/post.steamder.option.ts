import { HTTPMethods } from "fastify";
import { isAuthenticated } from "@auth/middlewares";
import { newSteamder } from "@controllers/steamder";

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

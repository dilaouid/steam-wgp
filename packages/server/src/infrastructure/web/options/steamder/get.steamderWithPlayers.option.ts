import { HTTPMethods } from "fastify";
import { isAuthenticated } from "@auth/middlewares";
import { getSteamderWithPlayers } from "@controllers/steamder";

/**
 * Options for getting Steamder with players.
 * Route: GET - /:id
 * @example fastify.route(getSteamderWithPlayersOpts);
 */
export const getSteamderWithPlayersOpts = {
  method: "GET" as HTTPMethods,
  url: "/:id",
  handler: getSteamderWithPlayers,
  preValidation: [isAuthenticated],
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
      },
    },
  },
};

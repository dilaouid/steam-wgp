import { HTTPMethods } from "fastify";
import { isAuthenticated } from "@auth/middlewares";
import { kickSteamder } from "@controllers/steamder";

/**
 * Options for kicking a player from Steamder.
 * Route: DELETE - /:steamderId/kick/:playerId
 * @example fastify.route(kickFromSteamderOpts);
 */
export const kickFromSteamderOpts = {
  method: "DELETE" as HTTPMethods,
  url: "/:steamderId/kick/:playerId",
  handler: kickSteamder,
  schema: {
    params: {
      type: "object",
      required: ["steamderId", "playerId"],
      properties: {
        steamderId: { type: "string" },
        playerid: { type: "string" },
      },
    },
  },
  preValidation: [isAuthenticated],
};

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { APIResponse } from "../../../../utils/response";
import { updateGameLists } from "../../../../domain/services/steamderService";
import { Player } from "../../../../models/Players";
import { canAdminKickFromSteamder, leaveSteamder } from "../../../repositories";

interface Parameters {
    steamderId: string;
    playerId: string;
}

/**
 * Controller - Kicks an user from a steamder.
 *
 * @param request - The Fastify request object.
 * @param response - The Fastify response object.
 * @returns A promise that resolves to the result of kicking the user from the steamder.
 */
export const kickSteamder = async (request: FastifyRequest<{ Params: Parameters }>, response: FastifyReply) => {
  const { steamderId, playerId } = (request.params as Parameters);
  const user = request.user as Player & { username: string }

  if (!steamderId || !playerId) {
    return APIResponse(response, null, 'invalid_parameters', 400);
  }

  const fastify = request.server as FastifyInstance;
  try {
    // Check if the authenticated user is an admin of the steamder so they can kick the player
    const inSteamder = await canAdminKickFromSteamder(fastify, steamderId, BigInt(playerId), user.id);
    if (inSteamder.length === 0)
      return APIResponse(response, null, 'not_room_admin', 401);

    // if the authenticated user
    await leaveSteamder(fastify, BigInt(playerId), steamderId);
    await updateGameLists(fastify, steamderId);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(response, null, 'internal_server_error', 500);
  }
};
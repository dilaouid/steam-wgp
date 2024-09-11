import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { APIResponse } from "../../../../utils/response";
import { leaveAndUpdateSteamder } from "../../../../domain/services/steamderService";
import { Player } from "../../../../models/Players";


/**
 * Leave the steamder room and update the steamder (the games list).
 *
 * @param request - The Fastify request object.
 * @param response - The Fastify reply object.
 * @returns A promise that resolves to the API response.
 */
export const leave = async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
  const { id } = request.params;
  const user = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  try {
    const { status, message } = await leaveAndUpdateSteamder(fastify, id, BigInt(user.id));
    return APIResponse(response, null, message as string, status);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(response, null, 'internal_server_error', 500);
  }
}
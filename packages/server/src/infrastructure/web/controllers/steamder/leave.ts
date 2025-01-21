import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { APIResponse, errorResponse } from "@utils/response";
import { leaveAndUpdateSteamder } from "@services/steamderService";
import { Player } from "@entities";


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
    return APIResponse(response, { message: message as string, statusCode: status });
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(response, errorResponse(err));
  }
}
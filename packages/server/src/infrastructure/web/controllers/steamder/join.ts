import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { APIResponse } from "../../../../utils/response";
import { formatSteamderInfos, getSteamderInfos, isSteamderAvailable } from "../../../../domain/services/steamderService";
import { Player } from "../../../../domain/entities";
import { isUserInSteamder } from "../../../../domain/services/steamderPlayerService";
import { joinSteamder } from "../../../repositories";

/**
 * Controller - Joins a steamder (if possible).
 *
 * @param request - The Fastify request object.
 * @param response - The Fastify response object.
 * @returns A promise that resolves to the result of joining the steamder.
 */
export const join = async (request: FastifyRequest<{ Params: { id: string } }>, response: FastifyReply) => {
  const { id } = request.params;
  const fastify = request.server as FastifyInstance;
  const user = request.user as Player & { username: string }
  try {
    const isAvailable = await isSteamderAvailable(fastify, id);
    if (!isAvailable.success)
      return APIResponse(response, null, isAvailable.message as string, isAvailable.status);

    const inSteamder = await isUserInSteamder(fastify, user.id);
    if (inSteamder) {
      return APIResponse(response, null, 'already_in_room', 400);
    }

    await joinSteamder(fastify, user.id, id);
    const steamderInfos = await getSteamderInfos(fastify, id);

    // Format the steamder infos to return only the necessary data and with the correct format
    const steamder = formatSteamderInfos(steamderInfos);

    return APIResponse(response, steamder, 'joined_the_room', 200);
  } catch (err) {
    fastify.log.error('------- Error in join Controller -------');
    fastify.log.error(err);
    return APIResponse(response, null, 'internal_server_error', 500);
  }
};
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { APIResponse, errorResponse } from "@utils/response";
import { formatSteamderInfos, getSteamderInfos, isSteamderAvailable } from "@services/steamderService";
import { Player } from "@entities";
import { isUserInSteamder } from "@services/steamderPlayerService";
import { joinSteamder } from "@repositories";

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
      return APIResponse(response, { message: isAvailable.message as string, statusCode: isAvailable.status });

    const inSteamder = await isUserInSteamder(fastify, user.id);
    if (inSteamder) {
      return APIResponse(response, { message: "already_in_room", statusCode: 400 });
    }

    await joinSteamder(fastify, user.id, id);
    const steamderInfos = await getSteamderInfos(fastify, id);

    // Format the steamder infos to return only the necessary data and with the correct format
    const steamder = formatSteamderInfos(steamderInfos);

    return APIResponse(response, { data: steamder, message: "joined_the_room", statusCode: 200 });
  } catch (err) {
    fastify.log.error('------- Error in join Controller -------');
    fastify.log.error(err);
    return APIResponse(response, errorResponse(err));
  }
};
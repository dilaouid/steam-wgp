import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";

import { SteamWGPStats } from "../../../../domain/services/globalService";
import { APIResponse } from "../../../../utils/response";

/**
 * Retrieves the statistics from SteamWGP and returns an API response.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns The API response containing the statistics.
 */
export const getStats = async (request: FastifyRequest, reply: FastifyReply) => {
  const fastify = request.server as FastifyInstance;
  try {
    const stats = await SteamWGPStats(fastify);
    return APIResponse(reply, stats, "OK", 200);
  } catch (err: any) {
    fastify.log.error(err);
    return APIResponse(reply, null, err.message, 500);
  }
};

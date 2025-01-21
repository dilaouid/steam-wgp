import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { paginateSteamder } from "@services/steamderService";

import { APIResponse, errorResponse } from "@utils/response";
import { paginateSchema } from "@validations/steamderValidation";

interface Parameters {
  offset: number;
  limit: number;
}

/**
 * Retrieves steamders based on the provided offset and limit.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @query offset - The offset for pagination (min: 0, max: 1000).
 * @query limit - The maximum number of steamders to retrieve (min: 1, max: 100).
 * @returns The API response containing the steamders or an error message.
 */
export const getSteamders = async (request: FastifyRequest<{ Querystring: Parameters }>, reply: FastifyReply) => {
  const fastify = request.server as FastifyInstance;
  const { offset, limit } = request.query;

  try {
    paginateSchema.parse({ offset, limit });
  } catch (e: any) {
    fastify.log.error(e.errors);
    return APIResponse(reply, { message: "invalid_params", statusCode: 400 });
  }

  try {
    const steamders = await paginateSteamder(fastify, offset, limit);
    return APIResponse(reply, { data: steamders, statusCode: 200, message: "OK" });
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, errorResponse(err));
  }
};

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { paginateSteamder } from "../../../../domain/services/steamderService";
import { paginateSchema } from "@shared/zod/schemas/steamderSchema";
import { APIResponse } from "../../../../utils/response";

interface Parameters {
  offset: number;
  limit: number;
}

/**
 * Retrieves waitlists based on the provided offset and limit.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @query offset - The offset for pagination (min: 0, max: 1000).
 * @query limit - The maximum number of waitlists to retrieve (min: 1, max: 100).
 * @returns The API response containing the waitlists or an error message.
 */
export const getSteamders = (request: FastifyRequest<{ Params: Parameters }>, reply: FastifyReply) => {
  const fastify = request.server as FastifyInstance;
  const { offset, limit } = request.params;

  try {
    paginateSchema.parse({ offset, limit });
  } catch (e: any) {
    fastify.log.error(e.errors);
    return APIResponse(reply, e.errors, "invalid_params", 400);
  }

  try {
    const waitlists = paginateSteamder(fastify, offset, limit);
    return APIResponse(reply, waitlists, "OK", 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, err as string, 500);
  }
};

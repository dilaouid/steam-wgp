import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse, errorResponse } from "@utils/response";

import { paginateGames } from "@services/game.service";
import { paginateGamesSchema } from "@validations/dashboard";

/**
 * Get list of all games with pagination.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} response - The Fastify reply object.
 * @returns {Promise<void>} - A promise that resolves when the account is deleted.
 */
export const getPaginateGames = async (request: FastifyRequest, response: FastifyReply) => {
  const fastify = request.server as FastifyInstance;
  try {
    const { offset, limit, onlyIsSelectable, onlyNotSelectable } = paginateGamesSchema.parse(request.query);
    const data = await paginateGames(fastify, offset, limit, { onlyIsSelectable, onlyNotSelectable });
    return APIResponse(response, { statusCode: 200, data, message: "List of games." });
  } catch (err: any) {
    fastify.log.error(err);
    APIResponse(response, errorResponse(err));
  }
};

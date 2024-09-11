import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse } from "../../../utils/response";
import { Player } from "../../../models/Players";
import { isUserInSteamder } from "../../../domain/services/steamderPlayerService";
import { deletePlayer, deleteUser } from "../../repositories";

/**
 * Deletes a user account.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} response - The Fastify reply object.
 * @returns {Promise<void>} - A promise that resolves when the account is deleted.
 */
export const deleteAccount = async (request: FastifyRequest, response: FastifyReply) => {
  const fastify = request.server as FastifyInstance;
  const { id } = request.user as Player;

  try {
    const inSteamder = await isUserInSteamder(fastify, id);
    if (inSteamder) {
      return APIResponse(response, null, "user_in_steamder_cannot_kick", 400);
    }
    await deletePlayer(fastify, id);
    await deleteUser(fastify, id);
    return APIResponse(response, null, "user_deleted", 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(response, null, "Internal server error", 500);
  }
};

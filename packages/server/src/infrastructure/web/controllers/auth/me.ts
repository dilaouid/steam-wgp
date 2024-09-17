import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse } from "../../../../utils/response";
import { getUserSteamder } from "../../../../domain/services/authService";
import { Player } from "../../../../domain/entities";

/**
 * Retrieves the current user's profile information.
 *
 * @param fastify - The Fastify instance.
 * @returns A Promise that resolves to the user's profile information.
 */
export const getMe = (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.user)
    return APIResponse(reply, null, "logged_in_to_view_profile", 401);
  const user = request.user as Player & { username: string };
  const steamder = await getUserSteamder(fastify, BigInt(user.id));
  return APIResponse(reply, { id: user.id, username: user.username, steamder, avatar_hash: user.avatar_hash }, 'logged_in', 200);
};
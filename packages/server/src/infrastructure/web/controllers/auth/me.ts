import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse } from "@utils//response";
import { getUserSteamder } from "@services/authService";
import { Player } from "@entities";

/**
 * Retrieves the current user's profile information.
 *
 * @param fastify - The Fastify instance.
 * @returns A Promise that resolves to the user's profile information.
 */
export const getMe = (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.user)
    return APIResponse(reply, { message: "logged_in_to_view_profile", statusCode: 401 });
  const user = request.user as Player & { username: string };
  const steamder = await getUserSteamder(fastify, BigInt(user.id));
  return APIResponse(reply, { data: { id: user.id, username: user.username, steamder, avatar_hash: user.avatar_hash }, message: "logged_in", statusCode: 200 });
};
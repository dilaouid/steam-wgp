import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse } from "../../../utils/response";
import { getUserWaitlist, login, logout } from "../../../domain/services/authService";
import { Player } from "../../../models/Players";

/**
 * Handles the steam endpoint.
 *
 * @param request - The FastifyRequest object.
 * @param reply - The FastifyReply object.
 * @returns A Promise that resolves to an API response.
 */
export const steam = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.user)
    return APIResponse(reply, null, "logged_in_to_view_profile", 401);
  return APIResponse(reply, request.user, "logged_in", 200);
};

/**
 * Handles the Steam callback for authentication.
 *
 * @param fastify - The Fastify instance.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A promise that resolves to the result of the login operation.
 */
export const steamCallback = (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  return login(fastify, reply, request);
}

/**
 * Logs out a user.
 *
 * @param fastify - The Fastify instance.
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A Promise that resolves to an API response indicating successful logout.
 */
export const logoutUser = (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  logout(fastify, reply, request);
  return APIResponse(reply, null, 'logged_out', 200);
};

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
  const waitlist = await getUserWaitlist(fastify, BigInt(user.id));
  return APIResponse(reply, { id: user.id, username: user.username, waitlist, avatar_hash: user.avatar_hash }, 'logged_in', 200);
};
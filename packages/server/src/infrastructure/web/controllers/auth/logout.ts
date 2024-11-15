import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse } from "@utils//response";
import { logout } from "@services/AuthService";

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
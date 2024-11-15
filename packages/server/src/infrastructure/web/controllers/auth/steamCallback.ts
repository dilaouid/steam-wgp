import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { login } from "@services/AuthService";

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
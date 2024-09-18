import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";

/**
 * [DEBUG - Works only in development] Retrieves all environment variables.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export const getAllEnvVariables = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const fastify = request.server as FastifyInstance;
  reply.send({ config: fastify.config });
};
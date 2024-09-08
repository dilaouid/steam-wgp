import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";

export async function getAllEnvVariables(request: FastifyRequest, reply: FastifyReply) {
  const fastify = request.server as FastifyInstance;
  reply.send({ config: fastify.config });
}
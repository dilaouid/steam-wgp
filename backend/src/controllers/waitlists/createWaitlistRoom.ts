import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "../../models/Players";
import { insertWaitlist } from "../../models/Waitlists";

export async function createWaitlist(request: FastifyRequest, reply: FastifyReply) {
  const { id } = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  if (!id) return reply.code(401).send({ error: 'Forbidden' });
  try {
    const insert = insertWaitlist(fastify, id);
    if (!insert)
      return reply.code(400).send({ error: 'Bad request' });
    return reply.code(200).send({ message: 'Waitlist created', data: insert });
  } catch (err) {
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "../../models/Players";
import { insertWaitlist } from "../../models/Waitlists";

export async function createWaitlist(request: FastifyRequest, reply: FastifyReply) {
  const { id } = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  if (!id) return reply.code(401).send({ error: 'Forbidden' });
  try {
    const insert = await insertWaitlist(fastify, id);
    if (insert.error)
      return reply.code(400).send(insert);
    return reply.code(200).send(insert);
  } catch (err) {
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
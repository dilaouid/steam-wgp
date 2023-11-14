import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { isAuthenticated } from "../../auth/mw";
import { Player } from "../../models/Players";
import { insertWaitlist } from "../../models/Waitlists";

const options: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: { } // TODO: Add response schema
      }
    }
  },
  preValidation: [ isAuthenticated ]
}

export default async function createWaitlist(fastify: FastifyInstance) {
  fastify.post('/', options, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = (request.user as Player);
    if (!id) return reply.code(401).send({ error: 'Forbidden' });
    try {
      const insert = insertWaitlist(fastify, id);
      if (!insert)
        return reply.code(400).send({ error: 'Bad request' });
      return reply.code(200).send({ message: 'Waitlist created', data: insert });
    } catch (err) {
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "../../models/Players";
import { getWaitlist } from "../../models/Waitlists";
import { isAuthenticated } from "../../auth/mw";

export interface getWaitlistWithPlayersParams {
    id: string;
}

export const getWaitlistWithPlayersOpts = {
  preValidation: [isAuthenticated],
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' }
      }
    }
  }
};

export async function getWaitlistWithPlayers(request: FastifyRequest< { Params: getWaitlistWithPlayersParams } >, reply: FastifyReply) {
  const { id } = request.params;
  const user = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  if (!user.id || !id.trim()) return reply.code(401).send({ error: 'Forbidden' });
  try {
    const waitlist = await getWaitlist(fastify, id.trim(), user.id);
    if (!waitlist)
      return reply.code(400).send({ error: 'Bad request' });
    return reply.code(200).send({ message: 'Waitlist fetched', data: waitlist });
  } catch (err) {
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
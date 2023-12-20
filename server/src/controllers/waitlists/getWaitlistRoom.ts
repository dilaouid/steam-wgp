import { FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { Player } from "../../models/Players";
import { getWaitlist } from "../../models/Waitlists";
import { isAuthenticated } from "../../auth/mw";

export interface getWaitlistWithPlayersParams {
    id: string;
}

export const getWaitlistWithPlayersOpts = {
  method: 'GET' as HTTPMethods,
  url: '/:id',
  handler: getWaitlistWithPlayers,
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

async function getWaitlistWithPlayers(request: FastifyRequest< { Params: getWaitlistWithPlayersParams } >, reply: FastifyReply) {
  const { id } = request.params;
  const fastify = request.server as FastifyInstance;
  const player = request.user as Player;

  if (!id.trim()) return reply.code(401).send({ error: 'Forbidden' });
  try {
    const waitlist = await getWaitlist(fastify, id.trim(), BigInt(player.id));
    if (!waitlist) {
      fastify.log.warn(`Waitlist ${id} not found`);
      return reply.code(404).send({ error: 'Waitlist not found' });
    }
    return reply.code(200).send({ message: 'Waitlist fetched', data: waitlist });
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
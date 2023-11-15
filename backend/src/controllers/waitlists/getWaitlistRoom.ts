import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "../../models/Players";
import { getWaitlist } from "../../models/Waitlists";

export interface getWaitlistWithPlayersParams {
    hash: string;
}

export async function getWaitlistWithPlayers(request: FastifyRequest< { Params: getWaitlistWithPlayersParams } >, reply: FastifyReply) {
  const { hash } = request.params;
  const { id } = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  if (!id || !hash.trim()) return reply.code(401).send({ error: 'Forbidden' });
  try {
    const waitlist = await getWaitlist(fastify, hash.trim(), id);
    if (!waitlist)
      return reply.code(400).send({ error: 'Bad request' });
    return reply.code(200).send({ message: 'Waitlist fetched', data: waitlist });
  } catch (err) {
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
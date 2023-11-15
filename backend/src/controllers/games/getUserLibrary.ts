import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Player } from "../../models/Players";
import { getPlayerLibrary } from "../../models/Libraries";

export interface getUserLibraryParams {
  id: string;
}

// Get the authenticated player's game library (only the games that are selectable)
export async function getUserLibrary(request: FastifyRequest<{ Params: getUserLibraryParams }>, reply: FastifyReply) {
  if (!request.user) {
    reply.code(401).send({ error: 'Forbidden' });
    return;
  }

  const { id } = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  try {
    const library = await getPlayerLibrary(fastify, id);
    return reply.code(200).send(library);
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
import { FastifyReply, RouteShorthandOptions, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { isAuthenticated } from "../../auth/mw";
import { Player } from "../../models/Players";
import { getPlayerLibrary } from "../../models/Libraries";

interface RequestParams {
  id: string;
}

export const options: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: { } // to see according to the model
      }
    },
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      },
      required: ['id']
    }
  },
  preValidation: [ isAuthenticated ]
}

// Get the authenticated player's game library (only the games that are selectable)
export default async function getLibrary(fastify: FastifyInstance) {
  fastify.get< { Params: RequestParams } >('/', options, async (request: FastifyRequest<{ Params: RequestParams }>, reply: FastifyReply) => {

    if (!request.user) {
      reply.code(401).send({ error: 'Forbidden' });
      return;
    }

    const { id } = (request.user as Player);

    try {
      const library = await getPlayerLibrary(fastify, id);
      return reply.code(200).send(library);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}
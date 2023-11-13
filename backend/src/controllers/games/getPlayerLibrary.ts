import { FastifyReply, RouteShorthandOptions, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Libraries, Players } from "../../models";
import { eq } from 'drizzle-orm';

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
  }
}

export default async function getPlayerLibrary(fastify: FastifyInstance) {
  fastify.get< { Params: RequestParams } >('/id', options, async (request: FastifyRequest<{ Params: RequestParams }>, reply: FastifyReply) => {
    const { id } = request.params;
    fastify.db.select({
      id,
      is_selectable: true
    }).from(Libraries.model)
      .leftJoin(Players.model, eq(Libraries.model.player_id, Players.model.id))
      .then((result: any) => {
        if (!result) reply.code(404).send({ error: 'Not found' });
        else reply.send({ data: result });
      });
  });
}
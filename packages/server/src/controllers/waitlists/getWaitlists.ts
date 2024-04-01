import { FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { getWaitlistsPaginated } from "../../models/Waitlists";
import { APIResponse } from "../../utils/response";
import { Player } from "../../models/Players";
import { allowUnauthenticated } from "../../auth/mw";

export interface getWaitlistsQS {
    offset: number;
    limit: number;
}

export const getWaitlistsOpts = {
  method: 'GET' as HTTPMethods,
  url: '/search',
  handler: getWaitlists,
  preValidation: [allowUnauthenticated],
  schema: {
    querystring: {
      type: 'object',
      required: ['offset', 'limit'],
      properties: {
        offset: { type: 'number' },
        limit: { type: 'number' }
      }
    }
  }
};

export async function getWaitlists(request: FastifyRequest< { Querystring: getWaitlistsQS } >, reply: FastifyReply): Promise<void> {
  const { offset, limit } = request.query;
  const fastify = request.server as FastifyInstance;
  const player = request.user as Player;

  try {
    const waitlists = await getWaitlistsPaginated(fastify, offset, limit, player?.id ?? null);
    return APIResponse(reply, waitlists, 'OK', 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, err as string, 500);
  }
}
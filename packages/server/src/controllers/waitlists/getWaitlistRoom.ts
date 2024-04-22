import { FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { Player } from "../../models/Players";
import { getWaitlist } from "../../models/Waitlists";
import { isAuthenticated } from "../../auth/mw";
import { APIResponse } from "../../utils/response";

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

  if (!id.trim())
    return APIResponse(reply, null, 'no_id_provided', 400);
  try {
    const waitlist = await getWaitlist(fastify, id.trim(), BigInt(player.id));
    if (!waitlist) {
      fastify.log.warn(`Steamder ${id} not found`);
      return APIResponse(reply, null, 'room_does_not_exist', 404);
    }
    return APIResponse(reply, waitlist, 'retrieved_room', 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, 'internal_server_error', 500);
  }
}
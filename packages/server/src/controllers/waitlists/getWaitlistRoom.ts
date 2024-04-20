import { FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { Player } from "../../models/Players";
import { getWaitlist } from "../../models/Waitlists";
import { isAuthenticated } from "../../auth/mw";
import { APIResponse } from "../../utils/response";
import i18next from "../../plugins/i18n.plugin";

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
    return APIResponse(reply, null, i18next.t('no_id_provided', { lng: request.userLanguage }), 400);
  try {
    const waitlist = await getWaitlist(fastify, id.trim(), BigInt(player.id));
    if (!waitlist) {
      fastify.log.warn(`Steamder ${id} not found`);
      return APIResponse(reply, null, i18next.t('room_does_not_exist', { lng: request.userLanguage }), 404);
    }
    return APIResponse(reply, waitlist, i18next.t('retrieved_room', { lng: request.userLanguage }), 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, i18next.t('internal_server_error', { lng: request.userLanguage }), 500);
  }
}
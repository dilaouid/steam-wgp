import { FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Player } from "../../models/Players";
import { isUserInWaitlist, leaveWaitlist } from "../../models/WaitlistsPlayers";
import { isAuthenticated } from "../../auth/mw";
import { checkWaitlistExists } from "../../models/Waitlists";
import { APIResponse } from "../../utils/response";
import i18next from "../../plugins/i18n.plugin";

export interface leaveWaitlistParams {
  id: string;
}

export const leaveWaitlistOpts = {
  method: 'DELETE' as HTTPMethods,
  url: '/:id',
  handler: leaveWaitlistController,
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

async function leaveWaitlistController(request: FastifyRequest<{ Params: leaveWaitlistParams }>, reply: FastifyReply) {
  const { id } = request.params;
  const user = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  try {
    const waitlist = await checkWaitlistExists(fastify, id.trim(), user.id.toString());
    if (!waitlist.data) {
      fastify.log.warn(`Waitlist ${id} not found`);
      return APIResponse(reply, null, i18next.t('room_does_not_exist', { lng: request.userLanguage }), 404);
    }

    if (waitlist.data.started) {
      return APIResponse(reply, null, i18next.t('room_already_started', { lng: request.userLanguage }), 400);
    }

    const waitlistStatus = await isUserInWaitlist(fastify, user.id, id);
    if (waitlistStatus.inWaitlist) {
      if (waitlistStatus.waitlistId && waitlistStatus.waitlistId !== id) {
        return APIResponse(reply, null, i18next.t('not_in_the_room', { lng: request.userLanguage }), 400);
      }

      await leaveWaitlist(fastify, user.id, id);

      return APIResponse(reply, null, i18next.t('left_the_room', { lng: request.userLanguage }), 200);
    }
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, i18next.t('internal_server_error', { lng: request.userLanguage }), 500);
  }
}
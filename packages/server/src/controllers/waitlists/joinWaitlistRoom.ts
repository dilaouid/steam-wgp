import { FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Player } from "../../models/Players";
import { isUserInWaitlist, joinWaitlist } from "../../models/WaitlistsPlayers";
import { isAuthenticated } from "../../auth/mw";
import { checkWaitlistExists, getWaitlist } from "../../models/Waitlists";
import { APIResponse } from "../../utils/response";
export interface joinWaitlistParams {
  id: string;
}

export const joinWaitlistOpts = {
  method: 'PATCH' as HTTPMethods,
  url: '/:id',
  handler: joinWaitlistController,
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

async function joinWaitlistController(request: FastifyRequest<{ Params: joinWaitlistParams }>, reply: FastifyReply) {
  const { id } = request.params;
  const user = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  try {
    const waitlist = await checkWaitlistExists(fastify, id.trim(), user.id.toString());
    if (!waitlist.data) {
      fastify.log.warn(`Waitlist ${id} not found`);
      return APIResponse(reply, null, 'room_does_not_exist', 404);
    }

    if (waitlist.data.started) {
      return APIResponse(reply, null, 'room_alreadfy_started', 400);
    }

    const waitlistStatus = await isUserInWaitlist(fastify, user.id, id);
    if (waitlistStatus.inWaitlist) {
      return APIResponse(reply, null, 'already_in_a_room', 400);
    } else {
      await joinWaitlist(fastify, user.id, id);
      const waitlist = await getWaitlist(fastify, id.trim(), BigInt(user.id));
      return APIResponse(reply, waitlist, 'joined_the_room', 200);
    }
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, 'internal_server_error', 500);
  }
}
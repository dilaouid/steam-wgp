import { FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Player } from "../../models/Players";
import { isUserInWaitlist, joinWaitlist, leaveWaitlist } from "../../models/WaitlistsPlayers";
import { isAuthenticated } from "../../auth/mw";
import { checkWaitlistExists } from "../../models/Waitlists";
import { APIResponse } from "../../utils/response";

export interface joinOrLeaveWaitlistParams {
  id: string;
}

export const joinOrLeaveWaitlistOpts = {
  method: 'PATCH' as HTTPMethods,
  url: '/:id',
  handler: joinOrLeaveWaitlist,
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

async function joinOrLeaveWaitlist(request: FastifyRequest<{ Params: joinOrLeaveWaitlistParams }>, reply: FastifyReply) {
  const { id } = request.params;
  const user = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  try {
    const waitlist = await checkWaitlistExists(fastify, id.trim());
    if (!waitlist) {
      fastify.log.warn(`Waitlist ${id} not found`);
      return APIResponse(reply, null, "La room n'existe pas", 404);
    }

    const waitlistStatus = await isUserInWaitlist(fastify, user.id, id);
    if (waitlistStatus.inWaitlist) {
      if (waitlistStatus.waitlistId && waitlistStatus.waitlistId !== id) {
        return APIResponse(reply, null, "Vous êtes déjà dans une room", 400);
      }

      await leaveWaitlist(fastify, user.id, id);

      return APIResponse(reply, {action: 'leave'}, 'Vous avez quitté la room', 200);
    } else {
      await joinWaitlist(fastify, user.id, id);

      return APIResponse(reply, {action: 'join'}, 'Vous avez rejoint la room', 200);
    }
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, 'Une erreur interne est survenue', 500);
  }
}
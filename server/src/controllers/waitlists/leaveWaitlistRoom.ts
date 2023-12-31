import { FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Player } from "../../models/Players";
import { isUserInWaitlist, leaveWaitlist } from "../../models/WaitlistsPlayers";
import { isAuthenticated } from "../../auth/mw";
import { checkWaitlistExists } from "../../models/Waitlists";
import { APIResponse } from "../../utils/response";

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
      return APIResponse(reply, null, "La room n'existe pas", 404);
    }

    if (waitlist.data.started) {
      return APIResponse(reply, null, "La room a déjà commencé", 400);
    }

    const waitlistStatus = await isUserInWaitlist(fastify, user.id, id);
    if (waitlistStatus.inWaitlist) {
      if (waitlistStatus.waitlistId && waitlistStatus.waitlistId !== id) {
        return APIResponse(reply, null, "Vous n'êtes pas dans cette room", 400);
      }

      await leaveWaitlist(fastify, user.id, id);

      return APIResponse(reply, null, 'Vous avez quitté la room', 200);
    }
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, 'Une erreur interne est survenue', 500);
  }
}
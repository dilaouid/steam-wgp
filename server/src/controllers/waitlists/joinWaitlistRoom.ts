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
      return APIResponse(reply, null, "La room n'existe pas", 404);
    }

    if (waitlist.data.started) {
      return APIResponse(reply, null, "La room a déjà commencé", 400);
    }

    const waitlistStatus = await isUserInWaitlist(fastify, user.id, id);
    if (waitlistStatus.inWaitlist) {
      return APIResponse(reply, null, "Vous êtes déjà dans une room", 400);
    } else {
      await joinWaitlist(fastify, user.id, id);
      const waitlist = await getWaitlist(fastify, id.trim(), BigInt(user.id));
      return APIResponse(reply, waitlist, 'Vous avez rejoint la room', 200);
    }
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, 'Une erreur interne est survenue', 500);
  }
}
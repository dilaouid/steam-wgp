import { FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Player } from "../../models/Players";
import { isUserInWaitlist, joinWaitlist, leaveWaitlist } from "../../models/WaitlistsPlayers";
import { isAuthenticated } from "../../auth/mw";
import { getWaitlist } from "../../models/Waitlists";

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
    const waitlist = await getWaitlist(fastify, id.trim(), BigInt(user.id));
    if (!waitlist) {
      fastify.log.warn(`Waitlist ${id} not found`);
      return reply.code(404).send({ error: 'Waitlist not found' });
    }

    const waitlistStatus = await isUserInWaitlist(fastify, user.id, id);
    const roomClients = fastify.waitlists.get(id);
    if (waitlistStatus.inWaitlist) {
      if (waitlistStatus.waitlistId && waitlistStatus.waitlistId !== id) {
        return reply.code(400).send({ error: 'Already in a waitlist' });
      }

      await leaveWaitlist(fastify, user.id, id);

      // Inform users in the room that the user left
      roomClients?.forEach(client => {
        client.send(JSON.stringify({ message: 'User left waitlist', user: user.id, waitlistId: id }));
      });

      return reply.code(200).send({ message: 'Waitlist left' });
    } else {
      await joinWaitlist(fastify, user.id, id);

      // Inform users in the room that the user joined
      roomClients?.forEach(client => {
        client.send(JSON.stringify({ message: 'User joined waitlist', user: user.id, waitlistId: id }));
      });

      return reply.code(200).send({ message: 'Waitlist joined' });
    }
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
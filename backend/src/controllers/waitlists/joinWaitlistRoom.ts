import { FastifyReply, RouteShorthandOptions, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { isAuthenticated } from "../../auth/mw";
import { Player } from "../../models/Players";
import { isUserInWaitlist, joinWaitlist, leaveWaitlist } from "../../models/WaitlistsPlayers";

interface RequestParams {
  id: string;
}

const options: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: { } // TODO: Add response schema
      }
    },
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      },
      required: ['id']
    }
  },
  preValidation: [ isAuthenticated ]
}

export default async function joinOrLeaveWaitlist(fastify: FastifyInstance) {
  fastify.patch< { Params: RequestParams } >('/:id', options, async (request: FastifyRequest<{ Params: RequestParams }>, reply: FastifyReply) => {
    const { id } = request.params;
    const user = (request.user as Player);

    try {
      const waitlistStatus = await isUserInWaitlist(fastify, user.id, id);
      if (waitlistStatus.inWaitlist) {
        if (waitlistStatus.waitlistId !== id)
          return reply.code(400).send({ error: 'Already in a waitlist' });
        await leaveWaitlist(fastify, user.id, id);
        return reply.code(200).send({ message: 'Waitlist left' });
      } else {
        await joinWaitlist(fastify, user.id, id);
        return reply.code(200).send({ message: 'Waitlist joined' });
      }
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}
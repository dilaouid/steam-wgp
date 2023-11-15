import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Player } from "../../models/Players";
import { isUserInWaitlist, joinWaitlist, leaveWaitlist } from "../../models/WaitlistsPlayers";

export interface joinOrLeaveWaitlistParams {
  id: string;
}

export async function joinOrLeaveWaitlist(request: FastifyRequest<{ Params: joinOrLeaveWaitlistParams }>, reply: FastifyReply) {
  const { id } = request.params;
  const user = (request.user as Player);
  const fastify = request.server as FastifyInstance;

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
}
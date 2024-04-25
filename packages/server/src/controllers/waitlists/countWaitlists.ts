import { FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { countAvailableSteamders } from "../../models/Waitlists";
import { APIResponse } from "../../utils/response";

export const countWaitlistsOpts = {
  method: 'GET' as HTTPMethods,
  url: '/count',
  handler: countWaitlists
};

export async function countWaitlists(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const fastify = request.server as FastifyInstance;

  try {
    const numberOfWaitlists = await countAvailableSteamders(fastify);
    return APIResponse(reply, { count: numberOfWaitlists }, 'OK', 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, err as string, 500);
  }
}
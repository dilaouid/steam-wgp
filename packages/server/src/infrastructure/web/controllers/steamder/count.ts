import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse } from "../../../../utils/response";
import { countAvailableSteamders } from "../../../repositories";

export async function countSteamders(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const fastify = request.server as FastifyInstance;

  try {
    const numberOfSteamders = await countAvailableSteamders(fastify);
    return APIResponse(reply, { count: numberOfSteamders }, 'OK', 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, err as string, 500);
  }
}
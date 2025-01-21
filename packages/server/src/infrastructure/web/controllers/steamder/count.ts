import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse, errorResponse } from "@utils/response";
import { countAvailableSteamders } from "@repositories";

export async function countSteamders(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const fastify = request.server as FastifyInstance;

  try {
    const numberOfSteamders = await countAvailableSteamders(fastify);
    return APIResponse(reply, { data: { count: numberOfSteamders }, message: 'OK', statusCode: 200 });
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, errorResponse(err));
  }
}
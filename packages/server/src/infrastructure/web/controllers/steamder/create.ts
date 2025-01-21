import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "@entities";
import { APIResponse, errorResponse } from "@utils/response";

import { isUserInSteamder } from "@services/steamderPlayerService";
import { createSteamder } from "@services/steamderService";
import { steamderSchema } from "@validations/steamderValidation";

export const newSteamder = async (request: FastifyRequest, reply: FastifyReply) => {
  const fastify = request.server as FastifyInstance;
  const { id } = (request.user as Player);

  const inSteamder = await isUserInSteamder(fastify, id);
  if (inSteamder) {
    fastify.log.warn(`User ${id} want to create a steamder but is already in one`);
    return APIResponse(reply, { message: "already_in_room", statusCode: 400 });
  }
  let parsedBody;

  // Check if the request body is valid according to the zod schema
  try {
    parsedBody = steamderSchema.parse(request.body);
  } catch (e: any) {
    fastify.log.error(e.errors);
    return APIResponse(reply, { message: "invalid_steamder", statusCode: 400 });
  }

  const { isPrivate, name } = parsedBody;

  try {
    // Create the steamder
    const steamder = await createSteamder(fastify, id, name, isPrivate);
    return APIResponse(reply, { data: steamder, message: "room_created", statusCode: 200 });
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, errorResponse(err));
  }
};
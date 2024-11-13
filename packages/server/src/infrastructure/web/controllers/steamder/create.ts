import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "@entities";
import { APIResponse } from "@utils//response";

import { steamderSchema } from "../../validations";

import { isUserInSteamder } from "@services/steamderPlayerService";
import { createSteamder } from "@services/steamderService";

export const newSteamder = async (request: FastifyRequest, reply: FastifyReply) => {
  const fastify = request.server as FastifyInstance;
  const { id } = (request.user as Player);

  const inSteamder = await isUserInSteamder(fastify, id);
  if (inSteamder) {
    fastify.log.warn(`User ${id} want to create a steamder but is already in one`);
    return APIResponse(reply, null, "already_in_room", 400);
  }

  // Check if the request body is valid according to the zod schema
  try {
    steamderSchema.parse(request.body);
  } catch (e: any) {
    fastify.log.error(e.errors);
    return APIResponse(reply, e.errors, "invalid_steamder", 400);
  }

  const { isPrivate, name } = request.body as { isPrivate: boolean; name: string };

  try {
    // Create the steamder
    const steamder = await createSteamder(fastify, id, name, isPrivate);
    return APIResponse(reply, steamder, "room_created", 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, "internal_server_error", 500);
  }
};
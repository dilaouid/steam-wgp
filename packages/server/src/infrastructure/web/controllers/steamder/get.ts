import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "../../../../domain/entities";
import { APIResponse } from "../../../../utils/response";
import { isUserInSpecificSteamder } from "../../../../domain/services/steamderPlayerService";

import { uuidSchema } from "../../validations";
import { formatSteamderInfos, getSteamderInfos } from "../../../../domain/services/steamderService";

interface Parameters {
  id: string;
}

export async function getSteamderWithPlayers(request: FastifyRequest<{ Params: Parameters }>, reply: FastifyReply) {
  const { id } = request.params;
  const fastify = request.server as FastifyInstance;
  const player = request.user as Player;

  try {
    uuidSchema.parse(id);
  } catch (e) {
    return APIResponse(reply, null, "invalid_uuid", 400);
  }

  try {
    // Check if the user is in the steamder, if not return an error
    const inSteamder = await isUserInSpecificSteamder(fastify, player.id, id);
    if (!inSteamder) return APIResponse(reply, null, "not_in_room", 401);

    // Retrieve the steamder infos (players, games, etc.)
    const steamderInfos = await getSteamderInfos(fastify, id);
    if (!steamderInfos) return APIResponse(reply, null, "room_does_not_exist", 404);

    // Format the steamder infos to return only the necessary data and with the correct format
    const steamder = formatSteamderInfos(steamderInfos);
    return APIResponse(reply, steamder, "retrieved_room", 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, "internal_server_error", 500);
  }
}

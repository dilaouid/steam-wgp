import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "@entities";
import { APIResponse } from "@utils/response";
import { isUserInSpecificSteamder } from "@services/steamderPlayerService";

import { formatSteamderInfos, getSteamderInfos } from "@services/steamderService";
import { uuidSchema } from "@validations/typeValidation";

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
    return APIResponse(reply, { message: "invalid_uuid", statusCode: 400 });
  }

  try {
    // Check if the user is in the steamder, if not return an error
    const inSteamder = await isUserInSpecificSteamder(fastify, player.id, id);
    if (!inSteamder) return APIResponse(reply, { message: "not_in_room", statusCode: 401 });

    // Retrieve the steamder infos (players, games, etc.)
    const steamderInfos = await getSteamderInfos(fastify, id);
    if (!steamderInfos) return APIResponse(reply, { message: "room_does_not_exist", statusCode: 404 });

    // Format the steamder infos to return only the necessary data and with the correct format
    const steamder = formatSteamderInfos(steamderInfos);
    return APIResponse(reply, { data: steamder, message: "retrieved_room", statusCode: 200 });
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, { message: "internal_server_error", statusCode: 500 });
  }
}

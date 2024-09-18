import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Player } from "../../../../domain/entities";
import { APIResponse } from "../../../../utils/response";

import {
  checkGamesInLibrary,
  toggleHiddenGames,
} from "../../../../domain/services/libraryService";

interface IBody {
  games: string[];
}

export async function updateHiddenGames(request: FastifyRequest<{ Body: IBody }>, reply: FastifyReply) {
  const fastify = request.server as FastifyInstance;
  try {
    if (!request.user) throw new Error("logged_in_to_access_library");

    const { id: userId } = request.user as Player;
    const gameIds: string[] = request.body.games;

    const library = await checkGamesInLibrary(fastify, userId, gameIds);

    // Toggle hidden status of the games
    await toggleHiddenGames(fastify, userId, gameIds, library)

    return APIResponse(reply, null, "updated_library", 200);
  } catch (error: any) {
    const messageKey = ["logged_in_to_access_library", "invalid_id"].includes(
      error.message
    )
      ? error.message
      : "internal_server_error";
    const statusCode = ["logged_in_to_access_library", "invalid_id"].includes(
      error.message
    )
      ? 401
      : 500;
    fastify.log.error(error);
    return APIResponse(reply, null, messageKey, statusCode);
  }
}

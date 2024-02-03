import { FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Player } from "../../models/Players";
import { getPlayerAllLibrary } from "../../models/Libraries";
import { APIResponse } from "../../utils/response";
import i18next from "../../plugins/i18n.plugin";
import { isAuthenticated } from "../../auth/mw";

type Library = ILibraryGame[]

interface ILibraryGame {
    game_id: string;
    hidden: boolean | null;
}

interface getLibraryParams {
  id: [string];
}

export const getLibraryOpts = {
  method: 'GET' as HTTPMethods,
  url: '/',
  handler: getLibrary,
  preValidation: [isAuthenticated]
};

async function getLibrary(request: FastifyRequest<{ Params: getLibraryParams }>, reply: FastifyReply) {

  const fastify = request.server as FastifyInstance;
  try {
    if (!request.user)
      throw new Error('logged_in_to_access_library');

    const { id: userId } = (request.user as Player);

    const libraryObject = await getPlayerAllLibrary(fastify, BigInt(userId));
    const libraryArray = Object.values(libraryObject);

    const replyData: Library = libraryArray.map(game => ({
      game_id: game.id.toString(),
      hidden: game.hidden
    }));

    return APIResponse(reply, replyData, 'OK', 200);
  } catch (error: any) {
    const messageKey = ['logged_in_to_access_library', 'invalid_id'].includes(error.message)
      ? error.message
      : 'internal_server_error';
    const statusCode = ['logged_in_to_access_library', 'invalid_id'].includes(error.message) ? 401 : 500;
    fastify.log.error(error);
    return APIResponse(reply, null, i18next.t(messageKey, { lng: request.userLanguage }), statusCode);
  }
}
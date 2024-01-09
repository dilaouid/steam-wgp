import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Player } from "../../models/Players";
import { getPlayerLibrary } from "../../models/Libraries";
import { APIResponse } from "../../utils/response";
import i18next from "../../plugins/i18n.plugin";

export interface getUserLibraryParams {
  id: string;
}

// Get the authenticated player's game library (only the games that are selectable)
export async function getUserLibrary(request: FastifyRequest<{ Params: getUserLibraryParams }>, reply: FastifyReply) {
  if (!request.user) {
    return APIResponse(reply, null, i18next.t('logged_in_to_access_library', { lng: request.userLanguage }), 401);
  }

  const { id } = (request.user as Player);
  const fastify = request.server as FastifyInstance;

  try {
    const library = await getPlayerLibrary(fastify, id);
    return APIResponse(reply, library, i18next.t('retrieved_library', { lng: request.userLanguage }), 200);
  } catch (err) {
    fastify.log.error(err);
    return APIResponse(reply, null, i18next.t('internal_server_error', { lng: request.userLanguage }), 500);
  }
}
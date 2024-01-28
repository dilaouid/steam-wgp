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

interface updateHiddenGamesParams {
  id: [string];
}

export const updateHiddenGamesOpts = {
  method: 'PATCH' as HTTPMethods,
  url: '/',
  handler: updateHiddenGames,
  schema: {
    body: {
      type: 'object',
      required: ['id'],
      properties: {
        id: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    }
  },
  preValidation: [isAuthenticated]
};

async function toggleHiddenGames(fastify: FastifyInstance, userId: bigint, gameIds: string[], library: Library): Promise<void> {
  // split games into hidden and visible
  const { hiddenGames, visibleGames } = library.reduce((acc, game) => {
    if (gameIds.includes(game.game_id.toString())) {
      game.hidden = !game.hidden; // bascule l'état caché
      acc.hiddenGames.push(game);
    } else {
      acc.visibleGames.push(game);
    }
    return acc;
  }, { hiddenGames: [] as ILibraryGame[], visibleGames: [] as ILibraryGame[] });

  // update hidden games
  if (hiddenGames.length) {
    await fastify.db.update().table('libraries').set({ hidden: true }).where({
      player_id: userId,
      game_id: hiddenGames.map(game => game.game_id)
    }).execute();
  }

  // update visible games
  if (visibleGames.length) {
    await fastify.db.update().table('libraries').set({ hidden: false }).where({
      player_id: userId,
      game_id: visibleGames.map(game => game.game_id)
    }).execute();
  }
}

const checkGamesInLibrary = async (fastify: FastifyInstance, userId: bigint, gameIds: string[]) => {
  const library = await getPlayerAllLibrary(fastify, userId) as unknown as Library;
  const libraryIds = library.map((game) => game.game_id.toString());
  const isAllIdInLibrary = gameIds.every((id) => libraryIds.includes(id));

  if (!isAllIdInLibrary) {
    throw new Error('invalid_id');
  }

  return library;
};
async function updateHiddenGames(request: FastifyRequest<{ Params: updateHiddenGamesParams }>, reply: FastifyReply) {
  try {
    if (!request.user)
      throw new Error('logged_in_to_access_library');

    const { id: userId } = (request.user as Player);
    const fastify = request.server as FastifyInstance;
    const gameIds: string[] = request.params.id || [];

    const library = await checkGamesInLibrary(fastify, userId, gameIds);

    // Toggle hidden status of the games
    await toggleHiddenGames(fastify, userId, gameIds, library);
    return APIResponse(reply, null, i18next.t('updated_library', { lng: request.userLanguage }), 200);
  } catch (error: any) {
    const messageKey = ['logged_in_to_access_library', 'invalid_id'].includes(error.message)
      ? error.message
      : 'internal_server_error';
    const statusCode = ['logged_in_to_access_library', 'invalid_id'].includes(error.message) ? 401 : 500;
    return APIResponse(reply, null, i18next.t(messageKey, { lng: request.userLanguage }), statusCode);
  }
}
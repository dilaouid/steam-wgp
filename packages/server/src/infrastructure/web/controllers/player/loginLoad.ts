import { EventMessage, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse, setSSEHeaders } from "../../../../utils/response";
import jwt from 'jsonwebtoken';
import { Player } from "../../../../domain/entities";
import { fetchingSteamLibrary, getGamesNotInDB, insertGamesInDatabase, insertGamesInLibrary, IProgressOpt, ISteamResponse, setInitialLibrary, updateProgress } from "../../../../domain/services/progressService";

export const loadLibrary = async (request: FastifyRequest<{ Querystring: { token: string } }>, response: FastifyReply) => {
  const fastify = request.server as FastifyInstance;
  const { token } = request.query;
  try {
    const { SECRET_KEY, ORIGIN, STEAM_GetOwnedGames, STEAM_API_KEY } = fastify.config;
    const decoded = jwt.verify(token, SECRET_KEY);

    if (!decoded) {
      return APIResponse(response, null, 'forbidden_access', 401);
    }

    const { id } = decoded as Player;
    response.raw.writeHead(200, setSSEHeaders(ORIGIN as string));

    if (!id)
      return APIResponse(response, null, 'need_to_be_logged_in', 401);

    response.sse((async function* (): EventMessage | AsyncIterable<EventMessage> {
      try {
        yield updateProgress({ message: 'load_steam_library', type: 'info', complete: false, progress: 0 });
        const playerLibraryIds = await setInitialLibrary(fastify, id);

        if (!playerLibraryIds) return;

        const fetchedSteamLibrary = await fetchingSteamLibrary(fastify, playerLibraryIds, STEAM_GetOwnedGames as string, STEAM_API_KEY as string, id) as IProgressOpt & { library: ISteamResponse | null };
        yield updateProgress({ message: fetchedSteamLibrary.message, type: fetchedSteamLibrary.type, complete: fetchedSteamLibrary.complete, progress: fetchedSteamLibrary.progress});
        if (!fetchedSteamLibrary.library) return;

        const steamLibrary = fetchedSteamLibrary.library;

        const { gamesToAddToLibrary, appIdsNotInDB } = await getGamesNotInDB(fastify, steamLibrary, playerLibraryIds);

        let gamesToAdd = 0;
        // insert the games in the Games table if they are not already in the database
        if (appIdsNotInDB.length > 0)
          gamesToAdd = await insertGamesInDatabase(fastify, appIdsNotInDB);

        fastify.log.info(`\n--- ${gamesToAdd} games have been added to the database ---\n`);

        yield updateProgress({ message: "adding_games_to_collection", type: 'info', complete: false, progress: 60 });

        // insert the games in the Libraries table if they are not already in the database
        const insertedToLibrary = await insertGamesInLibrary(fastify, id, gamesToAddToLibrary);
        if (insertedToLibrary > 0 && insertedToLibrary < gamesToAdd) {
          yield updateProgress({ message: 'game_cannot_add', type: 'danger', count: gamesToAddToLibrary.length, progress: 60, complete: false })
          fastify.log.warn(`Only ${gamesToAdd} out of ${gamesToAddToLibrary.length} games were added to the database`);
        }
        yield updateProgress({ message: 'loading_library_complete', type: 'success', complete: true, progress: 100 })
      } catch (error: any) {
        fastify.log.error(error);
        yield { data: JSON.stringify({ message: 'error_loading_steam_library', type: 'danger', complete: true, progress: 100 }) };
      }
    })());
  } catch (error: any) {
    // if the error is due to an expired token
    if (error.type === "TokenExpiredError") {
      response.clearCookie("token");
      return APIResponse(response, null, "session_expired", 401);
    }
    return APIResponse(response, null, "forbidden_access", 401);
  }
};

import { EventMessage, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { APIResponse, setSSEHeaders } from "../../../../utils/response";
import jwt from 'jsonwebtoken';
import { Player } from "../../../../domain/entities";
import { fetchingSteamLibrary, getGamesNotInDB, insertGamesInDatabase, insertGamesInLibrary, ISteamResponse, setInitialLibrary, updateProgress } from "../../../../domain/services/progressService";

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
        const libraryGenerator = setInitialLibrary(fastify, id);
        for await (const progressMessage of libraryGenerator)
          yield progressMessage;

        const playerLibraryIds = (await libraryGenerator.next()).value;
        if (!playerLibraryIds)
          return;

        const steamLibraryGenerator = await fetchingSteamLibrary(fastify, playerLibraryIds, STEAM_GetOwnedGames as string, STEAM_API_KEY as string, id);
        for await (const progressMessage of steamLibraryGenerator)
          yield progressMessage;

        const steamLibrary = (await steamLibraryGenerator.next()).value as ISteamResponse;
        if (!steamLibrary) return;


        yield updateProgress({ message: "adding_games_to_library", type: 'info', complete: false, progress: 20 });
        const { gamesToAddToLibrary, appIdsNotInDB } = await getGamesNotInDB(fastify, steamLibrary, playerLibraryIds);

        let gamesToAdd = 0;
        // insert the games in the Games table if they are not already in the database
        if (appIdsNotInDB.length > 0)
          gamesToAdd = await insertGamesInDatabase(fastify, appIdsNotInDB);

        fastify.log.info(`\n--- ${gamesToAdd} games have been added to the database ---\n`);

        // insert the games in the Libraries table if they are not already in the database
        const insertGenerator = insertGamesInLibrary(fastify, id, gamesToAddToLibrary, gamesToAdd);
        for await (const progressMessage of insertGenerator)
          yield progressMessage;
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

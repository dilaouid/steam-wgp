import { EventMessage, FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { Games, Libraries } from "../../models";
import { eq, inArray } from 'drizzle-orm';
import { Player } from "../../models/Players";
import { APIResponse } from "../../utils/response";
import jwt from 'jsonwebtoken';

interface IGamesToAdd { game_id: number; is_selectable: boolean; id?: number; }
interface ISteamResponse { response: { games: { appid: number; }[]; } }
interface ILibrary { appid: number; game_id?: number }
interface IQS { token: string; }

export const getSteamLibraryOpts = {
  method: 'GET' as HTTPMethods,
  url: '/library-checker',
  handler: getSteamLibrary,
  schema : {
    querystring: {
      token: { type: 'string' }
    }
  }
};

// Fetch the game details from the steam api (is multiplayer or not, essentially)
async function fetchGameDetails(fastify: FastifyInstance, appId: number): Promise<any> {
  const gameDetailsResponse = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
  const gameDetails = await gameDetailsResponse?.json() as any || null;

  if (!gameDetails) {
    fastify.log.warn(`Game ${appId} is not selectable - Steam API is not responding in https://store.steampowered.com/api/appdetails?appids=${appId}...`);
    return null;
  }

  const isSelectable = gameDetails[appId].data.categories?.some((category: any) => [1, 49, 36].includes(category.id));
  fastify.log.info(`Game ${appId} is ${isSelectable ? 'selectable' : 'not selectable'}`);
  return { game_id: appId, is_selectable: Boolean(isSelectable) };
}

// Get the steam app ids that are not in the database yet
async function getAppIdsNotInDB(fastify: FastifyInstance, steamAppIds: number[]) {
  const existingGames = await fastify.db.select({
    id: Games.model.id,
  }).from(Games.model).where(inArray(Games.model.id, steamAppIds))
  const existingAppIds = new Set(existingGames.map((game: any) => game.id));
  const missingAppIds = steamAppIds.filter(id => !existingAppIds.has(id));

  return missingAppIds;
}

// Insert the new games to the database
async function insertGames(fastify: FastifyInstance, games: IGamesToAdd[]) {
  if (games.length > 0) {
    fastify.log.info(`Inserting ${games.length} games into the database...`);
    // change the property name from game_id to id
    games.forEach(game => game.id = game.game_id);

    await fastify.db.insert(Games.model).values(games).onConflictDoNothing().execute();
  }
}

// Insert the all the new games to the player's library
async function insertGamesIntoLibrary(fastify: FastifyInstance, player_id: bigint, games: number[]) {
  const insertData = games.map((game_id) => ({ game_id, player_id }));
  // remove elements where game_id is null
  if (insertData.length > 0) {
    await fastify.db.insert(Libraries.model).values(insertData.filter(({ game_id }) => game_id !== null)).onConflictDoNothing().execute();
  }
}

async function getSteamLibrary(request: FastifyRequest<{ Querystring: IQS }>, reply: FastifyReply) {
  const fastify = request.server as FastifyInstance;

  const token = request.query.token as string;

  try {
    const secretKey = fastify.config.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);

    if (!decoded) {
      return APIResponse(reply, null, 'Accès interdit', 401);
    }

    const { id } = decoded as Player;
    const headers = {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': fastify.config.ORIGIN,
      'Access-Control-Allow-Credentials': 'true'
    };

    reply.raw.writeHead(200, headers);

    if (!id)
      return APIResponse(reply, null, 'Vous devez être connecté pour créer une room', 401);
    reply.sse((async function* (): EventMessage | AsyncIterable<EventMessage> {
      try {
        yield { data: JSON.stringify({ message: 'Chargement de ta bibliothèque Steam ...', type: 'info', complete: false }) }
        const library = await fastify.db.select({ game_id: Libraries.model.game_id }).from(Libraries.model).where(eq(Libraries.model.player_id, id));
        const playerLibraryIds = new Set(library.map((game: ILibrary) => game.game_id));

        fastify.log.info(`Fetching Steam library for player ${id}...`);
        const steamLibraryRequest = await fetch(`${fastify.config.STEAM_GetOwnedGames}/?key=${fastify.config.STEAM_API_KEY}&steamid=${id}&include_appinfo=true&include_played_free_games=true&format=json`);
        if (steamLibraryRequest == null || steamLibraryRequest.status !== 200) {
          fastify.log.warn(`Steam API is not responding...`);
          yield { data: JSON.stringify({ message: 'La bibliothèque Steam n\'est pas accessible pour le moment', type: 'danger', complete: true }) };
          return;
        }
        const steamLibrary = await steamLibraryRequest.json() as ISteamResponse;

        if (steamLibrary.response && !steamLibrary.response?.games) {
          const complete = playerLibraryIds.size > 0;
          yield { data: JSON.stringify({ message: 'Votre bibliothèque Steam n\'est pas accessible pour le moment. Votre compte est peut-être privé, ou alors vous n\'avez pas de jeu.', type: 'danger', complete }) };
          return;
        }

        fastify.log.info('Steam library fetched successfully !');
        if (!steamLibrary.response) {
          fastify.log.warn(`Steam API is not responding...`);
          yield { data: JSON.stringify({ message: 'La bibliothèque Steam n\'est pas accessible pour le moment', type: 'danger', complete: true }) };
          return;
        }

        yield { data: JSON.stringify({ message: 'Ajout des jeux à la bibliothèque ...', type: 'info', complete: false }) };
        const steamAppIds = steamLibrary.response.games.map((game: ILibrary) => game.appid);
        const gamesToAddToLibrary = steamAppIds.filter((gameId: number) => !playerLibraryIds.has(gameId));

        // get the app ids that are not in the database yet
        fastify.log.info(`Fetching games details from Steam API...`);
        const appIdsNotInDB = await getAppIdsNotInDB(fastify, steamAppIds);
        fastify.log.info(`\n--- ${appIdsNotInDB.length} games are not in the database yet ---\n`);

        // insert the games in the Games table if they are not already in the database
        fastify.log.info(`Inserting games into the database...`);
        const gamesToAdd = await Promise.all(appIdsNotInDB.map(async appId => await fetchGameDetails(fastify, appId).catch(err => {
          fastify.log.error(err);
          return { game_id: appId, is_selectable: false }
        })))
        const filteredGamesToAdd = gamesToAdd.filter(game => game !== null);
        fastify.log.info(`\n--- We are about to insert ${filteredGamesToAdd.length} games into the database...\n`);
        await insertGames(fastify, filteredGamesToAdd);

        // insert the games in the Libraries table if they are not already in the database
        fastify.log.info(`Inserting games into the library...`);
        yield { data: JSON.stringify({ message: 'Ajout des jeux à ta collection ...', type: 'info', complete: false }) };

        await insertGamesIntoLibrary(fastify, BigInt(id), gamesToAddToLibrary);

        // if added games in db is less than gamesToAddToLibrary, then warn the user
        if (gamesToAddToLibrary.length > 0 && gamesToAddToLibrary.length < gamesToAdd.length) {
          if (gamesToAdd.length <= 1) yield { data: JSON.stringify({ message: `${gamesToAdd.length} jeu n'a pas pu être ajouté à la bibliothèque !`, type: 'danger' }) };
          else yield { data: JSON.stringify({ message: `${gamesToAdd.length} jeux n'ont pas pu être ajoutés à la bibliothèque !`, type: 'danger', complete: false }) };

          fastify.log.warn(`Only ${gamesToAdd.length} out of ${gamesToAddToLibrary.length} games were added to the database`);
        }
        yield { data: JSON.stringify({ message: 'Fin du processus de mise à jour de la bibliothèque, vous allez maintenant être redirigé', type: 'success', complete: true }) }
      } catch (err) {
        fastify.log.error(err);
        yield { data: JSON.stringify({ message: 'Une erreur est survenue lors de la mise à jour de ta bibliothèque', type: 'danger', complete: true }) };
      }
    })());
  } catch (error: any) {
    // if the error is due to an expired token
    if (error.type === 'TokenExpiredError') {
      reply.clearCookie('token');
      return APIResponse(reply, null, 'Votre session a expiré, veuillez vous reconnecter', 401);
    }

    return APIResponse(reply, null, 'Accès interdit', 401);
  }

}

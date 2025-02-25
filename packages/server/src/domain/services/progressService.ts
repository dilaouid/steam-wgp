import { FastifyInstance } from "fastify";
import { steamService } from "./steam.service";
import { getGamesAccordingToList, getPlayerLibrary, insertGames, insertToLibrary } from "@repositories";

export interface IProgressOpt {
    message: string;
    type: 'info' | 'danger' | 'success';
    complete: boolean;
    progress: number;
    count?: number;
}

interface ILibrary { appid: number; game_id?: number }
export interface ISteamResponse { games: { appid: number; }[]; }

async function getAppIdsNotInDB(fastify: FastifyInstance, steamAppIds: number[]) {
  const existingGames = await getGamesAccordingToList(fastify, steamAppIds);
  const existingAppIds = new Set(existingGames.map((game: any) => game.id));

  return steamAppIds.filter(id => !existingAppIds.has(id));
}

export const updateProgress = (opts: IProgressOpt) => {
  return { data: JSON.stringify(opts) };
}

export async function setInitialLibrary(f: FastifyInstance, playerId: bigint): Promise<Set<any>> {
  const library = await getPlayerLibrary(f, playerId);
  return new Set(library.map((game: ILibrary) => game.game_id));
}

export async function fetchingSteamLibrary(f: FastifyInstance, library: any, baseUrl: string, API_KEY: string, playerId: bigint): Promise<Partial<IProgressOpt & { library: ISteamResponse | null}>> {
  f.log.info(`Fetching Steam library for player ${playerId}...`);

  try {
    // Vérifier les paramètres d'entrée
    if (!baseUrl || !API_KEY) {
      f.log.error(`Missing required parameters: baseUrl=${!!baseUrl}, API_KEY=${!!API_KEY}`);
      return { complete: true, library: null, progress: 0, type: 'danger', message: "steam_api_config_missing" };
    }

    const steamLibraryRequest = await steamService.getLibrary({ playerId, baseUrl, API_KEY });

    if (steamLibraryRequest === null) {
      f.log.warn(`Steam library request returned null - possible network error`);
      return { complete: true, library: null, progress: 0, type: 'danger', message: "steam_library_network_error" };
    }

    f.log.info(`Steam API response status: ${steamLibraryRequest.status}`);

    if (steamLibraryRequest.status !== 200) {
      f.log.warn(`Steam API responded with non-200 status: ${steamLibraryRequest.status}`);
      return { complete: true, library: null, progress: 0, type: 'danger', message: `steam_api_error_${steamLibraryRequest.status}` };
    }

    // Cloner la réponse pour pouvoir la lire deux fois
    const clonedResponse = steamLibraryRequest.clone();
    const responseText = await clonedResponse.text();
    f.log.info(`Raw API response (first 200 chars): ${responseText.substring(0, 200)}...`);

    try {
      // Essayons de parser manuellement pour voir s'il y a des erreurs
      const manualParse = JSON.parse(responseText);
      f.log.info(`Manual parse success, response has keys: ${Object.keys(manualParse).join(', ')}`);

      if (manualParse.response) {
        f.log.info(`Response has keys: ${Object.keys(manualParse.response).join(', ')}`);

        // Vérifier si games existe
        if (!manualParse.response.games) {
          f.log.warn(`No 'games' field in the response`);

          // Vérifier s'il y a un message d'erreur spécifique
          if (manualParse.response.error) {
            f.log.error(`Steam API error: ${manualParse.response.error}`);
            return { complete: true, library: null, progress: 0, type: 'danger', message: `steam_api_error: ${manualParse.response.error}` };
          }

          // Si le profil est privé, Steam renvoie parfois une réponse sans le champ games
          const complete = library.size > 0;
          return { complete, library: null, progress: 15, type: 'danger', message: "steam_library_not_accessible" };
        }
      }
    } catch (parseError) {
      f.log.error(`Failed to manually parse response: ${parseError}`);
    }

    // Utiliser la méthode standard pour formater la réponse
    const steamLibrary = await steamService.formatAPIResponse(steamLibraryRequest);

    if (!steamLibrary.response) {
      f.log.warn(`Formatted response has no 'response' property`);
      return { complete: true, library: null, progress: 0, type: 'danger', message: "steam_library_invalid_format" };
    }

    if (!steamLibrary.response.games) {
      f.log.warn(`Steam library response does not contain games array`);
      const complete = library.size > 0;
      return { complete, library: null, progress: 15, type: 'danger', message: "steam_library_not_accessible" };
    }

    f.log.info(`Steam library fetched successfully with ${steamLibrary.response.games.length} games!`);
    return { complete: false, library: steamLibrary.response, progress: 20, type: 'info', message: "adding_games_to_library" };
  } catch (error) {
    f.log.error(`Exception in fetchingSteamLibrary: ${error instanceof Error ? error.message : String(error)}`);
    return { complete: true, library: null, progress: 0, type: 'danger', message: "steam_library_exception" };
  }
}

/**
 * Retrieves the games that are not present in the game database.
 *
 * @param f - The Fastify instance.
 * @param steamLibrary - The Steam library response.
 * @param playerLibraryIds - The player's library IDs.
 * @returns An object containing the games to add to the games table in database and the app IDs not present in the database.
 */
export const getGamesNotInDB = async (f: FastifyInstance, steamLibrary: ISteamResponse, playerLibraryIds: any) => {
  const steamAppIds = steamLibrary.games.map((game: ILibrary) => game.appid);
  const gamesToAddToLibrary = steamAppIds.filter((gameId: number) => !playerLibraryIds.has(gameId));

  // get the app ids that are not in the database yet
  f.log.info(`Fetching games details from Steam API...`);
  const appIdsNotInDB = await getAppIdsNotInDB(f, steamAppIds);
  f.log.info(`\n--- ${appIdsNotInDB.length} games are not in the database yet ---\n`);
  return { gamesToAddToLibrary, appIdsNotInDB };
}

export const insertGamesInDatabase = async (f: FastifyInstance, appIdsNotInDB: number[]) => {
  f.log.info(`Inserting games into the database...`);
  const gamesToAdd = await Promise.all(appIdsNotInDB.map(async appId => await steamService.getGameDetails({ f, appId }).catch(err => {
    f.log.error(err);
    return { id: appId, is_selectable: false }
  })));

  const filteredGamesToAdd = gamesToAdd.filter((game) => game !== null);
  f.log.info(`\n--- We are about to insert ${filteredGamesToAdd.length} games into the database...\n`);
  await insertGames(f, filteredGamesToAdd);
  return gamesToAdd.length;
}

export async function insertGamesInLibrary(f: FastifyInstance, playerId: bigint, gamesToAddToLibrary: number[]): Promise<number> {
  const insert = gamesToAddToLibrary.map((game_id) => ({ game_id, player_id: playerId }));
  if (insert.length === 0) return 0;
  await insertToLibrary(f, insert);

  return gamesToAddToLibrary.length;
}
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
  const steamLibraryRequest = await steamService.getLibrary({ playerId, baseUrl, API_KEY });
  if (steamLibraryRequest == null || steamLibraryRequest.status !== 200) {
    f.log.warn(`Steam API is not responding...`);
    return { complete: true, library: null, progress: 0, type: 'danger', message: "steam_library_not_accessible_yet" };
  }
  const steamLibrary = await steamService.formatAPIResponse(steamLibraryRequest);

  if (steamLibrary.response && !steamLibrary.response?.games) {
    const complete = library.size > 0;
    return { complete, library: null, progress: 15, type: 'danger', message: "steam_library_not_accessible" };
  }

  f.log.info('Steam library fetched successfully !');
  return { complete: false, library: steamLibrary.response, progress: 20, type: 'info', message: "adding_games_to_library" };
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
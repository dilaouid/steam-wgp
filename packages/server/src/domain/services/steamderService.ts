import { FastifyInstance } from "fastify";
import { checkSteamderExists, countPlayerGamesLibrary, deleteSteamder, getSteamderPlayersAndGames, getSteamdersPagination, insertSteamder, isPlayerInSteamder, leaveSteamder, updateSteamder } from "../../infrastructure/repositories";
import { formatPlayers, getCommonGames, getCommonGamesController, removeDuplicates, removeDuplicatesController } from "../../utils/gamesUtils";
import { SteamderInsert } from "../entities";

interface ISteamderExistsReturns {
    success: boolean;
    message: string | null;
    status: number;
}

/**
 * Checks if the steamder is available for a given waitlist ID and player ID (and the steamder haven't started yet)
 *
 * @param fastify - The Fastify instance.
 * @param steamderId - The ID of the steamder.
 * @param playerId - The ID of the player.
 * @returns A promise that resolves to an object containing the result of the check.
 */
export const isSteamderAvailable = async (fastify: FastifyInstance, steamderId: string): Promise<ISteamderExistsReturns> => {
  try {
    const steamder = await checkSteamderExists(fastify, steamderId, false);
    if (!steamder.data) {
      fastify.log.warn(`Steamder ${steamderId} not found`);
      return { success: false, message: "room_does_not_exist", status: 404 };
    }

    return { success: true, message: null, status: 200 };
  } catch (err) {
    fastify.log.error(err);
    return { success: false, message: 'internal_server_error', status: 500 };
  }
};


/**
 * Updates the game lists (common and all games) for a Steamder.
 *
 * @param fastify - The Fastify instance.
 * @param steamderId - The ID of the Steamder.
 * @returns A boolean indicating whether the game lists were successfully updated.
 */
export const updateGameLists = async (fastify: FastifyInstance, steamderId: string) => {
  try {
    const allSteamderGames = await getSteamderPlayersAndGames(fastify, steamderId);

    const allGamesIds = removeDuplicates(allSteamderGames);
    const commonGamesIds = getCommonGames(allSteamderGames);

    await updateSteamder(fastify, steamderId, { common_games: commonGamesIds, all_games: allGamesIds });
    return true;
  } catch (err) {
    fastify.log.error(err);
    return false;
  }
};

/**
 * Retrieves Steamder information.
 *
 * @param fastify - The Fastify instance.
 * @param steamderId - The Steamder ID.
 * @returns The Steamder information or null if an error occurs.
 */
export const getSteamderInfos = async (fastify: FastifyInstance, steamderId: string) => {
  try {
    const steamder = await getSteamderPlayersAndGames(fastify, steamderId);
    return steamder[0] || null;
  } catch (err) {
    fastify.log.error(err);
    return null;
  }
};

/**
 * Leave and update a steamder.
 *
 * @param fastify - The Fastify instance.
 * @param steamderId - The ID of the steamder.
 * @param playerId - The ID of the player.
 * @returns A promise that resolves to an object containing the success status, message, and status code.
 */
export const leaveAndUpdateSteamder = async (fastify: FastifyInstance, steamderId: string, playerId: bigint): Promise<ISteamderExistsReturns> => {
  try {
    const steamder = await isPlayerInSteamder(fastify, playerId, steamderId);

    // If the player is not in the steamder, return false
    if (!steamder.data) {
      fastify.log.warn(`Player ${playerId} not found in steamder ${steamderId}`);
      return { success: false, message: "room_does_not_exist", status: 404 };
    }

    // If the steamder has already started, return false
    if (steamder.data.started) {
      fastify.log.warn(`Steamder ${steamderId} already started`);
      return { success: false, message: "room_already_started", status: 400 };
    }

    // If the player is the admin, delete the steamder
    if (steamder.data.admin_id === playerId) {
      fastify.log.warn(`Player ${playerId} is the admin of steamder ${steamderId}`);
      await deleteSteamder(fastify, steamderId);
      return { success: true, message: "left_the_room", status: 200 };
    }

    // Otherwise, delete the player from the steamder and updates the game lists from it
    await leaveSteamder(fastify, playerId, steamderId);
    await updateGameLists(fastify, steamderId);
    return { success: true, message: "left_the_room", status: 200 };
  } catch (err) {
    fastify.log.error(err);
    return { success: true, message: "internal_server_error", status: 500 };
  }
}

/**
 * Formats the steamderInfos object to return only the necessary data.
 *
 * @param steamderInfos - The steamderInfos object to be formatted.
 * @returns The formatted steamderInfos object.
 */
export const formatSteamderInfos = (steamderInfos: any) => {
  const players = steamderInfos.reduce(formatPlayers, []);
  steamderInfos.steamder.admin_id = steamderInfos.steamder.admin_id.toString();

  const commonGames = getCommonGamesController(players.map((player: any) => ({
    games: player.games,
    player_id: player.player_id
  })));
  const allGames = removeDuplicatesController(players.map((p: any) => p.games).flat());

  return {
    ...steamderInfos.steamder,
    players: steamderInfos,
    common_games: commonGames,
    all_games: allGames
  };
};

export const paginateSteamder = async (fastify: FastifyInstance, offset: number, limit: number) => {
  const steamders = await getSteamdersPagination(fastify, limit, offset);
  return steamders[0] || null;
};

/**
 * Creates a Steamder.
 *
 * @param fastify - The Fastify instance.
 * @param playerId - The ID of the player.
 * @param name - The name of the Steamder.
 * @param isPrivate - Indicates if the Steamder is private.
 * @returns The created Steamder or null if not found.
 */
export const createSteamder = async (fastify: FastifyInstance, playerId: bigint, name: string, isPrivate: boolean) => {
  const numberOfGames = await countPlayerGamesLibrary(fastify, playerId);

  const data: SteamderInsert = {
    admin_id: playerId,
    name,
    private: isPrivate,
    complete: false,
    started: false,
    common_games: numberOfGames,
    all_games: numberOfGames
  };

  const steamder = await insertSteamder(fastify, data);
  return steamder[0] || null;
};
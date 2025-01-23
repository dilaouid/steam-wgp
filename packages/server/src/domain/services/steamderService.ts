import { FastifyInstance } from "fastify";
import { activateSteamder, checkSteamderExists, completeSteamder, countPlayerGamesLibrary, deleteSteamder, getGameById, getSteamderByID, getSteamderPlayersAndGames, getSteamders, getSteamdersPagination, insertSteamder, isPlayerInSteamder, joinSteamder, leaveSteamder, TGetSteamdersOptions, updateSteamder } from "@repositories";
import { formatPlayers, getCommonGames, getCommonGamesController, removeDuplicates, removeDuplicatesController } from "@utils//gamesUtils";
import { SteamderInsert } from "@entities";
import { HttpError } from "domain/HttpError";
import { WebSocketService } from "./websocket.service";
import { GetSteamdersQuery } from "@validations/dashboard/steamders.validations";

interface ISteamderExistsReturns {
    success: boolean;
    message: string | null;
    status: number;
}

/**
 * Checks if the steamder is available for a given steamder ID and player ID (and the steamder haven't started yet)
 *
 * @param fastify - The Fastify instance.
 * @param steamderId - The ID of the steamder.
 * @param playerId - The ID of the player.
 * @returns A promise that resolves to an object containing the result of the check.
 */
export const isSteamderAvailable = async (fastify: FastifyInstance, steamderId: string): Promise<ISteamderExistsReturns> => {
  try {

    const [ steamder ] = await checkSteamderExists(fastify, steamderId, false);
    if (!steamder) {
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

    await updateSteamder(fastify, steamderId, { common_games: commonGamesIds.length, all_games: allGamesIds.length });
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
export const getSteamderInfos = async (fastify: FastifyInstance, steamderId: string, onlyActive: boolean = true) => {
  try {
    const steamder = await getSteamderPlayersAndGames(fastify, steamderId, onlyActive);
    return steamder;
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
    const [ steamder ] = await isPlayerInSteamder(fastify, playerId, steamderId);
    const { steamders } = steamder;
    fastify.log.info(`Player ${playerId} leaving steamder ${steamderId}`);

    // If the player is not in the steamder, return false
    if (!steamders) {
      fastify.log.warn(`Player ${playerId} not found in steamder ${steamderId}`);
      return { success: false, message: "room_does_not_exist", status: 404 };
    }

    // If the steamder has already started, return false
    if (steamders.started) {
      fastify.log.warn(`Steamder ${steamderId} already started`);
      return { success: false, message: "room_already_started", status: 400 };
    }

    // If the player is the admin, delete the steamder
    if (steamders.admin_id === playerId) {
      fastify.log.warn(`Player ${playerId} is the admin of steamder ${steamderId}`);
      await deleteSteamder(fastify, steamderId);
      return { success: true, message: "left_the_room", status: 200 };
    }

    fastify.log.info(`It's possible to leave the steamder ${steamderId}`);

    // Otherwise, delete the player from the steamder and updates the game lists from it
    await leaveSteamder(fastify, playerId, steamderId);
    await updateGameLists(fastify, steamderId);
    return { success: true, message: "left_the_room", status: 200 };
  } catch (err) {
    fastify.log.error('------- Error in leaveAndUpdateSteamder -------');
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
  steamderInfos[0].steamder.admin_id = steamderInfos[0].steamder.admin_id.toString();

  const commonGames = getCommonGamesController(players.map((player: any) => ({
    games: player.games,
    player_id: player.player_id
  })));
  const allGames = removeDuplicatesController(players.map((p: any) => p.games).flat());

  return {
    ...steamderInfos[0].steamder,
    players: players,
    common_games: commonGames,
    all_games: allGames
  };
};

export const paginateSteamder = async (fastify: FastifyInstance, offset: number, limit: number) => {
  const steamders = await getSteamdersPagination(fastify, limit, offset);
  return steamders || null;
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
  const [numberOfGames] = await countPlayerGamesLibrary(fastify, playerId);

  const data: SteamderInsert = {
    admin_id: playerId,
    name,
    private: isPrivate,
    complete: false,
    started: false,
    common_games: numberOfGames.count,
    all_games: numberOfGames.count
  };

  fastify.log.info(`Creating steamder ${name} for player ${playerId}`);

  const [ steamder ] = await insertSteamder(fastify, data);
  await joinSteamder(fastify, playerId, steamder.id);
  return { ...steamder, admin_id: playerId.toString() };
};

/**
 * Simply delete the Steamder, without checking if the player is the admin or not
 * This also clears the WebSockets map of the Steamder for caching performance purposes
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} steamderId - The ID of the Steamder to delete.
 * @returns {Promise<void>} - A promise that resolves when the Steamder is deleted.
 * @throws {Error} - If there is an error while deleting the Steamder.
 */
export const deleteSteamderById = async (fastify: FastifyInstance, steamderId: string) => {
  const [ steamder ] = await getSteamderByID(fastify, steamderId);
  if (!steamder) {
    throw new HttpError({
      message: "steamder_not_found",
      statusCode: 404
    })
  }

  if (!steamder.completed) {
    WebSocketService.closeSteamderConnections(fastify, steamderId);
  }

  await deleteSteamder(fastify, steamderId);
  return;
};

/**
 * Get all the informations about a Steamder
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} steamderId - The ID of the Steamder to get the informations from.
 * @returns {Promise<any>} - A promise that resolves to the Steamder informations.
 * @throws {HttpError} - If the Steamder is not found.
 */
export const getSteamderById = async (fastify: FastifyInstance, steamderId: string) => {
  const steamder = await getSteamderInfos(fastify, steamderId, false);
  if (!steamder.length) {
    throw new HttpError({
      message: "steamder_not_found",
      statusCode: 404
    });
  }

  const formattedSteamder = formatSteamderInfos(steamder);

  return formattedSteamder;
};

export const getSteamdersInfo = async (
  fastify: FastifyInstance,
  query: GetSteamdersQuery
) => {
  try {
    const options: TGetSteamdersOptions = {
      page: query.page,
      limit: query.limit,
      sort: query.sort_field && query.sort_order
        ? {
          field: query.sort_field,
          order: query.sort_order
        }
        : undefined,
      filters: {
        search: query.search,
        isPrivate: query.is_private,
        isComplete: query.is_complete
      }
    };

    // clean undefined filters to avoid errors
    if (options.filters) {
      Object.keys(options.filters).forEach(key => {
        if (options.filters![key as keyof typeof options.filters] === undefined) {
          delete options.filters![key as keyof typeof options.filters];
        }
      });

      if (Object.keys(options.filters).length === 0) {
        delete options.filters;
      }
    }

    const steamders = await getSteamders(fastify, options);
    return steamders;

  } catch (err: any) {
    if (err instanceof HttpError) throw err;

    throw new HttpError({
      message: "failed_to_get_steamders",
      statusCode: 500
    });
  }
};

/**
 * Service to kick a player from a Steamder (only the admin can call this service)
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} steamderId - The ID of the Steamder.
 * @param {string} playerId - The ID of the player to kick.
 * @returns {Promise<void>} - A promise that resolves when the player is kicked.
 * @throws {HttpError} - If the player is not in the Steamder or if the Steamder is already started.
 */
export const kickPlayerFromSteamder = async (
  fastify: FastifyInstance,
  steamderId: string,
  playerId: bigint
) => {
  try {
    const [ steamder ] = await isPlayerInSteamder(fastify, playerId, steamderId);
    if (!steamder) {
      throw new HttpError({
        message: "player_not_in_steamder",
        statusCode: 404
      });
    }

    if (steamder.started) {
      throw new HttpError({
        message: "steamder_already_started",
        statusCode: 400
      });
    }

    await leaveAndUpdateSteamder(fastify, steamderId, BigInt(playerId));
    WebSocketService.removePlayerFromSteamder(fastify, steamderId, playerId.toString());
    WebSocketService.notifyPlayersInSteamder(fastify, steamderId, { action: "kicked", playerId: playerId.toString() });

    return;
  } catch (err: any) {
    if (err instanceof HttpError) throw err;
    fastify.log.error(err);

    throw new HttpError({
      message: "failed_to_kick_player",
      statusCode: 500
    });
  }
};

export const updateSteamderInformations = async (
  fastify: FastifyInstance,
  steamderId: string,
  body: { name?: string; private_steamder?: boolean; complete?: boolean; selected?: number; display_all_games?: boolean }
) => {
  try {
    const steamder = await getSteamderById(fastify, steamderId);

    if (body.complete) {
      // Cannot end a steamder with no game selected as winner
      if (!body.selected && !steamder.selected) {
        throw new HttpError({
          message: "game_not_selected",
          statusCode: 400
        });
      }

      // Cannot complete a steamder with only one player
      if (steamder.players.length < 2) {
        throw new HttpError({
          message: "not_enough_players",
          statusCode: 400
        });
      }

      // Cannot complete a steamder with no games at all
      if (steamder.all_games.length === 0) {
        throw new HttpError({
          message: "no_games",
          statusCode: 400
        });
      }

      // Cannot complete a steamder with no games in common if steamder.display_all_games is false
      if (steamder.common_games.length === 0 && (!body.display_all_games && !steamder.display_all_games)) {
        throw new HttpError({
          message: "no_common_games",
          statusCode: 400
        });
      }
    }

    if (steamder.complete && body.complete === false) {
      body.selected = 0;
    }

    if (body.selected) {
      const [ game ] = await getGameById(fastify, body.selected);
      if (!game) {
        throw new HttpError({
          message: "game_not_found",
          statusCode: 404
        });
      }

      // Check if the game is selectable
      if (game.is_selectable === false) {
        throw new HttpError({
          message: "game_not_selectable",
          statusCode: 400
        });
      }

      // Check if the game is in the steamder
      if (steamder.all_games.findIndex((g: any) => g.id === body.selected) === -1) {
        throw new HttpError({
          message: "game_not_in_steamder",
          statusCode: 400
        });
      }

      // Check if the game is in common games and if the steamder is not displaying all games
      if (!body.display_all_games && steamder.common_games.findIndex((g: any) => g.id === body.selected) === -1) {
        throw new HttpError({
          message: "game_not_in_common_games",
          statusCode: 400
        });
      }

    }

    const data = {
      ...(body.name && { name: body.name }),
      ...(body.private_steamder !== undefined && { private: body.private_steamder }),
      ...(body.complete !== undefined && { complete: body.complete }),
      ...(body.selected !== undefined && { selected: body.selected }),
      ...(body.display_all_games !== undefined && { display_all_games: body.display_all_games })
    };

    await updateSteamder(fastify, steamderId, data);

    if (data.complete) {
      // Complete the steamder to the players
      await completeSteamder(fastify, steamderId);
      WebSocketService.notifyPlayersInSteamder(fastify, steamderId, { action: 'gameEnd', choosed_game: data.selected });
      WebSocketService.closeSteamderConnections(fastify, steamderId);
    } else if (!data.complete && steamder.complete) {
      // Uncomplete the steamder to the players
      await activateSteamder(fastify, steamderId);
    }


    return;
  } catch (err: any) {
    fastify.log.error(err);
    throw new HttpError({
      message: "failed_to_update_steamder",
      statusCode: 500
    });
  }
}

/**
 * Promote a player to admin of a Steamder
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} steamderId - The ID of the Steamder.
 * @param {bigint} playerId - The ID of the player to promote.
 * @returns {Promise<void>} - A promise that resolves when the player is promoted.
 * @throws {HttpError} - If the player is already the admin, if the Steamder is already completed or if the player is not in the Steamder.
 */
export const changeSteamderAdmin = async (
  fastify: FastifyInstance,
  steamderId: string,
  playerId: bigint
) => {
  try {
    const steamder = await getSteamderById(fastify, steamderId);
    if (steamder.admin_id === playerId.toString()) {
      throw new HttpError({
        message: "player_already_admin",
        statusCode: 400
      });
    }

    if (steamder.complete) {
      throw new HttpError({
        message: "steamder_already_completed",
        statusCode: 400
      });
    }

    const playerInSteamder = steamder.players.find((p: any) => p.player_id === playerId.toString());
    if (!playerInSteamder) {
      throw new HttpError({
        message: "player_not_in_steamder",
        statusCode: 404
      });
    }

    await updateSteamder(fastify, steamderId, { admin_id: playerId });
    // TODO WS ACTION TO NOTIFY PLAYERS

    return;
  } catch (err: any) {
    if (err instanceof HttpError) throw err;
    fastify.log.error(err);

    throw new HttpError({
      message: "failed_to_change_admin",
      statusCode: 500
    });
  }
};
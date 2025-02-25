import { FastifyInstance } from "fastify";
import {
  deletePlayer,
  getPlayer,
  getPlayerAccordingToId,
  getPlayers,
  getPlayerSteamder,
  insertPlayer,
  leaveSteamder,
  TGetPlayersOptions,
  updatePlayer,
} from "@repositories";
import { Player } from "@entities";
import { HttpError } from "domain/HttpError";
import { TGetPlayersQuery } from "@validations/dashboard";
import { fetchingSteamLibrary, getGamesNotInDB, insertGamesInDatabase, insertGamesInLibrary, IProgressOpt, ISteamResponse, setInitialLibrary } from "./progressService";

/**
 * Updates the avatar hash for a player.
 *
 * @param fastify - The Fastify instance.
 * @param id - The ID of the player.
 * @param currentHash - The current avatar hash.
 * @param avatarHash - The new avatar hash.
 */
export const updateAvatarHash = async (
  fastify: FastifyInstance,
  id: bigint,
  currentHash: string,
  avatarHash: string
) => {
  if (currentHash !== avatarHash) {
    fastify.log.info(`Updating avatar hash for ${id}`);
    await updatePlayer(fastify, id, { avatar_hash: avatarHash });
  }
};

/**
 * Updates the username for a player.
 *
 * @param fastify - The Fastify instance.
 * @param id - The ID of the player.
 * @param currentUsername - The current username of the player.
 * @param username - The new username to update.
 */
export const updateUsername = async (
  fastify: FastifyInstance,
  id: bigint,
  currentUsername: string,
  username: string
) => {
  if (currentUsername !== username) {
    fastify.log.info(`Updating username for ${id}`);
    await updatePlayer(fastify, id, { username });
  }
};

/**
 * Updates the profile URL for a player.
 *
 * @param fastify - The Fastify instance.
 * @param id - The ID of the player.
 * @param currentProfileUrl - The current profile URL of the player.
 * @param profileUrl - The new profile URL to update.
 * @returns A promise that resolves when the profile URL is updated.
 */
export const updateProfileUrl = async (
  fastify: FastifyInstance,
  id: bigint,
  currentProfileUrl: string,
  profileUrl: string
) => {
  if (currentProfileUrl !== profileUrl) {
    fastify.log.info(`Updating profile URL for ${id}`);
    await updatePlayer(fastify, id, { profileurl: profileUrl });
  }
};

export const updateNewData = async (
  fastify: FastifyInstance,
  id: bigint,
  data: Partial<Player>,
  newData: { personaname: string; avatarhash: string; profileurl: string }
) => {
  fastify.log.warn("User already exists");
  await updateAvatarHash(
    fastify,
    id,
    data.avatar_hash as string,
    newData.avatarhash as string
  );
  await updateUsername(
    fastify,
    id,
    data.username as string,
    newData.personaname as string
  );
  await updateProfileUrl(
    fastify,
    id,
    data.profileurl as string,
    newData.profileurl as string
  );
};

export const retrieveUserById = async (
  fastify: FastifyInstance,
  id: bigint,
  player: { personaname: string; avatarhash: string; profileurl: string }
) => {
  const [user] = await getPlayerAccordingToId(fastify, id);
  if (!user) {
    fastify.log.info("Inserting new user");
    const [newUser] = await insertPlayer(fastify, { id, avatar_hash: player.avatarhash, username: player.personaname, profileurl: player.profileurl }, [
      "id",
      "avatar_hash",
    ]);
    return newUser;
  } else {
    fastify.log.warn("User already exists");
    await updateNewData(fastify, id, user, player);
    return user;
  }
};

export const getUserInfo = async (
  fastify: FastifyInstance,
  id: bigint
) => {
  try {
    const player = await getPlayer(fastify, id);

    return player;
  } catch (err: any) {
    if (err instanceof HttpError)
      throw err;
    throw new HttpError({
      message: "player_not_found",
      statusCode: 404
    });
  }
};

export const getPlayersInfo = async (
  fastify: FastifyInstance,
  query: TGetPlayersQuery
) => {
  try {
    const options: TGetPlayersOptions = {
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
        isAdmin: query.is_admin,
        hasActiveSteamder: query.has_active_steamder,
        minGamesInLibrary: query.min_games
      }
    };

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

    const players = await getPlayers(fastify, options);
    return players;

  } catch (err: any) {
    if (err instanceof HttpError) throw err;

    throw new HttpError({
      message: "failed_to_get_players",
      statusCode: 500
    });
  }
};

export const deleteUser = async (
  fastify: FastifyInstance,
  id: bigint
) => {
  try {
    const [ playerExists ] = await getPlayer(fastify, id);
    if (!playerExists) {
      throw new HttpError({
        message: "player_not_found",
        statusCode: 404
      })
    }

    const [ playerSteamder ] = await getPlayerSteamder(fastify, id);
    if (playerSteamder) {
      await leaveSteamder(fastify, id, playerSteamder.id);
    }

    await deletePlayer(fastify, id);

    // also update steamders live in websockets (todo)
    // const steamders = fastify.steamders.get(id.toString());
  } catch (err: any) {
    if (err instanceof HttpError) throw err;

    throw new HttpError({
      message: "failed_to_delete_player",
      statusCode: 500
    });
  }
};

export const update = async (fastify: FastifyInstance, id: bigint, data: Partial<Player>) => {
  try {
    await updatePlayer(fastify, id, data);
  } catch (err) {
    if (err instanceof HttpError) throw err;

    throw new HttpError({
      message: "failed_to_update_player",
      statusCode: 500
    });
  }
};

export const syncPlayerLibrary = async (fastify: FastifyInstance, playerId: bigint): Promise<void> => {
  try {
    // 1. Get player library
    fastify.log.info(`Starting library sync for player ${playerId}`);
    const playerLibraryIds = await setInitialLibrary(fastify, playerId);
    fastify.log.info(`Initial library set with ${playerLibraryIds.size} games`);

    // 2. Fetch steam library
    const { STEAM_GetOwnedGames, STEAM_API_KEY } = fastify.config;
    fastify.log.info(`Using STEAM_GetOwnedGames: ${STEAM_GetOwnedGames}, API key available: ${!!STEAM_API_KEY}`);

    const fetchedSteamLibrary = await fetchingSteamLibrary(
      fastify,
      playerLibraryIds,
      STEAM_GetOwnedGames as string,
      STEAM_API_KEY as string,
      playerId
    ) as IProgressOpt & { library: ISteamResponse | null };

    fastify.log.info(`fetchingSteamLibrary returned: ${JSON.stringify({
      message: fetchedSteamLibrary.message,
      type: fetchedSteamLibrary.type,
      complete: fetchedSteamLibrary.complete,
      progress: fetchedSteamLibrary.progress,
      hasLibrary: !!fetchedSteamLibrary.library
    })}`);

    // Si on ne peut pas accéder à la bibliothèque
    if (!fetchedSteamLibrary.library) {
      fastify.log.warn(`Steam library not accessible for player ${playerId}`);

      // Vérifier si le problème est que le profil est privé
      if (fetchedSteamLibrary.message === "steam_library_not_accessible") {
        fastify.log.info("Possible private profile detected");
        throw new Error("steam_profile_may_be_private");
      }

      throw new Error(fetchedSteamLibrary.message || "steam_library_not_accessible");
    }

    // À ce stade, nous avons la bibliothèque Steam
    const steamLibrary = fetchedSteamLibrary.library;
    fastify.log.info(`Steam library contains ${steamLibrary.games?.length || 0} games`);

    // 3. Get games not in DB yet
    const { gamesToAddToLibrary, appIdsNotInDB } = await getGamesNotInDB(fastify, steamLibrary, playerLibraryIds);
    fastify.log.info(`Found ${gamesToAddToLibrary.length} games to add to library and ${appIdsNotInDB.length} games not in DB`);

    // 4. Insert new games to the Games table
    let gamesToAdd = 0;
    if (appIdsNotInDB.length > 0) {
      gamesToAdd = await insertGamesInDatabase(fastify, appIdsNotInDB);
      fastify.log.info(`Inserted ${gamesToAdd} new games into the database`);
    }

    // 5. Insert games to the player's library
    const insertedToLibrary = await insertGamesInLibrary(fastify, playerId, gamesToAddToLibrary);
    fastify.log.info(`Inserted ${insertedToLibrary} games into player's library`);

    if (insertedToLibrary < gamesToAddToLibrary.length && gamesToAddToLibrary.length > 0) {
      fastify.log.warn(`Only ${insertedToLibrary} out of ${gamesToAddToLibrary.length} games were added to the library`);
    }
  } catch (error) {
    fastify.log.error(`Failed to sync player library: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

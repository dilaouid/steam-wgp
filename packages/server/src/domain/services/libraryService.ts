import { FastifyInstance } from "fastify";
import { deleteGameLibrary, getGameById, getPlayerAccordingToId, getPlayerAllLibrary, insertToLibrary, updateLibraryVisibility } from "@repositories";
import { HttpError } from "domain/HttpError";

interface ILibraryGame {
  id: number;
  hidden: boolean | null;
}
type Library = ILibraryGame[]

export async function toggleHiddenGames(
  fastify: FastifyInstance,
  userId: bigint,
  gameIds: number[],
  library: Library
): Promise<void> {
  // split games into hidden and visible
  const { hiddenGames, visibleGames } = library.reduce(
    (acc, game) => {
      if (gameIds.includes(game.id)) {
        game.hidden = !game.hidden; // bascule l'état caché
        if (game.hidden) {
          acc.hiddenGames.push(game);
        } else {
          acc.visibleGames.push(game);
        }
      }
      return acc;
    },
    { hiddenGames: [] as ILibraryGame[], visibleGames: [] as ILibraryGame[] }
  );

  // update hidden games
  if (hiddenGames.length) {
    await updateLibraryVisibility(fastify, userId, hiddenGames, true);
  }

  // update visible games
  if (visibleGames.length) {
    await updateLibraryVisibility(fastify, userId, visibleGames, false);
  }
}

export const checkGamesInLibrary = async (fastify: FastifyInstance, userId: bigint, gameIds: number[]) => {
  const library = (await getPlayerAllLibrary(
    fastify,
    userId
  )) as unknown as Library;
  const libraryIds = library.map((game) => game.id);
  const isAllIdInLibrary = gameIds.every((id) => libraryIds.includes(id));

  if (!isAllIdInLibrary) {
    throw new Error("invalid_id");
  }

  return library;
};

export const getLibrary = async (fastify: FastifyInstance, userId: bigint) => {
  try {
    if (userId <= 0)
      throw new Error("invalid_player_id");

    const [playerExists] = await getPlayerAccordingToId(fastify, userId);
    if (!playerExists)
      throw new Error("player_not_found");

    return getPlayerAllLibrary(fastify, userId);
  } catch (err: Error | any) {
    fastify.log.error(err);
    throw new HttpError({
      message: (err as Error).message,
      statusCode: 400
    });
  }
};

export const deleteGameFromLibrary = async (fastify: FastifyInstance, { playerId, gameId }: { playerId: bigint, gameId: number }) => {
  try {
    if (playerId <= 0)
      throw new Error("invalid_player_id");

    const [playerExists] = await getPlayerAccordingToId(fastify, playerId);
    if (!playerExists)
      throw new Error("player_not_found");

    const library = await getPlayerAllLibrary(fastify, playerId);
    const game = library.find((game) => game.id === gameId);

    if (!game)
      throw new Error("game_not_in_library");

    await deleteGameLibrary(fastify, playerId, gameId);

    return {
      message: "game_deleted"
    };
  } catch (err: Error | any) {
    fastify.log.error(err);
    throw new HttpError({
      message: err.message,
      statusCode: 400
    });
  }
};

export const addGame = async (fastify: FastifyInstance, { player_id, game_id, hidden }: { player_id: bigint, game_id: number, hidden: boolean }) => {
  try {
    const [ playerExists ] = await getPlayerAccordingToId(fastify, player_id);
    if (!playerExists)
      throw new Error("player_not_found");

    const [ gameExists ] = await getGameById(fastify, game_id);
    if (!gameExists)
      throw new Error("game_not_found");

    const library = await getPlayerAllLibrary(fastify, player_id);
    const game = library.find((game) => game.id === game_id);

    if (game)
      throw new Error("game_already_in_library");

    await insertToLibrary(fastify, { game_id, hidden, player_id });

    return {
      message: "game_added"
    };
  } catch (err: Error | any) {
    fastify.log.error(err);
    throw new HttpError({
      message: err.message,
      additionalInfo: err
    });
  }
};
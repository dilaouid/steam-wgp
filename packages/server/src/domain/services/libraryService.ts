import { FastifyInstance } from "fastify";
import { updateLibraryVisibility } from "@repositories";
import { getPlayerAllLibrary } from "@repositories";

type Library = ILibraryGame[]

interface ILibraryGame {
    id: string;
    hidden: boolean | null;
}

export async function toggleHiddenGames(
  fastify: FastifyInstance,
  userId: bigint,
  gameIds: string[],
  library: Library
): Promise<void> {
  // split games into hidden and visible
  const { hiddenGames, visibleGames } = library.reduce(
    (acc, game) => {
      if (gameIds.includes(game.id.toString())) {
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

export const checkGamesInLibrary = async (fastify: FastifyInstance, userId: bigint, gameIds: string[]) => {
  const library = (await getPlayerAllLibrary(
    fastify,
    userId
  )) as unknown as Library;
  const libraryIds = library.map((game) => game.id.toString());
  const isAllIdInLibrary = gameIds.every((id) => libraryIds.includes(id));

  if (!isAllIdInLibrary) {
    throw new Error("invalid_id");
  }

  return library;
};
import { createController } from "@utils/controller";
import { getLibrary, deleteGameFromLibrary, addGame, toggleHiddenGames, checkGamesInLibrary } from "@services/libraryService";
import { addToLibrarySchema, updateLibrarySchema, validPlayerId } from "@validations/dashboard";

export const libraryController = {
  getPlayer: createController(async ({ fastify, params }) => {
    const { playerId } = params;

    const data = await getLibrary(fastify, playerId);
    return {
      statusCode: 200,
      data,
      message: "OK"
    };
  }),

  deleteGame: createController(async ({ fastify, params }) => {
    const { playerId, gameId } = params;

    const data = await deleteGameFromLibrary(fastify, { playerId, gameId });
    return {
      statusCode: 200,
      data,
      message: "game_deleted"
    };
  }),

  addGame: createController(async ({ fastify, body, params }) => {
    const { player_id } = validPlayerId.parse(params);
    const { hidden, game_id } = addToLibrarySchema.parse(body);

    const data = await addGame(fastify, { hidden, game_id, player_id });
    return {
      statusCode: 201,
      data,
      message: "game_added"
    };
  }),

  updateGames: createController(async ({ fastify, body, params }) => {
    const { player_id } = validPlayerId.parse(params);
    const { games } = updateLibrarySchema.parse(body);

    const library = await checkGamesInLibrary(fastify, player_id, games);

    await toggleHiddenGames(fastify, player_id, games, library);
    return {
      statusCode: 200,
      message: "updated_library"
    };
  })
}
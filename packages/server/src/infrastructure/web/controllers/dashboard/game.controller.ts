import { addGame, getGame, paginateGames, updateGameStatus } from "@services/game.service";
import { gamePropertiesSchema, isValidGameId, isValidSelectable, paginateGamesSchema } from "@validations/dashboard";
import { createController } from "@utils/controller";

export const gamesController = {
  /*
    * Get list of all games with pagination
  */
  getGames: createController(async ({ fastify, query }) => {
    const { offset, limit, onlyIsSelectable, onlyNotSelectable } = paginateGamesSchema.parse(query);
    const data = await paginateGames(fastify, offset, limit, { onlyIsSelectable, onlyNotSelectable });
    return {
      statusCode: 200,
      data,
      message: "OK"
    };
  }),

  /*
    * Get a game by its ID
  */
  getGame: createController(async ({ fastify, params }) => {
    const { id } = params;
    const data = await getGame(fastify, id);
    return {
      statusCode: 200,
      data,
      message: "OK"
    };
  }),

  /*
    * Create a game
  */
  createGame: createController(async ({ fastify, body }) => {
    const parsedBody = gamePropertiesSchema.parse(body);
    const data = await addGame(fastify, parsedBody);
    return {
      statusCode: 201,
      data,
      message: "game_added"
    };
  }),

  /*
    * Update a game by its ID (switching isSelectable)
  */
  updateGame: createController(async ({ fastify, params, body }) => {
    const { id } = isValidGameId.parse(params);
    const { is_selectable } = isValidSelectable.parse(body);

    const data = await updateGameStatus(fastify, { id, is_selectable });
    return {
      statusCode: 200,
      data,
      message: "game_updated"
    };
  })
}

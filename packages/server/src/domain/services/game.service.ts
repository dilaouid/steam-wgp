import { FastifyInstance } from "fastify";
import { HttpError } from "domain/HttpError";
import {
  getGameById,
  createGame,
  searchGames,
  updateGame
} from "@repositories";

/**
 * Pagination service for games available in the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {number} page - The page number.
 * @param {number} limit - The number of games per page.
 * @param {object} options - The options for the pagination (search query, only selectable, only not selectable ...)
 * @returns {Promise<any[]>} - A promise that resolves to the list of games.
 */
export const paginateGames = async (
  fastify: FastifyInstance,
  offset: number,
  limit: number,
  options: { onlyIsSelectable?: boolean; onlyNotSelectable?: boolean }
): Promise<any[]> => {
  if (options.onlyIsSelectable && options.onlyNotSelectable) {
    throw new HttpError({
      message: "Les options onlyIsSelectable et onlyNotSelectable sont mutuellement exclusives",
      statusCode: 400,
    });
  }

  return searchGames(fastify, {
    ...options,
    limit,
    offset,
  });
};

/**
 * Get a game by its ID.
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {number} id - The ID of the game.
 * @returns {Promise<any>} - A promise that resolves to the list of games.
 */
export const getGame = async (
  fastify: FastifyInstance,
  id: number
): Promise<any> => {
  try {
    return await getGameById(fastify, id);
  } catch (error) {
    throw new HttpError({
      message: "Erreur lors de la récupération du jeu",
      additionalInfo: error,
    });
  }
};

/**
 * Create a game.
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {object} game - The game to create.
 * @returns {Promise<any>} - A promise that resolves to the created game.
 */
export const addGame = async (
  fastify: FastifyInstance,
  game: { id: number; is_selectable: boolean }
): Promise<any> => {
  try {
    // check if the game exists in the Steam API
    const gameDetailsResponse = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${game.id}`
    );
    const gameDetails = ((await gameDetailsResponse?.json()) as any) || null;
    if (!gameDetails) {
      fastify.log.warn(
        `Game ${game.id} is not selectable - Steam API is not responding in https://store.steampowered.com/api/appdetails?appids=${game.id}...`
      );
      throw Error(
        `Game ${game.id} is not selectable - Steam API is not responding in https://store.steampowered.com/api/appdetails?appids=${game.id}...`
      );
    }

    return await createGame(fastify, game);
  } catch (error) {
    throw new HttpError({
      message: "Erreur lors de la création du jeu",
      additionalInfo: error,
    });
  }
};

/**
 * Update a game (switch selectable status).
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {number} id - The ID of the game.
 * @param {boolean} isSelectable - The new selectable status.
 * @returns {Promise<any>} - A promise that resolves to the updated game.
 */
export const updateGameStatus = async (
  fastify: FastifyInstance,
  id: number,
  isSelectable: boolean
): Promise<any> => {
  try {
    const game = await getGameById(fastify, id);
    if (!game) {
      throw new HttpError({
        message: "Le jeu n'existe pas en base de données",
        statusCode: 404,
      });
    }

    return await updateGame(fastify, id, isSelectable);
  } catch (error) {
    throw new HttpError({
      message: "Erreur lors de la mise à jour du jeu",
      additionalInfo: error,
    });
  }
};

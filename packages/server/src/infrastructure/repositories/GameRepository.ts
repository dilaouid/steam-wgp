import { FastifyInstance } from "fastify";
import { games } from "@schemas";
import { and, count, eq, inArray } from "drizzle-orm";

export const countGames = async (fastify: FastifyInstance): Promise<any> => {
  const { db } = fastify;
  return await db
    .select({
      count: count(),
    })
    .from(games)
    .execute();
};

/**
 * Retrieves games according to the provided list of IDs.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {number[]} list - The list of game IDs.
 * @returns {Promise<any>} - A promise that resolves to the retrieved games.
 */
export const getGamesAccordingToList = async (
  fastify: FastifyInstance,
  list: number[]
): Promise<any> => {
  const { db } = fastify;
  return await db
    .select({
      id: games.id,
    })
    .from(games)
    .where(inArray(games.id, list))
    .execute();
};

/**
 * Inserts games into the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param gamesToAdd - An array of games to add, each containing the game_id, is_selectable, and optional id.
 * @returns A promise that resolves with the result of the insertion.
 */
export const insertGames = async (
  fastify: FastifyInstance,
  gamesToAdd: { id: number; is_selectable: boolean }[]
): Promise<any> => {
  const { db } = fastify;
  return db.insert(games).values(gamesToAdd).returning().execute();
};

/**
 * Get a game by its ID.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {number} id - The ID of the game.
 * @returns {Promise<any>} - A promise that resolves to the list of games.
 */
export const getGameById = async (
  fastify: FastifyInstance,
  id: number
): Promise<any> => {
  const { db } = fastify;
  return db.select().from(games).where(eq(games.id, id)).execute();
};

/**
 * Create a new game.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {int} id - The game Steam id.
 * @param {boolean} isSelectable - Whether the game is selectable in a Steamder
 * @returns {Promise<any>} - A promise that resolves to the created game.
 */
export const createGame = async (
  fastify: FastifyInstance,
  id: number,
  is_selectable: boolean
): Promise<any> => {
  try {
    const { db } = fastify;
    return db.insert(games).values({ id, is_selectable }).returning().execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to create game");
  }
};

/**
 * Get a list of games according to the search query.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} search - The search query.
 * @param {number} page - The page number.
 * @param {number} limit - The number of games per page.
 * @returns {Promise<any[]>} - A promise that resolves to the list of games.
 */
export const searchGames = async (
  fastify: FastifyInstance,
  onlyIsSelectable: boolean,
  onlyNotSelectable: boolean,
  limit: number,
  offset: number
): Promise<any[]> => {
  try {
    const { db } = fastify;
    return db
      .select()
      .from(games)
      .where(
        and(
          eq(games.is_selectable, onlyIsSelectable),
          eq(games.is_selectable, onlyNotSelectable)
        )
      )
      .limit(limit)
      .offset(offset);
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to search games");
  }
};

/**
 * Update a game by its id.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {int} id - The game Steam id.
 * @param {boolean} isSelectable - Whether the game is selectable in a Steamder
 * @returns {Promise<any>} - A promise that resolves to the updated game.
 */
export const updateGame = async (
  fastify: FastifyInstance,
  id: number,
  is_selectable: boolean
): Promise<any> => {
  try {
    const { db } = fastify;
    return db
      .update(games)
      .set({ is_selectable })
      .where(eq(games.id, id))
      .returning()
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to update game");
  }
};

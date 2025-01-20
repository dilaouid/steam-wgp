import { FastifyInstance } from "fastify";
import { games } from "@schemas";
import { count, eq, inArray } from "drizzle-orm";

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

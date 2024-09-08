import { FastifyInstance } from "fastify";
import { games } from "../data/schemas";
import { count, inArray } from "drizzle-orm";

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
  gamesToAdd: { game_id: number; is_selectable: boolean; id?: number }[]
): Promise<any> => {
  const { db } = fastify;
  return db.insert(gamesToAdd).into(games).onConflictDoNothing().execute();
};
import { FastifyInstance } from "fastify";
import { eq, and } from "drizzle-orm";

import { games } from "@schemas";

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

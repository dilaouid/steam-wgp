import { FastifyInstance } from "fastify";
import { and, eq, inArray } from "drizzle-orm";

import { games, libraries } from "../data/schemas";
import { Library } from "../../domain/entities";

/**
 * Retrieves the player's library from the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} id - The ID of the player.
 * @returns {Promise<any>} - A promise that resolves to the player's library.
 * @throws {Error} - If there is an error retrieving the player's library.
 */
export const getPlayerLibrary = async (
  fastify: FastifyInstance,
  id: bigint
) => {
  try {
    const { db } = fastify;
    return db
      .select({ game_id: libraries.game_id })
      .from(libraries)
      .where(eq(libraries.player_id, id))
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to get player games library");
  }
};

/**
 * Retrieves the games library for a specific player.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} id - The ID of the player.
 * @returns {Promise<any>} - A promise that resolves to the games library.
 * @throws {Error} - If there is an error retrieving the games library.
 */
export const getPlayerGamesLibrary = async (
  fastify: FastifyInstance,
  id: bigint
) => {
  try {
    const { db } = fastify;
    return db
      .select({ game_id: libraries.game_id })
      .leftJoin(games, eq(libraries.game_id, games.id))
      .where(
        and(
          eq(libraries.player_id, id),
          eq(libraries.hidden, false),
          eq(games.is_selectable, true)
        )
      )
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to get player games library");
  }
};

/**
 * Inserts a game into the library.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {Library} values - The values of the game to be inserted.
 * @returns {Promise<void>} - A promise that resolves when the game is inserted successfully.
 * @throws {Error} - If there is an error inserting the game.
 */
export const insertToLibrary = async (
  fastify: FastifyInstance,
  values: Library
) => {
  try {
    const { db } = fastify;
    return db.insert(libraries).values(values).onConflictDoNothing().execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to insert game to library");
  }
};

/**
 * Updates the visibility of libraries in the database.
 *
 * @param fastify - The Fastify instance.
 * @param userId - The ID of the user.
 * @param gameIds - An array of game IDs and their corresponding visibility status.
 * @param hidden - The new visibility status to be set.
 * @returns A promise that resolves to the number of affected rows.
 * @throws An error if the update operation fails.
 */
export const updateLibraryVisibility = async (
  fastify: FastifyInstance,
  userId: bigint,
  gameIds: { id: string; hidden: boolean | null }[],
  hidden: boolean
) => {
  try {
    const { db } = fastify;
    return db
      .update(libraries)
      .set({ hidden })
      .where(
        and(
          eq(libraries.player_id, userId),
          inArray(
            libraries.game_id,
            gameIds.map(game => parseInt(game.id))
          )
        )
      )
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to update library visibility");
  }
};

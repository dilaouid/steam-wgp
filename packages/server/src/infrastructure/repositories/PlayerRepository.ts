import { FastifyInstance } from "fastify";
import { and, count, eq } from "drizzle-orm";

import { games, libraries, players } from "@schemas";
import { Player } from "@entities";

/**
 * Deletes a player from the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} id - The ID of the player to delete.
 * @returns {Promise<any>} - A promise that resolves to the result of the delete operation.
 * @throws {Error} - If there is an error deleting the player.
 */
export const deletePlayer = async (fastify: FastifyInstance, id: bigint) => {
  try {
    const { db } = fastify;
    return db.delete(players).where({ id }).execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to delete player");
  }
};

/**
 * Retrieves a player from the database based on their Steam ID.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} steamid - The Steam ID of the player.
 * @returns {Promise<any>} - A promise that resolves to the player data.
 * @throws {Error} - If there is an error retrieving the player.
 */
export const getPlayerAccordingToSteamId = async (
  fastify: FastifyInstance,
  steamid: bigint
) => {
  try {
    const { db } = fastify;
    return db.select().from(players).where(eq(players.id, steamid)).execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to get player");
  }
};

/**
 * Retrieves a player from the database based on their ID.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} id - The ID of the player.
 * @returns {Promise<any>} - A promise that resolves to the player data.
 * @throws {Error} - If there is an error retrieving the player.
 */
export const getPlayerAccordingToId = async (
  fastify: FastifyInstance,
  id: bigint
) => {
  try {
    const { db } = fastify;
    return db.select().from(players).where(eq(players.id, id)).execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to get player");
  }
};

/**
 * Updates a player in the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} steamid - The Steam ID of the player to update.
 * @param {Partial<Player>} data - The data to update the player with.
 * @returns A promise that resolves to the result of the update operation.
 * @throws An error if the update operation fails.
 */
export const updatePlayer = async (
  fastify: FastifyInstance,
  steamid: bigint,
  data: Partial<Player>
) => {
  try {
    const { db } = fastify;
    return db
      .update(players)
      .set(data)
      .where(eq(players.id, steamid))
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to update player");
  }
};

/**
 * Inserts a player into the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {Partial<Player>} data - The data to insert.
 * @param {(keyof Player)[]} [returning] - The fields to return after the insertion.
 * @returns {Promise<any>} - A promise that resolves to the result of the insertion.
 * @throws {Error} - If there is an error inserting the player.
 */
export const insertPlayer = async (
  fastify: FastifyInstance,
  data: Partial<Player>,
  returning?: (keyof Player)[]
) => {
  try {
    const { db } = fastify;
    let query = db.insert(players).values(data);
    if (returning && returning.length > 0) {
      const returnObject = Object.fromEntries(
        returning.map(key => [key, players[key]])
      );
      query = query.returning(returnObject);
    } else {
      query = query.returning();
    }
    return query;
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to insert player");
  }
};

/**
 * Retrieves all players from the database and counts them.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @returns {Promise<any>} - A promise that resolves to the players.
 * @throws {Error} - If there is an error retrieving the players.
 */
export const countPlayers = async (fastify: FastifyInstance) => {
  try {
    const { db } = fastify;
    return db
      .select({
        count: count()
      })
      .from(players)
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to count players");
  }
};

/**
 * Retrieves distinct players based on the provided player ID.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player.
 * @returns {Promise<any>} - A promise that resolves to the distinct players.
 * @throws {Error} - If there is an error retrieving the distinct players.
 */
export const getDistinctPlayers = async (
  fastify: FastifyInstance,
  playerId: bigint
) => {
  try {
    const { db } = fastify;
    return db
      .selectDistinct()
      .from(players)
      .rightJoin(
        libraries,
        and(
          eq(players.id, libraries.player_id), eq(libraries.hidden, false)
        )
      )
      .rightJoin(games, eq(libraries.game_id, games.id))
      .where(
        and(
          eq(players.id, BigInt(playerId)), eq(games.is_selectable, true)
        )
      )
      .execute();
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to get distinct players");
  }
};

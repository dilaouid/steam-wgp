import { FastifyInstance } from "fastify";
import { libraries, steamders, steamdersPlayers } from "@schemas";
import { and, eq } from "drizzle-orm";

export const isPlayerInASteamder = async (
  fastify: FastifyInstance,
  playerId: bigint
): Promise<any> => {
  return fastify.db
    .select()
    .from(steamdersPlayers)
    .where(
      and(
        eq(steamdersPlayers.player_id, playerId),
        eq(steamdersPlayers.status, 'active')
      )
    )
    .limit(1)
    .execute();
};

export const isPlayerInSteamder = async (
  fastify: FastifyInstance,
  playerId: bigint,
  steamderId: string
): Promise<any> => {
  return fastify.db
    .select()
    .from(steamdersPlayers)
    .where(
      and(
        eq(steamdersPlayers.player_id, playerId),
        eq(steamdersPlayers.steamder_id, steamderId),
        eq(steamdersPlayers.status, 'active')
      )
    )
    .leftJoin(steamders, eq(steamders.id, steamdersPlayers.steamder_id))
    .limit(1)
    .execute();
};

/**
 * Retrieves the players library for a given steamder.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param steamderId - The ID of the steamder.
 * @returns A promise that resolves to the players library.
 */
export const getPlayersLibrary = async (
  fastify: FastifyInstance,
  steamderId: string
): Promise<any> => {
  return fastify.db
    .select()
    .from(steamdersPlayers)
    .leftJoin(
      libraries,
      and(
        eq(steamdersPlayers.player_id, libraries.player_id),
        eq(libraries.hidden, false)
      )
    )
    .where(eq(steamdersPlayers.steamder_id, steamderId))
    .execute();
};

/**
 * Joins a player to a steamder.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player to join the steamder.
 * @param {string} steamderId - The ID of the steamder to join.
 * @returns A promise that resolves to the result of the database operation.
 */
export const joinSteamder = async (
  fastify: FastifyInstance,
  playerId: bigint,
  steamderId: string
): Promise<any> => {
  return fastify.db
    .insert(steamdersPlayers)
    .values({ player_id: playerId, steamder_id: steamderId })
    .execute();
}

/**
 * Removes a player from a steamder.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player to remove.
 * @param {string} steamderId - The ID of the steamder.
 * @returns {Promise<any>} - A promise that resolves when the player is removed from the steamder.
 */
export const leaveSteamder = async (
  fastify: FastifyInstance,
  playerId: bigint,
  steamderId: string
): Promise<any> => {
  return fastify.db
    .delete(steamdersPlayers)
    .where(
      and(
        eq(steamdersPlayers.player_id, playerId),
        eq(steamdersPlayers.steamder_id, steamderId),
        eq(steamdersPlayers.status, 'active')
      )
    )
    .execute();
}

/**
 * Retrieves the steamder player for the given player ID.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player.
 * @returns {Promise<any>} - A promise that resolves to the steamder player.
 */
export const getPlayerSteamder = async (
  fastify: FastifyInstance,
  playerId: bigint
): Promise<any> => {
  return fastify.db
    .select({id: steamdersPlayers.steamder_id})
    .from(steamdersPlayers)
    .where(
      and(
        eq(steamdersPlayers.player_id, playerId),
        eq(steamdersPlayers.status, 'active')
      )
    )
    .execute();
}

/**
 * Update the Steamder Player status to completed.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player.
 * @param {string} steamderId - The ID of the steamder.
 * @returns {Promise<any>} - A promise that resolves to the result of the update operation.
 */
export const completeSteamder = async (
  fastify: FastifyInstance,
  steamderId: string
): Promise<any> => {
  return fastify.db
    .update(steamdersPlayers)
    .set({ status: 'completed', completed_at: new Date() })
    .where(
      eq(steamdersPlayers.steamder_id, steamderId)
    )
    .execute();
}
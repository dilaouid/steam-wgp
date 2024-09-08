import { FastifyInstance } from "fastify";
import { libraries, waitlistsPlayers } from "../data/schemas";
import { and, eq } from "drizzle-orm";

export const isPlayerInAWaitlist = async (
  fastify: FastifyInstance,
  playerId: bigint
): Promise<any> => {
  return fastify.db
    .select()
    .from(waitlistsPlayers)
    .where(eq(waitlistsPlayers.player_id, playerId))
    .limit(1)
    .execute();
};

export const isPlayerInWaitlist = async (
  fastify: FastifyInstance,
  playerId: bigint,
  waitlistId: string
): Promise<any> => {
  return fastify.db
    .select()
    .from(waitlistsPlayers)
    .where(
      and(
        eq(waitlistsPlayers.player_id, playerId),
        eq(waitlistsPlayers.waitlist_id, waitlistId)
      )
    )
    .limit(1)
    .execute();
};

/**
 * Retrieves the players library for a given waitlist.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param waitlistId - The ID of the waitlist.
 * @returns A promise that resolves to the players library.
 */
export const getPlayersLibrary = async (
  fastify: FastifyInstance,
  waitlistId: string
): Promise<any> => {
  return fastify.db
    .select()
    .from(waitlistsPlayers)
    .leftJoin(
      libraries,
      and(
        eq(waitlistsPlayers.player_id, libraries.player_id),
        eq(libraries.hidden, false)
      )
    )
    .where(eq(waitlistsPlayers.waitlist_id, waitlistId))
    .execute();
};

/**
 * Joins a player to a waitlist.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player to join the waitlist.
 * @param {string} waitlistId - The ID of the waitlist to join.
 * @returns A promise that resolves to the result of the database operation.
 */
export const joinWaitlist = async (
  fastify: FastifyInstance,
  playerId: bigint,
  waitlistId: string
): Promise<any> => {
  return fastify.db
    .insert({ player_id: playerId, waitlist_id: waitlistId })
    .into(waitlistsPlayers)
    .returning()
    .execute();
}

/**
 * Removes a player from a waitlist.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player to remove.
 * @param {string} waitlistId - The ID of the waitlist.
 * @returns {Promise<any>} - A promise that resolves when the player is removed from the waitlist.
 */
export const leaveWaitlist = async (
  fastify: FastifyInstance,
  playerId: bigint,
  waitlistId: string
): Promise<any> => {
  return fastify.db
    .delete()
    .from(waitlistsPlayers)
    .where(
      and(
        eq(waitlistsPlayers.player_id, playerId),
        eq(waitlistsPlayers.waitlist_id, waitlistId)
      )
    )
    .execute();
}

/**
 * Retrieves the waitlist player for the given player ID.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} playerId - The ID of the player.
 * @returns {Promise<any>} - A promise that resolves to the waitlist player.
 */
export const getPlayerWaitlist = async (
  fastify: FastifyInstance,
  playerId: bigint
): Promise<any> => {
  return fastify.db
    .select()
    .from(waitlistsPlayers)
    .where(eq(waitlistsPlayers.player_id, playerId))
    .execute();
}
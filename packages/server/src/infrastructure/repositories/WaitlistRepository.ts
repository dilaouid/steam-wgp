import { FastifyInstance } from "fastify";
import {
  waitlists,
  waitlistsPlayers,
  games,
  players,
  libraries,
} from "../data/schemas";
import { and, count, eq, sql } from "drizzle-orm";

export const insertWaitlist = async (
  fastify: FastifyInstance,
  data: any
): Promise<any> => {
  return fastify.db.insert(data).into(waitlists).returning().execute();
};

/**
 * Retrieves the waitlist with players.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} waitlistId - The ID of the waitlist.
 * @returns {Promise<any>} - The result of the query execution.
 */
export const getWaitlistWithPlayers = async (
  fastify: FastifyInstance,
  waitlistId: string
): Promise<any> => {
  return fastify.db
    .select()
    .from(waitlists)
    .leftJoin(waitlistsPlayers, eq(waitlistsPlayers.waitlist_id, waitlists.id))
    .where(eq(waitlists.id, waitlistId))
    .execute();
};

/**
 * Retrieves the waitlist players and games based on the provided waitlist ID.
 *
 * @param fastify - The Fastify instance.
 * @param waitlistId - The ID of the waitlist.
 * @returns A promise that resolves to the waitlist players and games.
 */
export const getWaitlistPlayersAndGames = async (
  fastify: FastifyInstance,
  waitlistId: string
): Promise<any> => {
  return fastify.db
    .select({ waitlist: waitlists, players, games })
    .from(waitlists)
    .leftJoin(waitlistsPlayers, eq(waitlists.id, waitlistsPlayers.waitlist_id))
    .leftJoin(players, eq(waitlistsPlayers.player_id, players.id))
    .leftJoin(
      libraries,
      and(eq(players.id, libraries.player_id), eq(libraries.hidden, false))
    )
    .leftJoin(
      games,
      and(eq(libraries.game_id, games.id), eq(games.is_selectable, true))
    )
    .where(and(eq(waitlists.id, waitlistId), eq(waitlists.complete, false)));
};

/**
 * Retrieves waitlists with pagination and filtering.
 *
 * @param fastify - The Fastify instance.
 * @param limit - The maximum number of waitlists to retrieve.
 * @param offset - The offset for pagination.
 * @returns A promise that resolves to the retrieved waitlists.
 */
export const getWaitlistsPagination = async (
  fastify: FastifyInstance,
  limit: number,
  offset: number
): Promise<any> => {
  return fastify.db
    .select({
      id: waitlists.id,
      name: waitlists.name,
      games: sql`CASE WHEN ${waitlists.display_all_games} THEN ${waitlists.all_games} ELSE ${waitlists.common_games} END`,
      created_at: waitlists.created_at,
      player_count: sql`COUNT(${waitlistsPlayers.player_id})`,
    })
    .from(waitlists)
    .leftJoin(waitlistsPlayers, eq(waitlists.id, waitlistsPlayers.waitlist_id))
    .where(and(eq(waitlists.private, false), eq(waitlists.started, false)))
    .groupBy(waitlists.id)
    .orderBy(waitlists.created_at, "desc")
    .limit(limit)
    .offset(offset)
    .execute();
};

/**
 * Retrieves the number of available waitlists.
 *
 * @param fastify - The Fastify instance.
 * @returns A promise that resolves to the number of available waitlists.
 */
export const countAvailableWaitlists = async (
  fastify: FastifyInstance
): Promise<number> => {
  return fastify.db
    .select({
      count: count(),
    })
    .from(waitlists)
    .where(and(eq(waitlists.private, false), eq(waitlists.started, false)))
    .execute();
};

export const isAdminFromWaitlist = async (
  fastify: FastifyInstance,
  waitlistId: string,
  playerId: bigint
): Promise<any> => {
  return fastify.db
    .select()
    .from(waitlists)
    .where(and(eq(waitlists.id, waitlistId), eq(waitlists.admin_id, playerId)))
    .leftJoin(
      waitlistsPlayers,
      and(
        eq(waitlistsPlayers.waitlist_id, waitlistId),
        eq(waitlistsPlayers.player_id, BigInt(playerId))
      )
    )
    .execute();
};

/**
 * Checks if a waitlist exists (and is not complete) based on the provided ID.
 *
 * @param fastify - The Fastify instance.
 * @param waitlistId - The ID of the waitlist to check.
 * @returns A Promise that resolves to the result of the query execution.
 */
export const checkWaitlistExists = async (
  fastify: FastifyInstance,
  waitlistId: string
): Promise<any> => {
  return fastify.db
    .select()
    .from(waitlists)
    .leftJoin(
      waitlistsPlayers,
      eq(waitlists.id, waitlistsPlayers.waitlist_id)
    )
    .where(
      and(
        eq(waitlists.id, waitlistId),
        eq(waitlists.complete, false)
      )
    )
    .execute();
};

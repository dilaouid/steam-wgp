import { FastifyInstance } from "fastify";
import {
  waitlists,
  waitlistsPlayers,
  games,
  players,
  libraries,
} from "../data/schemas";
import { and, count, desc, eq, ne, sql } from "drizzle-orm";

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
  const { db } = fastify;
  return db
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
  const { db } = fastify;
  return db
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
  const { db } = fastify;
  return db
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
  const { db } = fastify;
  return db
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
  const { db } = fastify;
  return db
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
 * @param started - Whether the waitlist has started.
 * @returns A Promise that resolves to the result of the query execution.
 */
export const checkWaitlistExists = async (
  fastify: FastifyInstance,
  waitlistId: string,
  started: boolean
): Promise<any> => {
  const { db } = fastify;
  return db
    .select()
    .from(waitlists)
    .leftJoin(
      waitlistsPlayers,
      eq(waitlists.id, waitlistsPlayers.waitlist_id)
    )
    .where(
      and(
        eq(waitlists.id, waitlistId),
        eq(waitlists.complete, false),
        eq(waitlists.started, started)
      )
    )
    .execute();
};

/**
 * Deletes a waitlist entry from the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} waitlistId - The ID of the waitlist entry to delete.
 * @returns {Promise<any>} - A promise that resolves when the waitlist entry is deleted.
 */
export const deleteWaitlist = async (
  fastify: FastifyInstance,
  waitlistId: string
): Promise<any> => {
  const { db } = fastify;
  return db
    .delete()
    .from(waitlists)
    .where(eq(waitlists.id, waitlistId))
    .execute();
};

/**
 * Counts the number of waitlists based on the completion status.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {boolean} complete - A boolean indicating the completion status of the waitlists.
 * @returns A Promise that resolves to the count of waitlists.
 */
export const countWaitlists = async (fastify: FastifyInstance, complete: boolean): Promise<any> => {
  const { db } = fastify;
  return db
    .select({
      count: count(),
    })
    .from(waitlists)
    .where(eq(waitlists.complete, complete))
    .execute();
}

/**
 * Retrieves the popular selected games from the waitlist repository.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @returns A promise that resolves to an array of popular games.
 */
export const getPopularGames = async (fastify: FastifyInstance): Promise<any> => {
  const { db } = fastify;
  return db
    .select({
      game_id: waitlists.selected,
      score: count(waitlists.selected),
    })
    .from(waitlists)
    .where(
      and(
        eq(waitlists.complete, true),
        ne(waitlists.selected, 0)
      )
    )
    .groupBy(waitlists.selected)
    .orderBy(desc(count(waitlists.selected)))
    .limit(3)
    .execute();
}

/**
 * Updates the `display_all_games` property of a waitlist in the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} waitlistId - The ID of the waitlist.
 * @param {boolean} displayAllGames - The new value for the `display_all_games` property.
 * @returns {Promise<any>} - A promise that resolves when the update is complete.
 */
export const displayAllGamesSwitch = async (
  fastify: FastifyInstance,
  waitlistId: string,
  displayAllGames: boolean
): Promise<any> => {
  const { db } = fastify;
  return db
    .update(waitlists)
    .set({ display_all_games: displayAllGames })
    .where(eq(waitlists.id, waitlistId))
    .execute();
}
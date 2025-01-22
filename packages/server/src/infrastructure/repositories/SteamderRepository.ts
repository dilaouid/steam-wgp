import { FastifyInstance } from "fastify";
import {
  games,
  players,
  libraries,
  steamders,
  steamdersPlayers
} from "@schemas";
import { and, count, desc, eq, ilike, ne, sql } from "drizzle-orm";

export type TGetSteamdersOptions = {
  page: number;
  limit: number;
  sort?: {
    field: 'name' | 'players_count' | 'created_at';
    order: 'asc' | 'desc';
  };
  filters?: {
    search?: string; // search by steamder name
    isPrivate?: boolean;
    isComplete?: boolean;
  };
};

type TSteamderResult = {
  id: string;
  name: string;
  created_at: Date;
  private: boolean;
  complete: boolean;
  players_count: number;
  common_games: number;
  all_games: number;
  admin_id: string;
  admin_username: string;
  admin_avatar: string;
}

type TGetSteamdersResult = {
  steamders: {
    id: string;
    name: string;
    created_at: Date;
    private: boolean;
    complete: boolean;
    stats: {
      players_count: number;
      common_games: number;
      all_games: number;
    };
    admin: {
      id: string;
      username: string;
      avatar_hash: string;
    };
  }[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
};

export const insertSteamder = async (
  fastify: FastifyInstance,
  data: any
): Promise<any> => {
  return fastify.db.insert(steamders).values(data).returning().execute();
};

/**
 * Retrieves the steamder with players.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} steamderId - The ID of the steamder.
 * @returns {Promise<any>} - The result of the query execution.
 */
export const getSteamderWithPlayers = async (
  fastify: FastifyInstance,
  steamderId: string
): Promise<any> => {
  const { db } = fastify;
  return db
    .select()
    .from(steamders)
    .leftJoin(steamdersPlayers, eq(steamdersPlayers.steamder_id, steamders.id))
    .where(eq(steamders.id, steamderId))
    .execute();
};

/**
 * Retrieves the steamder players and games based on the provided steamder ID.
 *
 * @param fastify - The Fastify instance.
 * @param steamderId - The ID of the steamder.
 * @returns A promise that resolves to the steamder players and games.
 */
export const getSteamderPlayersAndGames = async (
  fastify: FastifyInstance,
  steamderId: string,
  onlyActive: boolean = true
): Promise<any> => {
  const { db } = fastify;
  return db
    .select(onlyActive
      ? { steamder: steamders, players, games }
      : { steamder: steamders, complete: steamders.complete, players, games }
    )
    .from(steamders)
    .innerJoin(steamdersPlayers,
      and(
        eq(steamders.id, steamdersPlayers.steamder_id)
      )
    )
    .leftJoin(players, eq(steamdersPlayers.player_id, players.id))
    .leftJoin(
      libraries,
      and(
        eq(players.id, libraries.player_id),
        eq(libraries.hidden, false)
      )
    )
    .leftJoin(
      games,
      and(
        eq(libraries.game_id, games.id),
        eq(games.is_selectable, true)
      )
    )
    .where(
      onlyActive
        ? and(
          eq(steamders.id, steamderId),
          eq(steamders.complete, false)
        )
        : eq(steamders.id, steamderId)
    ).execute();
};

/**
 * Retrieves steamders with pagination and filtering.
 *
 * @param fastify - The Fastify instance.
 * @param limit - The maximum number of steamders to retrieve.
 * @param offset - The offset for pagination.
 * @returns A promise that resolves to the retrieved steamders.
 */
export const getSteamdersPagination = async (
  fastify: FastifyInstance,
  limit: number,
  offset: number
): Promise<any> => {
  const { db } = fastify;
  return db
    .select({
      id: steamders.id,
      name: steamders.name,
      games: sql`CASE WHEN ${steamders.display_all_games} THEN ${steamders.all_games} ELSE ${steamders.common_games} END`,
      created_at: steamders.created_at,
      player_count: sql`COUNT(${steamdersPlayers.player_id})`,
    })
    .from(steamders)
    .leftJoin(steamdersPlayers, eq(steamders.id, steamdersPlayers.steamder_id))
    .where(and(eq(steamders.private, false), eq(steamders.started, false)))
    .groupBy(steamders.id)
    .orderBy(steamders.created_at, "desc")
    .limit(limit)
    .offset(offset)
    .execute();
};

/**
 * Retrieves the number of available steamders.
 *
 * @param fastify - The Fastify instance.
 * @returns A promise that resolves to the number of available steamders.
 */
export const countAvailableSteamders = async (
  fastify: FastifyInstance
): Promise<number> => {
  const { db } = fastify;
  return db
    .select({
      count: count(),
    })
    .from(steamders)
    .where(and(eq(steamders.private, false), eq(steamders.started, false)))
    .execute();
};

export const canAdminKickFromSteamder = async (fastify: FastifyInstance, steamderId: string, playerId: bigint, userId: bigint): Promise<any> => {
  const { db } = fastify;
  return db
    .select()
    .from(steamders)
    .where(and(eq(steamders.id, steamderId), eq(steamders.admin_id, playerId)))
    .leftJoin(
      steamdersPlayers,
      and(
        eq(steamdersPlayers.steamder_id, steamderId),
        eq(steamdersPlayers.player_id, BigInt(userId)),
        eq(steamdersPlayers.status, "active")
      )
    )
    .execute();
};

/**
 * Checks if a steamder exists (and is not complete) based on the provided ID.
 *
 * @param fastify - The Fastify instance.
 * @param steamderId - The ID of the steamder to check.
 * @param started - Whether the steamder has started.
 * @returns A Promise that resolves to the result of the query execution.
 */
export const checkSteamderExists = async (
  fastify: FastifyInstance,
  steamderId: string,
  started: boolean
): Promise<any> => {
  const { db } = fastify;
  return db
    .select()
    .from(steamders)
    .leftJoin(
      steamdersPlayers,
      eq(steamders.id, steamdersPlayers.steamder_id)
    )
    .where(
      and(
        eq(steamders.id, steamderId),
        eq(steamders.complete, false),
        eq(steamders.started, started)
      )
    )
    .execute();
};

/**
 * Deletes a steamder entry from the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} steamderId - The ID of the steamder entry to delete.
 * @returns {Promise<any>} - A promise that resolves when the steamder entry is deleted.
 */
export const deleteSteamder = async (
  fastify: FastifyInstance,
  steamderId: string
): Promise<any> => {
  const { db } = fastify;
  return db
    .delete(steamders)
    .where(eq(steamders.id, steamderId))
    .execute();
};

/**
 * Counts the number of steamders based on the completion status.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {boolean} complete - A boolean indicating the completion status of the steamders.
 * @returns A Promise that resolves to the count of steamders.
 */
export const countSteamders = async (fastify: FastifyInstance, complete: boolean): Promise<any> => {
  const { db } = fastify;
  return db
    .select({
      count: count(),
    })
    .from(steamders)
    .where(eq(steamders.complete, complete))
    .execute();
}

/**
 * Retrieves the popular selected games from the steamder repository.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @returns A promise that resolves to an array of popular games from all the completed steamders
 */
export const getPopularGames = async (fastify: FastifyInstance): Promise<any> => {
  const { db } = fastify;
  return db
    .select({
      game_id: steamders.selected,
      score: count(steamders.selected),
    })
    .from(steamders)
    .where(
      and(
        eq(steamders.complete, true),
        ne(steamders.selected, 0)
      )
    )
    .groupBy(steamders.selected)
    .orderBy(desc(count(steamders.selected)))
    .limit(3)
    .execute();
}

/**
 * Updates the `display_all_games` property of a steamder in the database.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {string} steamderId - The ID of the steamder.
 * @param {boolean} displayAllGames - The new value for the `display_all_games` property.
 * @returns {Promise<any>} - A promise that resolves when the update is complete.
 */
export const displayAllGamesSwitch = async (
  fastify: FastifyInstance,
  steamderId: string,
  displayAllGames: boolean
): Promise<any> => {
  const { db } = fastify;
  return db
    .update(steamders)
    .set({ display_all_games: displayAllGames })
    .where(eq(steamders.id, steamderId))
    .execute();
}

export const updateSteamder = async (
  fastify: FastifyInstance,
  steamderId: string,
  data: any
): Promise<any> => {
  const { db } = fastify;
  return db
    .update(steamders)
    .set(data)
    .where(eq(steamders.id, steamderId))
    .execute();
};

export const getSteamderByID = async (
  fastify: FastifyInstance,
  steamderId: string
): Promise<any> => {
  const { db } = fastify;
  return db
    .select()
    .from(steamders)
    .where(eq(steamders.id, steamderId))
    .execute();
};

export const getSteamders = async (
  fastify: FastifyInstance,
  options: TGetSteamdersOptions
): Promise<TGetSteamdersResult> => {
  try {
    const { db } = fastify;
    const { page = 1, limit = 20, sort, filters } = options;
    const offset = (page - 1) * limit;

    let query = db
      .select({
        id: steamders.id,
        name: steamders.name,
        created_at: steamders.created_at,
        private: steamders.private,
        complete: steamders.complete,
        // Stats
        players_count: sql<number>`COUNT(DISTINCT ${steamdersPlayers.player_id})`,
        common_games: steamders.common_games,
        all_games: steamders.all_games,
        // Admin info
        admin_id: sql`${steamders.admin_id}::text`,
        admin_username: players.username,
        admin_avatar: players.avatar_hash,
      })
      .from(steamders)
      .innerJoin(steamdersPlayers, eq(steamders.id, steamdersPlayers.steamder_id))
      .innerJoin(players, eq(steamders.admin_id, players.id));

    if (filters) {
      if (filters.search) {
        query = query.where(ilike(steamders.name, `%${filters.search}%`));
      }
      if (filters.isPrivate !== undefined) {
        query = query.where(eq(steamders.private, filters.isPrivate));
      }
      if (filters.isComplete !== undefined) {
        query = query.where(eq(steamders.complete, filters.isComplete));
      }
    }

    query = query.groupBy(
      steamders.id,
      players.id
    );

    // Sorting according to the provided options
    if (sort) {
      const order = sort.order === 'desc' ? sql`DESC` : sql`ASC`;
      switch (sort.field) {
      case 'name':
        query = query.orderBy(sql`${steamders.name} ${order}`);
        break;
      case 'players_count':
        query = query.orderBy(sql`COUNT(DISTINCT ${steamdersPlayers.player_id}) ${order}`);
        break;
      case 'created_at':
        query = query.orderBy(sql`${steamders.created_at} ${order}`);
        break;
      }
    }

    // Count for pagination
    const countQuery = db
      .select({
        count: sql<number>`COUNT(DISTINCT ${steamders.id})`
      })
      .from(steamders)
      .innerJoin(steamdersPlayers, eq(steamders.id, steamdersPlayers.steamder_id));

    const [steamders_data, count_result] = await Promise.all([
      query
        .limit(limit)
        .offset(offset)
        .execute(),
      countQuery.execute()
    ]);

    const total = Number(count_result[0].count);
    const total_pages = Math.ceil(total / limit);

    const formatted_steamders = steamders_data.map((steamder: TSteamderResult) => ({
      id: steamder.id,
      name: steamder.name,
      created_at: steamder.created_at,
      private: steamder.private,
      complete: steamder.complete,
      stats: {
        players_count: Number(steamder.players_count),
        common_games: steamder.common_games,
        all_games: steamder.all_games
      },
      admin: {
        id: steamder.admin_id,
        username: steamder.admin_username,
        avatar_hash: steamder.admin_avatar
      }
    }));

    return {
      steamders: formatted_steamders,
      pagination: {
        total,
        page,
        limit,
        total_pages
      }
    };
  } catch (err) {
    fastify.log.error(err);
    throw new Error("cannot_get_steamders");
  }
};
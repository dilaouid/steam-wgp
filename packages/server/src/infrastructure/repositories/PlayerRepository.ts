import { FastifyInstance } from "fastify";
import { and, count, eq, ilike, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

import { deletedUsers, libraries, players, steamders, steamdersPlayers } from "@schemas";
import { Player } from "@entities";

export type TGetPlayersOptions = {
  page: number;
  limit: number;
  sort?: {
    field: 'username' | 'steamders_completed' | 'library_size' | 'created_at';
    order: 'asc' | 'desc';
  };
  filters?: {
    search?: string; // Recherche par username
    isAdmin?: boolean;
    hasActiveSteamder?: boolean;
    minGamesInLibrary?: number;
  };
};

type PlayerResult = {
  id: string;
  username: string;
  avatar_hash: string;
  library_size: number;
  steamders_completed: number;
  has_active_steamder: boolean;
}

type TGetPlayersResult = {
  players: Array<{
    id: string;
    username: string;
    avatar_hash: string;
    stats: {
      library_size: number;
      steamders_completed: number;
      has_active_steamder: boolean;
    };
  }>;
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
};

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
 * Get all informations related to a player (including the library).
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {bigint} id - The ID of the player.
 * @throws {Error} - If there is an error retrieving the player.
 * @returns {Promise<any>} - A promise that resolves to the player data.
 */
export const getPlayer = async (fastify: FastifyInstance, id: bigint) => {
  try {
    const { db } = fastify;

    // Récupérer les informations de base du joueur et son statut de suppression
    const playerInfo = await db
      .select({
        // Player info
        id: sql`${players.id}::text`,
        username: players.username,
        avatar_hash: players.avatar_hash,
        profileurl: players.profileurl,
        isAdmin: players.isAdmin,
        // Delete status
        is_deleted: sql<boolean>`CASE WHEN ${deletedUsers.id} IS NOT NULL THEN true ELSE false END`,
        delete_date: deletedUsers.delete_date,
      })
      .from(players)
      .leftJoin(deletedUsers, eq(deletedUsers.id, players.id))
      .where(eq(players.id, id))
      .execute();

    if (!playerInfo[0]) {
      throw new Error("player_not_found");
    }

    // Récupérer la bibliothèque
    const library = await db
      .select({
        id: libraries.id,
        game_id: libraries.game_id,
        hidden: libraries.hidden,
      })
      .from(libraries)
      .where(eq(libraries.player_id, id))
      .execute();

    // Récupérer l'historique des steamders
    const completedSteamders = await db
      .select({
        steamder_id: steamdersPlayers.steamder_id,
        completed_at: steamdersPlayers.completed_at,
      })
      .from(steamdersPlayers)
      .where(
        and(
          eq(steamdersPlayers.player_id, id),
          eq(steamdersPlayers.status, 'completed')
        )
      )
      .execute();

    // Récupérer la steamder en cours
    const currentSteamder = await db
      .select({
        // Informations de la steamder
        steamder_id: steamdersPlayers.steamder_id,
        name: steamders.name,
        started: steamders.started,
        private: steamders.private,
        complete: steamders.complete,
        selected: steamders.selected,
        display_all_games: steamders.display_all_games,
        common_games: steamders.common_games,
        all_games: steamders.all_games,
        created_at: steamders.created_at,
        updated_at: steamders.updated_at,
        // Information sur l'admin
        admin_id: sql`${steamders.admin_id}::text`,
        // Récupérer tous les membres dans un array
        members: sql<Array<{id: string, username: string, avatar_hash: string}>>`
      json_agg(
        json_build_object(
          'id', ${players.id}::text,
          'username', ${players.username},
          'avatar_hash', ${players.avatar_hash}
        )
      )`
      })
      .from(steamdersPlayers)
      .innerJoin(
        steamders,
        and(
          eq(steamders.id, steamdersPlayers.steamder_id),
          eq(steamders.complete, false)
        )
      )
    // Join pour récupérer les informations des autres membres
      .innerJoin(
        alias(steamdersPlayers, 'other_members'),
        eq(steamdersPlayers.steamder_id, sql`other_members.steamder_id`)
      )
      .innerJoin(
        players,
        eq(sql`other_members.player_id`, players.id)
      )
      .where(eq(steamdersPlayers.player_id, id))
      .groupBy(
        steamdersPlayers.steamder_id,
        steamders.id,
        steamders.name,
        steamders.started,
        steamders.private,
        steamders.complete,
        steamders.selected,
        steamders.display_all_games,
        steamders.common_games,
        steamders.all_games,
        steamders.created_at,
        steamders.updated_at,
        steamders.admin_id
      )
      .execute();


    // Combiner toutes les données
    return {
      ...playerInfo[0],
      library,
      completed_steamders: completedSteamders.length > 0 ? completedSteamders : null,
      current_steamder: currentSteamder[0] || null,
    };

  } catch (err) {
    throw new Error("Failed to get player");
  }
};

/**
 * Get a paginated list of players with their basic information and statistics.
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {GetPlayersOptions} options - Options for pagination, sorting and filtering.
 * @returns {Promise<GetPlayersResult>} - A promise that resolves to the paginated players data.
 */
export const getPlayers = async (
  fastify: FastifyInstance,
  options: TGetPlayersOptions
): Promise<TGetPlayersResult> => {
  try {
    const { db } = fastify;
    const { page = 1, limit = 20, sort, filters } = options;
    const offset = (page - 1) * limit;

    let query = db
      .select({
        id: sql`${players.id}::text`,
        username: players.username,
        avatar_hash: players.avatar_hash,
        // statistics count
        library_size: sql<number>`
          COUNT(DISTINCT ${libraries.id})
        `,
        steamders_completed: sql<number>`
          COUNT(DISTINCT CASE WHEN ${steamdersPlayers.status} = 'completed' THEN ${steamdersPlayers.steamder_id} END)
        `,
        has_active_steamder: sql<boolean | null>`
          CASE
            WHEN COUNT(CASE WHEN ${steamdersPlayers.status} = 'active' THEN 1 END) > 0 THEN true
            WHEN COUNT(${steamdersPlayers.steamder_id}) = 0 THEN false
            ELSE false
          END
        `

      })
      .from(players)
      .leftJoin(libraries, eq(libraries.player_id, players.id))
      .leftJoin(steamdersPlayers, eq(steamdersPlayers.player_id, players.id));

    // apply query filters
    if (filters) {
      if (filters.search) {
        query = query.where(
          ilike(players.username, `%${filters.search}%`)
        );
      }
      if (filters.isAdmin !== undefined) {
        query = query.where(eq(players.isAdmin, filters.isAdmin));
      }
      if (filters.hasActiveSteamder !== undefined) {
        query = query.having(
          sql`BOOL_OR(${steamdersPlayers.status} = 'active') = ${filters.hasActiveSteamder}`
        );
      }
      if (filters.minGamesInLibrary !== undefined) {
        query = query.having(
          sql`COUNT(DISTINCT ${libraries.id}) >= ${filters.minGamesInLibrary}`
        );
      }
    }

    query = query.groupBy(players.id);

    // apply sorting from options query if any
    if (sort) {
      const order = sort.order === 'desc' ? sql`DESC` : sql`ASC`;
      switch (sort.field) {
      case 'username':
        query = query.orderBy(sql`${players.username} ${order}`);
        break;
      case 'steamders_completed':
        query = query.orderBy(sql`COUNT(DISTINCT CASE WHEN ${steamdersPlayers.status} = 'completed' THEN ${steamdersPlayers.steamder_id} END) ${order}`);
        break;
      case 'library_size':
        query = query.orderBy(sql`COUNT(DISTINCT ${libraries.id}) ${order}`);
        break;
      }
    }

    // count for pagination
    const countQuery = db
      .select({
        count: sql<number>`COUNT(DISTINCT ${players.id})`
      })
      .from(players);

    // exec both queries in parallels
    const [players_data, count_result] = await Promise.all([
      query
        .limit(limit)
        .offset(offset)
        .execute(),
      countQuery.execute()
    ]);

    const total = Number(count_result[0].count);
    const total_pages = Math.ceil(total / limit);

    const formatted_players = players_data.map((player: PlayerResult) => ({
      id: player.id,
      username: player.username,
      avatar_hash: player.avatar_hash,
      stats: {
        library_size: Number(player.library_size),
        steamders_completed: Number(player.steamders_completed),
        has_active_steamder: player.has_active_steamder
      }
    }));

    return {
      players: formatted_players,
      pagination: {
        total,
        page,
        limit,
        total_pages
      }
    };
  } catch (err) {
    fastify.log.error(err);
    throw new Error("cannot_get_players");
  }
};
import { pgTable, bigint, boolean, timestamp, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, and, count, eq, sql } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { Games, Libraries, Players, WaitlistsPlayers } from ".";
import { getCommonGamesController, removeDuplicatesController } from "../utils/gamesUtils";

export const model = pgTable('waitlists', {
  id: uuid('id').primaryKey(),
  admin_id: bigint('admin_id', { mode: 'bigint' }).references(() => Players.model.id),
  started: boolean('started').default(false),
  private: boolean('private').default(false),
  complete: boolean('complete').default(false),
  selected: integer('selected').default(0),
  display_all_games: boolean('display_all_games').default(false),
  common_games: integer('common_games').default(0),
  all_games: integer('all_games').default(0),
  name: varchar('name', { length: 255 }).default('Steamder'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow()
});

interface InsertedWaitlist {
  error?: string;
  waitlist?: Waitlist;
}

export async function insertWaitlist(fastify: FastifyInstance, userId: bigint, isPrivate: boolean, name: string): Promise<InsertedWaitlist> {
  const alreadyInWaitlist = await fastify.db.select().from(WaitlistsPlayers.model).where(
    eq(WaitlistsPlayers.model.player_id, userId)
  ).execute();

  if (alreadyInWaitlist.length > 0) {
    fastify.log.warn(`User ${userId} is already in a waitlist`);
    return { error: 'already_in_a_room' };
  }

  // get the user's games
  const games = await fastify.db
    .select({ id: Libraries.model.game_id })
    .from(Libraries.model)
    .leftJoin(Games.model, eq(Libraries.model.game_id, Games.model.id))
    .where(
      and(
        eq(Libraries.model.player_id, userId),
        eq(Libraries.model.hidden, false),
        eq(Games.model.is_selectable, true)
      )
    )
    .execute();

  const newWaitlist: WaitlistInsert = {
    admin_id: BigInt(userId),
    private: isPrivate,
    name,
    common_games: games.length,
    all_games: games.length
  } as WaitlistInsert;

  const insertWaitlist = await fastify.db.insert(model).values(newWaitlist).returning();

  if (!insertWaitlist) {
    return { error: 'Une erreur interne est survenue' };
  }

  const insertedRoomId = insertWaitlist[0].id;
  await fastify.db.insert(WaitlistsPlayers.model).values({ player_id: userId, waitlist_id: insertedRoomId }).execute();

  return { waitlist: insertWaitlist[0] };
}

export async function checkWaitlistExists(fastify: FastifyInstance, waitlistId: string, playerId: bigint): Promise<any> {
  const result = await fastify.db.select()
    .from(model)
    .leftJoin(WaitlistsPlayers.model, eq(WaitlistsPlayers.model.waitlist_id, model.id))
    .where(eq(model.id, waitlistId))
    .execute();

  if (result.length === 0 || !result[0].waitlists_players) {
    return { valid: false };
  }

  // Check if the player is in the waitlist
  const isPlayerInWaitlist = result.some((row: any) => BigInt(row.waitlists_players?.player_id) === playerId);

  // If he's in the waitlist, return true
  if (isPlayerInWaitlist) {
    return { data: result[0].waitlists, valid: true };
  }

  // Otherwise, check if the waitlist exists and is not started
  const isWaitlistNotStarted = result.some((row: any) => row.waitlists.started === false);

  return { data: result[0].waitlists, valid: isWaitlistNotStarted };
}

export async function getWaitlist(fastify: FastifyInstance, waitlistId: string, userId: bigint): Promise<Waitlist | null> {

  const isUserInWaitlist = await fastify.db.select().from(WaitlistsPlayers.model).where(
    and(
      eq(WaitlistsPlayers.model.waitlist_id, waitlistId),
      eq(WaitlistsPlayers.model.player_id, userId)
    )
  ).execute();

  if (isUserInWaitlist.length === 0) {
    fastify.log.warn(`User ${userId} is not in waitlist ${waitlistId}`);
    return null;
  }

  const result = await fastify.db
    .select({ waitlist: model, players: Players.model, games: Games.model })
    .from(model)
    .leftJoin(WaitlistsPlayers.model, eq(model.id, WaitlistsPlayers.model.waitlist_id))
    .leftJoin(Players.model, eq(WaitlistsPlayers.model.player_id, Players.model.id))
    .leftJoin(Libraries.model,
      and(
        eq(Players.model.id, Libraries.model.player_id),
        eq(Libraries.model.hidden, false)
      ))
    .leftJoin(Games.model, and(
      eq(Libraries.model.game_id, Games.model.id),
      eq(Games.model.is_selectable, true)
    ))
    .where(
      and(
        eq(model.id, waitlistId),
        eq(model.complete, false)
      )
    )

  if (result.length === 0) {
    return null;
  }

  const playersWithGames = result.reduce((acc: any[], row: { players: { id: string; avatar_hash: string; username: string, profileurl: string }; games: any; }) => {
    row.players.id = row.players.id.toString();
    const player = acc.find((p: { player_id: any; }) => p.player_id === row.players.id) || {
      player_id: row.players.id,
      avatar_hash: row.players.avatar_hash,
      username: row.players.username,
      profileurl: row.players.profileurl,
      games: []
    };

    if (!acc.includes(player)) {
      acc.push(player);
    }

    if (row.games) {
      player.games.push(row.games.id);
    }
    return acc;
  }, []);

  result[0].waitlist.admin_id = result[0].waitlist.admin_id.toString();
  const commonGames = getCommonGamesController(playersWithGames.map((player: any) => ({
    games: player.games,
    player_id: player.player_id
  })));
  const allGames = removeDuplicatesController(playersWithGames.map((p: any) => p.games).flat());

  const waitlist = {
    ...result[0].waitlist,
    players: playersWithGames,
    common_games: commonGames,
    all_games: allGames
  };

  return waitlist;
}

export const getWaitlistsPaginated = async (fastify: FastifyInstance, offset: number, limit: number): Promise<Waitlist[]> => {
  try {
    const waitlists = await fastify.db
      .select({
        id: model.id,
        name: model.name,
        games: sql`CASE WHEN ${model.display_all_games} THEN ${model.all_games} ELSE ${model.common_games} END`,
        created_at: model.created_at,
        player_count: sql`COUNT(${WaitlistsPlayers.model.player_id})`
      })
      .from(model)
      .leftJoin(WaitlistsPlayers.model, eq(model.id, WaitlistsPlayers.model.waitlist_id))
      .where(
        and(
          eq(model.private, false),
          eq(model.started, false)
        )
      )
      .groupBy(model.id)
      .orderBy(model.created_at, 'desc')
      .limit(limit)
      .offset(offset)
      .execute();
    return waitlists;
  } catch (err) {
    fastify.log.error(err);
    throw new Error('Une erreur interne est survenue');
  }
}

export const countAvailableSteamders = async (fastify: FastifyInstance): Promise<number> => {
  try {
    const numberOfWaitlists = await fastify.db
      .select({
        count: count()
      })
      .from(model)
      .where(
        and(
          eq(model.private, false),
          eq(model.started, false)
        )
      )
      .execute();
    return numberOfWaitlists;
  } catch (err) {
    fastify.log.error(err);
    throw new Error('Une erreur interne est survenue');
  }
}

export type Waitlist = InferSelectModel<typeof model>;
export type WaitlistInsert = InferInsertModel<typeof model>;
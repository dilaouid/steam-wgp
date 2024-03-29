import { pgTable, bigint, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, and, eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { Games, Libraries, Players, WaitlistsPlayers } from ".";
import i18next from "../plugins/i18n.plugin";

export const model = pgTable('waitlists', {
  id: uuid('id').primaryKey(),
  admin_id: bigint('admin_id', { mode: 'bigint' }).references(() => Players.model.id),
  started: boolean('started').default(false),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow()
});

interface InsertedWaitlist {
  error?: string;
  waitlist?: Waitlist;
}

export async function insertWaitlist(fastify: FastifyInstance, userId: bigint, language: string): Promise<InsertedWaitlist> {
  const alreadyInWaitlist = await fastify.db.select().from(WaitlistsPlayers.model).where(
    eq(WaitlistsPlayers.model.player_id, userId)
  ).execute();

  if (alreadyInWaitlist.length > 0) {
    fastify.log.warn(`User ${userId} is already in a waitlist`);
    return { error: i18next.t('already_in_a_room', { lng: language }) };
  }

  const newWaitlist: WaitlistInsert = {
    admin_id: BigInt(userId),
  } as WaitlistInsert;

  const insertWaitlist = await fastify.db.insert(model).values(newWaitlist).returning();

  if (!insertWaitlist) {
    return { error: 'Une erreur interne est survenue' };
  }

  const insertedRoomId = insertWaitlist[0].id;
  await fastify.db.insert(WaitlistsPlayers.model).values({ player_id: userId, waitlist_id: insertedRoomId }).execute();

  return { waitlist: insertWaitlist[0] };
}

export async function checkWaitlistExists(fastify: FastifyInstance, waitlistId: string, playerId: string): Promise<any> {
  const result = await fastify.db.select()
    .from(model)
    .leftJoin(WaitlistsPlayers.model, eq(WaitlistsPlayers.model.waitlist_id, model.id))
    .where(eq(model.id, waitlistId))
    .execute();

  if (result.length === 0) {
    return { valid: false };
  }

  // Check if the player is in the waitlist
  const isPlayerInWaitlist = result.some((row: any) => BigInt(row.waitlists_players.player_id) === BigInt(playerId));

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
    .leftJoin(Libraries.model, eq(Players.model.id, Libraries.model.player_id))
    .leftJoin(Games.model, and(
      eq(Libraries.model.game_id, Games.model.id),
      eq(Games.model.is_selectable, true),
      eq(Libraries.model.hidden, false)
    ))
    .where(eq(model.id, waitlistId))

  if (result.length === 0) {
    return null;
  }

  const playersWithGames = result.reduce((acc: any[], row: { players: { id: string; avatar_hash: string; username: string }; games: any; }) => {
    row.players.id = row.players.id.toString();
    const player = acc.find((p: { player_id: any; }) => p.player_id === row.players.id) || {
      player_id: row.players.id,
      avatar_hash: row.players.avatar_hash,
      username: row.players.username,
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

  const waitlist = {
    ...result[0].waitlist,
    players: playersWithGames
  };

  return waitlist;
}

export type Waitlist = InferSelectModel<typeof model>;
export type WaitlistInsert = InferInsertModel<typeof model>;
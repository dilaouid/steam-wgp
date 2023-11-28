import { pgTable, bigint, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, and, eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { Games, Libraries, Players, WaitlistsPlayers } from ".";

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

export async function insertWaitlist(fastify: FastifyInstance, userId: bigint): Promise<InsertedWaitlist> {
  const alreadyInWaitlist = await fastify.db.select().from(WaitlistsPlayers.model).where(
    eq(WaitlistsPlayers.model.player_id, userId)
  ).execute();

  if (alreadyInWaitlist.length > 0) {
    return { error: 'Already in a waitlist' };
  }

  const newWaitlist: WaitlistInsert = {
    admin_id: userId,
  } as WaitlistInsert;

  const insertWaitlist = await fastify.db.insert(model).values(newWaitlist).execute();

  if (!insertWaitlist) {
    return { error: 'Error creating waitlist' };
  }

  return { waitlist: insertWaitlist };
}

export async function getWaitlist(fastify: FastifyInstance, waitlistId: string, userId: bigint): Promise<Waitlist | null> {
  const result = await fastify.db
    .select({ waitlist: model, players: Players.model, games: Games.model })
    .from(model)
    .leftJoin(WaitlistsPlayers.model, and(
      eq(model.id, WaitlistsPlayers.model.waitlist_id),
      eq(WaitlistsPlayers.model.player_id, userId)
    ))
    .leftJoin(Players.model, eq(WaitlistsPlayers.model.player_id, Players.model.id))
    .leftJoin(Libraries.model, eq(Players.model.id, Libraries.model.player_id))
    .leftJoin(Games.model, and(
      eq(Libraries.model.game_id, Games.model.id),
      eq(Games.model.is_selectable, true)
    ))
    .where(eq(model.id, waitlistId))

  if (result.length === 0) {
    return null;
  }

  const playersWithGames = result.reduce((acc: any[], row: { players: { player_id: any; avatar_hash: any; }; games: any; }) => {
    const player = acc.find((p: { player_id: any; }) => p.player_id === row.players.player_id) || {
      player_id: row.players.player_id,
      avatar_hash: row.players.avatar_hash,
      games: []
    };

    if (!acc.includes(player)) {
      acc.push(player);
    }

    if (row.games) {
      player.games.push(row.games);
    }
    return acc;
  }, []);

  const waitlist = {
    ...result[0].waitlist,
    players: playersWithGames
  };

  return waitlist;
}

export type Waitlist = InferSelectModel<typeof model>;
export type WaitlistInsert = InferInsertModel<typeof model>;
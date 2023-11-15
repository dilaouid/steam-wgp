import { pgTable, uuid, text, bigserial, boolean, timestamp } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, and, eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { hashGenerator } from "../utils/hash";
import { Players, WaitlistsPlayers } from ".";

export const model = pgTable('waitlists', {
  id: uuid('id').primaryKey(),
  hash: text('hash').notNull().unique().default(hashGenerator(2)),
  admin_id: bigserial('admin_id', { mode: 'bigint' }).references(() => Players.model.id),
  started: boolean('started').default(false),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow()
});

export async function insertWaitlist(fastify: FastifyInstance, userId: bigint): Promise<Waitlist | null> {
  const newWaitlist: WaitlistInsert = {
    admin_id: userId,
  } as WaitlistInsert;

  return await fastify.db.insert(model).values(newWaitlist).execute();
}

export async function getWaitlist(fastify: FastifyInstance, waitlistHash: string, userId: bigint): Promise<Waitlist | null> {
  const result = await fastify.db
    .select({
      waitlist: '*',
      players: { player_id: 'id', avatar_hash: 'avatar_hash' }
    })
    .from(model)
    .leftJoin(WaitlistsPlayers.model, and(
      eq(model.id, WaitlistsPlayers.model.waitlist_id),
      eq(WaitlistsPlayers.model.player_id, userId)
    ))
    .leftJoin(Players.model, eq(WaitlistsPlayers.model.player_id, Players.model.id))
    .where(eq(model.hash, waitlistHash))
    .execute();

  if (result.length === 0) {
    return null;
  }

  const waitlist = {
    ...result[0].waitlist,
    players: result.map((row: { players: any; }) => row.players)
  };

  return waitlist;
}

export type Waitlist = InferSelectModel<typeof model>;
export type WaitlistInsert = InferInsertModel<typeof model>;
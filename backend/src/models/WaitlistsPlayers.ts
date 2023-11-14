import { InferInsertModel, InferSelectModel, and, eq } from "drizzle-orm";
import { uuid, pgTable } from "drizzle-orm/pg-core";
import { model as players } from "./Players";
import { model as waitlists } from "./Waitlists";
import { primaryKey } from "drizzle-orm/pg-core";
import { bigserial } from "drizzle-orm/pg-core";
import { FastifyInstance } from "fastify";

export const model = pgTable('waitlists_players', {
  player_id: bigserial('player_id', { mode: 'bigint'}).references(() => players.id),
  waitlist_id: uuid('waitlist_id').references(() => waitlists.id)
}, (waitlist_player) => {
  return {
    pk: primaryKey({columns: [waitlist_player.player_id, waitlist_player.waitlist_id]})
  }
});

export async function isUserInWaitlist(fastify: FastifyInstance, userId: bigint, waitlistId: string): Promise<{ inWaitlist: boolean, waitlistId: string | null }> {
  const result = await fastify.db.select().from(model).where(
    eq(model.player_id, userId)
  ).execute();

  if (result && result.waitlist_id !== waitlistId) {
    return { inWaitlist: true, waitlistId: result.waitlist_id };
  }

  return { inWaitlist: false, waitlistId: null };
}

export async function joinWaitlist(fastify: FastifyInstance, userId: bigint, waitlistId: string): Promise<void> {
  const newWaitlistPlayer: WaitlistPlayerInsert = {
    player_id: userId,
    waitlist_id: waitlistId
  };

  await fastify.db.insert(model).values(newWaitlistPlayer).execute();
}

export async function leaveWaitlist(fastify: FastifyInstance, userId: bigint, waitlistId: string): Promise<void> {

  const waitlist = await fastify.db.select().from(waitlists).where(
    and(
      eq(waitlists.admin_id, userId),
      eq(waitlists.id, waitlistId)
    )).execute();

  if (waitlist.length > 0) {
    // if admin, delete waitlist and all waitlist players associated with it
    await fastify.db.delete(waitlists).where(eq(waitlists.id, waitlistId)).execute();
    await fastify.db.delete(model).where(eq(model.waitlist_id, waitlistId)).execute();
  }

  await fastify.db.delete(model)
    .where(
      and(
        eq(model.player_id, userId),
        eq(model.waitlist_id, waitlistId)
      )
    ).execute();
}

export type WaitlistPlayer = InferSelectModel<typeof model>;
export type WaitlistPlayerInsert = InferInsertModel<typeof model>;
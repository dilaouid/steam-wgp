import { pgTable, uuid, text, bigserial, boolean, timestamp } from "drizzle-orm/pg-core";
import { model as players } from "./Players";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { hashGenerator } from "../utils/hash";

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

export type Waitlist = InferSelectModel<typeof model>;
export type WaitlistInsert = InferInsertModel<typeof model>;
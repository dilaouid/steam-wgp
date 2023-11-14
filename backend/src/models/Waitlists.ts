import { pgTable, uuid, text, bigserial, boolean, timestamp } from "drizzle-orm/pg-core";
import { model as players } from "./Players";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { hashGenerator } from "../utils/hash";

export const model = pgTable('waitlists', {
  id: uuid('id').primaryKey(),
  hash: text('hash').notNull().unique().default(hashGenerator(2)),
  admin_id: bigserial('admin_id', { mode: 'bigint' }).references(() => players.id),
  started: boolean('started').default(false),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow()
});

export type Waitlist = InferSelectModel<typeof model>;
export type WaitlistInsert = Omit<InferInsertModel<typeof model>, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  hash?: string;
  created_at?: Date;
  updated_at?: Date;
};
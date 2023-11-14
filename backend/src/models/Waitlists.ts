import { pgTable, uuid, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { model as players } from "./Players";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const model = pgTable('waitlists', {
  id: uuid('id').primaryKey(),
  hash: text('hash').notNull().unique(),
  admin_id: bigserial('admin_id', { mode: 'bigint' }).references(() => players.id),
  started: boolean('started').default(false),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow()
});

export type Waitlist = InferSelectModel<typeof model>;
export type WaitlistInsert = InferInsertModel<typeof model>;
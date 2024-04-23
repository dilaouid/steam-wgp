import { pgTable, bigint, timestamp } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const model = pgTable('deleted_users', {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  delete_date: timestamp('delete_date').notNull().defaultNow(),
});

export type DeletedUser = InferSelectModel<typeof model>;
export type DeletedUserInsert = InferInsertModel<typeof model>;
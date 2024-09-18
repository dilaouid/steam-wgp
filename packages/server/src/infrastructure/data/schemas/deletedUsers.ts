import { pgTable, bigint, timestamp } from 'drizzle-orm/pg-core';

export const deletedUsers = pgTable('deleted_users', {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  delete_date: timestamp('delete_date').notNull().defaultNow(),
});
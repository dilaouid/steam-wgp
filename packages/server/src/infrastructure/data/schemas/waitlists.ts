import { pgTable, bigint, boolean, timestamp, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { players } from ".";

export const waitlists = pgTable('waitlists', {
  id: uuid('id').primaryKey(),
  admin_id: bigint('admin_id', { mode: 'bigint' }).references(() => players.id, { onDelete: 'cascade' }),
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
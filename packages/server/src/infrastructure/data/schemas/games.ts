import { pgTable, serial, boolean } from 'drizzle-orm/pg-core';

export const games = pgTable('games', {
  id: serial('id').primaryKey(),
  is_selectable: boolean('is_selectable').default(false)
});
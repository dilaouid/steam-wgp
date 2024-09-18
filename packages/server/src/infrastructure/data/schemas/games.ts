import { pgTable, integer, boolean } from 'drizzle-orm/pg-core';

export const games = pgTable('games', {
  id: integer('id').primaryKey(),
  is_selectable: boolean('is_selectable').default(false)
});
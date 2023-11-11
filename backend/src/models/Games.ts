import { pgTable, serial, boolean } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const model = pgTable('games', {
    id: serial('id').primaryKey(),
    is_selectable: boolean('is_selectable').default(false)
});

export type Game        = InferSelectModel<typeof model>;
export type GameInsert  = InferInsertModel<typeof model>;
import { pgTable, bigint, unique, uuid } from 'drizzle-orm/pg-core';
import { players } from './players';

export const families = pgTable('families', {
  id: uuid("id").primaryKey().defaultRandom(),
  adminId: bigint('admin_id', { mode: 'bigint' }).references(() => players.id, { onDelete: 'cascade' }),
}, () => [
  unique('admin_id')
]);
import { pgTable, bigint, primaryKey } from 'drizzle-orm/pg-core';
import { players } from './players';

export const families = pgTable('families', {
  player_id: bigint('player_id', { mode: 'bigint' }).references(() => players.id, { onDelete: 'cascade' }),
  family_member: bigint('family_member', { mode: 'bigint' }).references(() => players.id, { onDelete: 'cascade' }),
}, (family) => {
  return {
    pk: primaryKey({columns: [family.player_id, family.family_member]})
  }
});
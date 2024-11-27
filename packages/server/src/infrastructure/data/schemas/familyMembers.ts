import { pgTable, bigint, primaryKey, varchar, uuid } from 'drizzle-orm/pg-core';
import { players, families } from './';

export const familyMembers = pgTable('family_members', {
  player_id: bigint('player_id', { mode: 'bigint'}).references(() => players.id, { onDelete: 'cascade' }),
  family_id: uuid('family_id').references(() => families.id, { onDelete: 'cascade' }),
  status: varchar("status", { enum: ['pending', 'accepted'] })
}, (familyMembers) => [
  primaryKey({columns: [ familyMembers.player_id, familyMembers.family_id ] }),
]);
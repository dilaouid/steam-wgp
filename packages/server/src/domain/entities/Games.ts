import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { games } from '@schemas';

export type Game = InferSelectModel<typeof games>;
export type GameInsert = InferInsertModel<typeof games>;
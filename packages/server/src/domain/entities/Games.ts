import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { games } from '../../infrastructure/data/schemas';

export type Game = InferSelectModel<typeof games>;
export type GameInsert = InferInsertModel<typeof games>;
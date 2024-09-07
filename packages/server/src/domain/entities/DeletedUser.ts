import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { deletedUsers } from '../../infrastructure/data/schemas';

export type DeletedUser = InferSelectModel<typeof deletedUsers>;
export type DeletedUserInsert = InferInsertModel<typeof deletedUsers>;
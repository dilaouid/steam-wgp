import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { deletedUsers } from '@schemas';

export type DeletedUser = InferSelectModel<typeof deletedUsers>;
export type DeletedUserInsert = InferInsertModel<typeof deletedUsers>;
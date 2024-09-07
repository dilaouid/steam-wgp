import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { libraries } from '../../infrastructure/data/schemas';

export type Library = InferSelectModel<typeof libraries>;
export type LibraryInsert = InferInsertModel<typeof libraries>;
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { players } from "../../infrastructure/data/schemas";

export type Player = InferSelectModel<typeof players>;
export type PlayerInsert = InferInsertModel<typeof players>;
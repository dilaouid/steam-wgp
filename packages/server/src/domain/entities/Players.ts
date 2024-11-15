import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { players } from "@schemas";

export type Player = InferSelectModel<typeof players>;
export type PlayerInsert = InferInsertModel<typeof players>;
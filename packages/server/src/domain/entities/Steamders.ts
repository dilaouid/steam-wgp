import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { steamders } from "@schemas";

export type Steamder = InferSelectModel<typeof steamders>;
export type SteamderInsert = InferInsertModel<typeof steamders>;
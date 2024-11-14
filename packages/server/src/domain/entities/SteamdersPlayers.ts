import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { steamdersPlayers } from "@schemas";

export type SteamderPlayer = InferSelectModel<typeof steamdersPlayers>;
export type SteamderPlayerInsert = InferInsertModel<typeof steamdersPlayers>;
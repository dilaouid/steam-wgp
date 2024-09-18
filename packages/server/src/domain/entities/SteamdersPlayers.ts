import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { steamdersPlayers } from "../../infrastructure/data/schemas";

export type SteamderPlayer = InferSelectModel<typeof steamdersPlayers>;
export type SteamderPlayerInsert = InferInsertModel<typeof steamdersPlayers>;
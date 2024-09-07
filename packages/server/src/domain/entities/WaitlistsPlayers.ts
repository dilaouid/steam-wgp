import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { waitlistsPlayers } from "../../infrastructure/data/schemas";

export type WaitlistPlayer = InferSelectModel<typeof waitlistsPlayers>;
export type WaitlistPlayerInsert = InferInsertModel<typeof waitlistsPlayers>;
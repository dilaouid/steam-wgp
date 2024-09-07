import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { waitlists } from "../../infrastructure/data/schemas";

export type Waitlist = InferSelectModel<typeof waitlists>;
export type WaitlistInsert = InferInsertModel<typeof waitlists>;
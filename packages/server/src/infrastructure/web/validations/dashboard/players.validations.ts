import { z } from "zod";

export const validPlayerId = z.object({
  player_id: z.coerce
    .bigint({ message: "invalid_id" })
});
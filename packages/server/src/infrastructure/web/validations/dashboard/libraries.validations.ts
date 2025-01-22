import { z } from "zod";

export const addToLibrarySchema = z.object({
  game_id: z.coerce
    .number()
    .min(1, { message: "invalid_id" }),
  hidden: z.coerce
    .boolean({ message: "invalid_boolean" })
    .optional()
    .default(false)
});

export const validPlayerId = z.object({
  player_id: z.coerce
    .bigint({ message: "invalid_id" })
});

export const updateLibrarySchema = z.array(
  z.coerce
    .number()
    .min(1, { message: "invalid_id" })
)

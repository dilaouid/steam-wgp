import { z } from "zod";

export const paginateGamesSchema = z.object({
  offset: z
    .number()
    .min(0, { message: "invalid_offset" })
    .max(1000, { message: "invalid_offset" }),
  limit: z
    .number()
    .min(1, { message: "invalid_limit" })
    .max(100, { message: "invalid_limit" }),
  onlyIsSelectable: z.boolean().optional().default(false),
  onlyNotSelectable: z.boolean().optional().default(false),
});

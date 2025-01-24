import { z } from "zod";

export const paginateGamesSchema = z.object({
  offset: z.coerce
    .number()
    .min(0, { message: "invalid_offset" }),
  limit: z.coerce
    .number()
    .min(1, { message: "invalid_limit" })
    .max(100, { message: "invalid_limit" }),
  onlyIsSelectable: z.coerce.boolean({ message: "invalid_boolean" }).optional(),
  onlyNotSelectable: z.coerce.boolean({ message: "invalid_boolean" }).optional(),
});

export const gamePropertiesSchema = z.object({
  id: z.coerce.number().min(1, { message: "invalid_id" }),
  is_selectable: z.coerce.boolean({ message: "invalid_boolean" }).optional().default(false)
});

export const isValidGameId = z.object({
  id: z.coerce.number().min(1, { message: "invalid_id" })
});

export const isValidSelectable = z.object({
  is_selectable: z.coerce.boolean({ message: "invalid_boolean" }).optional().default(false)
});
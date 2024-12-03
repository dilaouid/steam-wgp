import { z } from "zod";

export const steamderSchema = z.object({
  name: z
    .string()
    .transform((value) => (value === "" || value === null || !value || value === undefined ? "Steamder" : value))
    .refine((value) => value.length >= 3 && value.length <= 40, {
      message: "invalid_name",
    }),
  isPrivate: z.boolean().default(false),
});

export const paginateSchema = z.object({
  offset: z
    .number()
    .min(0, { message: "invalid_offset" })
    .max(1000, { message: "invalid_offset" }),
  limit: z
    .number()
    .min(1, { message: "invalid_limit" })
    .max(100, { message: "invalid_limit" }),
});

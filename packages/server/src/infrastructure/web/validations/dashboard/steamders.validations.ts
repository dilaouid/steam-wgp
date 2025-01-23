import { z } from "zod";

export const validSteamderId = z.object({
  steamder_id: z.coerce
    .string()
    .uuid({ message: "invalid_id" })
});

export const validKickSteamderId = z.object({
  steamder_id: z.coerce
    .string()
    .uuid({ message: "invalid_id" }),
  player_id: z.coerce
    .bigint({ message: "invalid_id" })
});

export const getSteamdersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort_field: z.enum(['name', 'players_count', 'created_at']).optional(),
  sort_order: z.enum(['asc', 'desc']).optional(),
  search: z.coerce.string().optional(),
  is_private: z.coerce.boolean().optional(),
  is_complete: z.coerce.boolean().optional(),
});

export type GetSteamdersQuery = z.infer<typeof getSteamdersQuerySchema>;
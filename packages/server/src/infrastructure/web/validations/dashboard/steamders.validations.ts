import { z } from "zod";

export const validSteamderId = z.object({
  steamder_id: z.coerce
    .string()
    .uuid({ message: "invalid_id" })
});

export const validSteamderRequestId = z.object({
  steamder_id: z.coerce
    .string()
    .uuid({ message: "invalid_id" }),
  player_id: z.coerce
    .bigint({ message: "invalid_id" })
});

export const updateSteamderSchema = z.object({
  name: z.coerce.string().min(3).max(255).optional(),
  private_steamder: z.coerce.boolean().optional(),
  complete: z.coerce.boolean().optional(),
  selected: z.coerce.number().int().optional(),
  display_all_games: z.coerce.boolean().optional()
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
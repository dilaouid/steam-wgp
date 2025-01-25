import { z } from "zod";

export const validPlayerId = z.object({
  player_id: z.coerce
    .bigint({ message: "invalid_id" })
});

export const sortFieldSchema = z.enum(['username', 'steamders_completed', 'library_size', 'created_at']);
export const sortOrderSchema = z.enum(['asc', 'desc']);

export const getPlayersQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sort_field: sortFieldSchema.optional(),
  sort_order: sortOrderSchema.optional(),
  search: z.string().optional(),
  is_admin: z.coerce.boolean().optional(),
  has_active_steamder: z.coerce.boolean().optional(),
  min_games: z.number().int().min(0).optional(),
});

export const updatePlayerBodySchema = z.object({
  avatar_hash: z.string().optional(),
  username: z.string().optional(),
  profileurl: z.string().optional(),
  isAdmin: z.coerce.boolean().optional()
});

export type TGetPlayersQuery = z.infer<typeof getPlayersQuerySchema>;
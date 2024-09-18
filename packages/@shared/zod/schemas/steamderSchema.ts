import { z } from 'zod';

export const steamderSchema = z.object({
    name: z.string().min(3, { message: "invalid_name" }).max(40, { message: "invalid_name" }).default("Steamder"),
    isPrivate: z.boolean().default(false),
});

export const paginateSchema = z.object({
    offset: z.number().min(0, { message: "invalid_offset" }).max(1000, { message: "invalid_offset" }),
    limit: z.number().min(1, { message: "invalid_limit" }).max(100, { message: "invalid_limit" }),
});
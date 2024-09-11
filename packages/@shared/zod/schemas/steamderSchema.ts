import { z } from 'zod';

export const steamderSchema = z.object({
    name: z.string().min(3).max(40).default('Steamder'),
    isPrivate: z.boolean().default(false),
});
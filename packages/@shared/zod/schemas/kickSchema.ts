import { z } from 'zod';

export const kickSchema = z.object({
    steamderId: z.string().uuid(),
    playerId: z.string().uuid(),
});
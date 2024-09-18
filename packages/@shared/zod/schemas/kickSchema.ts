import { z } from 'zod';

export const kickSchema = z.object({
    steamderId: z.string().uuid({ message: "invalid_steamder_id" }),
    playerId: z.string().uuid({ message: "invalid_player_id" }),
});
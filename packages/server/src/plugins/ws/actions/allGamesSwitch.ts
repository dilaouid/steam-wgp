import { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";

import { Steamder } from "../types";
import { steamders } from "../../../infrastructure/data/schemas";

export const allGamesSwitch = async (fastify: FastifyInstance, waitlist: Steamder, waitlistId: string, playerId: string) => {
  if (playerId !== waitlist.adminId)
    return;
  const waitlistEntry: any = fastify.waitlists.get(waitlistId);

  waitlist.display_all_games = !waitlist.display_all_games;
  fastify.db.update(steamders).set({ display_all_games: waitlist.display_all_games }).where(eq(steamders.id, waitlistId)).execute();
  waitlistEntry.sockets.forEach((client: any) => {
    client.send(JSON.stringify({ action: 'allGamesSwitch', display_all_games: waitlist.display_all_games }));
  });
}
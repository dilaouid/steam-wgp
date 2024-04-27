import { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";

import { Waitlist } from "../types";
import { Waitlists } from "../../../models";

export const allGamesSwitch = async (fastify: FastifyInstance, waitlist: Waitlist, waitlistId: string, playerId: string) => {
  if (playerId !== waitlist.adminId)
    return;
  const waitlistEntry: any = fastify.waitlists.get(waitlistId);

  waitlist.display_all_games = !waitlist.display_all_games;
  fastify.db.update(Waitlists.model).set({ display_all_games: waitlist.display_all_games }).where(eq(Waitlists.model.id, waitlistId)).execute();
  waitlistEntry.sockets.forEach((client: any) => {
    client.send(JSON.stringify({ action: 'allGamesSwitch', display_all_games: waitlist.display_all_games }));
  });
}
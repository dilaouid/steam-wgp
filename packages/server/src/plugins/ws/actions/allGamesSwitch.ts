import { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";

import { Steamder } from "../types";
import { steamders } from "../../../infrastructure/data/schemas";

export const allGamesSwitch = async (fastify: FastifyInstance, steamder: Steamder, steamderId: string, playerId: string) => {
  if (playerId !== steamder.adminId)
    return;
  const steamderEntry: any = fastify.steamders.get(steamderId);

  steamder.display_all_games = !steamder.display_all_games;
  fastify.db.update(steamders).set({ display_all_games: steamder.display_all_games }).where(eq(steamders.id, steamderId)).execute();
  steamderEntry.sockets.forEach((client: any) => {
    client.send(JSON.stringify({ action: 'allGamesSwitch', display_all_games: steamder.display_all_games }));
  });
}
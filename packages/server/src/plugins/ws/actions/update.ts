import { FastifyInstance } from "fastify";

import { eq } from "drizzle-orm";

import { Waitlists } from "../../../models";
import { Waitlist } from "../types";
import { calculateAllGames, updateCommonGames } from "../utils";

export const update = async (fastify: FastifyInstance, waitlist: Waitlist, waitlistId: string, publicGames: number[], playerId: string) => {
  try {
    if (waitlist.started || waitlist.ended) return;
    const playerGames = publicGames.map(Number);
    const waitlistDecorate: any = fastify.waitlists.get(waitlistId);
    waitlist.playerGames[playerId] = playerGames;

    updateCommonGames(waitlist);
    const all_games = calculateAllGames(waitlist);

    fastify.db
      .update(Waitlists.model)
      .set(
        {
          common_games: waitlist.commonGames.length,
          all_games: all_games.length
        }
      ).where(
        eq(Waitlists.model.id, waitlistId)
      ).execute();

    waitlistDecorate.sockets.forEach((client: any) => {
      client.send(JSON.stringify({ action: 'update', player: { player_id: playerId, games: playerGames }, commonGames: waitlist.commonGames }));
    });
  } catch (error) {
    fastify.log.error(`Error in 'update' action: ${error}`);
  }
}
import { FastifyInstance } from "fastify";

import { eq } from "drizzle-orm";

import { Waitlists } from "../../../models";
import { calculateAllGames, updateCommonGames } from "../utils";
import { PlayerInfo, Waitlist } from "../types";

export const kick = (fastify: FastifyInstance, waitlistId: string, playerId: string, playerToKick: string, waitlist: Waitlist) => {
  try {
    if (waitlist.started || waitlist.ended) return;
    if (playerId !== waitlist.adminId) return;
    if (waitlist) {
      waitlist.players = waitlist.players.filter((player: PlayerInfo) => player.player_id !== playerToKick);
      delete waitlist.playerGames[playerToKick];
    }

    const waitlistDecorate: any = fastify.waitlists.get(waitlistId);

    // update the waitlistClients.commonGames now that a player has left
    // fillPlayerGamesList();
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

    // send message to all players
    waitlistDecorate.sockets.forEach((client: any) => {
      client.send(JSON.stringify({ action: 'kicked', playerId: playerToKick }));
    });
  } catch (error) {
    fastify.log.error(`Error in 'kick' action: ${error}`);
  }
}
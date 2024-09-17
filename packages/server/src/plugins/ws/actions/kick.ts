import { FastifyInstance } from "fastify";

import { eq } from "drizzle-orm";

import { steamders } from "../../../infrastructure/data/schemas";
import { calculateAllGames, updateCommonGames } from "../utils";
import { PlayerInfo, Steamder } from "../types";

export const kick = (fastify: FastifyInstance, waitlistId: string, playerId: string, playerToKick: string, waitlist: Steamder) => {
  try {
    if (waitlist.started || waitlist.ended) return;
    if (playerId !== waitlist.adminId) return;
    if (waitlist) {
      waitlist.players = waitlist.players.filter((player: PlayerInfo) => player.player_id !== playerToKick);
      delete waitlist.playerGames[playerToKick];
    }

    const waitlistDecorate: any = fastify.steamders.get(waitlistId);

    // update the waitlistClients.commonGames now that a player has left
    // fillPlayerGamesList();
    updateCommonGames(waitlist);
    const all_games = calculateAllGames(waitlist);

    fastify.db
      .update(steamders)
      .set(
        {
          common_games: waitlist.commonGames.length,
          all_games: all_games.length
        }
      ).where(
        eq(steamders.id, waitlistId)
      ).execute();

    // send message to all players
    waitlistDecorate.sockets.forEach((client: any) => {
      client.send(JSON.stringify({ action: 'kicked', playerId: playerToKick }));
    });
  } catch (error) {
    fastify.log.error(`Error in 'kick' action: ${error}`);
  }
}
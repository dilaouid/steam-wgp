import { FastifyInstance } from "fastify";

import { eq } from "drizzle-orm";
import { steamders } from "../../../infrastructure/data/schemas";
import { PlayerInfo, Steamder } from "../types";
import { calculateAllGames, updateCommonGames } from "../utils";

export const leave = async (fastify: FastifyInstance, waitlistId: string, waitlist: Steamder, playerId: string) => {
  const waitlistDecorate: any = fastify.waitlists.get(waitlistId);

  if (waitlist.started || waitlist.ended || !waitlistDecorate) return;
  if (waitlist) {
    waitlist.players = waitlist.players.filter((player: PlayerInfo) => player.player_id !== playerId);
    delete waitlist.playerGames[playerId];
  }

  // update the waitlistClients.commonGames now that a player has left
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
    const data = playerId === waitlist.adminId ? { action: 'end' } : { action: 'leave', playerId};
    client.send(JSON.stringify(data));
  });
}
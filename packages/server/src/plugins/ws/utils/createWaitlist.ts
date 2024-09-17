import { FastifyInstance } from "fastify";
import { PlayerInfo, Steamder } from "../types";
import { steamders, steamdersPlayers } from "../../../infrastructure/data/schemas";
import { and, eq } from "drizzle-orm";

export const createWaitlist = async (fastify: FastifyInstance, waitlistId: string, player: PlayerInfo, waitlists: Map<any, any>): Promise<void> => {
  fastify.log.info(`---------Creating waitlist ${waitlistId}---------`);
  const existingWaitlist = await fastify.db.select()
    .from(steamders)
    .leftJoin(steamdersPlayers, eq(steamders.id, steamdersPlayers.steamder_id))
    .where(and(
      eq(steamders.id, waitlistId),
      eq(steamders.complete, false)
    ))
    .execute();

  if (existingWaitlist.length === 0) {
    fastify.log.error(`Waitlist ${waitlistId} doesn't exists`);
    return;
  }

  // check if player is in the waitlist
  const IsPlayerInWaitlist = existingWaitlist.some((row: any) => {
    return row.waitlists_players.player_id === BigInt(player.player_id);
  });
  if (!IsPlayerInWaitlist) {
    fastify.log.error(`Player ${player.player_id} is not in waitlist ${waitlistId}`);
    return;
  }

  const adminId = existingWaitlist[0].waitlists.admin_id.toString();
  const waitlist: Steamder = {
    adminId,
    players: [player],
    playerGames: {},
    commonGames: [],
    swipedGames: {},
    started: existingWaitlist[0].waitlists.started,
    display_all_games: existingWaitlist[0].waitlists.display_all_games,
    ended: false,
    sockets: new Set()
  };
  waitlists.set(waitlistId, waitlist);
};
import { FastifyInstance } from "fastify";
import { PlayerInfo, Waitlist } from "../types";
import { Waitlists, WaitlistsPlayers } from "../../../models";
import { and, eq } from "drizzle-orm";

export const createWaitlist = async (fastify: FastifyInstance, waitlistId: string, player: PlayerInfo, waitlists: Map<any, any>): Promise<void> => {
  fastify.log.info(`---------Creating waitlist ${waitlistId}---------`);
  const existingWaitlist = await fastify.db.select()
    .from(Waitlists.model)
    .leftJoin(WaitlistsPlayers.model, eq(Waitlists.model.id, WaitlistsPlayers.model.waitlist_id))
    .where(and(
      eq(Waitlists.model.id, waitlistId),
      eq(Waitlists.model.complete, false)
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
  const waitlist: Waitlist = {
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
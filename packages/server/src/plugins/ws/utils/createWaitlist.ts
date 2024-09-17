import { FastifyInstance } from "fastify";
import { PlayerInfo, Steamder } from "../types";
import { steamders, steamdersPlayers } from "../../../infrastructure/data/schemas";
import { and, eq } from "drizzle-orm";

export const createWaitlist = async (fastify: FastifyInstance, steamderId: string, player: PlayerInfo, steamdersMap: Map<any, any>): Promise<void> => {
  fastify.log.info(`---------Creating steamder ${steamderId}---------`);
  const existingSteamder = await fastify.db.select()
    .from(steamders)
    .leftJoin(steamdersPlayers, eq(steamders.id, steamdersPlayers.steamder_id))
    .where(and(
      eq(steamders.id, steamderId),
      eq(steamders.complete, false)
    ))
    .execute();

  if (existingSteamder.length === 0) {
    fastify.log.error(`Steamder ${steamderId} doesn't exists`);
    return;
  }

  // check if player is in the steamder
  const IsPlayerInSteamder = existingSteamder.some((row: any) => {
    return row.steamders_players.player_id === BigInt(player.player_id);
  });
  if (!IsPlayerInSteamder) {
    fastify.log.error(`Player ${player.player_id} is not in steamder ${steamderId}`);
    return;
  }

  const adminId = existingSteamder[0].steamders.admin_id.toString();
  const steamder: Steamder = {
    adminId,
    players: [player],
    playerGames: {},
    commonGames: [],
    swipedGames: {},
    started: existingSteamder[0].steamders.started,
    display_all_games: existingSteamder[0].display_all_games,
    ended: false,
    sockets: new Set()
  };
  steamdersMap.set(steamderId, steamder);
};
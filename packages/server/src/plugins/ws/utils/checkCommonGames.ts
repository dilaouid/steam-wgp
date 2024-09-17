import { FastifyInstance } from "fastify";
import { Steamder } from "../types";
import { inArray, eq, and } from "drizzle-orm";
import { games } from "../../../infrastructure/data/schemas";

export const checkCommonGames = async (waitlist: Steamder, waitlistId: string, fastify: FastifyInstance) => {
  const initialGames = waitlist.playerGames[waitlist.players[0].player_id] || [];
  waitlist.commonGames = waitlist.players.reduce((commonGames, player) => {
    const currentGames = waitlist.playerGames[player.player_id] || [];
    if (commonGames.length === 0) return currentGames;
    return commonGames.filter(game => currentGames.includes(game));
  }, initialGames);

  const commonSelectableGames = await fastify.db.select({ id: games.id })
    .from(games)
    .where(
      and(
        inArray(games.id, waitlist.commonGames),
        eq(games.is_selectable, true)
      )
    )
    .execute();

  if (commonSelectableGames.length !== waitlist.commonGames.length) {
    fastify.log.error(`Not all common games are selectable for room ${waitlistId}`);
    return false;
  }
  return commonSelectableGames;
}
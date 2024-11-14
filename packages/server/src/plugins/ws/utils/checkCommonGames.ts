import { FastifyInstance } from "fastify";
import { Steamder } from "../types";
import { inArray, eq, and } from "drizzle-orm";
import { games } from "@schemas";

export const checkCommonGames = async (steamder: Steamder, steamderId: string, fastify: FastifyInstance) => {
  const initialGames = steamder.playerGames[steamder.players[0].player_id] || [];
  steamder.commonGames = steamder.players.reduce((commonGames, player) => {
    const currentGames = steamder.playerGames[player.player_id] || [];
    if (commonGames.length === 0) return currentGames;
    return commonGames.filter(game => currentGames.includes(game));
  }, initialGames);

  const commonSelectableGames = await fastify.db.select({ id: games.id })
    .from(games)
    .where(
      and(
        inArray(games.id, steamder.commonGames),
        eq(games.is_selectable, true)
      )
    )
    .execute();

  if (commonSelectableGames.length !== steamder.commonGames.length) {
    fastify.log.error(`Not all common games are selectable for room ${steamderId}`);
    return false;
  }
  return commonSelectableGames;
}
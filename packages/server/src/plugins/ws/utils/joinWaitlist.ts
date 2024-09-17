import { and, eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { steamdersPlayers } from "../../../infrastructure/data/schemas";
import { PlayerInfo, Steamder } from "../types";
import { fillPlayerGamesList } from "./fillPlayerGamesList";

export const joinSteamder = async (fastify: FastifyInstance, steamderId: string, player: PlayerInfo, steamdersMap: Map<any, any>): Promise<boolean> => {
  const playerInDb = await fastify.db.select()
    .from(steamdersPlayers)
    .where(and(
      eq(steamdersPlayers.steamder_id, steamderId),
      eq(steamdersPlayers.player_id, BigInt(player.player_id))
    ))
    .execute();

  if (playerInDb.length === 0) {
    // L'utilisateur n'est pas dans la liste d'attente en base de données
    fastify.log.warn(`Player ${player.player_id} is not in waitlist ${steamderId} in the database.`);
    return false;
  }

  if (!player.username) {
    fastify.log.warn(`Player ${player.player_id} doesn't have a username.`);
    return false;
  }

  const steamder: Steamder = steamdersMap.get(steamderId);
  if (!steamder) return false;

  const existingPlayerIndex = steamder.players.findIndex(p => p.player_id === player.player_id);
  if (existingPlayerIndex > -1) {
    steamder.players[existingPlayerIndex] = player;
  } else {
    fastify.log.info(`Player ${player.player_id} joined waitlist ${steamderId}`);
    steamder.players.push(player);
  }

  fillPlayerGamesList(steamdersMap);

  const initialGames = steamder.playerGames[steamder.players[0].player_id] || [];
  steamder.commonGames = steamder.players.reduce((commonGames, player) => {
    const currentGames = steamder.playerGames[player.player_id] || [];
    if (commonGames.length === 0) return currentGames;
    return commonGames.filter(game => currentGames.includes(game));
  }, initialGames);

  return true;
};
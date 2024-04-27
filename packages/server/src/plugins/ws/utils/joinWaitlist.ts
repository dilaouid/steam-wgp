import { and, eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { WaitlistsPlayers } from "../../../models";
import { PlayerInfo, Waitlist } from "../types";
import { fillPlayerGamesList } from "./fillPlayerGamesList";

export const joinWaitlist = async (fastify: FastifyInstance, waitlistId: string, player: PlayerInfo, waitlists: Map<any, any>): Promise<boolean> => {
  const playerInDb = await fastify.db.select()
    .from(WaitlistsPlayers.model)
    .where(and(
      eq(WaitlistsPlayers.model.waitlist_id, waitlistId),
      eq(WaitlistsPlayers.model.player_id, BigInt(player.player_id))
    ))
    .execute();

  if (playerInDb.length === 0) {
    // L'utilisateur n'est pas dans la liste d'attente en base de données
    fastify.log.warn(`Player ${player.player_id} is not in waitlist ${waitlistId} in the database.`);
    return false;
  }

  if (!player.username) {
    fastify.log.warn(`Player ${player.player_id} doesn't have a username.`);
    return false;
  }

  const waitlist: Waitlist = waitlists.get(waitlistId);
  if (!waitlist) return false;

  const existingPlayerIndex = waitlist.players.findIndex(p => p.player_id === player.player_id);
  if (existingPlayerIndex > -1) {
    waitlist.players[existingPlayerIndex] = player;
  } else {
    fastify.log.info(`Player ${player.player_id} joined waitlist ${waitlistId}`);
    waitlist.players.push(player);
  }

  fillPlayerGamesList(waitlists);

  const initialGames = waitlist.playerGames[waitlist.players[0].player_id] || [];
  waitlist.commonGames = waitlist.players.reduce((commonGames, player) => {
    const currentGames = waitlist.playerGames[player.player_id] || [];
    if (commonGames.length === 0) return currentGames;
    return commonGames.filter(game => currentGames.includes(game));
  }, initialGames);

  return true;
};
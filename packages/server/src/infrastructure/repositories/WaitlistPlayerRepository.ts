import { FastifyInstance } from "fastify";
import { libraries, waitlistsPlayers } from "../data/schemas";
import { and, eq } from "drizzle-orm";

export const isPlayerInAWaitlist = async (
  fastify: FastifyInstance,
  playerId: bigint
): Promise<any> => {
  return fastify.db
    .select()
    .from(waitlistsPlayers)
    .where(eq(waitlistsPlayers.player_id, playerId))
    .limit(1)
    .execute();
};

export const isPlayerInWaitlist = async (
  fastify: FastifyInstance,
  playerId: bigint,
  waitlistId: string
): Promise<any> => {
  return fastify.db
    .select()
    .from(waitlistsPlayers)
    .where(
      and(
        eq(waitlistsPlayers.player_id, playerId),
        eq(waitlistsPlayers.waitlist_id, waitlistId)
      )
    )
    .limit(1)
    .execute();
};

export const getPlayersLibrary = async (
  fastify: FastifyInstance,
  waitlistId: string
): Promise<any> => {
  return fastify.db
    .select()
    .from(waitlistsPlayers)
    .leftJoin(
      libraries,
      and(
        eq(waitlistsPlayers.player_id, libraries.player_id),
        eq(libraries.hidden, false)
      )
    )
    .where(eq(waitlistsPlayers.waitlist_id, waitlistId))
    .execute();
};

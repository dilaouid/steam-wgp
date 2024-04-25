import { InferInsertModel, InferSelectModel, and, eq } from "drizzle-orm";
import { pgTable, primaryKey, bigint, varchar } from "drizzle-orm/pg-core";
import { model as players } from "./Players";
import { model as waitlists } from "./Waitlists";
import { model as waitlists_players } from "./WaitlistsPlayers";
import { model as libraries } from "./Libraries";
import { model as games } from "./Games";
import { FastifyInstance } from "fastify";
import { getCommonGames, removeDuplicates } from "../utils/gamesUtils";

export const model = pgTable('waitlists_players', {
  player_id: bigint('player_id', { mode: 'bigint'}).references(() => players.id),
  waitlist_id: varchar('waitlist_id', { length: 60 }).references(() => waitlists.id)
}, (waitlist_player) => {
  return {
    pk: primaryKey({columns: [waitlist_player.player_id, waitlist_player.waitlist_id]})
  }
});

export async function getWaitlistPlayers(fastify: FastifyInstance, waitlistId: string): Promise<{id:number, player_id:number}[]> {
  return fastify.db
    .select({ id: games.id, player_id: libraries.player_id })
    .from(waitlists_players)
    .leftJoin(libraries,
      and(
        eq(waitlists_players.player_id, libraries.player_id),
        eq(libraries.hidden, false)
      )
    )
    .leftJoin(games,
      and(
        eq(libraries.game_id, games.id),
        eq(games.is_selectable, true)
      )
    )
    .where(
      eq(waitlists_players.waitlist_id, waitlistId)
    )
    .execute();
}

export async function getPlayerGames(fastify: FastifyInstance, userId: bigint): Promise<{id:number, player_id:number}[]> {
  return fastify.db
    .select({ id: games.id, player_id: libraries.player_id })
    .from(libraries)
    .where(
      and(
        eq(libraries.hidden, false),
        eq(libraries.player_id, userId)
      )
    )
    .leftJoin(games,
      and(
        eq(libraries.game_id, games.id),
        eq(games.is_selectable, true)
      )
    )
    .execute();
}

export async function isUserInWaitlist(fastify: FastifyInstance, userId: bigint, waitlistId: string): Promise<{ inWaitlist: boolean, waitlistId: string | null }> {
  const results = await fastify.db.select({
    player_id: model.player_id,
    waitlist_id: model.waitlist_id
  }).from(model).where(
    eq(model.player_id, userId)
  ).execute();

  if (results.length === 0) {
    return { inWaitlist: false, waitlistId: null };
  }

  const isInTargetWaitlist = results.some((result: WaitlistPlayer) => result.waitlist_id === waitlistId);

  return {
    inWaitlist: isInTargetWaitlist,
    waitlistId: isInTargetWaitlist ? waitlistId : null
  };
}

export async function isUserInAWaitlist(fastify: FastifyInstance, userId: bigint): Promise<boolean> {
  const result = await fastify.db.select({}).from(model).where(eq(model.player_id, BigInt(userId)));
  return result.length > 0;
}

export async function joinWaitlist(fastify: FastifyInstance, userId: bigint, waitlistId: string): Promise<void> {
  const newWaitlistPlayer: WaitlistPlayerInsert = {
    player_id: userId,
    waitlist_id: waitlistId
  };

  const inWaitlist = await isUserInAWaitlist(fastify, userId);
  if (inWaitlist)
    return ;

  // get all the selectable and public games of each players in the room
  const allWaitlistGames = await getWaitlistPlayers(fastify, waitlistId);

  // add the games of the new player to the list
  const newPlayerGames = await getPlayerGames(fastify, userId);

  // merge newPlayerGames with allWaitlistGames
  allWaitlistGames.push(...newPlayerGames);

  // remove duplicates and save in a new array
  const withoutDuplicates = removeDuplicates(allWaitlistGames);
  const common_games = getCommonGames(allWaitlistGames);

  // update the waitlist with the common games and all games count
  await fastify.db
    .update(waitlists)
    .set({
      all_games: withoutDuplicates.length,
      common_games: common_games.length
    })
    .where(
      eq(waitlists.id, waitlistId)
    )
    .execute();

  await fastify.db.insert(model).values(newWaitlistPlayer);
}

export async function leaveWaitlist(fastify: FastifyInstance, userId: bigint, waitlistId: string): Promise<void> {

  const waitlist = await fastify.db.select().from(waitlists).where(
    and(
      eq(waitlists.admin_id, userId),
      eq(waitlists.id, waitlistId)
    )).execute();

  if (waitlist.length > 0) {
    // if admin, delete waitlist and all waitlist players associated with it
    await fastify.db.delete(waitlists).where(eq(waitlists.id, waitlistId)).execute();
    await fastify.db.delete(model).where(eq(model.waitlist_id, waitlistId)).execute();
    return;
  }

  await fastify.db.delete(model)
    .where(
      and(
        eq(model.player_id, userId),
        eq(model.waitlist_id, waitlistId)
      )
    ).execute();

  const allWaitlistGames = await getWaitlistPlayers(fastify, waitlistId);

  const allGamesIds = removeDuplicates(allWaitlistGames);
  const commonGamesIds = getCommonGames(allWaitlistGames);

  await fastify.db
    .update(waitlists)
    .set({
      all_games: allGamesIds.length,
      common_games: commonGamesIds.length
    })
    .where(eq(waitlists.id, waitlistId))
    .execute();
}

export async function kickPlayer(fastify: FastifyInstance, userId: bigint, waitlistId: string, playerId: bigint): Promise<void> {
  const waitlist = await fastify.db.select().from(waitlists).where(
    and(
      eq(waitlists.admin_id, userId),
      eq(waitlists.id, waitlistId)
    )).execute();

  if (waitlist.length === 0) {
    throw new Error('Not authorized');
  }

  await fastify.db.delete(model)
    .where(
      and(
        eq(model.player_id, playerId),
        eq(model.waitlist_id, waitlistId)
      )
    ).execute();

  const allWaitlistGames = await getWaitlistPlayers(fastify, waitlistId);

  const allGamesIds = removeDuplicates(allWaitlistGames);
  const commonGamesIds = getCommonGames(allWaitlistGames);

  await fastify.db
    .update(waitlists)
    .set({
      all_games: allGamesIds.length,
      common_games: commonGamesIds.length
    })
    .where(eq(waitlists.id, waitlistId))
    .execute();
}

export type WaitlistPlayer = InferSelectModel<typeof model>;
export type WaitlistPlayerInsert = InferInsertModel<typeof model>;
import { FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { and, count, desc, eq, ne } from "drizzle-orm";

import { Players, Games, Waitlists } from "../../models/";

import { APIResponse } from "../../utils/response";

export const getStatsOpts = {
  method: 'GET' as HTTPMethods,
  url: '/',
  handler: getStats
};

async function getStats(request: FastifyRequest, reply: FastifyReply) {
  const fastify = request.server as FastifyInstance;
  try {
    const countPlayers = await fastify.db.select({
      count: count()
    }).from(Players.model)

    const countGames = await fastify.db.select({
      count: count()
    }).from(Games.model)

    const countWaitlists = await fastify.db.select({
      count: count(Waitlists.model.id)
    }).from(Waitlists.model)
      .where(eq(Waitlists.model.complete, false))

    const countMatches = await fastify.db.select({
      count: count()
    }).from(Waitlists.model)
      .where(eq(Waitlists.model.complete, true))

    const popularGames = await fastify.db
      .select({
        game_id: Waitlists.model.selected,
        score: count(Waitlists.model.selected)
      })
      .from(Waitlists.model)
      .where(
        and(
          eq(Waitlists.model.complete, true),
          ne(Waitlists.model.selected, 0)
        )
      )
      .groupBy(Waitlists.model.selected)
      .orderBy(desc(count(Waitlists.model.selected)))
      .limit(3)

    return APIResponse(reply, {
      players: countPlayers[0].count,
      games: countGames[0].count,
      waitlists: countWaitlists[0].count,
      matches: countMatches[0].count,
      podium: popularGames
    }, 'OK', 200);
  } catch (error: any) {
    fastify.log.error(error);
    return APIResponse(reply, null, error.message, 500);
  }
}
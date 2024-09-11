import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import fs from "fs";
import { FastifyInstance } from "fastify/types/instance";

import {
  deletedUsers,
  games,
  libraries,
  steamders,
  steamdersPlayers,
  players,
} from "../../data/schemas";

/**
 * [DEBUG - Works only in development] Retrieves all environment variables.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
export const getAllEnvVariables = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const fastify = request.server as FastifyInstance;
  reply.send({ config: fastify.config });
};

/**
 * [DEBUG - Works only in development] Truncates all data in the database.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A response object with a message indicating that everything has been deleted.
 */
export const truncateAll = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const fastify = request.server as FastifyInstance;
  const { db } = fastify;

  await db.delete(games);
  await db.delete(libraries);
  await db.delete(steamdersPlayers);
  await db.delete(players);
  await db.delete(steamders);
  await db.delete(deletedUsers);
  reply.send({ message: "Everything has been deleted" });
};

/**
 * [DEBUG - Works only in development] Seeds the database with games.
 * You will need to have a steamdb.json file in the same directory as this file (packages/server/src/infrastructure/web/controllers/steamdb.json).
 * You can download the file from: https://github.com/leinstay/steamdb/blob/main/steamdb.json
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A response object with a message indicating that the games have been imported.
 */
export const seed = async (request: FastifyRequest, reply: FastifyReply) => {
  const fastify = request.server as FastifyInstance;

  // Path of the steamdb.json file: packages/server/src/infrastructure/web/controllers/steamdb.json
  const jsonPath = path.join(__dirname, "steamdb.json");
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  // Map the games to the database schema
  // Only games with multiplayer capabilities are selectable
  const games = jsonData.map((game: any) => {
    const hasMultiplayer =
      game.categories?.includes("Multi-player") ||
      game.categories?.includes("Online PvP") ||
      game.categories?.includes("PvP");
    return { id: game.sid, is_selectable: hasMultiplayer };
  });
  try {
    for (const game of games)
      await fastify.db.insert(games).values(game).onConflictDoNothing();
    return reply.send({
      success: true,
      message: "Games imported successfully",
    });
  } catch (error) {
    fastify.log.error("Error importing games:");
    fastify.log.error(error);
    return reply.status(500).send({ message: "Failed to import games" });
  }
};

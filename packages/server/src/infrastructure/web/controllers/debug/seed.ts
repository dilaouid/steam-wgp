import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import fs from "fs";
import { FastifyInstance } from "fastify/types/instance";

/**
 * [DEBUG - Works only in development] Seeds the database with games.
 * You will need to have a steamdb.json file in the same directory as this file (packages/server/src/infrastructure/web/controllers/debug/steamdb.json).
 * You can download the file from: https://github.com/leinstay/steamdb/blob/main/steamdb.json
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 * @returns A response object with a message indicating that the games have been imported.
 */
export const seed = async (request: FastifyRequest, reply: FastifyReply) => {
  const fastify = request.server as FastifyInstance;

  // Path of the steamdb.json file: packages/server/src/infrastructure/web/controllers/debug/steamdb.json
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

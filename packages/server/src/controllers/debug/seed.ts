import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";
import { Games } from "../../models";

export async function seed(request: FastifyRequest, reply: FastifyReply) {
  const fastify = request.server as FastifyInstance;
  const jsonPath = path.join(__dirname, 'steamdb.json');
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  const games = jsonData.map((game: any) => {
    const hasMultiplayer = game.categories?.includes("Multi-player") || game.categories?.includes("Online PvP") || game.categories?.includes("PvP")
    return { id: game.sid, is_selectable: hasMultiplayer };
  });
  try {
    for (const game of games) {
      await fastify.db.insert(Games.model).values(game).onConflictDoNothing();
    }
    return reply.send({ success: true, message: 'Games imported successfully' });
  } catch (error) {
    fastify.log.error('Error importing games:');
    fastify.log.error(error);
    return reply.status(500).send({ success: false, message: 'Failed to import games' });
  }
}
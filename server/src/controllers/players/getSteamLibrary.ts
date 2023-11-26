import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getPlayerLibrary } from "../../models/Libraries";
import { Games } from "../../models";
import { inArray, is } from 'drizzle-orm';

interface GetSteamLibraryRequest extends FastifyRequest<{
    Params: {
      id: bigint;
    };
}> {}

async function insertGameIntoDB(fastify: FastifyInstance, appId: number) {
  fastify.log.info(`Inserting game ${appId} into database`);
  const gameDetailsResponse = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
  const gameDetails = await gameDetailsResponse.json() as any;

  // Vérifier si les catégories contiennent 1, 49, ou 36
  let isSelectable: boolean = gameDetails[appId].data?.categories?.some((category: any) => [1, 49, 36].includes(category.id));
  if (!isSelectable) isSelectable = false;

  // Insérer dans la base de données
  await fastify.db.insert(Games.model).values({
    id: appId,
    is_selectable: isSelectable
  }).execute();
}

async function getAppIdsNotInDB(fastify: FastifyInstance, steamAppIds: number[]) {
  const existingGames = await fastify.db.select({
    id: Games.model.id,
  }).from(Games.model).where(inArray(Games.model.id, steamAppIds))
  const existingAppIds = new Set(existingGames.map((game: any) => game.id));
  const missingAppIds = steamAppIds.filter(id => !existingAppIds.has(id));

  return missingAppIds;
}

export async function getSteamLibrary(request: GetSteamLibraryRequest, reply: FastifyReply) {
  const { id } = request.params; // [TODO] use the id from the jwt token
  const fastify = request.server as FastifyInstance;

  if (!id) return reply.code(401).send({ error: 'Forbidden' });
  try {
    const library = await getPlayerLibrary(fastify, id);
    const steamLibraryRequest = await fetch(`${fastify.config.STEAM_GetOwnedGames}/?key=${fastify.config.STEAM_API_KEY}&steamid=${id}&include_appinfo=true&include_played_free_games=true&format=json`);
    const steamLibrary = await steamLibraryRequest.json() as any;
    if (!steamLibrary.response) {
      return reply.code(500).send({ error: 'Internal server error' });
    }

    const steamAppIds = steamLibrary.response.games.map((game: any) => game.appid);
    const appIdsNotInDB = await getAppIdsNotInDB(fastify, steamAppIds);

    for (const appId of appIdsNotInDB) {
      await insertGameIntoDB(fastify, appId);
    }

    return reply.send({library, appIdsNotInDB});
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
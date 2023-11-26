import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Games, Libraries } from "../../models";
import { eq, inArray } from 'drizzle-orm';

interface GetSteamLibraryRequest extends FastifyRequest<{
    Params: {
      id: bigint;
    };
}> {}

interface IGamesToAdd {
    id: number;
    is_selectable: boolean;
}

const gamesToAdd: IGamesToAdd[] = [];

async function insertGameIntoDB(fastify: FastifyInstance, appId: number) {
  fastify.log.info(`Checking for game ${appId} in Steam API ...`);
  const gameDetailsResponse = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
  const gameDetails = await gameDetailsResponse.json() as any;
  // check if gameDetails have a appId key
  if (!gameDetails || Object.keys(gameDetails).length === 0) {
    // game is not selectable
    fastify.log.info(`Game ${appId} is not selectable - Steam API is not responding...`);
    return;
  }

  // Vérifier si les catégories contiennent 1, 49, ou 36
  const isSelectable = gameDetails[appId].data?.categories?.some((category: any) => [1, 49, 36].includes(category.id));
  gamesToAdd.push({ id: appId, is_selectable: Boolean(isSelectable) });
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
    const library = await fastify.db.select({ game_id: Libraries.model.game_id }).from(Libraries.model).where(eq(Libraries.model.player_id, id));
    const playerLibraryIds = new Set(library.map((game: Libraries.Library) => game.game_id));

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

    if (gamesToAdd.length > 0) {
      fastify.log.info(`Inserting ${gamesToAdd.length} games into DB`);
      await fastify.db.insert(Games.model).values(gamesToAdd).execute();
    }

    const gamesToAddToLibrary = steamAppIds.filter((gameId: number) => !playerLibraryIds.has(gameId));
    // Construire les données pour l'insertion
    const insertData = gamesToAddToLibrary.map((gameId: number) => ({
      game_id: gameId,
      player_id: id
    }));
    if (insertData.length > 0) {
      fastify.log.info(`Inserting ${insertData.length} games into player library`);
      await fastify.db.insert(Libraries.model).values(insertData).execute();
    }

    // if some games weren't inserted correctly in insertGameIntoDB, we tell the user that X games were not inserted
    if (appIdsNotInDB.length !== gamesToAdd.length) {
      fastify.log.info(`Some games were not inserted correctly in DB`);
      return reply.send({message: `${gamesToAdd.length - appIdsNotInDB.length} games were not inserted correctly in DB`});
    } else if (appIdsNotInDB.length === 0) {
      fastify.log.info(`All games were inserted correctly in DB`);
      return reply.send({message: `All games were inserted correctly in DB`});
    } else {
      fastify.log.info(`All games were inserted correctly in DB`);
      return reply.send({message: `${gamesToAdd.length} games were inserted correctly in DB`});
    }

  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Games, Libraries } from "../../models";
import { eq, inArray } from 'drizzle-orm';

interface GetSteamLibraryRequest extends FastifyRequest<{ Params: { id: bigint; }; }> {}
interface IGamesToAdd { id: number; is_selectable: boolean; }

// Fetch the game details from the steam api (is multiplayer or not, essentially)
async function fetchGameDetails(fastify: FastifyInstance, appId: number): Promise<IGamesToAdd | null> {
  const gameDetailsResponse = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
  const gameDetails = await gameDetailsResponse.json() as any;

  if (!gameDetails || !gameDetails[appId].data) {
    fastify.log.warn(`Game ${appId} is not selectable - Steam API is not responding...`);
    return null;
  }

  const isSelectable = gameDetails[appId].data.categories?.some((category: any) => [1, 49, 36].includes(category.id));
  return { id: appId, is_selectable: Boolean(isSelectable) };
}

// Get the steam app ids that are not in the database yet
async function getAppIdsNotInDB(fastify: FastifyInstance, steamAppIds: number[]) {
  const existingGames = await fastify.db.select({
    id: Games.model.id,
  }).from(Games.model).where(inArray(Games.model.id, steamAppIds))
  const existingAppIds = new Set(existingGames.map((game: any) => game.id));
  const missingAppIds = steamAppIds.filter(id => !existingAppIds.has(id));

  return missingAppIds;
}

// Insert the new games to the database
async function insertGames(fastify: FastifyInstance, games: IGamesToAdd[]) {
  if (games.length > 0) {
    fastify.log.info(`Inserting ${games.length} games into the database...`);
    await fastify.db.insert(Games.model).values(games).onConflictDoNothing().execute();
  }
}

// Insert the all the new games to the player's library
async function insertGamesIntoLibrary(fastify: FastifyInstance, player_id: bigint, game_ids: number[]) {
  const insertData = game_ids.map(game_id => ({ game_id, player_id }));
  if (insertData.length > 0) {
    fastify.log.info(`Inserting ${insertData.length} games into the library...`);
    await fastify.db.insert(Libraries.model).values(insertData).onConflictDoNothing().execute();
  }
}

export async function getSteamLibrary(request: GetSteamLibraryRequest, reply: FastifyReply) {
  const { id } = request.params;
  const fastify = request.server as FastifyInstance;

  if (!id) return reply.code(401).send({ error: 'Forbidden' });

  try {
    const library = await fastify.db.select({ game_id: Libraries.model.game_id }).from(Libraries.model).where(eq(Libraries.model.player_id, id));
    const playerLibraryIds = new Set(library.map((game: any) => game.game_id));

    const steamLibraryRequest = await fetch(`${fastify.config.STEAM_GetOwnedGames}/?key=${fastify.config.STEAM_API_KEY}&steamid=${id}&include_appinfo=true&include_played_free_games=true&format=json`);
    const steamLibrary = await steamLibraryRequest.json() as any;
    if (!steamLibrary.response) return reply.code(500).send({ error: 'Internal server error' });

    const steamAppIds = steamLibrary.response.games.map((game: any) => game.appid);
    const appIdsNotInDB = await getAppIdsNotInDB(fastify, steamAppIds);

    const gamesToAdd = await Promise.all(appIdsNotInDB.map(appId => fetchGameDetails(fastify, appId)));
    await insertGames(fastify, gamesToAdd.filter(game => game !== null) as IGamesToAdd[]);

    const gamesToAddToLibrary = steamAppIds.filter((gameId: number) => !playerLibraryIds.has(gameId));
    await insertGamesIntoLibrary(fastify, id, gamesToAddToLibrary);

    // if added games in db is less than gamesToAddToLibrary, then warn the user
    if (gamesToAddToLibrary.length > 0 && gamesToAddToLibrary.length !== gamesToAdd.length) {
      fastify.log.warn(`Only ${gamesToAdd.length} out of ${gamesToAddToLibrary.length} games were added to the database`);
      return reply.send({ message: `Only ${gamesToAdd.length} out of ${gamesToAddToLibrary.length} games were added to the database` });
    }

    return reply.send({ message: 'Library updated successfully' });
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}

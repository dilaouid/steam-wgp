import { FastifyInstance } from "fastify";
import { ISteamResponse } from "./progressService";

type GetLibraryParams = { playerId: bigint; baseUrl: string; API_KEY: string; };
type GetGameDetailsParams = { f: FastifyInstance; appId: number; };

export const steamService = {
  getLibrary: async ({ playerId, baseUrl, API_KEY }: GetLibraryParams) => {
    return fetch(`${baseUrl}/?key=${API_KEY}&steamid=${playerId}&include_appinfo=true&include_played_free_games=true&format=json`)
  },

  // Fetch the game details from the steam api (is multiplayer or not, essentially)
  getGameDetails: async ({ f, appId }: GetGameDetailsParams) => {
    const gameDetailsResponse = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
    const gameDetails = await gameDetailsResponse?.json() as any || null;
    if (!gameDetails) {
      f.log.warn(`Game ${appId} is not selectable - Steam API is not responding in https://store.steampowered.com/api/appdetails?appids=${appId}...`);
      return null;
    }

    const isSelectable = gameDetails[appId].data.categories?.some((category: any) => [1, 49, 36].includes(category.id));
    f.log.info(`Game ${appId} is ${isSelectable ? 'selectable' : 'not selectable'}`);
    return { id: appId, is_selectable: Boolean(isSelectable) };
  },

  formatAPIResponse: async (response: Response) => {
    return await response.json() as ISteamResponse & {
        response: {
            games: {
                appid: number;
            }[]
        }
    };
  },
}
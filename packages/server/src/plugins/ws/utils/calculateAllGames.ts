import { Steamder } from "../types";

export const calculateAllGames = (steamderClients: Steamder) => {
  const allGamesSet = new Set<number>();

  Object.values(steamderClients.playerGames).forEach((games: any) => {
    games.forEach((game: number) => {
      allGamesSet.add(game);
    });
  });

  return Array.from(allGamesSet);
};

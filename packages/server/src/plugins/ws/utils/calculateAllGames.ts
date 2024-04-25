import { Waitlist } from "../types";

export const calculateAllGames = (waitlistClients: Waitlist) => {
  const allGamesSet = new Set<number>();

  Object.values(waitlistClients.playerGames).forEach((games: any) => {
    games.forEach((game: number) => {
      allGamesSet.add(game);
    });
  });

  return Array.from(allGamesSet);
};

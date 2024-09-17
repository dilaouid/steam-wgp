import { Steamder } from "../types";

export const checkGameEnd = (steamderId: string, gameId: number, steamder: Steamder): boolean => {
  if (steamder && steamder.started && !steamder.ended) {
    const swipedGames = steamder.swipedGames[gameId];
    const players = steamder.players;

    const gameEnd = swipedGames?.length === players?.length;

    steamder.ended = gameEnd;
    if (steamder.ended)
      steamder.winner = gameId;
    return gameEnd;
  }
  return false;
};
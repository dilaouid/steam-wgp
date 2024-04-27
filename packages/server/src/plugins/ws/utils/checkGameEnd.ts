import { Waitlist } from "../types";

export const checkGameEnd = (waitlistId: string, gameId: number, waitlist: Waitlist): boolean => {
  if (waitlist && waitlist.started && !waitlist.ended) {
    const swipedGames = waitlist.swipedGames[gameId];
    const players = waitlist.players;

    const gameEnd = swipedGames.length === players.length;

    waitlist.ended = gameEnd;
    if (waitlist.ended)
      waitlist.winner = gameId;
    return gameEnd;
  }
  return false;
};
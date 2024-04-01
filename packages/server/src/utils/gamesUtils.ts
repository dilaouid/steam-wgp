export const removeDuplicates = (allWaitlistGames: any[]) => {
  return allWaitlistGames.reduce(
    (acc: string[], game: any) => {
      if (game.games)
        acc.push(game.games.id);
      return acc;
    }, []);
};

export const getCommonGames = (allWaitlistGames: any[]) => {
  return allWaitlistGames.filter(
    (gameId: string, index: number, self: string[]) => self.indexOf(gameId) === index)
};
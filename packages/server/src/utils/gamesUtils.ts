interface WaitlistGamePlayer {
  id: number;
  player_id: number;
}

/**
 * Removes duplicate elements from an array of WaitlistGamePlayer objects based on their 'id' property.
 *
 * @param allWaitlistGames - The array of WaitlistGamePlayer objects.
 * @returns An array of unique 'id' values from the input array.
 */
export const removeDuplicates = (allWaitlistGames: WaitlistGamePlayer[]) => {
  return allWaitlistGames.reduce((acc: number[], current: { id: number }) => {
    if (!acc.includes(current.id)) {
      acc.push(current.id);
    }
    return acc;
  }, []);

};

export const getCommonGames = (gamesPlayers: WaitlistGamePlayer[]) => {
  const gamesByPlayer = new Map();

  gamesPlayers.forEach(gamePlayer => {
    if (!gamesByPlayer.has(gamePlayer.player_id)) {
      gamesByPlayer.set(gamePlayer.player_id, new Set());
    }
    gamesByPlayer.get(gamePlayer.player_id).add(gamePlayer.id);
  });

  const allGamesSets = Array.from(gamesByPlayer.values());
  const commonGames = allGamesSets.reduce((commonSet, gamesSet) =>
    new Set([...commonSet].filter(game => gamesSet.has(game) && game !== null))
  );

  return Array.from(commonGames);
};

/**
 * Retrieves the common games from an array of game players.
 *
 * @param gamesPlayers - An array of WaitlistGamePlayer objects.
 * @returns An array of common games.
 */
export const getCommonGamesController = (gamesPlayers: Array<{ games: number[], player_id: string }>): number[] => {
  const gamesByPlayer = new Map<string, Set<number>>();

  gamesPlayers.forEach(({ games, player_id }) => {
    const existingSet = gamesByPlayer.get(player_id) || new Set<number>();
    games.forEach(game => existingSet.add(game));
    gamesByPlayer.set(player_id, existingSet);
  });

  const allGamesSets = Array.from(gamesByPlayer.values());
  return Array.from(allGamesSets.reduce((commonSet, gamesSet) =>
    new Set([...commonSet].filter(game => gamesSet.has(game)))
  ));
};

export const removeDuplicatesController = (games: number[]): number[] => {
  return Array.from(new Set(games));
};
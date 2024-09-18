interface SteamderGamePlayer {
  id: number;
  player_id: number;
}

/**
 * Removes duplicate elements from an array of SteamderGamePlayer objects based on their 'id' property.
 *
 * @param allSteamderGames - The array of SteamderGamePlayer objects.
 * @returns An array of unique 'id' values from the input array.
 */
export const removeDuplicates = (allSteamderGames: SteamderGamePlayer[]) => {
  return allSteamderGames.reduce((acc: number[], current: { id: number }) => {
    if (!acc.includes(current.id)) {
      acc.push(current.id);
    }
    return acc;
  }, []);

};

export const getCommonGames = (gamesPlayers: SteamderGamePlayer[]) => {
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
 * @param gamesPlayers - An array of SteamderGamePlayer objects.
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

export const formatPlayers = (acc: any[], row: { players: { id: string; avatar_hash: string; username: string, profileurl: string }; games: any; }) => {
  row.players.id = row.players.id.toString();
  const player = acc.find((p: { player_id: any; }) => p.player_id === row.players.id) || {
    player_id: row.players.id.toString(),
    avatar_hash: row.players.avatar_hash,
    username: row.players.username,
    profileurl: row.players.profileurl,
    games: []
  };

  if (!acc.includes(player)) {
    acc.push(player);
  }

  if (row.games) {
    player.games.push(row.games.id);
  }
  return acc;
};
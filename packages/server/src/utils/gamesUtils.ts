interface WaitlistGamePlayer {
  id: number;
  player_id: number;
}

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
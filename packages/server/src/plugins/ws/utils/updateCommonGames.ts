import { Steamder } from "../types";

export const updateCommonGames = (steamder: Steamder) => {
  const playerIds = Object.keys(steamder.playerGames);

  let commonGamesSet = new Set<number>(steamder.playerGames[playerIds[0]]);

  playerIds.slice(1).forEach((playerId) => {
    const gamesSet = new Set(steamder.playerGames[playerId]);
    commonGamesSet = new Set(
      [...commonGamesSet].filter((game) => gamesSet.has(game))
    );
  });
  const common_games = Array.from(commonGamesSet);
  steamder.commonGames = common_games;
};
